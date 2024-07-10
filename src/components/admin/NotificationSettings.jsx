import React from 'react';
import { Switch } from '@headlessui/react';

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [smsNotifications, setSmsNotifications] = React.useState(false);
  const [pushNotifications, setPushNotifications] = React.useState(true);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Notification Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Email Notifications</span>
          <Switch
            checked={emailNotifications}
            onChange={setEmailNotifications}
            className={`${
              emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            <span
              className={`${
                emailNotifications ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">SMS Notifications</span>
          <Switch
            checked={smsNotifications}
            onChange={setSmsNotifications}
            className={`${
              smsNotifications ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            <span
              className={`${
                smsNotifications ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Push Notifications</span>
          <Switch
            checked={pushNotifications}
            onChange={setPushNotifications}
            className={`${
              pushNotifications ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            <span
              className={`${
                pushNotifications ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;