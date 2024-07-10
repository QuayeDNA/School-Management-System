import React from 'react';
import { Listbox } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';

const gradeScales = [
  { id: 1, name: 'A-F' },
  { id: 2, name: 'Percentage' },
  { id: 3, name: 'Pass/Fail' },
];

const AcademicSettings = () => {
  const [selectedGradeScale, setSelectedGradeScale] = React.useState(gradeScales[0]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Academic Settings</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="gradeScale" className="block text-sm font-medium text-gray-700">
            Grade Scale
          </label>
          <Listbox value={selectedGradeScale} onChange={setSelectedGradeScale}>
            <div className="mt-1 relative">
              <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="block truncate">{selectedGradeScale.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FiChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {gradeScales.map((scale) => (
                  <Listbox.Option
                    key={scale.id}
                    className={({ active }) =>
                      `${
                        active ? 'text-white bg-indigo-600' : 'text-gray-900'
                      } cursor-default select-none relative py-2 pl-3 pr-9`
                    }
                    value={scale}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? 'font-semibold' : 'font-normal'
                          } block truncate`}
                        >
                          {scale.name}
                        </span>
                        {selected && (
                          <span
                            className={`${
                              active ? 'text-white' : 'text-indigo-600'
                            } absolute inset-y-0 right-0 flex items-center pr-4`}
                          >
                            <FiChevronDown className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  );
};

export default AcademicSettings;