import React from 'react';
import { AppConfig } from '../types';
import { STYLE_OPTIONS, APP_MODES } from '../constants';
import { Palette, Box } from 'lucide-react';

interface ConfigPanelProps {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  onGenerate: () => void;
  isGenerating: boolean;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, setConfig, onGenerate, isGenerating }) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 animate-in zoom-in-95 duration-500">
      
      {/* Section 1: Mode Selection */}
      <div className="space-y-6">
        <h2 className="text-xl text-white font-light flex items-center gap-2">
          <Box className="w-5 h-5 text-indigo-400" /> 第一步：选择应用模式 (Select Mode)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {APP_MODES.map((mode) => {
            const Icon = mode.icon;
            const isSelected = config.appMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setConfig(prev => ({ ...prev, appMode: mode.id as any }))}
                className={`relative group p-6 rounded-2xl border text-left transition-all duration-300 h-full
                  ${isSelected 
                    ? `bg-slate-900 border-white/20 ring-1 ring-white/10 shadow-xl` 
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-600 hover:bg-slate-900'}`}
              >
                <div className={`mb-4 p-3 rounded-xl inline-block bg-slate-950 border border-slate-800 ${mode.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-medium mb-2 ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                  {mode.label}
                </h3>
                <p className="text-sm text-slate-500 group-hover:text-slate-400 leading-relaxed">
                  {mode.desc}
                </p>
                
                {isSelected && (
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Section 2: Style Selection */}
      <div className="space-y-6">
        <h2 className="text-xl text-white font-light flex items-center gap-2">
          <Palette className="w-5 h-5 text-indigo-400" /> 第二步：定义视觉风格 (Visual Style)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STYLE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setConfig(prev => ({ ...prev, style: option.id as any }))}
              className={`p-4 rounded-xl border text-left transition-all
                ${config.style === option.id 
                  ? 'bg-white text-black border-white' 
                  : 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'}`}
            >
              <div className="font-medium text-sm">{option.label}</div>
              <div className={`text-[10px] mt-1 ${config.style === option.id ? 'text-slate-600' : 'opacity-50'}`}>{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-8 flex justify-center">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="px-16 py-5 bg-white hover:bg-indigo-50 text-black font-bold text-lg rounded-full shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
        >
          {isGenerating ? '正在撰写文档...' : '生成开发规范 (Generate Spec)'}
        </button>
      </div>
    </div>
  );
};

export default ConfigPanel;