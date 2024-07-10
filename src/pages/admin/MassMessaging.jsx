import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { FaEnvelope, FaSms, FaWhatsapp, FaBell, FaUserFriends, FaCalendarAlt, FaClipboard, FaChartBar, FaPaperPlane, FaSearch } from 'react-icons/fa';

const MassMessagingPage = () => {
  const [message, setMessage] = useState('');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [scheduleDate, setScheduleDate] = useState('');

  const handleSendMessage = () => {
    // Implement send message logic
    console.log('Sending message:', { message, selectedGroups, selectedChannels, scheduleDate });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mass Messaging</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Compose Message</h2>
            <textarea
              className="w-full h-40 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {'{FirstName}'}
              </button>
              <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {'{LastName}'}
              </button>
              <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {'{Class}'}
              </button>
              <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {'{StudentID}'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Select Recipients</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Students', 'Parents', 'Teachers', 'Admin Staff', 'Support Staff'].map((group) => (
                <label key={group} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                    checked={selectedGroups.includes(group)}
                    onChange={() => {
                      setSelectedGroups(selectedGroups.includes(group)
                        ? selectedGroups.filter(g => g !== group)
                        : [...selectedGroups, group]
                      );
                    }}
                  />
                  <span>{group}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Communication Channels</h2>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'Email', icon: <FaEnvelope /> },
                { name: 'SMS', icon: <FaSms /> },
                { name: 'WhatsApp', icon: <FaWhatsapp /> },
                { name: 'In-App', icon: <FaBell /> },
              ].map((channel) => (
                <button
                  key={channel.name}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    selectedChannels.includes(channel.name)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => {
                    setSelectedChannels(selectedChannels.includes(channel.name)
                      ? selectedChannels.filter(c => c !== channel.name)
                      : [...selectedChannels, channel.name]
                    );
                  }}
                >
                  {channel.icon}
                  <span>{channel.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Schedule (Optional)</h2>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
            />
          </div>

          <button
            onClick={handleSendMessage}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
          >
            <FaPaperPlane className="mr-2" /> Send Message
          </button>
        </div>

        <div className="lg:col-span-1">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
              <Tab
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                  ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
                }
              >
                Templates
              </Tab>
              <Tab
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                  ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
                }
              >
                History
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Message Templates</h2>
                  <ul className="space-y-2">
                    {['Event Reminder', 'Fee Payment', 'Exam Schedule', 'Holiday Announcement'].map((template) => (
                      <li key={template} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md">
                        <span>{template}</span>
                        <button className="text-blue-500 hover:text-blue-700">
                          <FaClipboard />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Message History</h2>
                  <ul className="space-y-2">
                    {['Exam Results Announcement', 'Parent-Teacher Meeting', 'Sports Day Invitation', 'School Reopening Notice'].map((msg) => (
                      <li key={msg} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md">
                        <span>{msg}</span>
                        <span className="text-sm text-gray-500">Sent 2d ago</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Messages Sent (This Month)</span>
                <span className="font-bold">1,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Rate</span>
                <span className="font-bold text-green-500">98.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Open Rate</span>
                <span className="font-bold text-blue-500">75.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MassMessagingPage;