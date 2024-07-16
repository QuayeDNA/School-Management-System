import { FaFilter } from 'react-icons/fa';

const FilterDropdown = () => (
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
);

export default FilterDropdown;
