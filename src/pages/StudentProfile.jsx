import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { IconCheck, IconShield } from '../components/Icons';

export default function StudentProfile() {
  const { user, refreshProfile } = useAuth();
  const [name, setName] = useState(user?.name || 'Student');
  const [email, setEmail] = useState(user?.email || '');
  const [grade, setGrade] = useState(user?.grade || 12);
  const [stream, setStream] = useState(user?.stream || 'Science');
  const [phone, setPhone] = useState(user?.phone || '+977 980-0000000');
  const [address, setAddress] = useState('Nepal');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [resetMsg, setResetMsg] = useState('');
  const [resetErr, setResetErr] = useState('');

  const handleResetPassword = async () => {
    setResetMsg('');
    setResetErr('');
    const targetEmail = email || user?.email;
    if (!targetEmail) {
      setResetErr('No verified email address found on account.');
      return;
    }
    try {
      const { error: rErr } = await supabase.auth.resetPasswordForEmail(targetEmail, {
        redirectTo: window.location.origin + '/login',
      });
      if (rErr) {
        setResetErr(rErr.message);
      } else {
        setResetMsg(`Password reset instructions sent to ${targetEmail}`);
      }
    } catch (err) {
      setResetErr(err.message || 'Failed to trigger reset.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    if (user?.id) {
      const { error: updErr } = await supabase.from('profiles').update({
        name,
        grade,
        stream,
        phone,
      }).eq('id', user.id);

      if (updErr) {
        setError(updErr.message);
      } else {
        await refreshProfile();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }

    setSaving(false);
  };

  return (
    <>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
          My Student Account & Profile
        </h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Manage your academic profile, entrance preparation targets, contact details, and account security.
        </p>
      </div>

      <div className="profile-form__grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-8)' }}>
        {/* Profile Summary Card */}
        <div style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          height: 'fit-content',
        }}>
          <div style={{
            width: 88,
            height: 88,
            borderRadius: 'var(--radius-full)',
            background: 'var(--green-900)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '32px',
            marginBottom: 'var(--space-4)',
          }}>
            {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>

          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 4 }}>
            {name}
          </h4>
          <span className="badge badge--green" style={{ marginBottom: 'var(--space-4)' }}>
            Grade {grade} · {stream} Stream
          </span>

          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>
            Enrolled in Seed Society CEE & IOE Entrance Preparation.
          </p>

          <div style={{ width: '100%', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Status</span>
            <span style={{ color: 'var(--green-600)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
              <IconShield size={14} /> {user?.status === 'active' ? 'Active Scholar' : 'Verified'}
            </span>
          </div>
        </div>

        {/* Right Forms Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Edit Form */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-8)',
          }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-6)' }}>
              Edit Personal Details
            </h4>

            {error && (
              <div style={{
                background: '#FEE2E2',
                color: '#991B1B',
                padding: '12px 16px',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--space-6)',
                fontWeight: 600,
                fontSize: '14px',
              }}>
                {error}
              </div>
            )}

            {saved && (
              <div style={{
                background: '#DCFCE7',
                color: '#166534',
                padding: '12px 16px',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--space-6)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontWeight: 600,
                fontSize: '14px',
              }}>
                <IconCheck size={18} /> Profile successfully updated in database!
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div className="profile-form__grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div className="input-group">
                  <label>Full Student Name</label>
                  <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="input-group">
                  <label>Email Address</label>
                  <input type="email" className="input" value={email} disabled style={{ opacity: 0.6 }} />
                </div>
              </div>

              <div className="profile-form__grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div className="input-group">
                  <label>Target Exam / Course</label>
                  <select className="input" value={grade} onChange={(e) => setGrade(e.target.value)} style={{ padding: '10px' }}>
                    <option value="IOE Preparation">IOE Engineering Entrance</option>
                    <option value="CEE Preparation">CEE Medical Entrance</option>
                    <option value="Bridge Course">Bridge Course for Class 11</option>
                    <option value="Grade 11">Grade 11 (NEB Board)</option>
                    <option value="Grade 12">Grade 12 (NEB Board)</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Academic Stream</label>
                  <select className="input" value={stream} onChange={(e) => setStream(e.target.value)} style={{ padding: '10px' }}>
                    <option value="Science">Science Stream</option>
                    <option value="Management">Management Stream</option>
                  </select>
                </div>
              </div>

              <div className="profile-form__grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div className="input-group">
                  <label>WhatsApp Contact Number</label>
                  <input type="text" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="input-group">
                  <label>Address / Location</label>
                  <input type="text" className="input" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
                <button type="submit" className="btn" disabled={saving} style={{ background: 'var(--green-600)', color: '#fff', padding: '12px 28px', opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'Saving to Database...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </div>

          {/* Account Security & Password Reset */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-8)',
          }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
              Account Security & Credentials
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
              Need to update your account login credentials? Request an official secure password reset email link.
            </p>

            {resetErr && (
              <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: '14px', fontSize: '13px', fontWeight: 600 }}>
                {resetErr}
              </div>
            )}
            {resetMsg && (
              <div style={{ background: '#DCFCE7', color: '#166534', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: '14px', fontSize: '13px', fontWeight: 600 }}>
                {resetMsg}
              </div>
            )}

            <button
              type="button"
              onClick={handleResetPassword}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-lg)',
                background: 'transparent',
                border: '1px solid var(--green-600)',
                color: 'var(--green-600)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Send Password Reset Link
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
