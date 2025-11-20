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

// 2. Generate Spec (Robust Frontmatter Mode)
export const generateProjectSpec = async (
  userInput: string,
  base64Image: string | null,
  selectedFeatureIds: string[],
  config: AppConfig
): Promise<{ appNameCN: string; appNameEN: string; shortDescription: string; content: string }> => {
  const ai = getAI();

  const selectedFeatures = AI_FEATURES.filter(f => selectedFeatureIds.includes(f.id));
  const featureNames = selectedFeatures.map(f => f.title).join(', ');
  
  let styleKeywords = "";
  if (config.style === 'cyberpunk') styleKeywords = "Cyberpunk 2077, Glitch Art, High Tech Low Life, Neon, Dark";
  else if (config.style === 'minimalist') styleKeywords = "Apple Design, International Typographic Style, Whitespace, Clean";
  else if (config.style === 'glassmorphism') styleKeywords = "Glassmorphism, Blur, Translucency, Deep Gradients";
  else styleKeywords = "Modern SaaS, Clean, Professional, Blue/Grey Theme";

  const systemPrompt = `
    Role:
    You are a World-Class Senior Frontend Architect & AI Product Manager.
    
    Task:
    Generate a comprehensive Project Specification (System Prompt) for the user's idea.
    
    Input Context:
    - User Idea: "${userInput}"
    - Tech Stack Features: ${featureNames}
    - Style Mode: ${config.style} (${styleKeywords})
    - App Mode: ${config.appMode}

    IMPORTANT CONSTRAINTS:
    1. **UI Language**: The application's User Interface (buttons, labels, text) MUST be in **Chinese (Simplified)**. English sub-labels are allowed for aesthetic purposes (e.g., "开始 (START)").
    2. **Core AI Model**: You MUST use 'gemini-3-pro-preview' for logic and complex tasks.
    3. **SDK**: Always use '@google/genai'.

    Output Format:
    You MUST return the response in standard MARKDOWN format with a YAML FRONTMATTER block at the very top.
    
    Structure Requirement:
    ---
    appNameCN: [Chinese Name, max 6 chars]
    appNameEN: [English Name]
    shortDescription: |
      * **核心理念**: [Concise concept in Chinese]
      * **目标用户**: [Target audience in Chinese]
      * **技术亮点**: [Tech highlights in Chinese]
    ---
    
    # [App Name] Project Design Document

    ## 1. Role & Objectives (角色设定)
    - **Role**: Define the AI's persona.
    - **Language**: Explicitly state that the UI and interactions are in Chinese.
    - **Objective**: The core goal.

    ## 2. Technology Stack (技术栈)
    - **Core AI**: Google GenAI SDK (Model: **gemini-3-pro-preview**)
    - **Framework**: React 19 (TypeScript)
    - **Styling**: Tailwind CSS
    - **Icons**: Lucide React
    - **Features**: ${featureNames}

    ## 3. Visual Design Specs (视觉设计规范) - CRUCIAL
    - **Palette**: Define specific hex codes.
    - **Typography**: Font choices.
    - **UI Components**: Specific look of buttons, cards.
    - **Layout**: Z-index rules, spacing.

    ## 4. Core Functional Modules (核心功能模块)
    - Break down features.
    - **Prompt Strategy**: How to use Gemini 3 Pro for these features.

    ## 5. Code Structure (代码结构)
    - File tree structure.
    - State management logic.
  `;

  const contents: any[] = [];
  if (base64Image) {
    contents.push({ inlineData: { mimeType: 'image/png', data: base64Image } });
  }
  contents.push({ text: "Start building the specification now. Adhere strictly to the YAML frontmatter and Chinese UI requirement." });

  try {
    // Try Pro first
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