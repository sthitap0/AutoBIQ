import React from 'react';
import { Activity, Settings, BarChart, History } from 'lucide-react';
import { clsx } from 'clsx';

interface NavigationProps {
  activeTab: 'tasks' | 'config' | 'monitoring' | 'status';
  onTabChange: (tab: 'tasks' | 'config' | 'monitoring' | 'status') => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => onTabChange('tasks')}
        className={clsx(
          'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
          activeTab === 'tasks'
            ? 'bg-primary-500 text-white'
            : 'bg-white text-secondary-600 hover:bg-primary-50'
        )}
      >
        <Activity size={20} />
        <span>Tasks & Execution</span>
      </button>
      <button
        onClick={() => onTabChange('monitoring')}
        className={clsx(
          'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
          activeTab === 'monitoring'
            ? 'bg-primary-500 text-white'
            : 'bg-white text-secondary-600 hover:bg-primary-50'
        )}
      >
        <BarChart size={20} />
        <span>Monitoring</span>
      </button>
      <button
        onClick={() => onTabChange('status')}
        className={clsx(
          'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
          activeTab === 'status'
            ? 'bg-primary-500 text-white'
            : 'bg-white text-secondary-600 hover:bg-primary-50'
        )}
      >
        <History size={20} />
        <span>Status</span>
      </button>
      <button
        onClick={() => onTabChange('config')}
        className={clsx(
          'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
          activeTab === 'config'
            ? 'bg-primary-500 text-white'
            : 'bg-white text-secondary-600 hover:bg-primary-50'
        )}
      >
        <Settings size={20} />
        <span>Configuration</span>
      </button>
    </div>
  );
}