// Fix: Added React import to resolve React.ReactNode namespace error
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface CaseStudy {
  id: number;
  client: string;
  category: string;
  result: string;
  image: string;
  growth: number;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface StrategyResponse {
  overview: string;
  steps: string[];
  tips: string[];
}
