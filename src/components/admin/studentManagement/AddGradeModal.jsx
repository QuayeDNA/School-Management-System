import { useState } from 'react';
import PropTypes from 'prop-types';

const AddGradeModal = ({ isOpen, onClose, onSave }) => {
  const [gradeName, setGradeName] = useState('');

  const handleSave = () => {
    onSave(gradeName);
    setGradeName('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Grade</h2>
        <input
          type="text"
          value={gradeName}
          onChange={(e) => setGradeName(e.target.value)}
          placeholder="Grade Name"
          className="border p-2 w-full mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

AddGradeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddGradeModal;