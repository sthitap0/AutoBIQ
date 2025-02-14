import React from 'react';

interface DataPreviewProps {
  data: string;
  fileType: 'json' | 'csv';
}

export function DataPreview({ data, fileType }: DataPreviewProps) {
  if (!data) return null;

  if (fileType === 'json') {
    try {
      const jsonData = JSON.parse(data);
      return (
        <pre className="bg-white p-3 rounded-lg text-sm font-mono overflow-auto max-h-48 border border-gray-200">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      );
    } catch {
      return <p className="text-red-500">Invalid JSON data</p>;
    }
  }

  return (
    <div className="overflow-auto max-h-48 bg-white rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {data.split('\n')[0]?.split(',').map((header, i) => (
              <th key={i} className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.split('\n').slice(1, 5).map((row, i) => (
            <tr key={i}>
              {row.split(',').map((cell, j) => (
                <td key={j} className="px-3 py-2 text-sm text-gray-600 bg-white">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}