import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { FaExclamationTriangle, FaExclamationCircle, FaInfoCircle, FaSearch, FaDownload, FaSync, FaFilter, FaCalendar } from 'react-icons/fa';
import { format } from 'date-fns';

const ReportsPage = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    // Fetch logs from API
    fetchLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [logs, searchTerm, selectedSeverity, dateRange]);

  const fetchLogs = () => {
    // Simulated API call
    const mockLogs = [
      { id: 1, timestamp: '2024-07-10T10:30:00Z', severity: 'Error', message: 'Database connection failed', component: 'Database' },
      { id: 2, timestamp: '2024-07-10T11:15:00Z', severity: 'Warning', message: 'High memory usage detected', component: 'System' },
      { id: 3, timestamp: '2024-07-10T12:00:00Z', severity: 'Info', message: 'User login successful', component: 'Authentication' },
      // Add more mock logs here
    ];
    setLogs(mockLogs);
  };

  const filterLogs = () => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.component.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSeverity !== 'All') {
      filtered = filtered.filter(log => log.severity === selectedSeverity);
    }

    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= new Date(dateRange.start) && logDate <= new Date(dateRange.end);
      });
    }

    setFilteredLogs(filtered);
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'Error':
        return <FaExclamationCircle className="text-red-500" />;
      case 'Warning':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'Info':
        return <FaInfoCircle className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'Error':
        return 'bg-red-100 text-red-800';
      case 'Warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'Info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">System Reports</h1>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search logs..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex gap-4">
          <select
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
          >
            <option value="All">All Severities</option>
            <option value="Error">Error</option>
            <option value="Warning">Warning</option>
            <option value="Info">Info</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors">
            <FaSync className="mr-2" /> Refresh
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition-colors">
            <FaDownload className="mr-2" /> Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Log Viewer</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Timestamp</th>
                <th className="py-2 px-4 text-left">Severity</th>
                <th className="py-2 px-4 text-left">Component</th>
                <th className="py-2 px-4 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}</td>
                  <td className="py-2 px-4">
                    <span className={`flex items-center ${getSeverityClass(log.severity)} px-2 py-1 rounded-full text-xs`}>
                      {getSeverityIcon(log.severity)}
                      <span className="ml-1">{log.severity}</span>
                    </span>
                  </td>
                  <td className="py-2 px-4">{log.component}</td>
                  <td className="py-2 px-4">{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Log Statistics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Logs</span>
              <span className="font-bold">{logs.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Errors</span>
              <span className="font-bold text-red-500">{logs.filter(log => log.severity === 'Error').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Warnings</span>
              <span className="font-bold text-yellow-500">{logs.filter(log => log.severity === 'Warning').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Info</span>
              <span className="font-bold text-blue-500">{logs.filter(log => log.severity === 'Info').length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Date Range Filter</h2>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              onClick={filterLogs}
            >
              <FaFilter className="mr-2" /> Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;