import { useState } from 'react';
import StudentModal from '../../components/admin/studentManagement/AddStudentModal';
import SearchBar from '../../components/admin/studentManagement/SearchBar';
import AddStudentButton from '../../components/admin/studentManagement/AddStudentButton';
import Tabs from '../../components/admin/studentManagement/TabsComponent';
import ExportDataButton from '../../components/admin/studentManagement/ExportDataButton';
import FilterDropdown from '../../components/admin/studentManagement/FilterDropDown';
import GradeCard from '../../components/admin/studentManagement/GradeCard';
import { FaArrowLeft } from 'react-icons/fa';
import { generateSampleStudents } from '../../components/utils/generateStudents'; // Import the utility function

const GRADES = [
  'Creche', 'Nursery 1', 'Nursery 2', 'KG 1', 'KG 2',
  'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
  'JHS 1', 'JHS 2', 'JHS 3'
];

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [showGradeCards, setShowGradeCards] = useState(true);
  const [students, setStudents] = useState(generateSampleStudents(50)); // Use the generated data

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implement search logic here
  };

  const handleAddStudent = () => {
    setCurrentStudent(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (id) => {
    const student = students.find(s => s.id === id);
    setCurrentStudent(student);
    setIsModalOpen(true);
  };

  const handleSaveStudent = (studentData) => {
    if (studentData.id) {
      setStudents(students.map(s => (s.id === studentData.id ? studentData : s)));
    } else {
      setStudents([...students, { ...studentData, id: students.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const handleExport = () => {
    // Implement export logic here
  };

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
    setShowGradeCards(false);
  };

  const handleBackToGrades = () => {
    setSelectedGrade(null);
    setShowGradeCards(true);
  };

  const filteredStudents = selectedGrade
    ? students.filter(student => student.grade === selectedGrade)
    : students;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Student Management</h1>

      <StudentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        student={currentStudent} 
        onSave={handleSaveStudent} 
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <AddStudentButton onAddStudent={handleAddStudent} />
      </div>

      {showGradeCards ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {GRADES.map((grade, index) => (
            <GradeCard key={index} grade={grade} onClick={handleGradeClick} />
          ))}
        </div>
      ) : (
        <>
          <button
            onClick={handleBackToGrades}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" /> Back to Grades
          </button>
          <Tabs 
            students={filteredStudents} 
            handleEditStudent={handleEditStudent} 
            handleDeleteStudent={handleDeleteStudent} 
          />
          <div className="mt-6 flex justify-between items-center">
            <ExportDataButton onExport={handleExport} />
            <FilterDropdown />
          </div>
        </>
      )}
    </div>
  );
};

export default StudentManagement;
