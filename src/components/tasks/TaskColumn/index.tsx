import React, { useState } from 'react';
import { Edit, Plus, Tag, CheckSquare, Play } from 'lucide-react';
import { clsx } from 'clsx';
import type { MajorTask } from '../../../types/task';
import type { Label } from '../../../types/label';
import { AddTaskModal } from '../AddTaskModal';
import { LabelManager } from '../labels/LabelManager';
import { LabelGroup } from '../labels/LabelGroup';
import { LabelFilter } from '../labels/LabelFilter';
import { TaskEditModal } from '../TaskEditModal/TaskEditModal';
import { ExecutionModal } from '../ExecutionModal';

interface TaskColumnProps {
  tasks: MajorTask[];
  labels: Label[];
  selectedTask: MajorTask | null;
  selectedLabelIds: string[];
  onSelectTask: (task: MajorTask) => void;
  onAddTask: (baseWebsite: string, taskTitle: string, testData?: string, labelIds?: string[]) => void;
  onCreateLabel: (label: Omit<Label, 'id'>) => void;
  onDeleteLabel: (labelId: string) => void;
  onToggleTaskLabel: (taskId: string, labelId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<MajorTask>) => void;
  onLabelFilterChange: (labelIds: string[]) => void;
}

export function TaskColumn({
  tasks,
  labels,
  selectedTask,
  selectedLabelIds,
  onSelectTask,
  onAddTask,
  onCreateLabel,
  onDeleteLabel,
  onToggleTaskLabel,
  onUpdateTask,
  onLabelFilterChange
}: TaskColumnProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLabelManager, setShowLabelManager] = useState(false);
  const [editingTask, setEditingTask] = useState<MajorTask | null>(null);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [showExecutionModal, setShowExecutionModal] = useState(false);

  const filteredTasks = selectedLabelIds.length > 0
    ? tasks.filter(task =>
        selectedLabelIds.some(labelId =>
          //@ts-ignore
          labels.find(label => label.id === labelId)?.testCases?.some(tc => tc.id === task.id)
        )
      )
    : tasks;

  const handleSelectAll = () => {
    if (selectedTaskIds.length === filteredTasks.length) {
      setSelectedTaskIds([]);
    } else {
      setSelectedTaskIds(filteredTasks.map(task => task.id));
    }
  };

  const handleTaskSelect = (taskId: string) => {
    setSelectedTaskIds(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleLabelSelect = (labelId: string) => {
    onLabelFilterChange(
      selectedLabelIds.includes(labelId)
        ? selectedLabelIds.filter(id => id !== labelId)
        : [...selectedLabelIds, labelId]
    );
    
    const labelTasks = labels.find(l => l.id === labelId)?.testCases || [];
    setSelectedTaskIds(prev => [...new Set([...prev, ...labelTasks])]);
  };

  const handleExecute = (buildVersion: string, groupLabel: string, scheduledTime?: string) => {
    console.log('Executing tasks:', {
      selectedTasks: selectedTaskIds,
      buildVersion,
      groupLabel,
      scheduledTime
    });
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 to-white rounded-lg shadow-lg p-4 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-primary-600">Test Cases</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowExecutionModal(true)}
            disabled={selectedTaskIds.length === 0}
            className={clsx(
              "p-1.5 text-white rounded-lg",
              selectedTaskIds.length > 0
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-300 cursor-not-allowed"
            )}
          >
            <Play size={20} />
          </button>
          <button
            onClick={() => setShowLabelManager(!showLabelManager)}
            className="p-1.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            <Tag size={20} />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-1.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {showLabelManager && (
        <div className="mb-4">
          <LabelManager
            labels={labels}
            onCreateLabel={onCreateLabel}
            onDeleteLabel={onDeleteLabel}
          />
        </div>
      )}

      <div className="mb-4">
        <LabelFilter
          labels={labels}
          selectedLabels={selectedLabelIds}
          onLabelToggle={handleLabelSelect}
        />
      </div>

      <div className="mb-4">
        <button
          onClick={handleSelectAll}
          className="flex items-center gap-2 px-3 py-1.5 bg-primary-500 text-white rounded-md hover:bg-primary-600"
        >
          <CheckSquare size={16} />
          {selectedTaskIds.length === filteredTasks.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <div
          key={task.id}
          className={clsx(
            "p-3 rounded-lg transition-colors cursor-pointer", // Added cursor-pointer
            selectedTask?.id === task.id
              ? "bg-primary-100 border-2 border-primary-500"
              : "bg-white hover:bg-primary-50 border-2 border-transparent"
          )}
          onClick={(e) => {
            // Don't trigger if clicking checkbox or edit button
            if (
              !(e.target as HTMLElement).closest('input[type="checkbox"]') &&
              !(e.target as HTMLElement).closest('button')
            ) {
              onSelectTask(task);
            }
          }}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3 flex-1">
              <input
                type="checkbox"
                checked={selectedTaskIds.includes(task.id)}
                onChange={(e) => {
                  e.stopPropagation(); // Prevent triggering parent onClick
                  handleTaskSelect(task.id);
                }}
                className="mt-1.5 h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
              />
              {/* Remove onClick from this div since parent handles it */}
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-secondary-500 mt-1">{task.baseWebsite}</p>
                <LabelGroup
                  labels={labels}
                  taskId={task.id}
                  onToggleLabel={onToggleTaskLabel}
                />
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering parent onClick
                setEditingTask(task);
              }}
              className="p-1 text-secondary-500 hover:text-secondary-700 rounded"
            >
              <Edit size={16} />
            </button>
          </div>
        </div>
        ))}
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={onAddTask}
        labels={labels}
      />

      {editingTask && (
        <TaskEditModal
          task={editingTask}
          labels={labels}
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          onSave={onUpdateTask}
          onToggleLabel={onToggleTaskLabel}
        />
      )}

      <ExecutionModal
        isOpen={showExecutionModal}
        onClose={() => setShowExecutionModal(false)}
        selectedTaskIds={selectedTaskIds}
        tasks={tasks}
        labels={labels}
        onExecute={handleExecute}
      />
    </div>
  );
}