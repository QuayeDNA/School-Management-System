import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import PropTypes from 'prop-types';

const StudentModal = ({ isOpen, onClose, student, onSave }) => {
  const [name, setName] = useState(student?.name || '');
  const [grade, setGrade] = useState(student?.grade || '');
  const [status, setStatus] = useState(student?.status || 'Active');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: student?.id, name, grade, status });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm rounded bg-white p-6">
          <DialogTitle className="text-lg font-medium mb-4">
            {student ? 'Edit Student' : 'Add New Student'}
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Student Name"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="Grade"
              className="w-full mb-2 p-2 border rounded"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

StudentModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    student: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    };

export default StudentModal;