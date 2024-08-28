import { useState } from 'react';
import PropTypes from 'prop-types';

const AdjustPayslip = ({ employee, onClose, onSave }) => {
  const [adjustments, setAdjustments] = useState({
    basicSalary: employee.salary,
    allowances: 0,
    deductions: 0,
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdjustments(prev => ({ ...prev, [name]: name === 'comments' ? value : parseFloat(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(adjustments);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Adjust Payslip for {employee.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="basicSalary">
              Basic Salary
            </label>
            <input
              type="number"
              id="basicSalary"
              name="basicSalary"
              value={adjustments.basicSalary}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="allowances">
              Allowances
            </label>
            <input
              type="number"
              id="allowances"
              name="allowances"
              value={adjustments.allowances}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deductions">
              Deductions
            </label>
            <input
              type="number"
              id="deductions"
              name="deductions"
              value={adjustments.deductions}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comments">
              Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              value={adjustments.comments}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AdjustPayslip.propTypes = {
  employee: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AdjustPayslip;