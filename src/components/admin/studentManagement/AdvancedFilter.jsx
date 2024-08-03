import { useState } from 'react';
import PropTypes from 'prop-types';

const AdvancedFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    ageRange: { min: '', max: '' },
    gender: '',
    grade: '',
    status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleAgeRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      ageRange: {
        ...prevFilters.ageRange,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Age Range</label>
        <div className="mt-1 flex space-x-2">
          <input
            type="number"
            name="min"
            value={filters.ageRange.min}
            onChange={handleAgeRangeChange}
            placeholder="Min"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="max"
            value={filters.ageRange.max}
            onChange={handleAgeRangeChange}
            placeholder="Max"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Grade</label>
        <input
          type="text"
          name="grade"
          value={filters.grade}
          onChange={handleChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Apply Filters
      </button>
    </form>
  );
};

AdvancedFilter.propTypes = {
  onFilter: PropTypes.func.isRequired
};

export default AdvancedFilter;