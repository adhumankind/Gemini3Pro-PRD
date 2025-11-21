import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import InputSection from './components/InputSection';
import FeatureGrid from './components/FeatureGrid';
import ConfigPanel from './components/ConfigPanel';
import ResultDisplay from './components/ResultDisplay';
import BuildingProcess from './components/BuildingProcess';
import { AppStep, AppConfig, GeneratedSpec } from './types';
import { analyzeUserIntent, generateProjectSpec } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('input');
  const [userInput, setUserInput] = useState('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [matchedFeatures, setMatchedFeatures] = useState<string[]>([]);
  
  const [config, setConfig] = useState<AppConfig>({ 
    style: 'minimalist', 
    appMode: 'professional' 
  });
  
  const [result, setResult] = useState<GeneratedSpec | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (input: string, image?: string) => {
    setUserInput(input);
    setImageBase64(image || null);
    setStep('analyzing');
    setError(null);
    
    try {
      const featureIds = await analyzeUserIntent(input, image);
      setMatchedFeatures(featureIds);
      setStep('config');
    } catch (err) {
      console.error(err);
      setError('无法分析意图，请重试 (Could not analyze intent).');
      setStep('input');
    }
  };

  const handleGenerate = async () => {
    setStep('generating');
    try {
      const spec = await generateProjectSpec(userInput, imageBase64, matchedFeatures, config);
      setResult(spec);
      setStep('result');
    } catch (err) {
      console.error(err);
      setError('生成失败，请检查 API Key (Generation failed).');
      setStep('config');
    }
  };

  const handleReset = () => {
    setStep('input');
    setUserInput('');
    setImageBase64(null);
    setMatchedFeatures([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      
      {/* Ambient Background Effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed top-[20%] right-[20%] w-[20%] h-[20%] bg-purple-900/5 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="relative z-50 pt-10 pb-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center">
          <div className="flex flex-col items-center cursor-pointer group" onClick={handleReset}>
            <div className="flex items-center gap-3 mb-1 transition-transform duration-300 group-hover:scale-105">
               <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all">
                 <Bot className="w-6 h-6 text-white" />
               </div>
               <h1 className="font-bold text-2xl tracking-tight text-white">智构<span className="text-indigo-400 font-light">·Gemini 2.0</span></h1>
            </div>
            <p className="text-[10px] text-slate-600 uppercase tracking-[0.4em] group-hover:text-indigo-400 transition-colors">AI Product Incubator</p>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col items-center min-h-[75vh]">
        
        {error && (
          <div className="mb-8 px-6 py-3 bg-red-950/30 border border-red-900/50 text-red-400 rounded-xl text-sm backdrop-blur-sm animate-in slide-in-from-top-2">
            {error}
          </div>
        )}

        {/* State: Input */}
        {step === 'input' || step === 'analyzing' ? (
          <div className="w-full flex flex-col items-center space-y-16 mt-8 md:mt-12">
            <div className="text-center space-y-6 max-w-4xl">
              <h2 className="text-5xl md:text-7xl font-extralight text-white leading-[1.1] tracking-tight">
                从一个想法<br/>
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 animate-pulse-soft">
                  到完美的 PRD
                </span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                Gemini 3 Pro 驱动的 V2.0 孵化器。<br className="hidden md:block"/>
                采用“氛围编码”理念，自动构建 PM + 设计师级开发规范。
              </p>
            </div>
            
            <InputSection onAnalyze={handleAnalyze} isAnalyzing={step === 'analyzing'} />
          </div>
        ) : null}

        {/* State: Config (After analysis) */}
        {step === 'config' && (
          <div className="w-full flex flex-col space-y-10 mt-6">
            <FeatureGrid activeFeatureIds={matchedFeatures} isSelectionMode={true} />
            <ConfigPanel 
              config={config} 
              setConfig={setConfig} 
              onGenerate={handleGenerate}
              isGenerating={false}
            />
          </div>
        )}

        {/* State: Generating Process */}
        {step === 'generating' && (
          <BuildingProcess />
        )}

        {/* State: Result */}
        {step === 'result' && result && (
          <ResultDisplay spec={result} onReset={handleReset} />
        )}

      </main>

      {/* Minimal Footer */}
      <footer className="fixed bottom-6 w-full text-center pointer-events-none z-0">
         <span className="px-4 py-2 rounded-full bg-black/50 border border-white/5 text-[10px] text-slate-600 tracking-widest backdrop-blur-md">
            POWERED BY GEMINI 3 PRO
         </span>
      </footer>
    </div>
  );
};

export default App;