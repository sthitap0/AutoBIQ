import React from 'react';

interface ExecutionLogsProps {
  logs: string[];
}

export function ExecutionLogs({ logs }: ExecutionLogsProps) {
  if (!logs.length) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-accent-600 mb-2">Execution Logs</h3>
      <div className="bg-secondary-600 rounded-lg p-4 overflow-auto max-h-48">
        <pre className="text-sm font-mono text-white">
          {logs.map((log, index) => (
            <div key={index} className="py-0.5">
              {log}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}