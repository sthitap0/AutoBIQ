import React, { useEffect, useState } from 'react';
import { Clock, PlayCircle, Bug } from 'lucide-react';
import { KPICard } from './KPICard';
import { StatusChart } from './StatusChart';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

const mockData = {
  testRuns: {
    value: 1248,
    trend: 12.5
  },
  timeSaved: {
    value: '324h',
    trend: 8.3
  },
  defects: {
    value: 86,
    trend: -15.2
  },
  status: {
    passed: 856,
    failed: 124,
    pending: 268
  }
};

export function MonitoringDashboard() {
  const [taskExecutionCount, setTaskExecutionCount] = useState(0);
  const [subtasks, setSubtasks] = useState<any>([]);
  const [failedCount, setFailedCount] = useState(0);
  const [passedCount, setPassedCount] = useState(0);
  const [defectsCount, setDefectsCount] = useState(0);

  const { getToken, userId, orgId } = useAuth();
  const [loading, setLoading] = useState(true);

const FetchMonitoringData = async () => {
  const token = await getToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'X-User-ID': userId,
    'X-Organization-ID': orgId,
  };
  try {
    const response = await axios.get('/monitor', { headers });
    setTaskExecutionCount(response.data.taskExecutionCount);
    const nestedSubtasks = response.data.subtasks?.subtasks || [];
    setSubtasks(Array.isArray(nestedSubtasks) ? nestedSubtasks : []);
    setFailedCount(response.data.countFailed);
    setPassedCount(response.data.countPassed);
    setDefectsCount(response.data.defectsCount)
    console.log(
      response.data.taskExecutionCount,
      response.data.subtasks,
      response.data.countFailed,
      response.data.countPassed
    );
  } catch (err) {
    console.error('Failed to fetch /monitor data:', err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  FetchMonitoringData();
}, []);

if (loading) {
  return <div>Loading...</div>;
}

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <KPICard
          title="Total Test Runs"
          value={taskExecutionCount}
          trend={mockData.testRuns.trend}
          icon={PlayCircle}
        />
        <KPICard
          title="Time Saved"
          value={Math.ceil(taskExecutionCount*.13)}
          trend={mockData.timeSaved.trend}
          icon={Clock}
        />
        <KPICard
          title="Defects Found"
          value={defectsCount}
          trend={mockData.defects.trend}
          icon={Bug}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <StatusChart data={{ passed: passedCount, failed: failedCount, pending: taskExecutionCount-passedCount-failedCount }} />
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Subtask Status</h3>
          <ul>
            {subtasks?.map((task: any, index:any) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span className="text-gray-600">{task.title}</span>
                <span
                  className={`text-sm font-semibold ${
                    task.status === 'PASSED' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
  );
}