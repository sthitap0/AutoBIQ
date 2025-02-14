import React from 'react';
import { Filter } from 'lucide-react';
import { clsx } from 'clsx';
import type { Label } from '../../../types/label';
import { labelColors } from '../../../types/label';

interface LabelFilterProps {
  labels: Label[];
  selectedLabels: string[];
  onLabelToggle: (labelId: string) => void;
}

// Add default color constant
const DEFAULT_COLOR = {
  id: 'default',
  bg: 'bg-gray-100',
  text: 'text-gray-700',
  border: 'border-gray-300'
};

export function LabelFilter({ labels, selectedLabels, onLabelToggle }: LabelFilterProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-secondary-600">
        <Filter size={16} />
        <span>Filter by labels</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {labels.map(label => {
          // Add null check and fallback
          const color = labelColors.find(c => c.id === label.color) ?? DEFAULT_COLOR;
          const isSelected = selectedLabels.includes(label.id);
          
          return (
            <button
              key={label.id}
              onClick={() => onLabelToggle(label.id)}
              className={clsx(
                'px-2 py-1 rounded-full text-xs font-medium transition-colors',
                isSelected
                  ? `${color.bg} ${color.text} ${color.border} border-2`
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300'
              )}
            >
              {label.name}
              <span className="ml-1 text-xs">
                ({label.testCases?.length ?? 0})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}