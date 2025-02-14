import { Execution, ExecutionStatus } from '../types/execution';

export const mockExecutions: Execution[] = [
  {
    id: '1',
    buildNumber: 1001,
    taskName: 'User Login Flow',
    userId: 'john.doe',
    status: ExecutionStatus.PASSED,
    duration: 45,
    executedAt: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    buildNumber: 1001,
    taskName: 'Product Search and Filters',
    userId: 'john.doe',
    status: ExecutionStatus.RUNNING,
    duration: null,
    executedAt: '2024-03-15T10:31:00Z'
  },
  {
    id: '3',
    buildNumber: 1001,
    taskName: 'Checkout Process',
    userId: 'john.doe',
    status: ExecutionStatus.SUBMITTED,
    duration: null,
    executedAt: '2024-03-15T10:31:00Z'
  },
  {
    id: '4',
    buildNumber: 1002,
    taskName: 'User Registration',
    userId: 'alice.johnson',
    status: ExecutionStatus.PASSED,
    duration: 55,
    executedAt: '2024-03-15T13:30:00Z'
  },
  {
    id: '5',
    buildNumber: 1002,
    taskName: 'Password Reset Flow',
    userId: 'alice.johnson',
    status: ExecutionStatus.FAILED,
    duration: 30,
    executedAt: '2024-03-15T13:31:00Z'
  },
  {
    id: '6',
    buildNumber: 1003,
    taskName: 'User Login Flow',
    userId: 'jane.smith',
    status: ExecutionStatus.RUNNING,
    duration: null,
    executedAt: '2024-03-15T15:20:00Z'
  },
  {
    id: '7',
    buildNumber: 1003,
    taskName: 'Product Search and Filters',
    userId: 'jane.smith',
    status: ExecutionStatus.SUBMITTED,
    duration: null,
    executedAt: '2024-03-15T15:20:00Z'
  }
];