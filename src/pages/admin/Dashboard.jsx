import { FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave, FaBook, FaCalendarAlt } from 'react-icons/fa';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const Dashboard = () => {

  // Mock data for the charts (same as before)
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
    <div className="min-h-screen bg-gray-100">
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<FaUserGraduate />} title="Total Students" value="2,500" bgColor="bg-blue-500" />
          <StatCard icon={<FaChalkboardTeacher />} title="Total Staff" value="150" bgColor="bg-green-500" />
          <StatCard icon={<FaMoneyBillWave />} title="Monthly Revenue" value="$50,000" bgColor="bg-yellow-500" />
          <StatCard icon={<FaBook />} title="Courses Offered" value="75" bgColor="bg-purple-500" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartCard title="Student Enrollment Trend" chart={
            <BarChart data={studentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4F46E5" />
            </BarChart>
          } />
          <ChartCard title="Revenue Trend" chart={
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#FF6384" />
            </LineChart>
          } />
        </div>

        {/* Staff Distribution Pie Chart */}
        <div className="mb-8">
          <ChartCard title="Staff Distribution" chart={
            <PieChart>
              <Pie data={staffData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                {staffData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          } />
        </div>

        {/* Quick actions */}
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <QuickActionCard title="Add New Student" description="Register a new student in the system" icon={<FaUserGraduate />} />
          <QuickActionCard title="Manage Staff" description="View and edit staff information" icon={<FaChalkboardTeacher />} />
          <QuickActionCard title="Financial Reports" description="Generate financial reports and analytics" icon={<FaMoneyBillWave />} />
          <QuickActionCard title="Course Management" description="Add, edit, or remove courses" icon={<FaBook />} />
          <QuickActionCard title="Schedule Classes" description="Manage class schedules and rooms" icon={<FaCalendarAlt />} />
          <QuickActionCard title="Student Attendance" description="Track and manage student attendance" icon={<FaUserGraduate />} />
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ icon, title, value, bgColor }) => (
  <div className={`${bgColor} text-white p-6 rounded-lg shadow-md flex items-center justify-between hover:shadow-lg transition-shadow duration-200`}>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
    <div className="text-4xl opacity-80">{icon}</div>
  </div>
);

const ChartCard = ({ title, chart }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <ResponsiveContainer width="100%" height={300}>
      {chart}
    </ResponsiveContainer>
  </div>
);

const QuickActionCard = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
    <div className="text-3xl text-blue-500 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
      Go to Action
    </button>
  </div>
);

StatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  chart: PropTypes.node.isRequired,
};

QuickActionCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default Dashboard;