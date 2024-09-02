import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaEnvelope, FaUserCircle, FaBars } from "react-icons/fa";
import { Transition } from "@headlessui/react";
import PropTypes from "prop-types";

const Header = ({ onMenuClick }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const DropdownMenu = ({ children }) => (
    <Transition
      show={!!activeDropdown}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95">
      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu">
          {children}
        </div>
      </div>
    </Transition>
  );

  DropdownMenu.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <header className="bg-gradient-to-r from-teal-700 to-green-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="text-white mr-4 focus:outline-none md:hidden">
              <FaBars className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-white">
              I Am Blessed Montessori School
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => toggleDropdown("notifications")}
                className="text-white hover:text-blue-200 focus:outline-none">
                <FaBell className="h-6 w-6" />
              </button>
              {activeDropdown === "notifications" && (
                <DropdownMenu>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Notification 1
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Notification 2
                  </Link>
                </DropdownMenu>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => toggleDropdown("messages")}
                className="text-white hover:text-blue-200 focus:outline-none">
                <FaEnvelope className="h-6 w-6" />
              </button>
              {activeDropdown === "messages" && (
                <DropdownMenu>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Message 1
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Message 2
                  </Link>
                </DropdownMenu>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => toggleDropdown("profile")}
                className="text-white hover:text-blue-200 focus:outline-none">
                <FaUserCircle className="h-6 w-6" />
              </button>
              {activeDropdown === "profile" && (
                <DropdownMenu>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};

export default Header;
