import { useState } from 'react';
import { Tab, TabPanel, TabPanels, TabGroup, TabList } from '@headlessui/react';
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaGraduationCap, FaBook, FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa';

const AcademicsManagement = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Mathematics', department: 'Science', credits: 4 },
    { id: 2, name: 'History', department: 'Humanities', credits: 3 },
    { id: 3, name: 'Computer Science', department: 'Technology', credits: 4 },
  ]);

  const [newCourse, setNewCourse] = useState({ name: '', department: '', credits: '' });
  const [selectedGrade, setSelectedGrade] = useState('Creche');

  const grades = ['Creche', 'Nursery', 'KG1', 'KG2', 'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6', 'JHS 1', 'JHS 2', 'JHS 3'];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const addCourse = () => {
    if (newCourse.name && newCourse.department && newCourse.credits) {
      setCourses([...courses, { ...newCourse, id: courses.length + 1 }]);
      setNewCourse({ name: '', department: '', credits: '' });
    }
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Academics Management</h1>
      
      <TabGroup>
        <TabList className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl mb-6">
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
            focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
            ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            <FaBook className="inline-block mr-2" />
            Courses
          </Tab>
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
            focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
            ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            <FaCalendarAlt className="inline-block mr-2" />
            Timetables
          </Tab>
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
            focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
            ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            <FaGraduationCap className="inline-block mr-2" />
            Academic Year
          </Tab>
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
            focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
            ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            <FaChalkboardTeacher className="inline-block mr-2" />
            Teacher Assignments
          </Tab>
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
            focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
            ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            <FaClipboardList className="inline-block mr-2" />
            Grading System
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* Courses Management */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                  <input
                    type="text"
                    name="name"
                    value={newCourse.name}
                    onChange={handleInputChange}
                    placeholder="Course Name"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                  <input
                    type="text"
                    name="department"
                    value={newCourse.department}
                    onChange={handleInputChange}
                    placeholder="Department"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="w-full md:w-1/3 px-2">
                  <input
                    type="number"
                    name="credits"
                    value={newCourse.credits}
                    onChange={handleInputChange}
                    placeholder="Credits"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              <button
                onClick={addCourse}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                <FaPlus className="inline-block mr-2" />
                Add Course
              </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{course.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{course.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{course.credits}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => {/* Implement edit functionality */}}
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteCourse(course.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>
          <TabPanel>
            {/* Timetables Management */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Timetable Management</h2>
              <div className="mb-4">
                <label htmlFor="grade-select" className="block text-sm font-medium text-gray-700 mb-2">Select Grade</label>
                <select
                  id="grade-select"
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      {daysOfWeek.map((day) => (
                        <th key={day} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {timeSlots.map((time) => (
                      <tr key={time}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{time}</td>
                        {daysOfWeek.map((day) => (
                          <td key={`${day}-${time}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                              <option value="">Select Course</option>
                              {courses.map((course) => (
                                <option key={course.id} value={course.id}>{course.name}</option>
                              ))}
                            </select>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Save Timetable
                </button>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            {/* Academic Year Management */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Academic Year Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    id="start-date"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    id="end-date"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Term Dates</h3>
                {['First', 'Second', 'Third'].map((term) => (
                  <div key={term} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor={`${term.toLowerCase()}-term-start`} className="block text-sm font-medium text-gray-700 mb-2">{term} Term Start</label>
                      <input
                        type="date"
                        id={`${term.toLowerCase()}-term-start`}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${term.toLowerCase()}-term-end`} className="block text-sm font-medium text-gray-700 mb-2">{term} Term End</label>
                      <input
                        type="date"
                        id={`${term.toLowerCase()}-term-end`}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    Save Academic Year
                  </button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              {/* Teacher Assignments */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Teacher Assignments</h2>
                <div className="mb-4">
                  <label htmlFor="teacher-select" className="block text-sm font-medium text-gray-700 mb-2">Select Teacher</label>
                  <select
                    id="teacher-select"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select a teacher</option>
                    {/* Add teacher options here */}
                  </select>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Assigned Courses</h3>
                  <ul className="list-disc pl-5">
                    {/* Add assigned courses here */}
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Available Courses</h3>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select a course to assign</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Assign Course
                </button>
              </div>
            </TabPanel>
            <TabPanel>
              {/* Grading System */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Grading System</h2>
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Grade Scale</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Minimum Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maximum Score</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Add grade scale rows here */}
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">A</td>
                        <td className="px-6 py-4 whitespace-nowrap">90</td>
                        <td className="px-6 py-4 whitespace-nowrap">100</td>
                      </tr>
                      {/* Add more grade scale rows */}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Add New Grade</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Grade"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="Minimum Score"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="Maximum Score"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    />
                  </div>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    Add Grade
                  </button>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    );
  };
  
  export default AcademicsManagement;