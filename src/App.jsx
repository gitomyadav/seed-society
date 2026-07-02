import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import PendingApproval from './pages/PendingApproval';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import DashboardLayout from './pages/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import Materials from './pages/Materials';
import Schedule from './pages/Schedule';
import Classes from './pages/Classes';
import StudentCourses from './pages/StudentCourses';
import StudentNotices from './pages/StudentNotices';
import StudentProfile from './pages/StudentProfile';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminClasses from './pages/admin/AdminClasses';
import AdminMaterials from './pages/admin/AdminMaterials';
import AdminStudents from './pages/admin/AdminStudents';
import AdminTeachers from './pages/admin/AdminTeachers';
import AdminCourses from './pages/admin/AdminCourses';
import AdminNotices from './pages/admin/AdminNotices';
import AdminSchedule from './pages/admin/AdminSchedule';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--bg-secondary)',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--green-100)',
          borderTopColor: 'var(--green-600)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is pending, redirect to pending page
  if (user.status === 'pending') {
    return <Navigate to="/pending" replace />;
  }

  return children;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--bg-secondary)',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--green-100)',
          borderTopColor: 'var(--green-600)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin-login" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;

  return children;
}

function PublicLayout({ children, showNavbar = true, showFooter = true }) {
  return (
    <>
      {showNavbar && <Navbar />}
      {children}
      {showFooter && <Footer />}
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Landing />
          </PublicLayout>
        }
      />
      <Route
        path="/login"
        element={
          <PublicLayout showNavbar={false} showFooter={false}>
            <Login />
          </PublicLayout>
        }
      />
      <Route
        path="/register"
        element={
          <PublicLayout showNavbar={false} showFooter={false}>
            <Register />
          </PublicLayout>
        }
      />
      <Route
        path="/pending"
        element={
          <PublicLayout showNavbar={false} showFooter={false}>
            <PendingApproval />
          </PublicLayout>
        }
      />
      <Route
        path="/privacy"
        element={
          <PublicLayout showFooter={true}>
            <Privacy />
          </PublicLayout>
        }
      />
      <Route
        path="/terms"
        element={
          <PublicLayout showFooter={true}>
            <Terms />
          </PublicLayout>
        }
      />

      {/* Admin Login Route */}
      <Route
        path="/admin-login"
        element={
          <PublicLayout showNavbar={false} showFooter={false}>
            <AdminLogin />
          </PublicLayout>
        }
      />

      {/* Protected Student Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="materials" element={<Materials />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="classes" element={<Classes />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="notices" element={<StudentNotices />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* Protected Admin Portal Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="classes" element={<AdminClasses />} />
        <Route path="schedule" element={<AdminSchedule />} />
        <Route path="materials" element={<AdminMaterials />} />
        <Route path="teachers" element={<AdminTeachers />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="notices" element={<AdminNotices />} />
        <Route path="students" element={<AdminStudents />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
