import React from 'react';

interface Tab {
  id: string;
  label: string;
  count: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            activeTab === tab.id
              ? 'bg-white text-pink-600 shadow-md transform scale-105'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          {tab.label}
          {tab.count > 0 && (
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
              activeTab === tab.id
                ? 'bg-pink-100 text-pink-700'
                : 'bg-gray-200 text-gray-600'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  </div>
);

export default Tabs; 