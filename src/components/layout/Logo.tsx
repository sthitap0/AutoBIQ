import React from 'react';
import { Target } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Target size={32} className="text-pink-500" />
      <div>
        <h1 className="text-2xl font-bold text-gray-900">HopVision</h1>
        <p className="text-sm text-pink-500">Future Here</p>
      </div>
    </div>
  );
}