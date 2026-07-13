import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    grade: '',
    stream: '',
    agreeTerms: false,
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError('Please fill in all required fields including WhatsApp number.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!formData.agreeTerms) {
      setError('Please agree to the terms and conditions.');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      navigate('/pending');
    } else {
      setError(result.error || 'Failed to create account.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth__visual">
        <div className="auth__visual-content">
          <div className="auth__visual-logo">
            <div className="auth__visual-logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z" />
              </svg>
            </div>
            <span className="auth__visual-logo-text">Seed<span>Society</span></span>
          </div>

          <div className="auth__visual-illustration">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22V8" />
              <path d="M5 12H2a10 10 0 0020 0h-3" />
              <path d="M12 2a5 5 0 015 5H7a5 5 0 015-5z" />
            </svg>
          </div>

          <h2 className="auth__visual-title">Begin your journey</h2>
          <p className="auth__visual-text">
            Join ambitious students who are learning, growing, and preparing for CEE, IOE entrance exams and NEB boards.
          </p>

          <div className="auth__visual-stats">
            <div className="auth__visual-stat">
              <div className="auth__visual-stat-label">500+ Students</div>
            </div>
            <div className="auth__visual-stat">
              <div className="auth__visual-stat-label">Grade 11 & 12</div>
            </div>
            <div className="auth__visual-stat">
              <div className="auth__visual-stat-label">CEE & IOE Prep</div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth__form-side">
        <div className="auth__form-container">
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <Link to="/" style={{ color: 'var(--green-600)', fontWeight: 600, fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              ← Back to Home
            </Link>
          </div>
          <div className="auth__form-header">
            <h1 className="auth__form-title">Create your account</h1>
            <p className="auth__form-subtitle">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>

          <button className="auth__google-btn" type="button" onClick={loginWithGoogle}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>

          <div className="auth__divider">
            <span className="auth__divider-text">or register with email</span>
          </div>

          <form className="auth__form" onSubmit={handleSubmit}>
            {error && (
              <div className="auth__error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                {error}
              </div>
            )}

            <div className="input-group">
              <label htmlFor="reg-name">Full Name</label>
              <input
                id="reg-name"
                name="name"
                type="text"
                className="input"
                placeholder="e.g. Aarav Sharma"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="reg-email">Email address</label>
              <input
                id="reg-email"
                name="email"
                type="email"
                className="input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="reg-phone">WhatsApp Contact Number</label>
              <input
                id="reg-phone"
                name="phone"
                type="tel"
                className="input"
                placeholder="e.g. +977 980-0000000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="auth__form-row">
              <div className="input-group">
                <label htmlFor="reg-grade">Target Exam / Course</label>
                <select
                  id="reg-grade"
                  name="grade"
                  className="select"
                  value={formData.grade}
                  onChange={handleChange}
                >
                  <option value="">Select target</option>
                  <option value="IOE Preparation">IOE Engineering Entrance</option>
                  <option value="CEE Preparation">CEE Medical Entrance</option>
                  <option value="Bridge Course">Bridge Course for Class 11</option>
                  <option value="Grade 11">Grade 11 (NEB Board)</option>
                  <option value="Grade 12">Grade 12 (NEB Board)</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="reg-stream">Stream</label>
                <select
                  id="reg-stream"
                  name="stream"
                  className="select"
                  value={formData.stream}
                  onChange={handleChange}
                >
                  <option value="">Select stream</option>
                  <option value="Science">Science</option>
                  <option value="Management">Management</option>
                  <option value="Humanities">Humanities</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="reg-password">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="reg-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="input"
                  style={{ width: '100%', paddingRight: '44px' }}
                  placeholder="Min. 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-tertiary)',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="reg-confirm-password">Confirm Password</label>
              <input
                id="reg-confirm-password"
                name="confirmPassword"
                type="password"
                className="input"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <label className="auth__checkbox">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              I agree to the <a href="#" style={{ color: 'var(--green-600)', fontWeight: 500 }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--green-600)', fontWeight: 500 }}>Privacy Policy</a>
            </label>

            <button type="submit" className="auth__submit-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
