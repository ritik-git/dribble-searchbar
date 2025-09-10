import React from 'react';
import { motion } from 'framer-motion';

interface GlassLoaderProps {
  count?: number;
}

const GlassLoader: React.FC<GlassLoaderProps> = ({ count = 3 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
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
};

export default GlassLoader;
