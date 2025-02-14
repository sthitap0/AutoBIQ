import React, { useState } from 'react';
import { X, Calendar, Clock, Globe, Tag } from 'lucide-react';
import type { MajorTask } from '../../types/task';
import type { Label } from '../../types/label';

interface ExecutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTaskIds: string[];
  tasks: MajorTask[];
  labels: Label[];
  onExecute: (buildVersion: string, groupLabel: string, scheduledTime?: string) => void;
}

export function ExecutionModal({ isOpen, onClose, selectedTaskIds, tasks, labels, onExecute }: ExecutionModalProps) {
  const [buildVersion, setBuildVersion] = useState('');
  const [groupLabel, setGroupLabel] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');

  const selectedTasks = tasks.filter(task => selectedTaskIds.includes(task.id));

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExecute(
      buildVersion,
      groupLabel,
      isScheduled ? scheduledTime : undefined
    );

    if (isScheduled) {
      const scheduledDate = new Date(scheduledTime);
      const formattedDate = scheduledDate.toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
      
      alert(`Tests scheduled successfully!\n\nBuild Version: ${buildVersion}\nGroup Label: ${groupLabel}\nScheduled for: ${formattedDate}\nNumber of Tests: ${selectedTasks.length}`);
    }
    
    onClose();
  };

  const getTaskLabels = (taskId: string) => {
    return labels.filter(label => label.testCases.includes(taskId));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Execute Tests
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Build Version
              </label>
              <input
                type="text"
                required
                value={buildVersion}
                onChange={(e) => setBuildVersion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., v1.0.1, 2.0, release-22"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group Label
              </label>
              <input
                type="text"
                required
                value={groupLabel}
                onChange={(e) => setGroupLabel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., sprint-1, regression, smoke"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Selected Tests ({selectedTasks.length})
              </label>
              <span className="text-xs text-gray-500">
                Estimated total steps: {selectedTasks.reduce((sum, task) => sum + task.subtasks.length, 0)}
              </span>
            </div>
            <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-200">
              {selectedTasks.map(task => (
                <div key={task.id} className="p-3 bg-white hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Globe size={14} />
                        <span>{task.baseWebsite}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {task.subtasks.length} steps
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {getTaskLabels(task.id).map(label => (
                        <span
                          key={label.id}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          <Tag size={12} className="mr-1" />
                          {label.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="schedule"
              checked={isScheduled}
              onChange={(e) => setIsScheduled(e.target.checked)}
              className="h-4 w-4 text-primary-600 rounded border-gray-300"
            />
            <label htmlFor="schedule" className="text-sm text-gray-700">
              Schedule for later
            </label>
          </div>

          {isScheduled && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Schedule Time
              </label>
              <div className="relative">
                <Calendar size={20} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="datetime-local"
                  required
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              {isScheduled ? 'Schedule Execution' : 'Run Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}