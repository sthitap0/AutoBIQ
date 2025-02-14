import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { MajorTask } from '../../../types/task';
import type { Label } from '../../../types/label';
import { LabelSelector } from '../labels/LabelSelector';
import { TaskDataEditor } from './TaskDataEditor';
import { TaskInfoForm } from './TaskInfoForm';

interface TaskEditModalProps {
  task: MajorTask;
  labels: Label[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskId: string, updates: Partial<MajorTask>) => void;
  onToggleLabel: (taskId: string, labelId: string) => void;
}

export function TaskEditModal({ 
  task, 
  labels, 
  isOpen, 
  onClose,
  onSave,
  onToggleLabel 
}: TaskEditModalProps) {
  const [title, setTitle] = useState(task.title);
  const [baseWebsite, setBaseWebsite] = useState(task.baseWebsite);
  const [testData, setTestData] = useState('');

  if (!isOpen) return null;

  const selectedLabels = labels
    .filter(label => label.testCases.includes(task.id))
    .map(label => label.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(task.id, {
      title,
      baseWebsite,
      testData
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-secondary-600">
            Edit Test Case
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TaskInfoForm
            title={title}
            baseWebsite={baseWebsite}
            onTitleChange={setTitle}
            onBaseWebsiteChange={setBaseWebsite}
          />

          <LabelSelector
            labels={labels}
            selectedLabels={selectedLabels}
            onLabelToggle={(labelId) => onToggleLabel(task.id, labelId)}
          />

          <TaskDataEditor
            data={testData}
            onDataChange={setTestData}
          />

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-secondary-600 hover:text-secondary-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}