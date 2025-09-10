import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { File, Users, MessageCircle } from 'lucide-react';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    files: boolean;
    people: boolean;
    chats: boolean;
  };
  onSettingChange: (setting: keyof SettingsMenuProps['settings'], value: boolean) => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingChange,
}) => {
  const settingsOptions = [
    {
      key: 'files' as const,
      label: 'Files',
      icon: File,
    },
    {
      key: 'people' as const,
      label: 'People',
      icon: Users,
    },
    {
      key: 'chats' as const,
      label: 'Chats',
      icon: MessageCircle,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 right-0 z-20 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4"
          >
            <h3 className="text-gray-800 font-medium mb-4">Filter Results</h3>
            <div className="space-y-3">
              {settingsOptions.map(({ key, label, icon: Icon }) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-800 text-sm">{label}</span>
                  </div>
                  <ToggleSwitch
                    checked={settings[key]}
                    onChange={(checked) => onSettingChange(key, checked)}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
        checked ? 'bg-gray-600' : 'bg-gray-300'
      }`}
    >
      <motion.div
        className="h-4 w-4 bg-white rounded-full shadow transform"
        animate={{ x: checked ? 16 : 2 }}
        transition={{ duration: 0.2 }}
      />
    </button>
  );
};

export default SettingsMenu;
