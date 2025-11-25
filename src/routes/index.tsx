import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LacakPage from '../pages/LacakPage';
import LoginPage from '../pages/admin/LoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import ReportDetailPage from '../pages/admin/ReportDetailPage';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../components/layout/AdminLayout';
import { PublicLayout } from '../components/layout/PublicLayout'; // <-- Import

export function AppRoutes() {
  return (
    <Routes>
      {/* --- Rute Publik dengan Layout Baru --- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/lacak" element={<LacakPage />} />
      </Route>

      {/* --- Rute Admin tetap sama --- */}
      <Route path="/admin/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="report/:id" element={<ReportDetailPage />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
