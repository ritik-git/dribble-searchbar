import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchInput from './SearchInput';
import Tabs, { type TabType } from './Tabs';
import SettingsMenu from './SettingsMenu';
import ResultsList, { type SearchResult } from './ResultsList';
import GlassLoader from './GlassLoader';

// Mock data for demonstration
const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'Project Design System',
    description: 'UI components and design tokens',
    type: 'files',
  },
  {
    id: '2',
    title: 'Sarah Johnson',
    description: 'Product Designer',
    type: 'people',
  },
  {
    id: '3',
    title: 'Team Standup',
    description: 'Daily sync meeting',
    type: 'chats',
  },
  {
    id: '4',
    title: 'User Research Report',
    description: 'Q4 insights and findings',
    type: 'files',
  },
  {
    id: '5',
    title: 'Mike Chen',
    description: 'Frontend Developer',
    type: 'people',
  },
  {
    id: '6',
    title: 'Design Review',
    description: 'Weekly design critique',
    type: 'chats',
  },
];

const SearchDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [settings, setSettings] = useState({
    files: true,
    people: true,
    chats: true,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Handle search
  useEffect(() => {
    if (debouncedSearch) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filtered = mockResults.filter(result => {
          const matchesSearch = result.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                               result.description.toLowerCase().includes(debouncedSearch.toLowerCase());
          const matchesSettings = result.type === 'all' || settings[result.type as keyof typeof settings];
          return matchesSearch && matchesSettings;
        });
        setResults(filtered);
        setIsLoading(false);
      }, 800);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [debouncedSearch, settings]);

  // Handle tab switching when current tab gets disabled
  useEffect(() => {
    if (activeTab !== 'all' && !settings[activeTab as keyof typeof settings]) {
      setActiveTab('all');
    }
  }, [settings, activeTab]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleClear = useCallback(() => {
    setSearchValue('');
    setDebouncedSearch('');
    setResults([]);
  }, []);

  const handleFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  const handleSettingsClick = useCallback(() => {
    setIsSettingsOpen(!isSettingsOpen);
  }, [isSettingsOpen]);

  const handleSettingChange = useCallback((setting: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  }, []);

  const handleLoadMore = useCallback(() => {
    // Simulate loading more results
    setIsLoading(true);
    setTimeout(() => {
      setResults(prev => [...prev, ...mockResults.slice(0, 3)]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      <SearchInput
        value={searchValue}
        onChange={handleSearchChange}
        onClear={handleClear}
        onFocus={handleFocus}
        isOpen={isOpen}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg overflow-hidden"
          >
            <div className="p-4">
              <Tabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onSettingsClick={handleSettingsClick}
                settings={settings}
              />
            </div>

            <div className="px-4 pb-4 min-h-[200px]">
              {isLoading ? (
                <GlassLoader count={3} />
              ) : (
                <ResultsList
                  results={results}
                  activeTab={activeTab}
                  isLoading={isLoading}
                  onLoadMore={results.length > 0 ? handleLoadMore : undefined}
                />
              )}
            </div>

            <SettingsMenu
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              settings={settings}
              onSettingChange={handleSettingChange}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchDropdown;
