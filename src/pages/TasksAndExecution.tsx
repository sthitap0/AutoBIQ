import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TaskList } from '../components/tasks/TaskList';
import type { MajorTask } from '../types/task';
import type { Label } from '../types/label';
import { useAuth } from '@clerk/clerk-react';
// Set Axios default base URL
axios.defaults.baseURL = 'http://localhost:3000/tasks';

export default function TasksAndExecution() {
  const [tasks, setTasks] = useState<MajorTask[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>([]);
  const { getToken, userId, orgId } = useAuth();
  
  console.log(userId, orgId);

  // Fetch labels and tasks on component mount
  useEffect(() => {
    const fetchLabelsAndTasks = async () => {
      try {
        if (!userId || !orgId) {
          console.error('User ID or Organization ID is missing');
          return;
        }

        // Get session token from Clerk
        const token = await getToken();
        console.log("token:", token);
        // Set headers with Content-Type, userId, organizationId, and token
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Token for secure communication
          'X-User-ID': userId,
          'X-Organization-ID': orgId,
        };

        // Fetch labels and tasks with headers
        const labelsResponse = await axios.get('/labels', { headers });
        const tasksResponse = await axios.get('/tasks', { headers });

        setLabels(labelsResponse.data);
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLabelsAndTasks();
  }, [userId, orgId, getToken]);

  const handleAddTask = async (
    baseWebsite: string,
    taskTitle: string,
    testData?: string,
    labelIds?: string[]
  ) => {
    try {
      const token = await getToken();
  
      // Make the API call directly here
      const response = await axios.post(
        '/tasks',
        { baseWebsite, title: taskTitle, testData, labelIds },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'X-User-ID': userId,
            'X-Organization-ID': orgId,
          },
        }
      );
  
      const newTask = response.data;
  
      // Update the tasks state
      setTasks((prevTasks) => [...prevTasks, newTask]);
  
      // Update the labels state if necessary
      if (labelIds?.length) {
        setLabels((prevLabels) =>
          prevLabels.map((label) => ({
            ...label,
            tasks: labelIds.includes(label.id)
              ? [...label.testCases, newTask.id]
              : label.testCases,
          }))
        );
      }
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleCreateLabel = async (labelData: Omit<Label, 'id'>) => {
    try {
      const response = await axios.post('/labels', labelData);
      const newLabel = response.data;

      setLabels((prev) => [
        ...prev,
        {
          ...newLabel,
          testCases: [],
        },
      ]);
    } catch (error) {
      console.error('Failed to create label:', error);
    }
  };

  const handleDeleteLabel = async (labelId: string) => {
    try {
      await axios.delete(`/labels/${labelId}`);
      setLabels((prev) => prev.filter((label) => label.id !== labelId));
      setSelectedLabelIds((prev) => prev.filter((id) => id !== labelId));
    } catch (error) {
      console.error('Failed to delete label:', error);
    }
  };

  const handleToggleTaskLabel = (taskId: string, labelId: string) => {
    setLabels((prevLabels) =>
      prevLabels.map((label) => {
        if (label.id !== labelId) return label;
        return {
          ...label,
          tasks: label.testCases.includes(taskId)
            ? label.testCases.filter((id) => id !== taskId)
            : [...label.testCases, taskId],
        };
      })
    );
  };

  const handleUpdateTask = async (taskId: string, updates: Partial<MajorTask>) => {
    try {
      // Make the API call directly within the component
      const token = await getToken();
      const response = await axios.post(`/tasks/${taskId}`, updates, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-User-ID': userId,
          'X-Organization-ID': orgId,
        },
      });
  
      const updatedTask = response.data;
  
      // Update state with the new task
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task))
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };
  

  return (
    <TaskList
      tasks={tasks}
      labels={labels}
      onAddTask={handleAddTask}
      onCreateLabel={handleCreateLabel}
      onDeleteLabel={handleDeleteLabel}
      onToggleTaskLabel={handleToggleTaskLabel}
      onUpdateTask={handleUpdateTask}
      selectedLabelIds={selectedLabelIds}
      onLabelFilterChange={setSelectedLabelIds}
    />
  );
}
