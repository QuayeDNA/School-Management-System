import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  FaHome,
  FaUsers,
  FaUser,
  FaMoneyBill,
  FaDollarSign,
  FaBookOpen,
  FaEnvelope,
  FaChartBar,
  FaCog,
  FaTruck,
  FaGraduationCap,
  FaSignOutAlt,
  FaBars,
} from 'react-icons/fa';
import PropTypes from 'prop-types';

const Sidebar = ({ expanded, onToggle }) => {
  const { logout } = useAuth();

  const sidebarLinks = [
    { to: "/app/admin/dashboard", icon: FaHome, text: "Dashboard" },
    { to: "/app/admin/students", icon: FaUsers, text: "Student Management" },
    { to: "/app/admin/staff", icon: FaUser, text: "Employee Management" },
    { to: "/app/admin/payroll", icon: FaMoneyBill, text: "Payroll System" },
    { to: "/app/admin/transactions", icon: FaDollarSign, text: "Transactions" },
    { to: "/app/admin/inventory", icon: FaTruck, text: "Sales and Inventory" },
    { to: "/app/admin/library", icon: FaBookOpen, text: "E-Library" },
    { to: "/app/admin/messaging", icon: FaEnvelope, text: "Mass Messaging" },
    { to: "/app/admin/transportation", icon: FaTruck, text: "Transportation" },
    { to: "/app/admin/academics", icon: FaGraduationCap, text: "Academics Management" },
    { to: "/app/admin/reports", icon: FaChartBar, text: "Reports" },
    { to: "/app/admin/settings", icon: FaCog, text: "Settings" },
  ];

  return (
    <div
      className={`bg-gradient-to-b from-blue-600 to-purple-700 text-white h-screen ${
        expanded ? 'w-64' : 'w-20'
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-4">
        <h2 className={`font-bold text-xl ${expanded ? 'block' : 'hidden'}`}>EduManage</h2>
        <button
          onClick={onToggle}
          className="text-white focus:outline-none"
        >
          <FaBars className="w-6 h-6" />
        </button>
      </div>
      <nav className="mt-8 overflow-y-auto h-[calc(100vh-12rem)]">
        <ul className="space-y-2">
          {sidebarLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.to}
                className={`flex items-center px-4 py-2 text-sm hover:bg-blue-500 transition-colors duration-200 ${
                  expanded ? 'justify-start' : 'justify-center'
                }`}
              >
                <link.icon className="w-6 h-6" />
                {expanded && <span className="ml-3">{link.text}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-4">
        <button
          onClick={logout}
          className={`flex items-center text-sm transition-colors duration-200 w-full px-4 py-2 ${
            expanded ? 'justify-start' : 'justify-center'
          }`}
        >
          <FaSignOutAlt className="w-6 h-6" />
          {expanded && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Sidebar;