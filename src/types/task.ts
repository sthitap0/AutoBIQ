export interface SubTask {
  id: string;
  description: string;
  status: 'pending' | 'passed' | 'failed';
  screenshot: string;
}

export interface MajorTask {
  id: string;
  title: string;
  baseWebsite: string;
  subtasks: SubTask[];
  testData?: string; 
}