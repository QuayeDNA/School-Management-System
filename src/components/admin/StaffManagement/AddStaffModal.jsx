import React, { useState } from 'react';
import { Dialog, Transition, DialogTitle, DialogBackdrop, TransitionChild } from '@headlessui/react';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaMapMarkerAlt, FaUserTie, FaBuilding, FaCalendarAlt, FaBriefcase, FaDollarSign, FaGraduationCap, FaCertificate, FaAmbulance } from 'react-icons/fa';
import PropTypes from 'prop-types';

const AddEmployeeModal = ({ isOpen, onClose, onSave }) => {
  const initialFormData = {
    firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', gender: '',
    address: '', role: '', department: '', startDate: '', employmentType: 'Full-time',
    salary: '', educationLevel: '', certifications: '', emergencyContact: '', emergencyPhone: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender', 'role', 'department', 'startDate', 'salary'];
    requiredFields.forEach(field => {
      if (!formData[field]) newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    });
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      setMessage('Employee added successfully!');
      setFormData(initialFormData);
      setTimeout(() => {
        setMessage('');
        onClose();
      }, 2000);
    } else {
      setMessage('Please correct the errors before submitting.');
    }
  };

  const renderField = (name, label, icon, options = null, type = 'text') => (
    <div className="mt-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        {options ? (
          <select
            name={name}
            id={name}
            value={formData[name]}
            onChange={handleChange}
            className={`pl-10 block w-full border p-2 rounded-md border-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors[name] ? 'border-red-500' : ''}`}
          >
            <option value="">Select {label}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={`Enter ${label.toLowerCase()}`}
            className={`pl-10 block w-full border p-2 rounded-md border-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors[name] ? 'border-red-500' : ''}`}
          />
        )}
      </div>
      {errors[name] && <p className="mt-1 text-sm text-red-500">{errors[name]}</p>}
    </div>
  );

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black opacity-30" />
        </TransitionChild>

        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
            <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Add New Employee
              </DialogTitle>
              <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-500">
                <FaTimes />
              </button>
              <form onSubmit={handleSubmit} className="mt-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {renderField('firstName', 'First Name', <FaUser className="text-gray-400" />)}
    {renderField('lastName', 'Last Name', <FaUser className="text-gray-400" />)}
    {renderField('email', 'Email', <FaEnvelope className="text-gray-400" />, null, 'email')}
    {renderField('phone', 'Phone', <FaPhone className="text-gray-400" />, null, 'tel')}
    {renderField('dateOfBirth', 'Date of Birth', <FaBirthdayCake className="text-gray-400" />, null, 'date')}
    {renderField('gender', 'Gender', <FaVenusMars className="text-gray-400" />, ['Male', 'Female', 'Other'])}
    {renderField('address', 'Address', <FaMapMarkerAlt className="text-gray-400" />)}
    {renderField('role', 'Role', <FaUserTie className="text-gray-400" />, ['Teacher', 'Administrator', 'Support Staff'])}
    {renderField('department', 'Department', <FaBuilding className="text-gray-400" />)}
    {renderField('startDate', 'Start Date', <FaCalendarAlt className="text-gray-400" />, null, 'date')}
    {renderField('employmentType', 'Employment Type', <FaBriefcase className="text-gray-400" />, ['Full-time', 'Part-time', 'Contract'])}
    {renderField('salary', 'Salary', <FaDollarSign className="text-gray-400" />, null, 'number')}
    {renderField('educationLevel', 'Education Level', <FaGraduationCap className="text-gray-400" />)}
    {renderField('certifications', 'Certifications', <FaCertificate className="text-gray-400" />)}
    {renderField('emergencyContact', 'Emergency Contact', <FaUser className="text-gray-400" />)}
    {renderField('emergencyPhone', 'Emergency Phone', <FaAmbulance className="text-gray-400" />, null, 'tel')}
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
              {message && (
                <div className={`mt-4 p-2 text-center rounded ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {message}
                </div>
              )}
            </div>
          </TransitionChild>
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