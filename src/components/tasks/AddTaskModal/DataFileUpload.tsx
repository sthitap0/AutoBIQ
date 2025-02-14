import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface DataFileUploadProps {
  onDataLoaded: (data: string) => void;
  onFileTypeChange: (type: 'json' | 'csv') => void;
}

export function DataFileUpload({ onDataLoaded, onFileTypeChange }: DataFileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      onDataLoaded(e.target?.result as string);
    };
    reader.readAsText(file);
    onFileTypeChange(file.name.endsWith('.json') ? 'json' : 'csv');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-secondary-600">
        Test Case Data
      </label>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json,.csv"
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 transition-colors flex items-center justify-center space-x-2 text-gray-600 hover:text-primary-500"
      >
        <Upload size={20} />
        <span>Upload Test Data (JSON or CSV)</span>
      </button>
    </div>
  );
}