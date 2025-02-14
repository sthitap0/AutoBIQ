import React from 'react';
import { clsx } from 'clsx';
import type { MajorTask, SubTask } from '../../types/task';
import { TaskDataPreview } from './TaskDataPreview';

interface SubTaskColumnProps {
  selectedTask: MajorTask | null;
  selectedSubTask: SubTask | null;
  onSelectSubTask: (subtask: SubTask) => void;
}

export function SubTaskColumn({ selectedTask, selectedSubTask, onSelectSubTask }: SubTaskColumnProps) {
  return (
    <div className="bg-gradient-to-br from-primary-50 to-white rounded-lg shadow-lg p-4 overflow-auto">
      <h2 className="text-lg font-semibold text-primary-600 mb-4">Sub Tasks</h2>
      {selectedTask ? (
        <>
            {selectedTask.subtasks?.length > 0 ? (
              <div className="space-y-2 mb-6">
                {selectedTask.subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  className={clsx(
                    "p-3 rounded-lg cursor-pointer transition-colors",
                    selectedSubTask?.id === subtask.id
                      ? "bg-primary-100 border-2 border-primary-500"
                      : "bg-white hover:bg-primary-50 border-2 border-transparent"
                  )}
                  onClick={() => onSelectSubTask(subtask)}
                >
                  <p>{subtask.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No sub-tasks available</p>
          )}
          {selectedTask.testData && <TaskDataPreview data={selectedTask.testData} />}
        </>
      ) : (
        <p className="text-gray-500">Select a test case to view sub tasks</p>
      )}
    </div>
  );
}