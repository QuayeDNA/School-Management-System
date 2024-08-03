import { Transition } from '@headlessui/react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <Transition
        show={true}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-4">
          <FaSpinner className="animate-spin text-blue-500 text-3xl" />
          <span className="text-gray-700 text-lg font-semibold">Loading...</span>
        </div>
      </Transition>
    </div>
  );
};

export default Loading;