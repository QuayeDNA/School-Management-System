import { useState } from 'react';
import { FaBell, FaEnvelope, FaUser } from 'react-icons/fa';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleDropdown = (setter) => {
    setter(prev => !prev);
  };

  return (
    <header className="bg-white shadow-sm w-full">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Dashboard App</h3>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button onClick={() => toggleDropdown(setShowNotifications)} className="text-gray-500 hover:text-gray-700">
              <FaBell size={20} />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Notification 1</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Notification 2</a>
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={() => toggleDropdown(setShowMessages)} className="text-gray-500 hover:text-gray-700">
              <FaEnvelope size={20} />
            </button>
            {showMessages && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Message 1</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Message 2</a>
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={() => toggleDropdown(setShowProfile)} className="text-gray-500 hover:text-gray-700">
              <FaUser size={20} />
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
