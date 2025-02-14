import React from 'react';

interface TaskInfoFormProps {
  title: string;
  baseWebsite: string;
  onTitleChange: (value: string) => void;
  onBaseWebsiteChange: (value: string) => void;
}

export function TaskInfoForm({
  title,
  baseWebsite,
  onTitleChange,
  onBaseWebsiteChange,
}: TaskInfoFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-secondary-600 mb-1">
          Task Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary-600 mb-1">
          Base Website
        </label>
        <input
          type="url"
          value={baseWebsite}
          onChange={(e) => onBaseWebsiteChange(e.target.value)}
          className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
    </div>
  );
}