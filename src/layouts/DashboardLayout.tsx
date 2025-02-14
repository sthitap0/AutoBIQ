import React from 'react';
import { Outlet } from 'react-router-dom';
import { Logo } from '../components/layout/Logo';
import { DashboardNavigation } from '../components/layout/DashboardNavigation';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6 space-y-6">
          <div className="flex justify-between items-center">
            <Logo />
          </div>
          <DashboardNavigation />
        </div>
        <div className="h-[calc(100vh-12rem)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}