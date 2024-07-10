import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave, FaBook } from 'react-icons/fa';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const Dashboard = () => {
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
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard icon={<FaUserGraduate />} title="Total Students" value="2,500" />
        <StatCard icon={<FaChalkboardTeacher />} title="Total Staff" value="150" />
        <StatCard icon={<FaMoneyBillWave />} title="Monthly Revenue" value="$50,000" />
        <StatCard icon={<FaBook />} title="Courses Offered" value="75" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Student Enrollment Trend</h2>
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
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
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
        </div>
      </div>

      {/* Staff Distribution Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Staff Distribution</h2>
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
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickActionCard title="Add New Student" description="Register a new student in the system" />
        <QuickActionCard title="Manage Staff" description="View and edit staff information" />
        <QuickActionCard title="Generate Reports" description="Create custom reports and analytics" />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center hover:shadow-lg transition-shadow duration-200">
    <div className="text-3xl text-indigo-500 mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
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

QuickActionCard.propTypes = { 
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

StatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default Dashboard;
