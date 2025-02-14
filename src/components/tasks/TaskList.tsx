import React, { useState } from 'react';
import { TaskColumn } from './TaskColumn';
import { SubTaskColumn } from './SubTaskColumn';
import { ResultsColumn } from './ResultsColumn';
import type { MajorTask, SubTask } from '../../types/task';
import type { Label } from '../../types/label';

interface TaskListProps {
  tasks: MajorTask[];
  labels: Label[];
  selectedLabelIds: string[];
  onAddTask: (baseWebsite: string, taskTitle: string, testData?: string, labelIds?: string[]) => void;
  onCreateLabel: (label: Omit<Label, 'id'>) => void;
  onDeleteLabel: (labelId: string) => void;
  onToggleTaskLabel: (taskId: string, labelId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<MajorTask>) => void;
  onLabelFilterChange: (labelIds: string[]) => void;
}

export function TaskList({ 
  tasks, 
  labels,
  selectedLabelIds,
  onAddTask,
  onCreateLabel,
  onDeleteLabel,
  onToggleTaskLabel,
  onUpdateTask,
  onLabelFilterChange
}: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<MajorTask | null>(null);
  const [selectedSubTask, setSelectedSubTask] = useState<SubTask | null>(null);

  const handleTaskSelect = (task: MajorTask) => {
    setSelectedTask(task);
    setSelectedSubTask(null);
  };

  return (
    <div className="grid grid-cols-3 gap-6 h-full">
      <TaskColumn 
        tasks={tasks}
        labels={labels}
        selectedTask={selectedTask}
        selectedLabelIds={selectedLabelIds}
        onSelectTask={handleTaskSelect}
        onAddTask={onAddTask}
        onCreateLabel={onCreateLabel}
        onDeleteLabel={onDeleteLabel}
        onToggleTaskLabel={onToggleTaskLabel}
        onUpdateTask={onUpdateTask}
        onLabelFilterChange={onLabelFilterChange}
      />
      <SubTaskColumn 
        selectedTask={selectedTask} 
        selectedSubTask={selectedSubTask}
        onSelectSubTask={setSelectedSubTask}
      />
      <ResultsColumn 
        selectedTask={selectedTask}
        selectedSubTask={selectedSubTask}
      />
    </div>
  );
}