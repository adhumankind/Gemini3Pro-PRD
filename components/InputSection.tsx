import React, { useState, useRef, useEffect } from 'react';
import { Mic, Image as ImageIcon, Send, Loader2, X, Shuffle, Sparkles } from 'lucide-react';
import { APP_IDEAS_POOL } from '../constants';

interface InputSectionProps {
  onAnalyze: (input: string, imageBase64?: string) => void;
  isAnalyzing: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isAnalyzing }) => {
  const [text, setText] = useState('');
  const [hoveredPrompt, setHoveredPrompt] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof APP_IDEAS_POOL>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load ALL suggestions (limit to 40 as requested)
  useEffect(() => {
    const shuffled = [...APP_IDEAS_POOL].sort(() => 0.5 - Math.random());
    setSuggestions(shuffled.slice(0, 40));
  }, []);

  const refreshSuggestions = () => {
    const shuffled = [...APP_IDEAS_POOL].sort(() => 0.5 - Math.random());
    setSuggestions(shuffled.slice(0, 40));
  };

  // Voice Input
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("您的浏览器不支持语音输入 (Your browser does not support speech recognition).");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(prev => prev + (prev ? ' ' : '') + transcript);
      setHoveredPrompt(null); // Clear hover on voice input
    };
    recognition.start();
  };

  // Image Input
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSend = () => {
    // Use effective text (hovered or actual) if user clicks send directly
    const effectiveText = hoveredPrompt || text;
    if (effectiveText.trim() || imagePreview) {
      const base64Data = imagePreview ? imagePreview.split(',')[1] : undefined;
      onAnalyze(effectiveText, base64Data);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Idea interaction handlers
  const handleIdeaHover = (prompt: string) => {
    setHoveredPrompt(prompt);
  };

  const handleIdeaLeave = () => {
    setHoveredPrompt(null);
  };

  const handleIdeaClick = (prompt: string) => {
    setText(prompt);
    setHoveredPrompt(null);
  };

  // Determine what to show in textarea
  const displayValue = hoveredPrompt !== null ? hoveredPrompt : text;
  const isPreviewing = hoveredPrompt !== null;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Input Area */}
      <div className="relative group bg-[#0c0c0c] border border-white/10 rounded-[2rem] transition-all shadow-2xl shadow-indigo-500/5 hover:shadow-indigo-500/10 hover:border-white/20 overflow-hidden max-w-4xl mx-auto z-20">
        
        {/* Image Preview */}
        {imagePreview && (
          <div className="relative w-full h-56 bg-black/50 border-b border-white/10 backdrop-blur-sm">
            <img src={imagePreview} alt="Upload preview" className="w-full h-full object-contain opacity-90" />
            <button 
              onClick={clearImage}
              className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="p-2">
          <textarea
            className={`w-full bg-transparent p-6 text-xl resize-none focus:outline-none min-h-[140px] leading-relaxed font-light transition-colors duration-200
              ${isPreviewing ? 'text-indigo-200/80 italic' : 'text-white placeholder-slate-600'}`}
            placeholder="描述您的梦想应用... (例如：'做一个能识别植物的 App')"
            value={displayValue}
            onChange={(e) => {
              setText(e.target.value);
              setHoveredPrompt(null); // User interaction overrides preview
            }}
            onKeyDown={handleKeyDown}
            disabled={isAnalyzing}
          />
          
          <div className="flex items-center justify-between px-4 pb-4 pt-2">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center w-12 h-12
                  ${imagePreview ? 'text-indigo-400 bg-indigo-500/10 ring-1 ring-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                title="上传参考图片/草图"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />

              <button 
                onClick={toggleListening}
                className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center w-12 h-12
                  ${isListening ? 'text-red-400 bg-red-500/10 animate-pulse ring-1 ring-red-500/30' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                title="语音输入"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
            
            <button 
              onClick={handleSend}
              disabled={(!displayValue.trim() && !imagePreview) || isAnalyzing}
              className={`px-8 py-3 rounded-full flex items-center gap-2 font-medium text-lg transition-all duration-300 shadow-lg
                ${(displayValue.trim() || imagePreview) && !isAnalyzing 
                  ? 'bg-white text-black hover:bg-indigo-50 hover:shadow-indigo-500/20 hover:scale-[1.02]' 
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
            >
              {isAnalyzing ? <><Loader2 className="w-5 h-5 animate-spin" /> 思考中...</> : <><span className="hidden md:inline">开始</span>构建 <Send className="w-5 h-5 ml-1" /></>}
            </button>
          </div>
        </div>
      </div>
      
      {/* Idea Sparks Area - Always Visible unless Analyzing */}
      {!isAnalyzing && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 relative z-10">
           <div className="flex items-center justify-center gap-3 text-slate-500">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-slate-700"></div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2">
                 <Sparkles className="w-3 h-3" /> 灵感火花 (Hover to Preview)
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-slate-700"></div>
              
              <button 
                onClick={refreshSuggestions} 
                className="absolute right-4 md:right-0 text-xs text-slate-500 hover:text-white flex items-center gap-1 transition-colors px-3 py-1 rounded-full hover:bg-white/5"
              >
                <Shuffle className="w-3 h-3" /> 换一批
              </button>
           </div>

           <div className="relative max-w-7xl mx-auto">
             {/* Dense Grid Layout for 40 items */}
             <div className="flex flex-wrap justify-center gap-2">
               {suggestions.map((idea, idx) => (
                  <SuggestionPill 
                    key={idx} 
                    label={idea.label} 
                    onClick={() => handleIdeaClick(idea.prompt)}
                    onMouseEnter={() => handleIdeaHover(idea.prompt)}
                    onMouseLeave={handleIdeaLeave}
                    active={hoveredPrompt === idea.prompt || text === idea.prompt}
                  />
               ))}
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

interface SuggestionPillProps {
  label: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  active?: boolean;
}

const SuggestionPill: React.FC<SuggestionPillProps> = ({ label, onClick, onMouseEnter, onMouseLeave, active }) => (
    <button 
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 backdrop-blur-sm border
          ${active 
            ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)] scale-105 z-10' 
            : 'bg-slate-900/40 border-white/5 text-slate-400 hover:bg-slate-800 hover:border-indigo-500/30 hover:text-indigo-200'}`}
    >
        {label}
    </button>
)

export default InputSection;