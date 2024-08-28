import { Transition } from '@headlessui/react';
import { FaSpinner, FaCog, FaRocket } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 bg-opacity-75 z-50">
      <Transition
        show={true}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col items-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-loading-bar"></div>
          <div className="relative">
            <FaSpinner className="animate-spin text-blue-500 text-5xl" />
            <FaCog className="absolute top-0 right-0 animate-reverse-spin text-purple-500 text-3xl" />
            <FaRocket className="absolute bottom-0 left-0 animate-bounce text-green-500 text-3xl" />
          </div>
          <span className="text-gray-700 text-xl font-semibold">Loading...</span>
          <p className="text-gray-500 text-sm text-center max-w-xs">
            We&apos;re preparing something amazing for you. Just a moment please!
          </p>
        </div>
      </Transition>
    </div>
  );
};

export default Loading;