import React from 'react';
import { GithubIcon, Cloud } from 'lucide-react';

interface ExternalSourceFormProps {
  selectedSource: string;
  onSourceSelect: (source: string) => void;
  onQueryChange: (query: string) => void;
}

export function ExternalSourceForm({
  selectedSource,
  onSourceSelect,
  onQueryChange,
}: ExternalSourceFormProps) {
  const sources = [
    { id: 'jira', name: 'Jira', icon: GithubIcon }, // Using GithubIcon as a temporary replacement
    { id: 'salesforce', name: 'Salesforce', icon: Cloud },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {sources.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSourceSelect(id)}
            className={`p-3 rounded-lg border-2 flex items-center space-x-2 transition-colors ${
              selectedSource === id
                ? 'border-primary-500 bg-primary-50 text-primary-600'
                : 'border-secondary-200 hover:border-primary-300'
            }`}
          >
            <Icon size={18} />
            <span>{name}</span>
          </button>
        ))}
      </div>
      {selectedSource && (
        <div>
          <label className="block text-sm font-medium text-secondary-600 mb-1">
            Search {selectedSource === 'jira' ? 'JIRA Issues' : 'Salesforce Tasks'}
          </label>
          <input
            type="text"
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            placeholder={`Search ${selectedSource === 'jira' ? 'by issue key or title' : 'by task name'}`}
          />
        </div>
      )}
    </div>
  );
}