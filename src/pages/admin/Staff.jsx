import React, { useState, useCallback, useMemo } from 'react';
import { Tab, Menu, Transition } from '@headlessui/react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaFileExport, FaFilter, FaEllipsisV, FaUserTie, FaChalkboardTeacher, FaBroom, FaUserGraduate } from 'react-icons/fa';
import AddStaffModal from '../../components/admin/StaffManagement/AddStaffModal';
import PropTypes from 'prop-types';

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', role: 'Teacher', department: 'Mathematics', status: 'Full-time' },
    { id: 2, name: 'Jane Smith', role: 'Admin', department: 'Administration', status: 'Full-time' },
    { id: 3, name: 'Mike Johnson', role: 'Janitor', department: 'Maintenance', status: 'Part-time' },
    { id: 4, name: 'Emily Brown', role: 'Intern', department: 'IT', status: 'Temporary' },
  ]);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

 const handleAddEmployee = (employeeData) => {
    // Logic to add the new employee to your state or send to an API
    console.log('New employee data:', employeeData);
    // Close the modal after saving
    setIsAddModalOpen(false);
  };

  const handleEditEmployee = useCallback((id) => {
    // Implement edit employee logic
    console.log('Edit employee', id);
  }, []);

  const handleDeleteEmployee = useCallback((id) => {
    // Implement delete employee logic
    setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id));
  }, []);

  const handleExport = useCallback(() => {
    // Implement export logic
    console.log('Export data');
  }, []);

  const handleDepartmentChange = useCallback((e) => {
    setSelectedDepartment(e.target.value);
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => 
      (selectedDepartment === 'All' || employee.department === selectedDepartment) &&
      (employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
       employee.department.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [employees, selectedDepartment, searchTerm]);

  const departments = useMemo(() => ['All', ...new Set(employees.map(emp => emp.department))], [employees]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Employee Management</h1>
      
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
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
        >
          <FaPlus className="mr-2" /> Add Employee
        </button>
        <AddStaffModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddEmployee}
      />
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6 overflow-x-auto">
          {['All Employees', 'Teachers', 'Admin Staff', 'Support Staff', 'Temporary Staff'].map((category) => (
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
            <EmployeeTable employees={filteredEmployees} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} />
          </Tab.Panel>
          <Tab.Panel>
            <EmployeeTable employees={filteredEmployees.filter(e => e.role === 'Teacher')} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} />
          </Tab.Panel>
          <Tab.Panel>
            <EmployeeTable employees={filteredEmployees.filter(e => e.role === 'Admin')} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} />
          </Tab.Panel>
          <Tab.Panel>
            <EmployeeTable employees={filteredEmployees.filter(e => ['Janitor', 'Cook'].includes(e.role))} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} />
          </Tab.Panel>
          <Tab.Panel>
            <EmployeeTable employees={filteredEmployees.filter(e => ['Intern', 'TA'].includes(e.role))} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handleExport}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition-colors"
        >
          <FaFileExport className="mr-2" /> Export Data
        </button>
        <div className="flex items-center">
          <FaFilter className="mr-2 text-gray-500" />
          <select 
            className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

const EmployeeTable = ({ employees, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border-b text-left">ID</th>
          <th className="py-2 px-4 border-b text-left">Name</th>
          <th className="py-2 px-4 border-b text-left">Role</th>
          <th className="py-2 px-4 border-b text-left">Department</th>
          <th className="py-2 px-4 border-b text-left">Status</th>
          <th className="py-2 px-4 border-b text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id} className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">{employee.id}</td>
            <td className="py-2 px-4 border-b">
              <div className="flex items-center">
                <EmployeeIcon role={employee.role} />
                <span className="ml-2">{employee.name}</span>
              </div>
            </td>
            <td className="py-2 px-4 border-b">{employee.role}</td>
            <td className="py-2 px-4 border-b">{employee.department}</td>
            <td className="py-2 px-4 border-b">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                {employee.status}
              </span>
            </td>
            <td className="py-2 px-4 border-b">
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
                            onClick={() => onEdit(employee.id)}
                          >
                            <FaEdit className="mr-2" /> Edit
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-red-500 text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            onClick={() => onDelete(employee.id)}
                          >
                            <FaTrash className="mr-2" /> Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const EmployeeIcon = ({ role }) => {
  switch (role) {
    case 'Teacher':
      return <FaChalkboardTeacher className="text-blue-500" />;
    case 'Admin':
      return <FaUserTie className="text-purple-500" />;
    case 'Janitor':
    case 'Cook':
      return <FaBroom className="text-green-500" />;
    case 'Intern':
    case 'TA':
      return <FaUserGraduate className="text-orange-500" />;
    default:
      return <FaUserTie className="text-gray-500" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Full-time':
      return 'bg-green-100 text-green-800';
    case 'Part-time':
      return 'bg-blue-100 text-blue-800';
    case 'Temporary':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

EmployeeIcon.propTypes = {
  role: PropTypes.string.isRequired
};

EmployeeTable.propTypes = {
  employees: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default EmployeeManagement;  