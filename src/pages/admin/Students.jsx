import { useState, useCallback, useMemo, useEffect } from 'react';
import StudentModal from '../../components/admin/studentManagement/AddStudentModal';
import StudentDetailsModal from '../../components/admin/studentManagement/StudentDetailsModal';
import SearchBar from '../../components/admin/studentManagement/SearchBar';
import AddStudentButton from '../../components/admin/studentManagement/AddStudentButton';
import Tabs from '../../components/admin/studentManagement/TabsComponent';
import ExportDataButton from '../../components/admin/studentManagement/ExportDataButton';
import FilterDropdown from '../../components/admin/studentManagement/FilterDropDown';
import GradeCard from '../../components/admin/studentManagement/GradeCard';
import AddGradeModal from '../../components/admin/studentManagement/AddGradeModal';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import db from '../../db/db.js';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddGradeModalOpen, setIsAddGradeModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [showGradeCards, setShowGradeCards] = useState(true);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGrades = async () => {
      const allGrades = await db.grades.toArray();
      setGrades(allGrades);
    };
    fetchGrades();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedGrade) {
        const studentsInGrade = await db.students.where({ gradeId: selectedGrade.id }).toArray();
        setStudents(studentsInGrade);
      }
    };
    fetchStudents();
  }, [selectedGrade]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    // Implement search logic here
  }, []);

  const handleAddStudent = useCallback(() => {
    setCurrentStudent(null);
    setIsModalOpen(true);
  }, []);

  const handleEditStudent = useCallback(async (id) => {
    const student = await db.students.get(id);
    setCurrentStudent(student);
    setIsModalOpen(true);
  }, []);

  const handleViewStudentDetails = useCallback(async (id) => {
    const student = await db.students.get(id);
    setCurrentStudent(student);
    setIsDetailsModalOpen(true);
  }, []);

  const handleSaveStudent = useCallback(async (studentData) => {
    const gradeExists = grades.some(grade => grade.name === studentData.grade);
    if (!gradeExists) {
      setError('Selected grade does not exist.');
      return;
    }

    if (studentData.id) {
      await db.students.update(studentData.id, studentData);
    } else {
      const selectedGradeObj = grades.find(grade => grade.name === studentData.grade);
      studentData.gradeId = selectedGradeObj.id;
      const studentId = await db.students.add(studentData);
      await db.admissions.add({ studentId, admissionDate: new Date() });
    }
    const studentsInGrade = await db.students.where({ gradeId: selectedGrade.id }).toArray();
    setStudents(studentsInGrade);
    setIsModalOpen(false);
    setError('');
  }, [grades, selectedGrade]);

  const handleDeleteStudent = useCallback(async (id) => {
    await db.students.delete(id);
    const studentsInGrade = await db.students.where({ gradeId: selectedGrade.id }).toArray();
    setStudents(studentsInGrade);
  }, [selectedGrade]);

  const handleDeleteGrade = useCallback(async (grade) => {
    const gradeObj = grades.find(g => g.name === grade);
    if (gradeObj) {
      await db.students.where({ gradeId: gradeObj.id }).delete();
      await db.grades.delete(gradeObj.id);
      setGrades(grades.filter(g => g.id !== gradeObj.id));
      setStudents([]);
      setSelectedGrade(null);
      setShowGradeCards(true);
    }
  }, [grades]);

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

  const handleAddGrade = useCallback(async (gradeName) => {
    const id = await db.grades.add({ name: gradeName });
    setGrades([...grades, { id, name: gradeName }]);
    setIsAddGradeModalOpen(false);
  }, [grades]);

  const filteredStudents = useMemo(() => 
    selectedGrade
      ? students.filter(student => student.gradeId === selectedGrade.id)
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
        error={error}
      />

      <StudentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        student={currentStudent}
      />

      <AddGradeModal
        isOpen={isAddGradeModalOpen}
        onClose={() => setIsAddGradeModalOpen(false)}
        onSave={handleAddGrade}
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <AddStudentButton onAddStudent={handleAddStudent} />
        <button
          onClick={() => setIsAddGradeModalOpen(true)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <FaPlus className="mr-2" /> Add Grade
        </button>
      </div>

      {showGradeCards ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {grades.map((grade) => (
            <GradeCard key={grade.id} grade={grade.name} onClick={() => handleGradeClick(grade)} onDelete={handleDeleteGrade} />
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