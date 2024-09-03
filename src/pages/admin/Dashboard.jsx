import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaBook,
  FaCalendarAlt,
  FaBell,
  FaUserCheck,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Transition } from "@headlessui/react";
import PropTypes from "prop-types";

const Dashboard = () => {
  const [showMessage, setShowMessage] = useState(true);

  // Mock data for the charts (same as before)
  const studentData = [
    { name: "Jan", count: 400 },
    { name: "Feb", count: 430 },
    { name: "Mar", count: 448 },
    { name: "Apr", count: 470 },
    { name: "May", count: 540 },
    { name: "Jun", count: 580 },
  ];

  const revenueData = [
    { name: "Jan", revenue: 20000 },
    { name: "Feb", revenue: 25000 },
    { name: "Mar", revenue: 27000 },
    { name: "Apr", revenue: 30000 },
    { name: "May", revenue: 35000 },
    { name: "Jun", revenue: 40000 },
  ];

  const staffData = [
    { name: "Administration", value: 30 },
    { name: "Teaching", value: 90 },
    { name: "Support", value: 30 },
  ];

  const overallPerformanceData = [
    { name: "Jan", performance: 75 },
    { name: "Feb", performance: 78 },
    { name: "Mar", performance: 82 },
    { name: "Apr", performance: 80 },
    { name: "May", performance: 85 },
    { name: "Jun", performance: 88 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const quickActions = [
    {
      title: "Add New Student",
      description: "Register a new student in the system",
      icon: <FaUserGraduate />,
      link: "/students/new",
      image: "https://picsum.photos/id/1005/400/200",
    },
    {
      title: "Manage Staff",
      description: "View and edit staff information",
      icon: <FaChalkboardTeacher />,
      link: "/staff",
      image: "https://picsum.photos/id/1006/400/200",
    },
    {
      title: "Financial Reports",
      description: "Generate financial reports and analytics",
      icon: <FaMoneyBillWave />,
      link: "/finance/reports",
      image: "https://picsum.photos/id/1006/400/200",
    },
    {
      title: "Course Management",
      description: "Add, edit, or remove courses",
      icon: <FaBook />,
      link: "/courses",
      image: "https://picsum.photos/id/1008/400/200",
    },
    {
      title: "Schedule Classes",
      description: "Manage class schedules and rooms",
      icon: <FaCalendarAlt />,
      link: "/schedule",
      image: "https://picsum.photos/id/1009/400/200",
    },
    {
      title: "Student Attendance",
      description: "Track and manage student attendance",
      icon: <FaUserCheck />,
      link: "/attendance",
      image: "https://picsum.photos/id/1010/400/200",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Transition
          show={showMessage}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 relative">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaBell className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Welcome back!</p>
                <p className="text-sm mt-1">
                  You have 3 new notifications. Check them out in your inbox.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowMessage(false)}
              className="absolute top-0 right-0 p-4">
              <span className="text-blue-500 hover:text-blue-600">&times;</span>
            </button>
          </div>
        </Transition>

        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FaUserGraduate />}
            title="Total Students"
            value="2,500"
            bgColor="bg-gradient-to-br from-blue-400 to-blue-600"
            link="/students"
          />
          <StatCard
            icon={<FaChalkboardTeacher />}
            title="Total Staff"
            value="150"
            bgColor="bg-gradient-to-br from-green-400 to-green-600"
            link="/staff"
          />
          <StatCard
            icon={<FaMoneyBillWave />}
            title="Monthly Revenue"
            value="₵50,000"
            bgColor="bg-gradient-to-br from-yellow-400 to-yellow-600"
            link="/finance"
          />
          <StatCard
            icon={<FaBook />}
            title="Courses Offered"
            value="75"
            bgColor="bg-gradient-to-br from-purple-400 to-purple-600"
            link="/courses"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartCard
            title="Student Enrollment Trend"
            chart={
              <BarChart data={studentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#4F46E5" />
              </BarChart>
            }
          />
          <ChartCard
            title="Revenue Trend"
            chart={
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#FF6384" />
              </LineChart>
            }
          />
        </div>

        {/* Staff Distribution Pie Chart */}
        <div className="mb-8">
          <ChartCard
            title="Staff Distribution"
            chart={
              <PieChart>
                <Pie
                  data={staffData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8">
                  {staffData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            }
          />
        </div>

        {/* Overall Performance Chart */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Overall Performance</h2>
          <div className="bg-white shadow rounded-lg p-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={overallPerformanceData}>
                <defs>
                  <linearGradient
                    id="colorPerformance"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="performance"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorPerformance)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick actions */}
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <QuickActionCard key={index} {...action} />
          ))}
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ icon, title, value, bgColor, link }) => (
  <Link
    to={link}
    className={`${bgColor} text-white p-6 rounded-lg shadow-md flex items-center justify-between hover:shadow-lg transition-shadow duration-200`}>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
    <div className="text-4xl opacity-80">{icon}</div>
  </Link>
);

StatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const ChartCard = ({ title, chart }) => (
  <div className="bg-white shadow rounded-lg overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="p-6">
      <ResponsiveContainer width="100%" height={300}>
        {chart}
      </ResponsiveContainer>
    </div>
  </div>
);

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  chart: PropTypes.node.isRequired,
};

const QuickActionCard = ({ title, description, icon, link, image }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
    <img src={image} alt={title} className="w-full h-30 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center mb-4">
        <div className="text-xl text-blue-500 mr-3">{icon}</div>
        <div className="text-xl font-semibold">{title}</div>
      </div>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <div className="m-auto ">
        <Link
          to={link}
          className="inline-block text-xs bg-teal-600 text-white p-3 rounded-md hover:bg-blue-600 transition-colors duration-200">
          Go to {title}
        </Link>
      </div>
    </div>
  </div>
);

QuickActionCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Dashboard;
