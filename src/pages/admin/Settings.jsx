import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { FiUser, FiBook, FiCalendar, FiMail, FiBell, FiShield } from 'react-icons/fi';
import GeneralSettings from '../../components/admin/GeneralSettings';
import AcademicSettings from '../../components/admin/AcademicSettings';
import NotificationSettings from '../../components/admin/NotificationSettings';
import SecuritySettings from '../../components/admin/SecuritySettings';

const Settings = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabs = [
    { name: 'General', icon: FiUser, component: GeneralSettings },
    { name: 'Academic', icon: FiBook, component: AcademicSettings },
    { name: 'Notifications', icon: FiBell, component: NotificationSettings },
    { name: 'Security', icon: FiShield, component: SecuritySettings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <div className="sm:flex">
              <Tab.List className="sm:w-64 bg-gray-50 p-4 sm:p-6 space-y-2">
                {tabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    className={({ selected }) =>
                      `w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out focus:outline-none ${
                        selected
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <tab.icon
                          className={`w-5 h-5 ${
                            selected ? 'text-indigo-700' : 'text-gray-400'
                          }`}
                        />
                        <span>{tab.name}</span>
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="flex-1 p-4 sm:p-6">
                {tabs.map((tab, idx) => (
                  <Tab.Panel key={idx}>
                    <tab.component />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </div>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};



export default Settings;