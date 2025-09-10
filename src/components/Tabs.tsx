import React from 'react';
import { Settings } from 'lucide-react';

export type TabType = 'all' | 'files' | 'people' | 'chats';

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onSettingsClick: () => void;
  settings: {
    files: boolean;
    people: boolean;
    chats: boolean;
  };
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange, onSettingsClick, settings }) => {
  const allTabs: { id: TabType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'files', label: 'Files' },
    { id: 'people', label: 'People' },
    { id: 'chats', label: 'Chats' },
  ];

  // Filter out disabled tabs (except 'all' which is always shown)
  const tabs = allTabs.filter(tab => 
    tab.id === 'all' || settings[tab.id as keyof typeof settings]
  );

  return (
    <div className="flex items-center justify-between border-b border-gray-200">
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative py-3 px-1 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? 'text-gray-800'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 rounded-full" />
            )}
          </button>
        ))}
      </div>
      <button
        onClick={onSettingsClick}
        className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 rounded-lg hover:bg-gray-100"
        aria-label="Settings"
      >
        <Settings className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Tabs;
