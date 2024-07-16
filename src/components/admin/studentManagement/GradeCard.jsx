import PropTypes from 'prop-types';
import { FaBaby, FaChild, FaUserGraduate } from 'react-icons/fa';
import { GiSchoolBag } from 'react-icons/gi';
import { MdSchool } from 'react-icons/md';

const GradeCard = ({ grade, onClick }) => {
  const getIconAndColor = (grade) => {
    if (grade.startsWith('Creche') || grade.startsWith('Nursery')) {
      return { icon: <FaBaby className="text-5xl" />, color: 'from-pink-400 to-pink-600' };
    } else if (grade.startsWith('KG')) {
      return { icon: <FaChild className="text-5xl" />, color: 'from-purple-400 to-purple-600' };
    } else if (grade.startsWith('Primary')) {
      return { icon: <GiSchoolBag className="text-5xl" />, color: 'from-blue-400 to-blue-600' };
    } else if (grade.startsWith('JHS')) {
      return { icon: <MdSchool className="text-5xl" />, color: 'from-green-400 to-green-600' };
    } else {
      return { icon: <FaUserGraduate className="text-5xl" />, color: 'from-yellow-400 to-yellow-600' };
    }
  };

  const { icon, color } = getIconAndColor(grade);

  return (
    <div
      onClick={() => onClick(grade)}
      className={`cursor-pointer p-6 m-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br ${color} text-white`}
    >
      <div className="flex flex-col items-center">
        <div className="mb-4 bg-white bg-opacity-20 p-4 rounded-full text-gray-700">
          {icon}
        </div>
        <div className="text-xl font-bold text-center">{grade}</div>
        <div className="mt-4 text-sm opacity-80">Click to view details</div>
      </div>
    </div>
  );
};

GradeCard.propTypes = {
  grade: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default GradeCard;