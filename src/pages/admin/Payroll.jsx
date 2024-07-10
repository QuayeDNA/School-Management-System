import { useState } from 'react';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { FiUsers, FiDollarSign, FiCalendar, FiSettings, FiSearch, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

const PayrollManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const employees = [
    { id: 1, name: 'John Doe', position: 'Software Engineer', salary: 85000, status: 'Active' },
    { id: 2, name: 'Jane Smith', position: 'Project Manager', salary: 95000, status: 'Active' },
    { id: 3, name: 'Mike Johnson', position: 'Designer', salary: 75000, status: 'On Leave' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Payroll Admin</h2>
        <nav>
          <ul className="space-y-4">
            <li><a href="#" className="flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded"><FiUsers /> <span>Employees</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded"><FiDollarSign /> <span>Payroll</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded"><FiCalendar /> <span>Schedule</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded"><FiSettings /> <span>Settings</span></a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="relative">
            <input type="text" placeholder="Search employees..." className="pl-10 pr-4 py-2 border rounded-full" />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2">
              <img src="https://via.placeholder.com/40" alt="Admin" className="w-10 h-10 rounded-full" />
              <span>Admin</span>
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a href="#" className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}>
                      Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a href="#" className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}>
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a href="#" className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}>
                      Logout
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Total Employees</h3>
            <p className="text-3xl font-bold text-indigo-600">152</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Monthly Payroll</h3>
            <p className="text-3xl font-bold text-green-600">$487,250</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Next Pay Date</h3>
            <p className="text-3xl font-bold text-orange-600">Jul 31, 2024</p>
          </div>
        </div>

        {/* Employee Table */}
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Employee Payroll</h2>
            <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center space-x-2">
              <FiPlus /> <span>Add Employee</span>
            </button>
          </div>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{employee.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${employee.salary.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2"><FiEdit /></button>
                      <button className="text-red-600 hover:text-red-900"><FiTrash2 /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Employee Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded max-w-md mx-auto p-6">
            <Dialog.Title className="text-lg font-medium mb-4">Add New Employee</Dialog.Title>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" id="name" className="w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input type="text" id="position" className="w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                <input type="number" id="salary" className="w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md text-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Save</button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PayrollManagement;