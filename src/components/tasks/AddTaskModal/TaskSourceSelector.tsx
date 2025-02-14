import React from 'react';
import { Database } from 'lucide-react';

interface TaskSourceSelectorProps {
  source: 'manual' | 'external';
  onSourceChange: (source: 'manual' | 'external') => void;
}

export function TaskSourceSelector({ source, onSourceChange }: TaskSourceSelectorProps) {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onSourceChange('manual')}
        className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 border-2 transition-colors ${
          source === 'manual'
            ? 'border-primary-500 bg-primary-50 text-primary-600'
            : 'border-secondary-200 hover:border-primary-300'
        }`}
      >
        <span>Manual Entry</span>
      </button>
      <button
        onClick={() => onSourceChange('external')}
        className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 border-2 transition-colors ${
          source === 'external'
            ? 'border-primary-500 bg-primary-50 text-primary-600'
            : 'border-secondary-200 hover:border-primary-300'
        }`}
      >
        <Database size={18} />
        <span>Import</span>
      </button>
    </div>
  );
}