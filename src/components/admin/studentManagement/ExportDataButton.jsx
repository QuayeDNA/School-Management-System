import { FaFileExport } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ExportDataButton = ({ onExport }) => (
  <button
    onClick={onExport}
    className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition-colors"
  >
    <FaFileExport className="mr-2" /> Export Data
  </button>
);

ExportDataButton.propTypes = {
    onExport: PropTypes.func.isRequired,
    };

export default ExportDataButton;
