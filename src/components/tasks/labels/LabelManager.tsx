import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Label, labelColors } from '../../../types/label';
import { LabelBadge } from './LabelBadge';

interface LabelManagerProps {
  labels: Label[];
  onCreateLabel: (label: Omit<Label, 'id'>) => void;
  onDeleteLabel: (labelId: string) => void;
}

export function LabelManager({ labels, onCreateLabel, onDeleteLabel }: LabelManagerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newLabelName, setNewLabelName] = useState('');
  const [selectedColor, setSelectedColor] = useState(labelColors[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLabelName.trim()) {
      onCreateLabel({
        name: newLabelName.trim(),
        color: selectedColor,
        testCases: []
      });
      setNewLabelName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {labels.map(label => (
          <LabelBadge
            key={label.id}
            label={label}
            onRemove={() => onDeleteLabel(label.id)}
          />
        ))}
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          <Plus size={12} className="mr-1" />
          Add Label
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleSubmit} className="space-y-3 p-3 bg-gray-50 rounded-lg">
          <input
            type="text"
            value={newLabelName}
            onChange={(e) => setNewLabelName(e.target.value)}
            placeholder="Label name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <div className="flex gap-2">
            {labelColors.map(color => (
              <button
                key={color.id}
                type="button"
                onClick={() => setSelectedColor(color.id)}
                className={`w-6 h-6 rounded-full ${color.bg} ${
                  selectedColor === color.id ? `ring-2 ring-offset-2 ${color.border}` : ''
                }`}
              />
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              Create
            </button>
          </div>
        </form>
      )}
    </div>
  );
}