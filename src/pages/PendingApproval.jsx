import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const WHATSAPP_NUMBER = '9779807681123';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20just%20registered%20on%20Seed%20Society.%20Please%20activate%20my%20account.`;

export default function PendingApproval() {
  const { user, loading, refreshProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);

  // If no user is logged in, verify session before redirecting to login
  useEffect(() => {
    let mounted = true;
    if (!loading && !user) {
      refreshProfile().then(profile => {
        if (!profile && mounted) {
          navigate('/login', { replace: true });
        }
      });
    }
    return () => { mounted = false; };
  }, [loading, user, navigate, refreshProfile]);

  // Auto-check every 15 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      setChecking(true);
      await refreshProfile();
      setChecking(false);
    }, 15000);
    return () => clearInterval(interval);
  }, [refreshProfile]);

  // If status becomes active or user is admin, redirect appropriately
  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin', { replace: true });
    } else if (user?.status === 'active') {
      navigate('/dashboard', { replace: true });
    }
  }, [user?.role, user?.status, navigate]);

  const handleCheckStatus = async () => {
    setChecking(true);
    const updated = await refreshProfile();
    setChecking(false);
    if (updated?.role === 'admin') {
      navigate('/admin', { replace: true });
    } else if (updated?.status === 'active') {
      navigate('/dashboard', { replace: true });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="auth-page" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        maxWidth: 480,
        width: '100%',
        margin: '0 auto',
        padding: 'var(--space-10)',
        textAlign: 'center',
      }}>
        {/* Logo */}
        <div style={{
          width: 64,
          height: 64,
          borderRadius: 'var(--radius-xl)',
          background: 'var(--green-600)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto var(--space-6)',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z" />
          </svg>
        </div>

        {/* Status icon */}
        <div style={{
          width: 80,
          height: 80,
          borderRadius: 'var(--radius-full)',
          background: '#FEF3C7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto var(--space-6)',
          fontSize: '36px',
        }}>
          ⏳
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-3)',
        }}>
          Account Pending Approval
        </h1>

        <p style={{
          fontSize: 'var(--text-base)',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: 'var(--space-8)',
          maxWidth: 360,
          margin: '0 auto var(--space-8)',
        }}>
          Your registration is complete! To activate your account and access all classes and study materials, please contact us on WhatsApp.
        </p>

        {/* WhatsApp CTA */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 32px',
            borderRadius: 'var(--radius-xl)',
            background: '#25D366',
            color: '#fff',
            fontWeight: 700,
            fontSize: '16px',
            textDecoration: 'none',
            marginBottom: 'var(--space-4)',
            transition: 'transform 0.15s, box-shadow 0.15s',
            boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 211, 102, 0.3)'; }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Contact on WhatsApp
        </a>

        <p style={{
          fontSize: '14px',
          color: 'var(--text-tertiary)',
          marginBottom: 'var(--space-6)',
        }}>
          +977 980-7681123
        </p>

        {/* Check status button */}
        <button
          onClick={handleCheckStatus}
          disabled={checking}
          style={{
            display: 'block',
            width: '100%',
            maxWidth: 280,
            margin: '0 auto var(--space-4)',
            padding: '12px 24px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '14px',
            cursor: checking ? 'wait' : 'pointer',
            opacity: checking ? 0.7 : 1,
          }}
        >
          {checking ? 'Checking...' : 'Check Approval Status'}
        </button>

        <button
          onClick={handleLogout}
          style={{
            display: 'block',
            margin: '0 auto',
            padding: '8px 16px',
            background: 'none',
            border: 'none',
            color: 'var(--text-tertiary)',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          Sign out
        </button>

        <p style={{
          fontSize: '12px',
          color: 'var(--text-tertiary)',
          marginTop: 'var(--space-8)',
          lineHeight: 1.5,
        }}>
          Your account will be activated after confirmation. You'll be redirected automatically once approved.
        </p>
      </div>
    </div>
  );
}
