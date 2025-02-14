import React from 'react';
import { Upload } from 'lucide-react';

interface UploadButtonProps {
  onClick: () => void;
}

export function UploadButton({ onClick }: UploadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 transition-colors flex items-center justify-center space-x-2 text-gray-600 hover:text-primary-500 bg-white"
    >
      <Upload size={20} />
      <span>Upload JSON or CSV file</span>
    </button>
  );
}