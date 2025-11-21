import { GoogleGenAI, Type } from '@google/genai';
import { AI_FEATURES, APP_MODES } from '../constants';
import { AppConfig } from '../types';

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to parse YAML Frontmatter + Markdown
// This is much more robust than parsing JSON for large text generation
const parseFrontmatter = (text: string) => {
  const result = {
    appNameCN: '智构应用',
    appNameEN: 'SmartBuild App',
    shortDescription: '暂无简介',
    content: ''
  };

  if (!text) return result;

  // Regex to find content between first two ---
  const match = text.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);

  if (match) {
    const yamlBlock = match[1];
    result.content = match[2].trim();

    // Simple YAML parser for known keys
    const cnMatch = yamlBlock.match(/appNameCN:\s*(.*)/);
    const enMatch = yamlBlock.match(/appNameEN:\s*(.*)/);
    // Handle multiline description or standard string
    const descMatch = yamlBlock.match(/shortDescription:\s*([|>\s]*)?([\s\S]*?)(?=\n[a-zA-Z]+:|$)/);

    if (cnMatch) result.appNameCN = cnMatch[1].trim().replace(/^["']|["']$/g, '');
    if (enMatch) result.appNameEN = enMatch[1].trim().replace(/^["']|["']$/g, '');
    if (descMatch) result.shortDescription = descMatch[2].trim();
  } else {
    // Fallback if no frontmatter found
    result.content = text;
  }

  return result;
};

// 1. Analyze Intent (Fast Mode)
export const analyzeUserIntent = async (userInput: string, base64Image?: string): Promise<string[]> => {
  try {
    const ai = getAI();
    const featureListString = AI_FEATURES.map(f => `- ID: ${f.id}, Name: ${f.title}, Desc: ${f.description}`).join('\n');

    const systemPrompt = `
      You are an expert AI Architect. Map the user's idea to Gemini AI features.
      Features:
      ${featureListString}
      Return ONLY a JSON object: { "matchedIds": ["id1", "id2"] }
    `;

    const contents: any[] = [];
    if (base64Image) {
      contents.push({ inlineData: { mimeType: 'image/png', data: base64Image } });
    }
    contents.push({ text: userInput || "Analyze requirements." });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: contents }, 
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      }
    });
    
    const cleanJson = response.text?.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson || '{}').matchedIds || [];
  } catch (error) {
    console.error("Error analyzing intent:", error);
    return ['gemini_intelligence'];
  }
};

// 2. Generate Spec (V2.0 Atmosphere Coding Mode - Updated for Gemini 3 Build Norms)
export const generateProjectSpec = async (
  userInput: string,
  base64Image: string | null,
  selectedFeatureIds: string[],
  config: AppConfig
): Promise<{ appNameCN: string; appNameEN: string; shortDescription: string; content: string }> => {
  const ai = getAI();

  const selectedFeatures = AI_FEATURES.filter(f => selectedFeatureIds.includes(f.id));
  const featureNames = selectedFeatures.map(f => f.title).join(', ');
  
  // Enhanced Style Descriptors for Atmosphere
  let styleDesc = "";
  if (config.style === 'cyberpunk') styleDesc = "Neon-noir, High Contrast, Glitch effects, 'High Tech Low Life' atmosphere.";
  else if (config.style === 'minimalist') styleDesc = "Zen-like, Deep Space Grey or Pure White, breathable whitespace, refined typography.";
  else if (config.style === 'glassmorphism') styleDesc = "Frosted glass, translucent layers, soft ambient lighting, ethereal depth.";
  else styleDesc = "Professional SaaS, clean lines, trustworthy blue/slate palette, highly functional.";

  const systemPrompt = `
    # Role: Atmosphere Architect & Product Visionary
    You are an expert in "Atmosphere Coding". Your job is to translate a user's idea into a **High-Fidelity Build Prompt** for an AI Engineer.
    
    # The "Atmosphere Coding" Standard (Gemini 3 Spec)
    1.  **Goal**: Define the app's singular purpose clearly.
    2.  **Vibe (Crucial)**: Don't just list colors. Describe the *lighting*, *physics*, *texture*, and *emotional response*. (e.g., "The interface should feel like a warm cockpit").
    3.  **Logic**: Describe *behavior* and *user flow*, not code implementation. (e.g., "When the timer ends, the screen shouldn't beep; it should slowly bleed red.").
    4.  **UI Language**: **GLOBAL CONSTRAINT: ALL UI TEXT MUST BE CHINESE (SIMPLIFIED).**

    # Input Context
    - **Idea**: "${userInput}"
    - **Tech Context**: React 19, Tailwind CSS, Google GenAI.
    - **Visual Direction**: ${config.style} (${styleDesc})
    - **Capabilities**: ${featureNames}

    # Output Format (Markdown with Frontmatter)
    
    ---
    appNameCN: [Creative Chinese Name, max 6 chars]
    appNameEN: [Creative English Name]
    shortDescription: |
      * **核心目标**: [One sentence goal]
      * **视觉氛围**: [Key visual descriptors]
      * **核心交互**: [Key interaction mechanic]
    ---

    # Build Prompt: [App Name]

    ## 1. Goal (核心目标)
    [Concise, punchy description of what this app is and why it exists.]

    ## 2. Vibe & Visuals (视觉氛围)
    *   **Atmosphere**: [Describe the feeling. e.g., "Deep focus, minimalist, zen-garden aesthetic."]
    *   **Palette**: [Specific color relationships. e.g., "Void Black background with Neon Orange highlights."]
    *   **Motion & Physics**: [How do things move? e.g., "Snappy, spring-loaded animations" or "Slow, ethereal fades."]
    *   **Components**: [Shape and texture. e.g., "Glassmorphism cards with 1px white borders."]

    ## 3. Core Logic & Interactions (核心逻辑)
    *   **Key Flow**: [Step-by-step user journey in plain English.]
    *   **Unique Behaviors**: [Specific interactive details. e.g., "If user clicks X, do Y."]
    *   **AI Integration**: [How exactly is Gemini used? e.g., "Gemini analyzes the image and returns a poetic description."]

    ## 4. UI/UX Constraints (界面规范)
    *   **Language**: **STRICTLY CHINESE (Simplified)** for all visible text (Labels, Buttons, Placeholders, Toasts).
    *   **Layout**: [e.g., Mobile-first, Single centered card, Dashboard grid.]

    ## 5. Tech Stack (技术栈)
    *   **Framework**: React 19 (TypeScript) + Vite.
    *   **Styling**: Tailwind CSS.
    *   **Icons**: Lucide React.
    *   **AI**: Google GenAI SDK (@google/genai).
  `;

  const contents: any[] = [];
  if (base64Image) {
    contents.push({ inlineData: { mimeType: 'image/png', data: base64Image } });
  }
  contents.push({ text: "Generate the Atmosphere Coding Build Prompt now." });

  try {
    // Prioritize Gemini 3 Pro for high-quality creative direction
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { parts: contents },
      config: { systemInstruction: systemPrompt }
    });

    return parseFrontmatter(response.text || '');

  } catch (error) {
    console.warn("Gemini 3 Pro failed, falling back to Flash.", error);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: contents },
        config: { systemInstruction: systemPrompt }
      });
      return parseFrontmatter(response.text || '');
    } catch (finalError) {
      console.error("Critical Failure:", finalError);
      throw finalError;
    }
  }
};
