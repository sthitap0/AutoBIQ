import React from 'react';
import { Activity, Settings } from 'lucide-react';
import { clsx } from 'clsx';

interface NavigationProps {
  activeTab: 'tasks' | 'config';
  onTabChange: (tab: 'tasks' | 'config') => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onTabChange('tasks')}
        className={clsx(
          'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
          activeTab === 'tasks'
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        )}
      >
        <Activity size={20} />
        <span>Tasks & Execution</span>
      </button>
      <button
        onClick={() => onTabChange('config')}
        className={clsx(
          'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
          activeTab === 'config'
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        )}
      >
        <Settings size={20} />
        <span>Configuration</span>
      </button>
    </div>
  );
}