import React from 'react';
import { Label } from '../../../types/label';
import { LabelBadge } from './LabelBadge';

interface LabelGroupProps {
  labels: Label[];
  taskId: string;
  onToggleLabel: (taskId: string, labelId: string) => void;
}

export function LabelGroup({ labels, taskId, onToggleLabel }: LabelGroupProps) {
  const taskLabels = labels.filter(label => Array.isArray(label.testCases) && label.testCases.includes(taskId));
  
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {taskLabels.map(label => (
        <LabelBadge
          key={label.id}
          label={label}
          onRemove={() => onToggleLabel(taskId, label.id)}
        />
      ))}
    </div>
  );
}
