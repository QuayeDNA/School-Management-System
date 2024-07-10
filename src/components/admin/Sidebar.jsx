// src/components/admin/Sidebar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaHome, FaUsers, FaUserTie, FaMoneyBillWave, FaSignOutAlt, 
  FaCreditCard, FaBook, FaEnvelope, FaChartBar, FaCog, 
  FaCalculator, FaBoxes, FaBars
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tooltip';

const Sidebar = ({ onToggle, expanded }) => {
  const { logout } = useAuth();

  const sidebarLinks = [
    { to: "/app/admin/dashboard", icon: <FaHome />, text: "Dashboard" },
    { to: "/app/admin/students", icon: <FaUsers />, text: "Student Management" },
    { to: "/app/admin/staff", icon: <FaUserTie />, text: "Employee Management" },
    { to: "/app/admin/payroll", icon: <FaMoneyBillWave />, text: "Payroll System" },
    { to: "/app/admin/payroll", icon: <FaCreditCard />, text: "Payroll Portal" },
    { to: "/app/admin/transactions", icon: <FaMoneyBillWave />, text: "Transactions" },
    { to: "/app/admin/library", icon: <FaBook />, text: "E-Library" },
    { to: "/app/admin/messaging", icon: <FaEnvelope />, text: "Mass Messaging" },
    { to: "/app/admin/reports", icon: <FaChartBar />, text: "Reports" },
    { to: "/app/admin/settings", icon: <FaCog />, text: "Settings" },
    { to: "/app/admin/calculator", icon: <FaCalculator />, text: "Calculator" },
    { to: "/app/admin/inventory", icon: <FaBoxes />, text: "Sales and Inventory" },
  ];

  return (
    <aside className={`h-screen fixed left-0 top-0 bg-gray-800 text-white overflow-y-auto transition-all duration-300 ${expanded ? 'w-64' : 'w-14'}`}>
      <div className="p-4 flex justify-between items-center">
        <h1 className={`text-2xl font-semibold ${expanded ? 'block' : 'hidden'}`}>EduManage</h1>
        <button onClick={onToggle} className="text-white hover:text-gray-300 transition-colors">
          <FaBars />
        </button>
      </div>
      <nav className="mt-8">
        {sidebarLinks.map((link, index) => (
          <SidebarLink key={index} to={link.to} icon={link.icon} text={link.text} expanded={expanded} />
        ))}
      </nav>
      <div className="absolute bottom-0 w-full p-4">
      <button
  onClick={logout}
  className="flex items-center text-white hover:text-gray-300 transition-colors w-full"
  data-tooltip-id="sidebar-tooltip"
  data-tooltip-content="Logout"
  data-tooltip-place="right"
>
  <FaSignOutAlt className="mr-2" />
  <span className={expanded ? 'block' : 'hidden'}>Logout</span>
</button>
      </div>
      <Tooltip 
        id="sidebar-tooltip" 
        place="right" 
        className="z-[1000]"
        positionStrategy="fixed"
        offset={5}
      />
    </aside>
  );
};

const SidebarLink = ({ to, icon, text, expanded }) => (
    <Link
      to={to}
      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
      data-tooltip-id="sidebar-tooltip"
      data-tooltip-content={text}
      data-tooltip-place="right"
    >
      {icon}
      <span className={`ml-2 ${expanded ? 'block' : 'hidden'}`}>{text}</span>
    </Link>
  );

SidebarLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
};

Sidebar.propTypes = {
  onToggle: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
};

export default Sidebar;