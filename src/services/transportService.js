// Simple in-memory store for transportation-related data.
// This is a placeholder until a real persistence layer is implemented.

let buses = [
  { id: 1, number: 'SB-001', capacity: 40, driver: 'John Doe', route: 'Route A', status: 'Active' },
  { id: 2, number: 'SB-002', capacity: 35, driver: 'Jane Smith', route: 'Route B', status: 'Maintenance' },
  { id: 3, number: 'SB-003', capacity: 45, driver: 'Mike Johnson', route: 'Route C', status: 'Active' },
];

let routes = [
  { id: 1, name: 'Route A', stops: ['Stop 1', 'Stop 2', 'Stop 3'], assignedBus: 'SB-001' },
  { id: 2, name: 'Route B', stops: ['Stop 4', 'Stop 5', 'Stop 6'], assignedBus: 'SB-002' },
  { id: 3, name: 'Route C', stops: ['Stop 7', 'Stop 8', 'Stop 9'], assignedBus: 'SB-003' },
];

let drivers = [
  { id: 1, name: 'John Doe', license: 'DL-12345', phone: '123-456-7890', assignedBus: 'SB-001' },
  { id: 2, name: 'Jane Smith', license: 'DL-67890', phone: '234-567-8901', assignedBus: 'SB-002' },
  { id: 3, name: 'Mike Johnson', license: 'DL-54321', phone: '345-678-9012', assignedBus: 'SB-003' },
];

export const transportService = {
  listBuses: () => Promise.resolve([...buses]),
  addBus: (bus) => {
    const newBus = { id: Date.now(), ...bus };
    buses.push(newBus);
    return Promise.resolve(newBus);
  },
  updateBus: (id, data) => {
    buses = buses.map((bus) => (bus.id === id ? { ...bus, ...data } : bus));
    return Promise.resolve();
  },
  deleteBus: (id) => {
    buses = buses.filter((bus) => bus.id !== id);
    return Promise.resolve();
  },

  listRoutes: () => Promise.resolve([...routes]),
  addRoute: (route) => {
    const newRoute = { id: Date.now(), ...route };
    routes.push(newRoute);
    return Promise.resolve(newRoute);
  },

  listDrivers: () => Promise.resolve([...drivers]),
  addDriver: (driver) => {
    const newDriver = { id: Date.now(), ...driver };
    drivers.push(newDriver);
    return Promise.resolve(newDriver);
  },
};
