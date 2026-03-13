import { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../admin/Sidebar';
import Header from '../admin/Header';
import { useUIStore } from '../../store/uiStore';

const AdminLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { sidebarExpanded, sidebarVisible, setSidebarExpanded, setSidebarVisible, toggleSidebar } = useUIStore();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
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

  useEffect(() => {
    document.body.style.overflow = sidebarVisible && isMobile ? 'hidden' : '';
  }, [sidebarVisible, isMobile]);

  const contentClass = useMemo(() => {
    if (isMobile) return 'flex-1 flex flex-col overflow-hidden';
    return `flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
      sidebarVisible ? (sidebarExpanded ? 'ml-64' : 'ml-20') : 'ml-0'
    }`;
  }, [isMobile, sidebarExpanded, sidebarVisible]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        onToggle={toggleSidebar}
        expanded={sidebarExpanded}
        isVisible={sidebarVisible}
        isMobile={isMobile}
      />

      {isMobile && sidebarVisible && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          aria-hidden="true"
          onClick={toggleSidebar}
        />
      )}

      <div className={contentClass}>
        <Header onMenuClick={toggleSidebar} />
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