import React from 'react';
import { X } from 'lucide-react';
import { Label, labelColors } from '../../../types/label';

interface LabelBadgeProps {
  label: Label;
  onRemove?: () => void;
}

export function LabelBadge({ label, onRemove }: LabelBadgeProps) {
  const color = labelColors.find(c => c.id === label.color) || labelColors[0];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color.bg} ${color.text} ${color.border} border`}>
      {label.name}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:text-opacity-75"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
}