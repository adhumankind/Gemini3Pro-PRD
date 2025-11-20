import { LucideIcon } from 'lucide-react';

export interface AIFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'vision' | 'audio' | 'video' | 'logic' | 'data';
}

export type AppMode = 'playful' | 'professional' | 'experimental';

export interface AppConfig {
  style: 'minimalist' | 'cyberpunk' | 'glassmorphism' | 'custom';
  appMode: AppMode;
}

export interface GeneratedSpec {
  appNameCN: string;
  appNameEN: string;
  shortDescription: string;
  content: string;
}

export type AppStep = 'input' | 'analyzing' | 'config' | 'generating' | 'result';