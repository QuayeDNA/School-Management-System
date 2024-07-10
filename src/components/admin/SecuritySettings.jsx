import React from 'react';
import { Switch } from '@headlessui/react';

const SecuritySettings = () => {
  const [twoFactorAuth, setTwoFactorAuth] = React.useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Security Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
          <Switch
            checked={twoFactorAuth}
            onChange={setTwoFactorAuth}
            className={`${
              twoFactorAuth ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            <span
              className={`${
                twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;