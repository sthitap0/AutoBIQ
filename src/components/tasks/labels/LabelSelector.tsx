import React from 'react';
import { Label, labelColors } from '../../../types/label';
import { LabelBadge } from './LabelBadge';

interface LabelSelectorProps {
  labels: Label[];
  selectedLabels: string[];
  onLabelToggle: (labelId: string) => void;
}

export function LabelSelector({ labels, selectedLabels, onLabelToggle }: LabelSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-secondary-600">
        Labels
      </label>
      <div className="flex flex-wrap gap-2">
        {labels.map(label => (
          <button
            key={label.id}
            type="button"
            onClick={() => onLabelToggle(label.id)}
            className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedLabels.includes(label.id)
                ? `${labelColors.find(c => c.id === label.color)?.bg} ${labelColors.find(c => c.id === label.color)?.text}`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label.name}
          </button>
        ))}
      </div>
    </div>
  );
}