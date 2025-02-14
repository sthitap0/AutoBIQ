import React from 'react';
import { Upload } from 'lucide-react';

interface TaskDataEditorProps {
  data: string;
  onDataChange: (data: string) => void;
}

export function TaskDataEditor({ data, onDataChange }: TaskDataEditorProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      onDataChange(e.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-secondary-600">
        Test Data
      </label>
      <div className="space-y-4">
        <textarea
          value={data}
          onChange={(e) => onDataChange(e.target.value)}
          className="w-full h-32 px-3 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
          placeholder="Enter JSON or CSV test data"
        />
        <div className="relative">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".json,.csv"
            className="hidden"
            id="test-data-file"
          />
          <label
            htmlFor="test-data-file"
            className="inline-flex items-center px-4 py-2 border border-secondary-300 rounded-md shadow-sm text-sm font-medium text-secondary-700 bg-white hover:bg-secondary-50 cursor-pointer"
          >
            <Upload size={16} className="mr-2" />
            Upload Data File
          </label>
        </div>
      </div>
    </div>
  );
}