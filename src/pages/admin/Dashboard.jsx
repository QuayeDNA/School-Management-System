import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave, FaBook, FaCalendarAlt, FaBus, FaClipboardList, FaCog } from 'react-icons/fa';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';


const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabItems = [
    { name: 'Overview', icon: <FaClipboardList /> },
    { name: 'Students', icon: <FaUserGraduate /> },
    { name: 'Staff', icon: <FaChalkboardTeacher /> },
    { name: 'Finances', icon: <FaMoneyBillWave /> },
    { name: 'Academics', icon: <FaBook /> },
    { name: 'Calendar', icon: <FaCalendarAlt /> },
    { name: 'Transportation', icon: <FaBus /> },
    { name: 'Settings', icon: <FaCog /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">School Management Dashboard</h1>

        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-8">
            {tabItems.map((item) => (
              <Tab
                key={item.name}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                  ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                  ${
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  }`
                }
              >
                <div className="flex items-center justify-center">
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </div>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel><OverviewPanel /></Tab.Panel>
            <Tab.Panel><StudentsPanel /></Tab.Panel>
            <Tab.Panel><StaffPanel /></Tab.Panel>
            <Tab.Panel><FinancesPanel /></Tab.Panel>
            <Tab.Panel><AcademicsPanel /></Tab.Panel>
            <Tab.Panel><CalendarPanel /></Tab.Panel>
            <Tab.Panel><TransportationPanel /></Tab.Panel>
            <Tab.Panel><SettingsPanel /></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

const OverviewPanel = () => {
  // Mock data for the charts
  const studentData = [
    { name: 'Jan', count: 400 },
    { name: 'Feb', count: 430 },
    { name: 'Mar', count: 448 },
    { name: 'Apr', count: 470 },
    { name: 'May', count: 540 },
    { name: 'Jun', count: 580 },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 20000 },
    { name: 'Feb', revenue: 25000 },
    { name: 'Mar', revenue: 27000 },
    { name: 'Apr', revenue: 30000 },
    { name: 'May', revenue: 35000 },
    { name: 'Jun', revenue: 40000 },
  ];

  const staffData = [
    { name: 'Administration', value: 30 },
    { name: 'Teaching', value: 90 },
    { name: 'Support', value: 30 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<FaUserGraduate />} title="Total Students" value="2,500" />
        <StatCard icon={<FaChalkboardTeacher />} title="Total Staff" value="150" />
        <StatCard icon={<FaMoneyBillWave />} title="Monthly Revenue" value="$50,000" />
        <StatCard icon={<FaBook />} title="Courses Offered" value="75" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Student Enrollment Trend">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Revenue Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#FF6384" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Staff Distribution">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={staffData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
              {staffData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickActionCard title="Add New Student" description="Register a new student in the system" />
        <QuickActionCard title="Manage Staff" description="View and edit staff information" />
        <QuickActionCard title="Generate Reports" description="Create custom reports and analytics" />
      </div>
    </div>
  );
};

const StudentsPanel = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4">Student Management</h2>
    {/* Add student management components here */}
  </div>
);

const StaffPanel = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4">Staff Management</h2>
    {/* Add staff management components here */}
  </div>
);

const FinancesPanel = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4">Financial Management</h2>
    {/* Add financial management components here */}
  </div>
);

const AcademicsPanel = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4">Academic Management</h2>
    {/* Add academic management components here */}
  </div>
);

const CalendarPanel = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4">School Calendar</h2>
    {/* Add calendar components here */}
  </div>
);

const TransportationPanel = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4">Transportation Management</h2>
    {/* Add transportation management components here */}
  </div>
);

const SettingsPanel = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4">System Settings</h2>
    {/* Add settings components here */}
  </div>
);

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center hover:shadow-lg transition-shadow duration-200">
    <div className="text-3xl text-indigo-500 mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const QuickActionCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors">
      Go to Action
    </button>
  </div>
);

StatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

QuickActionCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Dashboard;