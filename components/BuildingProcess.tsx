import React, { useState, useEffect } from 'react';
import { Loader2, BrainCircuit, PenTool, Layout, Code, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { icon: Loader2, text: "正在初始化 Gemini 引擎... (Initializing Engine)" },
  { icon: BrainCircuit, text: "深度解析用户需求... (Analyzing Intent)" },
  { icon: Layout, text: "构建系统架构与技术选型... (Designing Architecture)" },
  { icon: PenTool, text: "设计视觉规范与 UI... (Drafting Specs)" },
  { icon: Code, text: "生成最终开发文档... (Finalizing Document)" }
];

const LOGS = [
  "正在加载上下文窗口 (Loading context)...",
  "分配计算资源 Token...",
  "检索 AI 能力模块组件...",
  "优化 System Prompt 结构...",
  "定义 Tailwind CSS 配色方案...",
  "构建 React 组件树结构...",
  "起草 TypeScript 接口定义...",
  "验证 ARIA 无障碍标准...",
  "编译最终 Markdown 输出...",
  "注入设计系统参数...",
  "分析核心业务逻辑...",
  "生成状态管理策略 (Zustand)...",
  "设计响应式布局断点...",
  "配置 Gemini API 错误处理..."
];

const BuildingProcess: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Step progression
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1200); // Slightly faster visual progression

    // Log simulation
    const logInterval = setInterval(() => {
      const randomLog = LOGS[Math.floor(Math.random() * LOGS.length)];
      const timestamp = new Date().toLocaleTimeString('zh-CN', { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setLogs(prev => [`[${timestamp}] ${randomLog}`, ...prev].slice(0, 6));
    }, 600);

    return () => {
      clearInterval(stepInterval);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center py-12 space-y-8 animate-in fade-in duration-500">
      
      {/* Main Spinner Area */}
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 rounded-full animate-pulse-soft"></div>
        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mb-6" />
          <div className="space-y-4 w-full min-w-[300px]">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 transition-all duration-500 
                    ${isActive ? 'opacity-100 scale-105 translate-x-2' : 'opacity-40'}`}
                >
                  <div className={`p-2 rounded-full ${isActive ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-600'}`}>
                    {isCompleted ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />}
                  </div>
                  <span className={`font-mono text-sm ${isActive ? 'text-indigo-200 font-medium' : 'text-slate-500'}`}>
                    {step.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Terminal Logs */}
      <div className="w-full bg-black/50 border border-slate-800 rounded-xl p-4 font-mono text-xs h-32 overflow-hidden relative">
        <div className="absolute top-2 right-2 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        </div>
        <div className="text-slate-500 mb-2 border-b border-slate-800 pb-1">SYSTEM_KERNEL_LOGS</div>
        <div className="flex flex-col-reverse">
          {logs.map((log, i) => (
            <div key={i} className={`py-0.5 ${i === 0 ? 'text-green-400' : 'text-slate-600'}`}>
              {i === 0 && <span className="mr-2">➜</span>}
              {log}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BuildingProcess;