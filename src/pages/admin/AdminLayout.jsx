import { Outlet, NavLink, useNavigate } from 'react-router-dom';
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
  IconExternalLink,
  IconCalendar,
} from '../../components/Icons';
import './Admin.css';

export default function AdminLayout() {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSwitchToStudent = () => {
    switchRole('student');
    navigate('/dashboard');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/logo-green.png" alt="Seed Society" style={{ height: '34px', width: 'auto' }} />
          </Link>
          <span className="admin-badge">Admin</span>
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
            onClick={handleSwitchToStudent}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--green-50)',
              color: 'var(--green-700)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: 'var(--text-xs)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginBottom: '8px',
            }}
          >
            <IconExternalLink size={15} />
            Switch to Student View
          </button>

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
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>
              Teacher & Administrator Portal
            </h2>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
              Managing CEE, IOE Entrance Prep & NEB Tuition — Nepal
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ textAlign: 'right' }}>
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
