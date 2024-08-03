import PropTypes from 'prop-types';

const BulkActions = ({ selectedStudents, onBulkDelete, onBulkStatusChange }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onBulkDelete}
        disabled={selectedStudents.length === 0}
        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
      >
        Delete Selected
      </button>
      <select
        onChange={(e) => onBulkStatusChange(e.target.value)}
        disabled={selectedStudents.length === 0}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Change Status</option>
        <option value="Active">Set Active</option>
        <option value="Inactive">Set Inactive</option>
      </select>
    </div>
  );
};

BulkActions.propTypes = {
  selectedStudents: PropTypes.array.isRequired,
  onBulkDelete: PropTypes.func.isRequired,
  onBulkStatusChange: PropTypes.func.isRequired
};

export default BulkActions;