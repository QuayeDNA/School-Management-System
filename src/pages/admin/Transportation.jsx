import React, { useState } from 'react';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { FaBus, FaRoute, FaUserTie, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import { useBuses, useRoutes, useDrivers, useAddBus, useAddRoute, useAddDriver } from '../../hooks/useTransportation';

const TransportationManagement = () => {
  const { data: buses = [] } = useBuses();
  const { data: routes = [] } = useRoutes();
  const { data: drivers = [] } = useDrivers();

  const addBusMutation = useAddBus();
  const addRouteMutation = useAddRoute();
  const addDriverMutation = useAddDriver();

  const [selectedTab, setSelectedTab] = useState('buses');

  const handleAddBus = async () => {
    await addBusMutation.mutateAsync({
      number: `SB-${Date.now()}`,
      capacity: 40,
      driver: 'New Driver',
      route: 'Route A',
      status: 'Active',
    });
    toast('New bus added', { icon: '🚌' });
  };

  const handleAddRoute = async () => {
    await addRouteMutation.mutateAsync({
      name: `Route ${Date.now()}`,
      stops: ['Stop 1', 'Stop 2'],
      assignedBus: buses[0]?.number ?? '',
    });
    toast('New route added', { icon: '🗺️' });
  };

  const handleAddDriver = async () => {
    await addDriverMutation.mutateAsync({
      name: `Driver ${Date.now()}`,
      license: `DL-${Math.floor(Math.random() * 100000)}`,
      phone: '000-000-0000',
      assignedBus: buses[0]?.number ?? '',
    });
    toast('New driver added', { icon: '👨‍✈️' });
  };

  const handleScheduleMaintenance = (busId) => {
    toast(`Schedule maintenance for bus ${busId} not implemented yet`, { icon: '🛠️' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Transportation Management</h2>
      <TabGroup selectedIndex={['buses', 'routes', 'drivers'].indexOf(selectedTab)} onChange={(index) => setSelectedTab(['buses', 'routes', 'drivers'][index])}>
        <TabList className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
          <Tab className={({ selected }) => `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`}>
            <FaBus className="inline-block mr-2" /> Buses
          </Tab>
          <Tab className={({ selected }) => `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`}>
            <FaRoute className="inline-block mr-2" /> Routes
          </Tab>
          <Tab className={({ selected }) => `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`}>
            <FaUserTie className="inline-block mr-2" /> Drivers
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">School Buses</h3>
              <button onClick={handleAddBus} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Add New Bus
              </button>
            </div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Bus Number</th>
                  <th className="py-2 px-4 border-b">Capacity</th>
                  <th className="py-2 px-4 border-b">Driver</th>
                  <th className="py-2 px-4 border-b">Route</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {buses.map((bus) => (
                  <tr key={bus.id}>
                    <td className="py-2 px-4 border-b">{bus.number}</td>
                    <td className="py-2 px-4 border-b">{bus.capacity}</td>
                    <td className="py-2 px-4 border-b">{bus.driver}</td>
                    <td className="py-2 px-4 border-b">{bus.route}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs ${bus.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {bus.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => handleScheduleMaintenance(bus.id)} className="text-blue-500 hover:text-blue-700">
                        <FaCalendarAlt className="inline-block mr-1" /> Schedule Maintenance
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Bus Routes</h3>
              <button onClick={handleAddRoute} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Add New Route
              </button>
            </div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Route Name</th>
                  <th className="py-2 px-4 border-b">Stops</th>
                  <th className="py-2 px-4 border-b">Assigned Bus</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route) => (
                  <tr key={route.id}>
                    <td className="py-2 px-4 border-b">{route.name}</td>
                    <td className="py-2 px-4 border-b">{route.stops.join(', ')}</td>
                    <td className="py-2 px-4 border-b">{route.assignedBus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Bus Drivers</h3>
              <button onClick={handleAddDriver} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Add New Driver
              </button>
            </div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">License Number</th>
                  <th className="py-2 px-4 border-b">Phone</th>
                  <th className="py-2 px-4 border-b">Assigned Bus</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td className="py-2 px-4 border-b">{driver.name}</td>
                    <td className="py-2 px-4 border-b">{driver.license}</td>
                    <td className="py-2 px-4 border-b">{driver.phone}</td>
                    <td className="py-2 px-4 border-b">{driver.assignedBus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <div className="mt-8 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
        <p className="font-bold flex items-center"><FaExclamationTriangle className="mr-2" /> Maintenance Alert</p>
        <p>Bus SB-002 is due for maintenance in 3 days. Please schedule service.</p>
      </div>
    </div>
  );
};

export default TransportationManagement;