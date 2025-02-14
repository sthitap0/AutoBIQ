import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

export function StatusDashboard() {
  const [taskExecutions, setTaskExecutions] = useState<any>([]);
  const [expandedBuild, setExpandedBuild] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { getToken, userId, orgId } = useAuth();
  const fetchTaskExecutions = async () => {
    setLoading(true);
    const token = await getToken();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Token for secure communication
      'X-User-ID': userId,
      'X-Organization-ID': orgId,
    };
    try {
      const response = await axios.get('/task-executions', {
        headers,
        params: {
          page: currentPage,
          limit: 10,
          searchQuery,
          status: statusFilter,
        },
      });
      const data = response.data;
      setTaskExecutions(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch task executions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskExecutions();
  }, [currentPage, searchQuery, statusFilter]);

  const toggleBuildExpansion = (buildId: string) => {
    setExpandedBuild((prev) => (prev === buildId ? null : buildId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASSED':
        return 'bg-green-100 text-green-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      case 'RUNNING':
        return 'bg-blue-100 text-blue-800';
      case 'SUBMITTED':
        return 'bg-gray-100 text-gray-800';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search by build number or user ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Statuses</option>
          <option value="PASSED">Passed</option>
          <option value="FAILED">Failed</option>
          <option value="RUNNING">Running</option>
          <option value="SUBMITTED">Submitted</option>
        </select>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="text-center py-6">Loading...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Build Number
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Test Cases
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Duration (s)
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Executed At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {taskExecutions?.map((execution: any) => (
                <React.Fragment key={execution.id}>
                  {/* Main Row */}
                  <tr
                    onClick={() => toggleBuildExpansion(execution.id)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {execution.buildNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {execution.subtasks.length} tasks
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {execution.userId}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          execution.status
                        )}`}
                      >
                        {execution.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {execution.executionTime || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(execution.executedAt).toLocaleString()}
                    </td>
                  </tr>

                  {/* Expanded Row for Subtasks */}
                  {expandedBuild === execution.id && execution.subtasks.length > 0 && (
                    execution?.subtasks?.map((subtask: any) => (
                      <tr key={subtask.id} className="bg-gray-50">
                        <td className="px-6 py-4"></td> {/* Empty Build Column */}
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {subtask.title}
                        </td>
                        <td className="px-6 py-4"></td> {/* Empty User ID Column */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              subtask.status
                            )}`}
                          >
                            {subtask.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {subtask.duration || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(subtask.executedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
