import React, { useState } from 'react';
import { Tab, Menu, Transition } from '@headlessui/react';
import { FaSearch, FaMoneyCheckAlt, FaFileInvoiceDollar, FaHistory, FaChartLine, FaUsersCog, FaCalendarAlt, FaEllipsisV } from 'react-icons/fa';
import PropTypes from 'prop-types'

const PayrollManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', role: 'Teacher', salary: 50000, lastPayment: '2024-06-30', nextPayment: '2024-07-15' },
    { id: 2, name: 'Jane Smith', role: 'Admin', salary: 45000, lastPayment: '2024-06-30', nextPayment: '2024-07-15' },
    { id: 3, name: 'Mike Johnson', role: 'Janitor', salary: 30000, lastPayment: '2024-06-30', nextPayment: '2024-07-15' },
    { id: 4, name: 'Emily Brown', role: 'Intern', salary: 25000, lastPayment: '2024-06-30', nextPayment: '2024-07-15' },
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implement search logic here
  };

  const handleProcessPayroll = () => {
    // Implement process payroll logic
  };

  const handleGenerateReports = () => {
    // Implement generate reports logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Payroll Management</h1>
      
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search employees..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleProcessPayroll}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition-colors"
          >
            <FaMoneyCheckAlt className="mr-2" /> Process Payroll
          </button>
          <button
            onClick={handleGenerateReports}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
          >
            <FaFileInvoiceDollar className="mr-2" /> Generate Reports
          </button>
        </div>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6 overflow-x-auto">
          {['Current Payroll', 'Payment History', 'Salary Analytics', 'Tax Management', 'Settings'].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 whitespace-nowrap
                ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <PayrollTable employees={employees} />
          </Tab.Panel>
          <Tab.Panel>
            <PaymentHistory />
          </Tab.Panel>
          <Tab.Panel>
            <SalaryAnalytics />
          </Tab.Panel>
          <Tab.Panel>
            <TaxManagement />
          </Tab.Panel>
          <Tab.Panel>
            <PayrollSettings />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

const PayrollTable = ({ employees }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border-b text-left">ID</th>
          <th className="py-2 px-4 border-b text-left">Name</th>
          <th className="py-2 px-4 border-b text-left">Role</th>
          <th className="py-2 px-4 border-b text-left">Salary</th>
          <th className="py-2 px-4 border-b text-left">Last Payment</th>
          <th className="py-2 px-4 border-b text-left">Next Payment</th>
          <th className="py-2 px-4 border-b text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id} className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">{employee.id}</td>
            <td className="py-2 px-4 border-b">{employee.name}</td>
            <td className="py-2 px-4 border-b">{employee.role}</td>
            <td className="py-2 px-4 border-b">${employee.salary.toLocaleString()}</td>
            <td className="py-2 px-4 border-b">{employee.lastPayment}</td>
            <td className="py-2 px-4 border-b">{employee.nextPayment}</td>
            <td className="py-2 px-4 border-b">
              <PayrollActions employeeId={employee.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PayrollActions = ({ employeeId }) => (
  <Menu as="div" className="relative inline-block text-left">
    <div>
      <Menu.Button className="inline-flex justify-center w-full px-2 py-1 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <FaEllipsisV className="w-5 h-5" aria-hidden="true" />
      </Menu.Button>
    </div>
    <Transition
      as={React.Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
        <div className="px-1 py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-blue-500 text-white' : 'text-gray-900'
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                onClick={() => {/* Implement view payslip logic */}}
              >
                <FaFileInvoiceDollar className="mr-2" /> View Payslip
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-green-500 text-white' : 'text-gray-900'
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                onClick={() => {/* Implement adjust salary logic */}}
              >
                <FaMoneyCheckAlt className="mr-2" /> Adjust Salary
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-purple-500 text-white' : 'text-gray-900'
                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                onClick={() => {/* Implement payment history logic */}}
              >
                <FaHistory className="mr-2" /> Payment History
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
);

const PaymentHistory = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
    {/* Implement payment history component */}
  </div>
);

const SalaryAnalytics = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Salary Analytics</h2>
    {/* Implement salary analytics component */}
  </div>
);

const TaxManagement = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Tax Management</h2>
    {/* Implement tax management component */}
  </div>
);

const PayrollSettings = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Payroll Settings</h2>
    {/* Implement payroll settings component */}
  </div>
);

PayrollTable.propTypes = {
  employees: PropTypes.array.isRequired,
};

PayrollActions.propTypes = {
  employeeId: PropTypes.string.isRequired
};

export default PayrollManagement;