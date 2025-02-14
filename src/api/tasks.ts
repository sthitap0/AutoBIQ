
import axios from 'axios';
import type { MajorTask } from '../types/task';
import { useAuth } from '@clerk/clerk-react';

interface CreateTaskParams {
  baseWebsite: string;
  title: string;
  testData?: string;
  labelIds?: string[];
}

export async function createTask(taskData: CreateTaskParams): Promise<MajorTask> {
  const { getToken, userId, orgId } = useAuth();
  const token = await getToken();
  const response = await axios.post('/tasks', taskData, {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Token for secure communication
        'X-User-ID': userId,
        'X-Organization-ID': orgId,
    },
  });
  return response.data;
}

export async function importTaskFromExternal(source: string, id: string): Promise<MajorTask> {
  const response = await axios.get(`/external/tasks/${source}/${id}`, {
    headers: {
      Authorization: 'Bearer <your_token>',
    },
  });
  return response.data;
}
