import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import PropTypes from 'prop-types';
import { FaTimes, FaUserGraduate } from 'react-icons/fa';
import { Fragment } from 'react';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  dateOfBirth: yup.date().required('Date of Birth is required').max(new Date(), 'Date of Birth cannot be in the future'),
  gender: yup.string().required('Gender is required'),
  address: yup.string().required('Address is required').min(5, 'Address must be at least 5 characters'),
  contactNumber: yup.string().required('Contact Number is required').matches(/^[0-9]+$/, 'Contact Number must be numeric').min(10, 'Contact Number must be at least 10 digits'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  guardianName: yup.string().required('Guardian Name is required').min(2, 'Guardian Name must be at least 2 characters'),
  guardianContact: yup.string().required('Guardian Contact is required').matches(/^[0-9]+$/, 'Guardian Contact must be numeric').min(10, 'Guardian Contact must be at least 10 digits'),
  grade: yup.string().required('Grade is required'),
  status: yup.string().required('Status is required'),
});

const GRADES = [
  'Creche', 'Nursery 1', 'Nursery 2', 'KG 1', 'KG 2',
  'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
  'JHS 1', 'JHS 2', 'JHS 3'
];

const StudentModal = ({ isOpen, onClose, student, onSave }) => {
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: student?.name || '',
      dateOfBirth: student?.dateOfBirth || '',
      gender: student?.gender || 'Male',
      address: student?.address || '',
      contactNumber: student?.contactNumber || '',
      email: student?.email || '',
      guardianName: student?.guardianName || '',
      guardianContact: student?.guardianContact || '',
      grade: student?.grade || '',
      status: student?.status || 'Active',
    },
  });

  const onSubmit = (data) => {
    onSave({ id: student?.id, ...data });
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between"
                >
                  <span className="flex items-center">
                    <FaUserGraduate className="mr-2 text-blue-500" />
                    {student ? 'Edit Student' : 'Add New Student'}
                  </span>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FaTimes />
                  </button>
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                  <InputField name="name" label="Name" control={control} errors={errors} />
                  <InputField name="dateOfBirth" label="Date of Birth" control={control} errors={errors} type="date" />
                  <SelectField name="gender" label="Gender" control={control} errors={errors} options={['Male', 'Female', 'Other']} />
                  <InputField name="address" label="Address" control={control} errors={errors} />
                  <InputField name="contactNumber" label="Contact Number" control={control} errors={errors} />
                  <InputField name="email" label="Email" control={control} errors={errors} type="email" />
                  <InputField name="guardianName" label="Guardian's Name" control={control} errors={errors} />
                  <InputField name="guardianContact" label="Guardian's Contact" control={control} errors={errors} />
                  <SelectField name="grade" label="Grade" control={control} errors={errors} options={GRADES} />
                  <SelectField name="status" label="Status" control={control} errors={errors} options={['Active', 'Inactive']} />

                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const InputField = ({ name, label, control, errors, type = "text" }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type={type}
          className={`mt-1 block w-full rounded-md p-2 border-2 border-gray-200 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors[name] ? 'border-red-300' : ''}`}
        />
      )}
    />
    {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>}
  </div>
);

const SelectField = ({ name, label, control, errors, options }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <select
          {...field}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors[name] ? 'border-red-300' : ''}`}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    />
    {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>}
  </div>
);

StudentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  student: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  type: PropTypes.string,
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};

export default StudentModal;