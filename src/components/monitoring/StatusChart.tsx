import React from 'react';

interface StatusData {
  passed: number;
  failed: number;
  pending: number;
}

interface StatusChartProps {
  data: StatusData;
}

export function StatusChart({ data }: StatusChartProps) {
  const total = data.passed + data.failed + data.pending;
  const passedPercent = (data.passed / total) * 100;
  const failedPercent = (data.failed / total) * 100;
  const pendingPercent = (data.pending / total) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Test Execution Status</h3>
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-green-500"
          style={{ width: `${passedPercent}%` }}
        />
        <div 
          className="absolute h-full bg-red-500"
          style={{ left: `${passedPercent}%`, width: `${failedPercent}%` }}
        />
        <div 
          className="absolute h-full bg-yellow-500"
          style={{ left: `${passedPercent + failedPercent}%`, width: `${pendingPercent}%` }}
        />
      </div>
      <div className="mt-4 flex justify-between text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
          <span>Passed ({data.passed})</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
          <span>Failed ({data.failed})</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
          <span>Pending ({data.pending})</span>
        </div>
      </div>
    </div>
  );
}