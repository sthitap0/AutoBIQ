import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import type { MajorTask, SubTask } from '../types/task';
import { clsx } from 'clsx';

interface TaskListProps {
  tasks: MajorTask[];
}

export function TaskList({ tasks }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<MajorTask | null>(null);
  const [selectedSubTask, setSelectedSubTask] = useState<SubTask | null>(null);

  const handleStatusUpdate = (taskId: string, subtaskId: string, status: 'passed' | 'failed') => {
    console.log(`Updated task ${taskId}, subtask ${subtaskId} to ${status}`);
  };

  return (
    <div className="grid grid-cols-3 gap-6 h-full">
      {/* Major Tasks Column */}
      <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg shadow-lg p-4 overflow-auto">
        <h2 className="text-lg font-semibold text-indigo-900 mb-4">Major Tasks</h2>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={clsx(
                "p-3 rounded-lg cursor-pointer transition-colors",
                selectedTask?.id === task.id
                  ? "bg-indigo-100 border-2 border-indigo-500"
                  : "bg-white hover:bg-indigo-50 border-2 border-transparent"
              )}
              onClick={() => {
                setSelectedTask(task);
                setSelectedSubTask(null);
              }}
            >
              <h3 className="font-medium">{task.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Sub Tasks Column */}
      <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg shadow-lg p-4 overflow-auto">
        <h2 className="text-lg font-semibold text-purple-900 mb-4">Sub Tasks</h2>
        {selectedTask ? (
          <div className="space-y-2">
            {selectedTask.subTasks.map((subtask) => (
              <div
                key={subtask.id}
                className={clsx(
                  "p-3 rounded-lg cursor-pointer transition-colors",
                  selectedSubTask?.id === subtask.id
                    ? "bg-purple-100 border-2 border-purple-500"
                    : "bg-white hover:bg-purple-50 border-2 border-transparent"
                )}
                onClick={() => setSelectedSubTask(subtask)}
              >
                <p>{subtask.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Select a major task to view sub tasks</p>
        )}
      </div>

      {/* Results Column */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg p-4 overflow-auto">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">Results</h2>
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
          </div>
        ) : (
          <p className="text-gray-500">Select a sub task to view results</p>
        )}
      </div>
    </div>
  );
}