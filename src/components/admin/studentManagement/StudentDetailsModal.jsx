import React from 'react';
import { Dialog, Transition, DialogTitle, TransitionChild } from '@headlessui/react';
import { FaTimes as XIcon } from 'react-icons/fa';
import PropTypes from 'prop-types';

const StudentDetailsModal = ({ isOpen, onClose, student }) => {
  if (!student) return null;

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <TransitionChild
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </TransitionChild>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <TransitionChild
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <DialogTitle
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Student Details
              </DialogTitle>
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                onClick={onClose}
              >
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  <strong>Name:</strong> {student.name}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Date of Birth:</strong> {student.dateOfBirth}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Gender:</strong> {student.gender}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Grade:</strong> {student.grade}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Address:</strong> {student.address}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Contact Number:</strong> {student.contactNumber}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Email:</strong> {student.email}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Guardian Name:</strong> {student.guardianName}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Guardian Contact:</strong> {student.guardianContact}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Status:</strong> {student.status}
                </p>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

StudentDetailsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    student: PropTypes.object
    };

export default StudentDetailsModal;