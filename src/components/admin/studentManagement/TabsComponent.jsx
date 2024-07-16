import { Tab, TabPanel, TabPanels, TabList, TabGroup } from '@headlessui/react';
import PropTypes from 'prop-types';
import StudentTable from './StudentTable'; // Make sure the import path is correct

const Tabs = ({ students, handleEditStudent, handleDeleteStudent }) => (
  <TabGroup>
    <TabList className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
      <Tab className={({ selected }) =>
        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
         ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
      }>
        All Students
      </Tab>
      <Tab className={({ selected }) =>
        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
         ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
      }>
        Active
      </Tab>
      <Tab className={({ selected }) =>
        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
         ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
      }>
        Inactive
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <StudentTable students={students} onEdit={handleEditStudent} onDelete={handleDeleteStudent} />
      </TabPanel>
      <TabPanel>
        <StudentTable students={students.filter(s => s.status === 'Active')} onEdit={handleEditStudent} onDelete={handleDeleteStudent} />
      </TabPanel>
      <TabPanel>
        <StudentTable students={students.filter(s => s.status === 'Inactive')} onEdit={handleEditStudent} onDelete={handleDeleteStudent} />
      </TabPanel>
    </TabPanels>
  </TabGroup>
);

Tabs.propTypes = {
  students: PropTypes.array.isRequired,
  handleEditStudent: PropTypes.func.isRequired,
  handleDeleteStudent: PropTypes.func.isRequired
};

export default Tabs;
