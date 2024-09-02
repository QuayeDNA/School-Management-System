
import { FaTools, FaRocket, FaCog } from 'react-icons/fa';

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-700 to-green-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://picsum.photos/id/180/1920/1080')"}}></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white bg-opacity-90 p-12 rounded-lg shadow-2xl text-center relative z-10 max-w-md w-full">
        <div className="relative">
          <FaTools className="text-7xl text-blue-500 mx-auto mb-6 animate-bounce" />
          <FaRocket className="text-3xl text-purple-500 absolute top-0 right-0 animate-pulse" />
          <FaCog className="text-3xl text-green-500 absolute bottom-0 left-0 animate-spin" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
        <p className="text-gray-600 mb-6">We&apos;re working hard to bring you something extraordinary!</p>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div className="w-3/4 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105">
            Notify Me
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;