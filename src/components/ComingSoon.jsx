import { FaTools } from 'react-icons/fa';

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <FaTools className="text-6xl text-blue-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Coming Soon</h1>
        <p className="text-gray-600 mb-4">We&apos;re working hard to bring you something amazing!</p>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;