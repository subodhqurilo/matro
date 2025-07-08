'use client';

import { cn } from '@/lib/utils';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  counts: {
    received: number;
    accepted: number;
    sent: number;
    deleted: number;
  };
}

export default function TabNavigation({ activeTab, onTabChange, counts }: TabNavigationProps) {
  const tabs = [
    { id: 'received', label: 'Received', count: counts.received },
    { id: 'accepted', label: 'Accepted', count: counts.accepted },
    { id: 'sent', label: 'Sent', count: counts.sent },
    { id: 'deleted', label: 'Deleted', count: counts.deleted },
  ];

  return (
    <div className="w-full border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
      <div className="flex justify-center">
        <div className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'py-4 px-2 text-sm font-medium border-b-2 transition-all duration-200 hover:text-pink-600',
                activeTab === tab.id
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300'
              )}
            >
              {tab.label}
              {tab.count > 0 && (
                <span
                  className={cn(
                    'ml-2 px-2 py-1 text-xs rounded-full',
                    activeTab === tab.id ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}