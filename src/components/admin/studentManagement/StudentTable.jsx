import { FaEdit, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';

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
  onDelete: PropTypes.func.isRequired,
};

export default StudentTable;
