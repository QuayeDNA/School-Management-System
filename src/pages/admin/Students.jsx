import { useState, useCallback, useMemo } from 'react';
import StudentModal from '../../components/admin/studentManagement/AddStudentModal';
import StudentDetailsModal from '../../components/admin/studentManagement/StudentDetailsModal';
import SearchBar from '../../components/admin/studentManagement/SearchBar';
import AddStudentButton from '../../components/admin/studentManagement/AddStudentButton';
import Tabs from '../../components/admin/studentManagement/TabsComponent';
import ExportDataButton from '../../components/admin/studentManagement/ExportDataButton';
import FilterDropdown from '../../components/admin/studentManagement/FilterDropDown';
import GradeCard from '../../components/admin/studentManagement/GradeCard';
import { FaArrowLeft } from 'react-icons/fa';
import { generateSampleStudents } from '../../components/utils/generateStudents';

const GRADES = [
  'Creche', 'Nursery 1', 'Nursery 2', 'KG 1', 'KG 2',
  'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
  'JHS 1', 'JHS 2', 'JHS 3'
];

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [showGradeCards, setShowGradeCards] = useState(true);
  const [students, setStudents] = useState(generateSampleStudents());

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    // Implement search logic here
  }, []);

  const handleAddStudent = useCallback(() => {
    setCurrentStudent(null);
    setIsModalOpen(true);
  }, []);

  const handleEditStudent = useCallback((id) => {
    const student = students.find(s => s.id === id);
    setCurrentStudent(student);
    setIsModalOpen(true);
  }, [students]);

  const handleViewStudentDetails = useCallback((id) => {
    const student = students.find(s => s.id === id);
    setCurrentStudent(student);
    setIsDetailsModalOpen(true);
  }, [students]);

  const handleSaveStudent = useCallback((studentData) => {
    setStudents(prevStudents => {
      if (studentData.id) {
        return prevStudents.map(s => (s.id === studentData.id ? studentData : s));
      } else {
        return [...prevStudents, { ...studentData, id: prevStudents.length + 1 }];
      }
    });
    setIsModalOpen(false);
  }, []);

  const handleDeleteStudent = useCallback((id) => {
    setStudents(prevStudents => prevStudents.filter(s => s.id !== id));
  }, []);

  const handleExport = useCallback(() => {
    // Implement export logic here
  }, []);

  const handleGradeClick = useCallback((grade) => {
    setSelectedGrade(grade);
    setShowGradeCards(false);
  }, []);

  const handleBackToGrades = useCallback(() => {
    setSelectedGrade(null);
    setShowGradeCards(true);
  }, []);

  const filteredStudents = useMemo(() => 
    selectedGrade
      ? students.filter(student => student.grade === selectedGrade)
      : students,
    [selectedGrade, students]
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Student Management</h1>

      <StudentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        student={currentStudent} 
        onSave={handleSaveStudent} 
      />

      <StudentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        student={currentStudent}
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <AddStudentButton onAddStudent={handleAddStudent} />
      </div>

      {showGradeCards ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {GRADES.map((grade, index) => (
            <GradeCard key={index} grade={grade} onClick={handleGradeClick} />
          ))}
        </div>
      ) : (
        <>
          <button
            onClick={handleBackToGrades}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2" /> Back to Grades
          </button>
          <Tabs 
            students={filteredStudents} 
            handleEditStudent={handleEditStudent} 
            handleDeleteStudent={handleDeleteStudent}
            handleViewStudentDetails={handleViewStudentDetails}
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