import { useState } from 'react';
import { OrganizationProfile } from '@clerk/clerk-react';
import { Users, Settings, BarChart } from 'lucide-react';
import { Tabs } from '../components/ui/Tabs'; 
import { OrganizationList } from '@clerk/clerk-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('members');

  const tabs = [
    {
      key: 'members',
      label: 'Members',
      icon: <Users />,
      content: (
        <div className="bg-white rounded-lg shadow">
          <OrganizationProfile />
        </div>
      ),
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: <BarChart />,
      content: (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Panel</h1>
        <div className="w-full max-w-2xl mx-auto">
          <OrganizationList 
            hidePersonal={true}
            afterSelectOrganizationUrl="/member"
            afterCreateOrganizationUrl="/member"
          />
        </div>
      </div>
    </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}