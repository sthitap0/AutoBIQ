import React from 'react';

interface ManualEntryFormProps {
  baseWebsite: string;
  taskTitle: string;
  onBaseWebsiteChange: (value: string) => void;
  onTaskTitleChange: (value: string) => void;
}

export function ManualEntryForm({
  baseWebsite,
  taskTitle,
  onBaseWebsiteChange,
  onTaskTitleChange,
}: ManualEntryFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-secondary-600 mb-1">
          Base Website
        </label>
        <input
          type="url"
          required
          value={baseWebsite}
          onChange={(e) => onBaseWebsiteChange(e.target.value)}
          className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          placeholder="https://example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary-600 mb-1">
          Task Title
        </label>
        <input
          type="text"
          required
          value={taskTitle}
          onChange={(e) => onTaskTitleChange(e.target.value)}
          className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          placeholder="Enter task title"
        />
      </div>
    </div>
  );
}