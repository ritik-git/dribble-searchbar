
import React from 'react';
import { motion } from 'framer-motion';
import { File, Users, MessageCircle } from 'lucide-react';
import type { TabType } from './Tabs';


export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: TabType;
  avatar?: string;
}

interface ResultsListProps {
  results: SearchResult[];
  activeTab: TabType;
  isLoading: boolean;
  onLoadMore?: () => void;
}

const ResultsList: React.FC<ResultsListProps> = ({
  results,
  activeTab,
  isLoading,
  onLoadMore,
}) => {
  const getIcon = (type: TabType) => {
    switch (type) {
      case 'files':
        return File;
      case 'people':
        return Users;
      case 'chats':
        return MessageCircle;
      default:
        return File;
    }
  };

  const filteredResults = results.filter(result => {
    if (activeTab === 'all') return true;
    return result.type === activeTab;
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-100 border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-lg animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded animate-pulse" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (filteredResults.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-center">
          <div className="text-gray-500 text-sm mb-2">No results found</div>
          <div className="text-gray-400 text-xs">Try adjusting your search or filters</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {filteredResults.map((result, index) => {
        const Icon = getIcon(result.type);
        return (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-gray-800 font-medium text-sm truncate">
                  {result.title}
                </h4>
                <p className="text-gray-600 text-xs truncate">
                  {result.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
      {onLoadMore && (
        <motion.button
          onClick={onLoadMore}
          className="w-full py-2 text-gray-700 text-sm hover:bg-gray-100 rounded-lg transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Load More
        </motion.button>
      )}
    </div>
  );
};

export default ResultsList;
