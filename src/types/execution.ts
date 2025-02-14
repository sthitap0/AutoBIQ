export enum ExecutionStatus {
  SUBMITTED = 'SUBMITTED',
  RUNNING = 'RUNNING',
  PASSED = 'PASSED',
  FAILED = 'FAILED'
}

export interface Execution {
  id: string;
  buildNumber: number;
  taskName: string;
  userId: string;
  status: ExecutionStatus;
  duration: number | null;
  executedAt: string;
}