import { FaGraduationCap, FaUserTie, FaUserCog, FaCalendarAlt, FaChalkboardTeacher, FaClipboardList} from 'react-icons/fa';
import { Menu, MenuItems, MenuButton, MenuItem } from '@headlessui/react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-800 text-white">
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{backgroundImage: "url('https://picsum.photos/id/180/1920/1080')", opacity: 0.2}}></div>
      <div className="relative z-10">
        <header className="bg-transparent">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">EduManage</div>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-blue-300 transition-colors">Home</a>
                <a href="#" className="hover:text-blue-300 transition-colors">Features</a>
                <a href="#" className="hover:text-blue-300 transition-colors">About</a>
                <a href="#" className="hover:text-blue-300 transition-colors">Contact</a>
              </div>
              <MobileMenu />
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-6 py-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-down">
              Welcome to EduManage
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 animate-fade-in-up">
              Empowering education through innovative management solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <LoginCard
              title="Student Portal"
              icon={<FaGraduationCap className="text-6xl mb-4 text-blue-400" />}
              description="Access your courses, grades, and more"
              buttonText="Student Login"
              link='/student-login'
            />
            <LoginCard
              title="Staff Portal"
              icon={<FaUserTie className="text-6xl mb-4 text-green-400" />}
              description="Manage classes, assignments, and student progress"
              buttonText="Staff Login"
              link='/staff-login'
            />
            <LoginCard
              title="Admin Dashboard"
              icon={<FaUserCog className="text-6xl mb-4 text-purple-400" />}
              description="Oversee and control all aspects of the system"
              buttonText="Admin Login"
              link='/admin-login'
            />
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Explore Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                title="Student Features"
                icon={<FaGraduationCap className="text-5xl mb-4 text-blue-400" />}
                features={[
                  "Course Registration",
                  "Grade Tracking",
                  "Online Assignments",
                  "Study Resources"
                ]}
              />
              <FeatureCard
                title="Staff Features"
                icon={<FaChalkboardTeacher className="text-5xl mb-4 text-green-400" />}
                features={[
                  "Class Management",
                  "Grading System",
                  "Attendance Tracking",
                  "Communication Tools"
                ]}
              />
              <FeatureCard
                title="Admin Features"
                icon={<FaUserCog className="text-5xl mb-4 text-purple-400" />}
                features={[
                  "User Management",
                  "Financial Overview",
                  "System Configuration",
                  "Advanced Reporting"
                ]}
              />
              <FeatureCard
                title="Coming Soon"
                icon={<FaCalendarAlt className="text-5xl mb-4 text-yellow-400" />}
                features={[
                  "Mobile App",
                  "AI-Powered Insights",
                  "Virtual Classrooms",
                  "Parent Portal"
                ]}
              />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl mb-8">Join thousands of schools already using EduManage</p>
            <button className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors">
              Request a Demo
            </button>
          </div>
        </main>

        <footer className="bg-transparent py-8">
          <div className="container mx-auto px-6 text-center">
            <p>&copy; 2024 EduManage. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

const LoginCard = ({ title, icon, description, buttonText, link }) => {
  return (
    <div className="bg-blue-600 bg-opacity-10 rounded-lg p-6 flex flex-col items-center transition-all hover:bg-opacity-20 hover:scale-105">
      {icon}
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-blue-200 mb-4 text-center">{description}</p>
      <Link to={link} className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
        {buttonText}
      </Link>
    </div>
  );
};

LoginCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

const FeatureCard = ({ title, icon, features }) => {
  return (
    <div className="bg-blue-600 bg-opacity-10 rounded-lg p-6 flex flex-col items-center text-center transition-all hover:bg-opacity-20">
      {icon}
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <ul className="text-blue-200">
        {features.map((feature, index) => (
          <li key={index} className="mb-2 flex items-center">
            <FaClipboardList className="mr-2 text-blue-400" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  features: PropTypes.array.isRequired
};

const MobileMenu = () => {
  return (
    <Menu as="div" className="relative md:hidden">
      <MenuButton className="text-white focus:outline-none">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </MenuButton>
      <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right bg-white bg-opacity-90 backdrop-blur-md rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`${
                  active ? 'bg-blue-500 text-white' : 'text-gray-900'
                } block px-4 py-2 text-sm`}
              >
                Home
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`${
                  active ? 'bg-blue-500 text-white' : 'text-gray-900'
                } block px-4 py-2 text-sm`}
              >
                Features
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`${
                  active ? 'bg-blue-500 text-white' : 'text-gray-900'
                } block px-4 py-2 text-sm`}
              >
                About
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`${
                  active ? 'bg-blue-500 text-white' : 'text-gray-900'
                } block px-4 py-2 text-sm`}
              >
                Contact
              </a>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default LandingPage;