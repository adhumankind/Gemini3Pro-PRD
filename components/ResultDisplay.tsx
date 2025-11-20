import React from 'react';
import { GeneratedSpec } from '../types';
import { Copy, Check, ArrowLeft, Code2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ResultDisplayProps {
  spec: GeneratedSpec;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ spec, onReset }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    // Reconstruct the full prompt text for copying
    const fullText = `Role: Application Architect\nProject: ${spec.appNameCN} (${spec.appNameEN})\n\n${spec.content}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-700 space-y-8">
      
      {/* Header Area */}
      <div className="space-y-6">
        {/* Navigation */}
        <button 
          onClick={onReset}
          className="text-slate-500 hover:text-white flex items-center gap-1 text-sm mb-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> 返回孵化器 (Back)
        </button>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
              {spec.appNameCN}
            </h2>
            <p className="text-indigo-400 font-mono text-sm tracking-widest uppercase font-medium">{spec.appNameEN}</p>
          </div>

          <button
            onClick={handleCopy}
            className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all border
              ${copied 
                ? 'bg-green-500/10 text-green-400 border-green-500/50 shadow-[0_0_15px_rgba(74,222,128,0.1)]' 
                : 'bg-slate-800 text-white hover:bg-slate-700 border-slate-700'}`}
          >
            {copied ? <><Check className="w-4 h-4" /> 已复制 (Copied)</> : <><Copy className="w-4 h-4" /> 复制 Prompt</>}
          </button>
        </div>

        {/* Short Description Box - Optimized Format */}
        {spec.shortDescription && (
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-indigo-500/20 p-6 shadow-lg">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 bg-indigo-500/10 rounded-lg flex-shrink-0">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="space-y-2 w-full">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                  Application Brief (应用简述)
                </h3>
                {/* Render Description with Markdown parsing for structured lists */}
                <div className="text-slate-300 text-sm leading-relaxed font-light prose prose-invert prose-ul:my-0 prose-li:my-1 prose-p:my-0 prose-strong:text-white prose-strong:font-semibold max-w-none">
                  <ReactMarkdown>
                    {spec.shortDescription}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="bg-[#050505] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="bg-slate-900/80 backdrop-blur px-6 py-3 border-b border-slate-800 flex items-center justify-between text-slate-400 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span>SYSTEM_PROMPT_GENERATED.md</span>
          </div>
          <span className="text-slate-600">MARKDOWN</span>
        </div>
        
        <div className="p-8 text-slate-300 prose prose-invert prose-headings:text-blue-100 prose-p:text-slate-300 prose-strong:text-white max-w-none font-light">
          <ReactMarkdown components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-slate-800" {...props} />,
            h2: ({node, ...props}) => <div className="mt-10 mb-4 flex items-center gap-3 text-xl font-semibold text-indigo-200"><div className="w-1 h-6 bg-indigo-500 rounded-full"></div><h2 {...props} /></div>,
            h3: ({node, ...props}) => <h3 className="text-lg font-medium text-white mt-6 mb-3" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 my-4 text-slate-300" {...props} />,
            li: ({node, ...props}) => <li className="text-slate-300 pl-1" {...props} />,
            strong: ({node, ...props}) => <strong className="text-indigo-300 font-semibold" {...props} />,
            code: ({node, ...props}) => <code className="bg-slate-900 text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
          }}>
            {spec.content}
          </ReactMarkdown>
        </div>
      </div>

      <div className="text-center text-slate-500 text-sm pb-12">
        GENERATED BY GEMINI 3 PRO · AUTOMATED PRD SYSTEM
      </div>
    </div>
  );
};

export default ResultDisplay;