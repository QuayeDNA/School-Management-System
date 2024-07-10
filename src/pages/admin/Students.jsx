import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaFileExport, FaFilter } from 'react-icons/fa';
import PropTypes from 'prop-types';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', grade: '10th', status: 'Active' },
    { id: 2, name: 'Jane Smith', grade: '11th', status: 'Active' },
    // Add more mock data as needed
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implement search logic here
    
  };

  const handleAddStudent = () => {
    // Implement add student logic
  };

  const handleEditStudent = (id) => {
    // Implement edit student logic
  };

  const handleDeleteStudent = (id) => {
    // Implement delete student logic
  };

  const handleExport = () => {
    // Implement export logic
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Student Management</h1>
      
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search students..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={handleAddStudent}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
        >
          <FaPlus className="mr-2" /> Add Student
        </button>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
             ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            All Students
          </Tab>
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
             ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Active
          </Tab>
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
             ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Inactive
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <StudentTable students={students} onEdit={handleEditStudent} onDelete={handleDeleteStudent} />
          </Tab.Panel>
          <Tab.Panel>
            <StudentTable students={students.filter(s => s.status === 'Active')} onEdit={handleEditStudent} onDelete={handleDeleteStudent} />
          </Tab.Panel>
          <Tab.Panel>
            <StudentTable students={students.filter(s => s.status === 'Inactive')} onEdit={handleEditStudent} onDelete={handleDeleteStudent} />
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
          <select className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Filter by Grade</option>
            <option>9th Grade</option>
            <option>10th Grade</option>
            <option>11th Grade</option>
            <option>12th Grade</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const StudentTable = ({ students, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border-b text-left">ID</th>
          <th className="py-2 px-4 border-b text-left">Name</th>
          <th className="py-2 px-4 border-b text-left">Grade</th>
          <th className="py-2 px-4 border-b text-left">Status</th>
          <th className="py-2 px-4 border-b text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td className="py-2 px-4 border-b">{student.id}</td>
            <td className="py-2 px-4 border-b">{student.name}</td>
            <td className="py-2 px-4 border-b">{student.grade}</td>
            <td className="py-2 px-4 border-b">{student.status}</td>
            <td className="py-2 px-4 border-b">
              <button onClick={() => onEdit(student.id)} className="text-blue-500 hover:text-blue-700 mr-2">
                <FaEdit />
              </button>
              <button onClick={() => onDelete(student.id)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

StudentTable.propTypes = {
  students: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default StudentManagement;