import React, { useState } from 'react';
import { TaskSourceSelector } from './TaskSourceSelector';
import { ManualEntryForm } from './ManualEntryForm';
import { ExternalSourceForm } from './ExternalSourceForm';
import { DataFileUpload } from './DataFileUpload';
import { LabelSelector } from '../labels/LabelSelector';
import type { Label } from '../../../types/label';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (baseWebsite: string, taskTitle: string, testData?: string, labelIds?: string[]) => void;
  labels: Label[];
}

export function AddTaskModal({ isOpen, onClose, onAdd, labels }: AddTaskModalProps) {
  const [source, setSource] = useState<'manual' | 'external'>('manual');
  const [baseWebsite, setBaseWebsite] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [testData, setTestData] = useState<string>('');
  const [fileType, setFileType] = useState<'json' | 'csv'>('json');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(baseWebsite, taskTitle, testData, selectedLabels);
    setBaseWebsite('');
    setTaskTitle('');
    setSelectedLabels([]);
    setTestData('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold text-secondary-600 mb-4">
          Add New Test Case
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TaskSourceSelector source={source} onSourceChange={setSource} />

          {source === 'manual' ? (
            <ManualEntryForm
              baseWebsite={baseWebsite}
              taskTitle={taskTitle}
              onBaseWebsiteChange={setBaseWebsite}
              onTaskTitleChange={setTaskTitle}
            />
          ) : (
            <ExternalSourceForm
              selectedSource=""
              onSourceSelect={() => {}}
              onQueryChange={() => {}}
            />
          )}

          <DataFileUpload
            onDataLoaded={setTestData}
            onFileTypeChange={setFileType}
          />

          <LabelSelector
            labels={labels}
            selectedLabels={selectedLabels}
            onLabelToggle={(labelId) => {
              setSelectedLabels(prev =>
                prev.includes(labelId)
                  ? prev.filter(id => id !== labelId)
                  : [...prev, labelId]
              );
            }}
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
              Add Test Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}