import React from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';

interface HeaderProps {
  activeTab: 'tasks' | 'config' | 'monitoring' | 'status';
  onTabChange: (tab: 'tasks' | 'config' | 'monitoring' | 'status') => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <div className="mb-6 space-y-6">
      <div className="flex justify-between items-center">
        <Logo />
      </div>
      <Navigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}