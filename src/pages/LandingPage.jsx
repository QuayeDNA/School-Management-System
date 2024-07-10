import { FaGraduationCap, FaUserTie, FaUserCog, FaMoneyCheckAlt, FaUsers, FaBook, FaChartLine, FaCog, FaSms } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-gray-800">EduManage</div>
            <div className="hidden md:flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-500">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-500">Features</a>
              <a href="#" className="text-gray-600 hover:text-blue-500">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-500">Contact</a>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to EduManage
          </h1>
          <p className="text-xl text-gray-600">
            Your all-in-one solution for student and school management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <LoginCard
            link="/students-login"
            title="Student Login"
            icon={<FaGraduationCap className="text-5xl mb-4 text-blue-500" />}
            description="Access your student portal"
            buttonText="Student Login"
          />
          <LoginCard
            link="/staff-login"
            title="Staff Login"
            icon={<FaUserTie className="text-5xl mb-4 text-green-500" />}
            description="Access your staff portal"
            buttonText="Staff Login"
          />
          <LoginCard
            link="/admin-login"
            title="Admin Login"
            icon={<FaUserCog className="text-5xl mb-4 text-purple-500" />}
            description="Access the admin dashboard"
            buttonText="Admin Login"
          />
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Payment Portal"
              icon={<FaMoneyCheckAlt className="text-5xl mb-4 text-yellow-500" />}
              description="Manage school fees and other payments"
            />
            <FeatureCard
              title="Student Management"
              icon={<FaGraduationCap className="text-5xl mb-4 text-blue-500" />}
              description="Manage student information and records"
            />
            <FeatureCard
              title="Employees Management"
              icon={<FaUsers className="text-5xl mb-4 text-green-500" />}
              description="Manage teaching and non-teaching staff"
            />
            <FeatureCard
              title="Payroll System"
              icon={<FaChartLine className="text-5xl mb-4 text-purple-500" />}
              description="Handle payroll and transactions"
            />
            <FeatureCard
              title="Library"
              icon={<FaBook className="text-5xl mb-4 text-red-500" />}
              description="Access the E-library"
            />
            <FeatureCard
              title="Mass Messaging"
              icon={<FaSms className="text-5xl mb-4 text-pink-500" />}
              description="Send SMS, emails, and social media messages"
            />
            <FeatureCard
              title="Reports"
              icon={<FaChartLine className="text-5xl mb-4 text-teal-500" />}
              description="View system logs and reports"
            />
            <FeatureCard
              title="Settings"
              icon={<FaCog className="text-5xl mb-4 text-gray-500" />}
              description="System settings and configurations"
            />
            <FeatureCard
              title="Sales and Inventory"
              icon={<FaMoneyCheckAlt className="text-5xl mb-4 text-yellow-500" />}
              description="Manage sales and inventory"
            />
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 EduManage. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const LoginCard = ({ title, icon, description, buttonText, link }) => {
  return (
    <Link to={link} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105">
      {icon}
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4 text-center">{description}</p>
      <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
        {buttonText}
      </button>
    </Link>
  );
};

LoginCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

const FeatureCard = ({ title, icon, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
      {icon}
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4 text-center">{description}</p>
    </div>
  );
};

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired
};

export default LandingPage;
