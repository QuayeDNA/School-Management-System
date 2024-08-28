import React from 'react';
import { Dialog, DialogTitle, DialogBackdrop, Transition, TransitionChild } from '@headlessui/react';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import propTypes from 'prop-types';

const ViewPayslip = ({ employee, onClose }) => {
  return (
    <Transition appear show={true} as={React.Fragment}>
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

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                <FaFileInvoiceDollar className="mr-2" /> Payslip for {employee?.name}
              </DialogTitle>
              <div className="mt-2 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Employee ID: {employee?.id}</p>
                  <p className="text-sm text-gray-500">Role: {employee?.role}</p>
                  <p className="text-sm text-gray-500">Salary: ${employee?.salary?.toFixed(2) ?? '0.00'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pay Period: {employee?.payPeriod}</p>
                  <p className="text-sm text-gray-500">Hours Worked: {employee?.hoursWorked}</p>
                  <p className="text-sm text-gray-500">Overtime Hours: {employee?.overtimeHours}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gross Pay: ${employee?.grossPay?.toFixed(2) ?? '0.00'}</p>
                  <p className="text-sm text-gray-500">Deductions: ${employee?.deductions?.toFixed(2) ?? '0.00'}</p>
                  <p className="text-sm text-gray-500">Net Pay: ${employee?.netPay?.toFixed(2) ?? '0.00'}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}

ViewPayslip.propTypes = {
  employee: propTypes.object.isRequired,
  onClose: propTypes.func.isRequired
};

export default ViewPayslip;