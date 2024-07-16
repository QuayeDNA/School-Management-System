import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center items-center mt-4">
    <button
      className="px-4 py-2 mx-1 bg-gray-200 rounded-lg hover:bg-gray-300"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <HiOutlineChevronLeft />
    </button>
    <span className="px-4 py-2 mx-1">{currentPage} of {totalPages}</span>
    <button
      className="px-4 py-2 mx-1 bg-gray-200 rounded-lg hover:bg-gray-300"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      <HiOutlineChevronRight />
    </button>
  </div>
);

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
