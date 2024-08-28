import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../admin/Sidebar';
import Header from '../admin/Header';

const AdminLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Function to handle sidebar toggle
  const handleSidebarToggle = () => {
    if (window.innerWidth < 768) {
      setSidebarVisible(!sidebarVisible);
    } else {
      setSidebarExpanded(!sidebarExpanded);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarExpanded(false);
        setSidebarVisible(false);
      } else if (window.innerWidth < 1024) {
        setSidebarExpanded(false);
        setSidebarVisible(true);
      } else {
        setSidebarExpanded(true);
        setSidebarVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);

    // Check the initial window width
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onToggle={handleSidebarToggle} expanded={sidebarExpanded} isVisible={sidebarVisible} />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarVisible ? (sidebarExpanded ? 'ml-64' : 'ml-20') : 'ml-0'}`}>
        <Header onMenuClick={handleSidebarToggle} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 mt-2">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;