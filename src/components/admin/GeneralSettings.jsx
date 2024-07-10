import React from 'react';
import { Switch } from '@headlessui/react';

const GeneralSettings = () => {
  const [enableDarkMode, setEnableDarkMode] = React.useState(false);
  const [enableNotifications, setEnableNotifications] = React.useState(true);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">General Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Enable Dark Mode</span>
          <Switch
            checked={enableDarkMode}
            onChange={setEnableDarkMode}
            className={`${
              enableDarkMode ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            <span
              className={`${
                enableDarkMode ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Enable Notifications</span>
          <Switch
            checked={enableNotifications}
            onChange={setEnableNotifications}
            className={`${
              enableNotifications ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            <span
              className={`${
                enableNotifications ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;