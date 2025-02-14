import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, Settings, BarChart, History } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { to: 'tasks', icon: Activity, label: 'Tasks & Execution' },
  { to: 'monitoring', icon: BarChart, label: 'Monitoring' },
  { to: 'status', icon: History, label: 'Status' },
  { to: 'config', icon: Settings, label: 'Configuration' },
];

export function DashboardNavigation() {
  return (
    <div className="flex space-x-4">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            clsx(
              'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
              isActive
                ? 'bg-primary-500 text-white'
                : 'bg-white text-secondary-600 hover:bg-primary-50'
            )
          }
        >
          <Icon size={20} />
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  );
}