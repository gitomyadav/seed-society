import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) return null;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/#features', label: 'Features' },
    { to: '/#subjects', label: 'Subjects' },
    { to: '/#testimonials', label: 'Testimonials' },
  ];

  const handleNavClick = (e, to) => {
    if (to.includes('#')) {
      e.preventDefault();
      const id = to.split('#')[1];
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            <div className="navbar__logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z" />
              </svg>
            </div>
            <span className="navbar__logo-text">Seed<span>Society</span></span>
          </Link>

          <div className="navbar__links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar__link ${location.pathname === link.to && !link.to.includes('#') ? 'navbar__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, link.to)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar__actions">
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn--secondary btn--sm">
                  Dashboard
                </Link>
                <button onClick={logout} className="btn btn--ghost btn--sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn--ghost">Login</Link>
                <Link to="/register" className="btn btn--primary">
                  Get Started
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </>
            )}
          </div>

          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </nav>

      <div className={`navbar__mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="navbar__mobile-link"
            onClick={(e) => handleNavClick(e, link.to)}
          >
            {link.label}
          </Link>
        ))}
        <div className="navbar__mobile-actions">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn--primary btn--lg" style={{ width: '100%' }}>
                Dashboard
              </Link>
              <button onClick={logout} className="btn btn--outline btn--lg" style={{ width: '100%' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--outline btn--lg" style={{ width: '100%' }}>
                Login
              </Link>
              <Link to="/register" className="btn btn--primary btn--lg" style={{ width: '100%' }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
