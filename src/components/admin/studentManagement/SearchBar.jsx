import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

const SearchBar = ({ searchTerm, onSearch }) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search students..."
      className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={searchTerm}
      onChange={onSearch}
    />
    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  </div>
);

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
