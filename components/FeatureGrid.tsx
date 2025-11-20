import React from 'react';
import { AI_FEATURES } from '../constants';
import * as Icons from 'lucide-react';

interface FeatureGridProps {
  activeFeatureIds: string[];
  isSelectionMode: boolean; 
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ activeFeatureIds, isSelectionMode }) => {
  
  if (activeFeatureIds.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
       <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-6 text-center">
        Detected AI Capabilities
      </h3>
      
      <div className="flex flex-wrap justify-center gap-4">
        {AI_FEATURES.filter(f => activeFeatureIds.includes(f.id)).map((feature) => {
          const IconComponent = (Icons as any)[feature.iconName] || Icons.Sparkles;
          
          return (
            <div
              key={feature.id}
              className="flex items-center gap-3 px-5 py-3 bg-slate-900 border border-slate-800 rounded-full text-slate-200 shadow-lg animate-in zoom-in-50 duration-300"
            >
              <IconComponent className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium">{feature.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureGrid;