import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../components/contexts/AuthContext';
import AdminLayout from '../components/layouts/AdminLayout';
import LandingPage from '../pages/LandingPage';
import AdminLogin from '../pages/admin/AdminLogin';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import Loading from '../components/LoadingPage';
import ComingSoon from '../components/ComingSoon';

// Lazy load admin components
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const Students = lazy(() => import('../pages/admin/Students'));
const Staff = lazy(() => import('../pages/admin/Staff'));
const AcademicsManagement = lazy(() => import('../pages/admin/Academics'));
const Payroll = lazy(() => import('../pages/admin/Payroll'));
const Transactions = lazy(() => import('../pages/admin/Transactions'));
const ELibrary = lazy(() => import('../pages/admin/E-Library'));
const MassMessaging = lazy(() => import('../pages/admin/MassMessaging'));
const Reports = lazy(() => import('../pages/admin/Reports'));
const Settings = lazy(() => import('../pages/admin/Settings'));
const SalesInventory = lazy(() => import('../pages/admin/SalesAndInventory'));
const Transportation = lazy(() => import('../pages/admin/Transportation'));

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            
            {/* Student and Staff login routes now lead to ComingSoon */}
            <Route path="/student-login" element={<ComingSoon />} />
            <Route path="/staff-login" element={<ComingSoon />} />

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
            </Route>

            {/* Student and Staff routes now lead to ComingSoon */}
            <Route path="/app/student/*" element={<ComingSoon />} />
            <Route path="/app/staff/*" element={<ComingSoon />} />

            {/* Not Found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;