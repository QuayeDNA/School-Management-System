import { Link } from 'react-router-dom';
import { FaSearch, FaHome, FaQuestionCircle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://picsum.photos/id/1021/1920/1080')"}}></div>
      <div className="bg-white bg-opacity-90 p-12 rounded-lg shadow-2xl text-center relative z-10 max-w-lg w-full">
        <div className="relative mb-8">
          <FaSearch className="text-8xl text-gray-300 mx-auto" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold text-red-500">404</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page not found.</h1>
        <p className="text-xl text-gray-600 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link 
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <FaHome className="mr-2" />
            Go Back Home
          </Link>
          <button 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 flex items-center justify-center"
            onClick={() => window.history.back()}
          >
            <FaQuestionCircle className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;