import React from 'react';
import { Database } from 'lucide-react';

interface TaskDataPreviewProps {
  data: string;
}

export function TaskDataPreview({ data }: TaskDataPreviewProps) {
  const isJson = data.trim().startsWith('{') || data.trim().startsWith('[');

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Database size={16} className="text-primary-600" />
        <h3 className="text-sm font-medium text-primary-600">Test Data</h3>
      </div>
      
      {isJson ? (
        <div className="bg-white rounded-lg border border-primary-100 p-3 overflow-auto max-h-64">
          <pre className="text-xs font-mono text-secondary-700">
            {JSON.stringify(JSON.parse(data), null, 2)}
          </pre>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-primary-100 overflow-auto max-h-64">
          <table className="min-w-full divide-y divide-primary-100">
            <thead className="bg-primary-50">
              <tr>
                {data.split('\n')[0]?.split(',').map((header, i) => (
                  <th 
                    key={i} 
                    className="px-3 py-2 text-left text-xs font-medium text-primary-600"
                  >
                    {header.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-100">
              {data.split('\n').slice(1).map((row, i) => (
                <tr key={i}>
                  {row.split(',').map((cell, j) => (
                    <td 
                      key={j} 
                      className="px-3 py-2 text-xs text-secondary-600 whitespace-nowrap"
                    >
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}