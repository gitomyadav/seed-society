import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  IconHome,
  IconVideo,
  IconFileText,
  IconUsers,
  IconBook,
  IconBell,
  IconStar,
  IconLogOut,
  IconCalendar,
} from '../../components/Icons';
import './Admin.css';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-layout">
      {/* Mobile Backdrop */}
      {mobileNavOpen && (
        <div className="admin-sidebar-backdrop" onClick={() => setMobileNavOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${mobileNavOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__header">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/logo-green.png" alt="Seed Society" style={{ height: '34px', width: 'auto' }} />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="admin-badge">Admin</span>
            <button
              className="admin-sidebar__close-btn"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
        </div>

        <nav className="admin-nav" style={{ overflowY: 'auto' }}>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `admin-nav__item ${isActive ? 'admin-nav__item--active' : ''}`
            }
          >
            <IconHome size={18} />
            Overview
          </NavLink>
          <NavLink
            to="/admin/classes"
            className={({ isActive }) =>
              `admin-nav__item ${isActive ? 'admin-nav__item--active' : ''}`
            }
          >
            <IconVideo size={18} />
            Classes & Zoom
          </NavLink>
          <NavLink
            to="/admin/schedule"
            className={({ isActive }) =>
              `admin-nav__item ${isActive ? 'admin-nav__item--active' : ''}`
            }
          >
            <IconCalendar size={18} />
            Schedule Manager
          </NavLink>
          <NavLink
            to="/admin/materials"
            className={({ isActive }) =>
              `admin-nav__item ${isActive ? 'admin-nav__item--active' : ''}`
            }
          >
            <IconFileText size={18} />
            Study Materials
          </NavLink>
          <NavLink
            to="/admin/teachers"
            className={({ isActive }) =>
              `admin-nav__item ${isActive ? 'admin-nav__item--active' : ''}`
            }
          >
            <IconStar size={18} />
            Teachers & Faculty
          </NavLink>
          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              `admin-nav__item ${isActive ? 'admin-nav__item--active' : ''}`
            }
          >
            <IconBook size={18} />
            Tuition Courses
          </NavLink>
          <NavLink
            to="/admin/notices"
            className={({ isActive }) =>
              `admin-nav__item ${isActive ? 'admin-nav__item--active' : ''}`
            }
          >
            <IconBell size={18} />
            Notice Board
          </NavLink>
          <NavLink
            to="/admin/students"
            className={({ isActive }) =>
              `admin-nav__item ${isActive ? 'admin-nav__item--active' : ''}`
            }
          >
            <IconUsers size={18} />
            Enrolled Students
          </NavLink>
        </nav>

        <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--border-light)' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: 'var(--text-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
            }}
          >
            <IconLogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className="admin-topbar__toggle"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div>
              <h2 className="admin-topbar__title">
                Teacher & Administrator Portal
              </h2>
              <span className="admin-topbar__subtitle">
                Managing CEE, IOE Entrance Prep & NEB Tuition — Nepal
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div className="admin-topbar__user-info">
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
                {user?.name || 'Ram Prasad Sharma'}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--green-600)' }}>
                Lead Educator / Admin
              </div>
            </div>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-full)',
              background: 'var(--green-900)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'var(--text-sm)',
              flexShrink: 0
            }}>
              {user?.avatar || 'RS'}
            </div>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
