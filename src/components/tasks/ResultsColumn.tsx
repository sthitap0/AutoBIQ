import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import type { MajorTask, SubTask } from '../../types/task';
import { ExecutionLogs } from './ExecutionLogs';

interface ResultsColumnProps {
  selectedTask: MajorTask | null;
  selectedSubTask: SubTask | null;
}

export function ResultsColumn({ selectedTask, selectedSubTask }: ResultsColumnProps) {
  const handleStatusUpdate = (taskId: string, subtaskId: string, status: 'passed' | 'failed') => {
    console.log(`Updated task ${taskId}, subtask ${subtaskId} to ${status}`);
  };

  const mockLogs = selectedSubTask ? [
    `[${new Date().toISOString()}] Starting execution of "${selectedSubTask.description}"`,
    `[${new Date().toISOString()}] Browser launched`,
    `[${new Date().toISOString()}] Navigating to page`,
    `[${new Date().toISOString()}] Action completed successfully`,
  ] : [];

  return (
    <div className="bg-gradient-to-br from-primary-50 to-white rounded-lg shadow-lg p-4 overflow-auto">
      <h2 className="text-lg font-semibold text-primary-600 mb-4">Results</h2>
      {selectedSubTask ? (
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <img
              src={selectedSubTask.screenshot}
              alt={`Screenshot for ${selectedSubTask.description}`}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleStatusUpdate(selectedTask!.id, selectedSubTask.id, 'passed')}
                className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
              >
                <CheckCircle size={20} />
                <span>Pass</span>
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedTask!.id, selectedSubTask.id, 'failed')}
                className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
              >
                <XCircle size={20} />
                <span>Fail</span>
              </button>
            </div>
          </div>
          <ExecutionLogs logs={mockLogs} />
        </div>
      ) : (
        <p className="text-gray-500">Select a sub task to view results</p>
      )}
    </div>
  );
}