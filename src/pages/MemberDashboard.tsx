import React from 'react';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const DashboardLayout = React.lazy(() => import('../layouts/DashboardLayout'));
const TasksAndExecution = React.lazy(() => import('./TasksAndExecution'));
const Monitoring = React.lazy(() => import('./Monitoring'));
const Status = React.lazy(() => import('./Status'));
const Configuration = lazy(() => import('./Configuration'));

export default function MemberDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="tasks" replace />} />
          <Route path="tasks" element={<TasksAndExecution />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="status" element={<Status />} />
          <Route path="config" element={<Configuration />} />
        </Route>
      </Routes>
    </Suspense>
  );
}