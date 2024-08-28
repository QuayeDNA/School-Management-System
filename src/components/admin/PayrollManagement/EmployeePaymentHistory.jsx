import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EmployeePaymentHistory = ({ onClose }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    // Fetch employees data
    // This is a mock implementation. Replace with actual API call.
    setEmployees([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Alice Johnson' },
        { id: 4, name: 'Bob Brown' },
        { id: 5, name: 'Charlie Davis' },
        { id: 6, name: 'David Wilson' },
      // ... more employees
    ]);
  }, []);

  const handleEmployeeSelect = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    setSelectedEmployee(employee);
    // Fetch payment history for selected employee
    // This is a mock implementation. Replace with actual API call.
    setPaymentHistory([
      { date: '2024-06-30', amount: 5000, type: 'Salary', status: 'Paid' },
      { date: '2024-05-31', amount: 5000, type: 'Salary', status: 'Paid' },
        { date: '2024-04-30', amount: 5000, type: 'Salary', status: 'Paid' },
        { date: '2024-03-31', amount: 5000, type: 'Salary', status: 'Paid' },
        { date: '2024-02-29', amount: 5000, type: 'Salary', status: 'Paid' },
        { date: '2024-01-31', amount: 5000, type: 'Salary', status: 'Paid' },
      // ... more payment history
    ]);
  };

  return (

      <div className="bg-white p-5 rounded-lg shadow-xl max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-4">Employee Payment History</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employee">
            Select Employee
          </label>
          <select
            id="employee"
            onChange={(e) => handleEmployeeSelect(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select an employee</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
        </div>
        {selectedEmployee && (
          <div className="overflow-x-auto">
            <h3 className="text-xl font-bold mb-2">Payment History for {selectedEmployee.name}</h3>
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                  <th className="py-2 px-4 border-b text-left">Amount</th>
                  <th className="py-2 px-4 border-b text-left">Type</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{payment.date}</td>
                    <td className="py-2 px-4 border-b">${payment.amount.toLocaleString()}</td>
                    <td className="py-2 px-4 border-b">{payment.type}</td>
                    <td className="py-2 px-4 border-b">{payment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Close
          </button>
        </div>
      </div>
  );
};

EmployeePaymentHistory.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default EmployeePaymentHistory;