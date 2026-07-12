import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IconHome, IconBook, IconTrendingUp, IconCalendar, IconVideo, IconLogOut, IconSearch, IconBell, IconMenu, IconX, IconStar, IconUsers } from '../components/Icons';
import './Dashboard.css';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { to: '/dashboard', icon: IconHome, label: 'Overview', exact: true },
    { to: '/dashboard/courses', icon: IconStar, label: 'Courses' },
    { to: '/dashboard/classes', icon: IconVideo, label: 'Classes & Zoom' },
    { to: '/dashboard/materials', icon: IconBook, label: 'Materials' },
    { to: '/dashboard/notices', icon: IconBell, label: 'Notice Board' },
    { to: '/dashboard/schedule', icon: IconCalendar, label: 'Schedule' },
  ];

  const isActive = (path, exact) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const getPageTitle = () => {
    if (location.pathname === '/dashboard') return 'Overview';
    if (location.pathname.includes('courses')) return 'Course Catalog';
    if (location.pathname.includes('classes')) return 'Zoom Classes';
    if (location.pathname.includes('materials')) return 'Study Materials';
    if (location.pathname.includes('notices')) return 'Notice Board';
    if (location.pathname.includes('schedule')) return 'Class Schedule';
    if (location.pathname.includes('profile')) return 'My Profile';
    return 'Dashboard';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard">
      {/* Sidebar Overlay (mobile) */}
      <div
        className={`sidebar__overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar__header">
          <Link to="/" className="sidebar__logo" style={{ textDecoration: 'none' }}>
            <img src="/logo-green.png" alt="Seed Society" style={{ height: '34px', width: 'auto' }} />
          </Link>
        </div>

        <nav className="sidebar__nav">
          <div className="sidebar__section-label">Main</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`sidebar__link ${isActive(item.to, item.exact) ? 'sidebar__link--active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar__footer" style={{ position: 'relative' }}>
          {/* Popup Menu */}
          {profileMenuOpen && (
            <div className="sidebar__profile-popup" style={{
              position: 'absolute',
              bottom: '100%',
              left: '12px',
              right: '12px',
              marginBottom: '8px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-medium)',
              borderRadius: '12px',
              padding: '6px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              zIndex: 100,
            }}>
              <Link
                to="/dashboard/profile"
                onClick={() => setProfileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                Account Settings & Profile
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: 'none',
                  color: '#EF4444',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                Sign Out
              </button>
            </div>
          )}

          <div
            className="sidebar__user"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <div className="sidebar__user-avatar">{user?.avatar || 'AS'}</div>
            <div className="sidebar__user-info">
              <div className="sidebar__user-name">{user?.name || 'Student'}</div>
              <div className="sidebar__user-role">Student Portal · Click Options</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile toggle */}
      <button
        className="sidebar__mobile-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <IconX size={18} /> : <IconMenu size={18} />}
      </button>

      {/* Main Content */}
      <div className="dashboard__main">
        <header className="topbar">
          <div className="topbar__left">
            <h2 className="topbar__title">{getPageTitle()}</h2>
          </div>
        </header>

        <div className="dashboard__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
