import { useState } from 'react';
import { FaCog } from 'react-icons/fa';

const PayrollSettings = () => {
  const [payPeriod, setPayPeriod] = useState('biweekly');
  const [payDay, setPayDay] = useState('friday');
  const [autoApprove, setAutoApprove] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaCog className="mr-2" /> Payroll Settings
      </h2>
      <form className="space-y-4">
        <div>
          <label htmlFor='pay'  className="block text-sm font-medium text-gray-700">Pay Period</label>
          <select
            value={payPeriod}
            onChange={(e) => setPayPeriod(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label htmlFor='pay-day'  className="block text-sm font-medium text-gray-700">Pay Day</label>
          <select
            value={payDay}
            onChange={(e) => setPayDay(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            id="auto-approve"
            type="checkbox"
            checked={autoApprove}
            onChange={(e) => setAutoApprove(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="auto-approve" className="ml-2 block text-sm text-gray-900">
            Auto-approve timesheets
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default PayrollSettings;