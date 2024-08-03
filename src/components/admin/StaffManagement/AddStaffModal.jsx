import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const AddEmployeeModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    role: '',
    department: '',
    startDate: '',
    employmentType: 'Full-time',
    salary: '',
    educationLevel: '',
    certifications: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.salary.trim()) newErrors.salary = 'Salary is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Add New Employee
              </Dialog.Title>
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
              >
                <FaTimes />
              </button>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.firstName ? 'border-red-500' : ''}`}
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.lastName ? 'border-red-500' : ''}`}
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="mt-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                    />
                    {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                      name="gender"
                      id="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.gender ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    name="address"
                    id="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  ></textarea>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      name="role"
                      id="role"
                      value={formData.role}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.role ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select Role</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Support Staff">Support Staff</option>
                    </select>
                    {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
                  </div>
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                    <input
                      type="text"
                      name="department"
                      id="department"
                      value={formData.department}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.department ? 'border-red-500' : ''}`}
                    />
                    {errors.department && <p className="mt-1 text-sm text-red-500">{errors.department}</p>}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.startDate ? 'border-red-500' : ''}`}
                    />
                    {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
                  </div>
                  <div>
                    <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">Employment Type</label>
                    <select
                      name="employmentType"
                      id="employmentType"
                      value={formData.employmentType}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
                  <input
                    type="number"
                    name="salary"
                    id="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.salary ? 'border-red-500' : ''}`}
                  />
                  {errors.salary && <p className="mt-1 text-sm text-red-500">{errors.salary}</p>}
                </div>
                <div className="mt-4">
                  <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700">Education Level</label>
                  <input
                    type="text"
                    name="educationLevel"
                    id="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="certifications" className="block text-sm font-medium text-gray-700">Certifications</label>
                  <input
                    type="text"
                    name="certifications"
                    id="certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                        <input
                          type="text"
                          name="emergencyContact"
                          id="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div>
                        <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700">Emergency Phone</label>
                        <input
                          type="tel"
                          name="emergencyPhone"
                          id="emergencyPhone"
                          value={formData.emergencyPhone}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add Employee
                      </button>
                    </div>
                  </form>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      );
    };
    
    AddEmployeeModal.propTypes = {
      isOpen: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
      onSave: PropTypes.func.isRequired,
    };
    
    export default AddEmployeeModal;