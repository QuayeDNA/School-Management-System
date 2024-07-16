import { FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';

const AddStudentButton = ({ onAddStudent }) => (
  <button
    onClick={onAddStudent}
    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
  >
    <FaPlus className="mr-2" /> Add Student
  </button>
);

AddStudentButton.propTypes = {
    onAddStudent: PropTypes.func.isRequired,
    };

export default AddStudentButton;
