import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../components/contexts/AuthContext';
import AdminLayout from '../components/layouts/AdminLayout';
import StudentLayout from '../components/layouts/StudentLayout';
import StaffLayout from '../components/layouts/StaffLayout';
import LandingPage from '../pages/LandingPage';
import AdminLogin from '../pages/admin/AdminLogin';
import AcademicsManagement from '../pages/admin/Academics';
import StudentLogin from '../pages/student/StudentLogin';
import StaffLogin from '../pages/staff/StaffLogin';
import AdminDashboard from '../pages/admin/Dashboard';
import Students from '../pages/admin/Students';
import Staff from '../pages/admin/Staff';
import Payroll from '../pages/admin/Payroll';
import Transactions from '../pages/admin/Transactions'
import SalesInventory from '../pages/admin/SalesAndInventory';
import ELibrary from '../pages/admin/E-Library'
import MassMessaging from '../pages/admin/MassMessaging';
import Reports from '../pages/admin/Reports';
import Settings from '../pages/admin/Settings'
import Transportation from '../pages/admin/Transportation';

import StudentDashboard from '../pages/student/Dashboard';
import StaffDashboard from '../pages/staff/Dashboard';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';



const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/staff-login" element={<StaffLogin />} />

          {/* Admin routes */}
          <Route path="/app/admin/*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="staff" element={<Staff />} />
            <Route path="academics" element={<AcademicsManagement />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="library" element={<ELibrary />} />
            <Route path="messaging" element={<MassMessaging />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="inventory" element={<SalesInventory />} />
            <Route path="transportation" element={<Transportation />} />
            {/* Add more admin-specific routes here */}
          </Route>

          {/* Student routes */}
          <Route path="/app/student/*" element={<ProtectedRoute><StudentLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<StudentDashboard />} />
            {/* Add more student-specific routes here */}
          </Route>

          {/* Staff routes */}
          <Route path="/app/staff/*" element={<ProtectedRoute><StaffLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<StaffDashboard />} />
            {/* Add more staff-specific routes here */}
          </Route>

          {/* Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};



export default AppRouter;
