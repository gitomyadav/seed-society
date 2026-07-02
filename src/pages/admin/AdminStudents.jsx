import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { supabase } from '../../lib/supabaseClient';
import { IconTrash, IconX, IconCheckCircle } from '../../components/Icons';

export default function AdminStudents() {
  const {
    students,
    courses,
    deleteStudent,
    toggleStudentStatus,
    approveStudent,
    updateStudent,
    getStudentEnrollments,
    enrollInCourse,
    unenrollFromCourse,
  } = useData();
  const [filter, setFilter] = useState('all');

  // Modal & Edit States
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentCourses, setStudentCourses] = useState(new Set());
  const [loadingEnrollments, setLoadingEnrollments] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editGrade, setEditGrade] = useState('12');
  const [editStream, setEditStream] = useState('Science');
  const [saveMessage, setSaveMessage] = useState('');
  const [resetSending, setResetSending] = useState(false);

  const pendingCount = students.filter(s => s.status === 'pending').length;

  const filteredStudents = students.filter(stu => {
    if (filter === 'all') return true;
    return stu.status === filter;
  });

  const handleOpenProfile = async (stu) => {
    setSelectedStudent(stu);
    setEditName(stu.name || '');
    setEditPhone(stu.phone || '');
    setEditGrade(stu.grade || '12');
    setEditStream(stu.stream || 'Science');
    setSaveMessage('');
    setLoadingEnrollments(true);
    try {
      const ids = await getStudentEnrollments(stu.id);
      setStudentCourses(new Set(ids));
    } catch (e) {
      console.error('Failed to load enrollments:', e);
    } finally {
      setLoadingEnrollments(false);
    }
  };

  const handleToggleCourse = async (courseId) => {
    if (!selectedStudent) return;
    const isEnrolled = studentCourses.has(courseId);
    if (isEnrolled) {
      await unenrollFromCourse(selectedStudent.id, courseId);
      setStudentCourses(prev => {
        const next = new Set(prev);
        next.delete(courseId);
        return next;
      });
    } else {
      await enrollInCourse(selectedStudent.id, courseId);
      setStudentCourses(prev => new Set([...prev, courseId]));
    }
  };

  const handleSaveProfile = async () => {
    if (!selectedStudent) return;
    const updates = {
      name: editName,
      phone: editPhone,
      grade: editGrade,
      stream: editStream,
    };
    await updateStudent(selectedStudent.id, updates);
    setSelectedStudent(prev => ({ ...prev, ...updates }));
    setSaveMessage('Profile and course allocations saved.');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleSendResetPassword = async () => {
    if (!selectedStudent?.email) return;
    setResetSending(true);
    try {
      await supabase.auth.resetPasswordForEmail(selectedStudent.email);
      setSaveMessage('Password reset link sent to student email.');
    } catch (err) {
      setSaveMessage('Failed to send reset link.');
    } finally {
      setResetSending(false);
      setTimeout(() => setSaveMessage(''), 3500);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 'var(--space-6)' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
            Student Directory & Admissions
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Manage student records, review pending admissions, and allocate course access.
          </p>
        </div>

        {/* Filter Navigation */}
        <div style={{ display: 'flex', gap: 6, background: 'var(--bg-secondary)', padding: 4, borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: filter === 'all' ? 'var(--bg-primary)' : 'transparent',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              color: filter === 'all' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: filter === 'all' ? 'var(--shadow-xs)' : 'none',
            }}
          >
            All ({students.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: filter === 'pending' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              color: filter === 'pending' ? '#D97706' : 'var(--text-secondary)',
            }}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('active')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: filter === 'active' ? 'var(--bg-primary)' : 'transparent',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              color: filter === 'active' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: filter === 'active' ? 'var(--shadow-xs)' : 'none',
            }}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('suspended')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: filter === 'suspended' ? 'var(--bg-primary)' : 'transparent',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              color: filter === 'suspended' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: filter === 'suspended' ? 'var(--shadow-xs)' : 'none',
            }}
          >
            Suspended
          </button>
        </div>
      </div>

      <div className="admin-card">
        {filteredStudents.length === 0 ? (
          <div style={{ padding: 'var(--space-10)', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '14px' }}>
            No student accounts found under this category.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student Details</th>
                <th>Target Program</th>
                <th>WhatsApp Contact</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Management</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((stu) => (
                <tr key={stu.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: 'var(--radius-full)',
                        background: stu.status === 'pending' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        color: stu.status === 'pending' ? '#D97706' : '#10B981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        fontSize: '13px',
                      }}>
                        {stu.avatar || 'SS'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{stu.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{stu.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{stu.grade || 'Entrance Prep'}</span>
                    <span style={{ color: 'var(--text-tertiary)', marginLeft: 6 }}>({stu.stream || 'General'})</span>
                  </td>
                  <td>
                    {stu.phone ? (
                      <a
                        href={`https://wa.me/${stu.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--green-400)', fontWeight: 600, textDecoration: 'none' }}
                      >
                        {stu.phone}
                      </a>
                    ) : (
                      <span style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>Unassigned</span>
                    )}
                  </td>
                  <td>
                    {stu.status === 'pending' ? (
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(245, 158, 11, 0.15)',
                        color: '#D97706',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}>
                        Pending
                      </span>
                    ) : (
                      <button
                        onClick={() => toggleStudentStatus(stu.id)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          background: stu.status === 'active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: stu.status === 'active' ? '#10B981' : '#EF4444',
                          border: 'none',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {stu.status === 'active' ? 'Active' : 'Suspended'}
                      </button>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleOpenProfile(stu)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-medium)',
                          fontWeight: 600,
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'border-color 0.15s',
                        }}
                      >
                        Manage Account
                      </button>
                      {stu.status === 'pending' && (
                        <button
                          onClick={() => approveStudent(stu.id)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--green-600)',
                            color: '#fff',
                            border: 'none',
                            fontWeight: 600,
                            fontSize: '12px',
                            cursor: 'pointer',
                          }}
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => deleteStudent(stu.id)}
                        className="admin-action-btn admin-action-btn--danger"
                        title="Remove record"
                      >
                        <IconTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modern Student Management Modal */}
      {selectedStudent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 24,
        }}>
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-2xl)',
            width: '100%',
            maxWidth: '640px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {selectedStudent.name}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: 2 }}>
                  {selectedStudent.email}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 4 }}
              >
                <IconX size={20} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {saveMessage && (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10B981',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '13px',
                  fontWeight: 600,
                }}>
                  {saveMessage}
                </div>
              )}

              {/* Account Information & Contact */}
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '14px', color: 'var(--text-primary)' }}>
                  Profile Information
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Full Name</label>
                    <input
                      type="text"
                      className="input"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>WhatsApp / Phone Number</label>
                    <input
                      type="text"
                      className="input"
                      value={editPhone}
                      placeholder="+977 980-0000000"
                      onChange={(e) => setEditPhone(e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Target Program / Exam</label>
                    <input
                      type="text"
                      className="input"
                      value={editGrade}
                      placeholder="e.g. CEE Medical / IOE Engineering"
                      onChange={(e) => setEditGrade(e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Stream / Category</label>
                    <input
                      type="text"
                      className="input"
                      value={editStream}
                      placeholder="e.g. Science / Entrance"
                      onChange={(e) => setEditStream(e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Course Allocations */}
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                  Enrolled Courses
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '14px' }}>
                  Assigned courses give the student immediate access to corresponding study notes and Zoom classes.
                </p>

                {loadingEnrollments ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '13px' }}>Loading course permissions...</div>
                ) : courses.length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '13px' }}>No courses available in catalog.</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto' }}>
                    {courses.map((crs) => {
                      const isAssigned = studentCourses.has(crs.id);
                      return (
                        <div key={crs.id} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          background: isAssigned ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-secondary)',
                          border: `1px solid ${isAssigned ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-light)'}`,
                          borderRadius: 'var(--radius-lg)',
                        }}>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
                              {crs.title}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                              {crs.subject} • {crs.grade}
                            </div>
                          </div>

                          <button
                            onClick={() => handleToggleCourse(crs.id)}
                            style={{
                              padding: '6px 14px',
                              borderRadius: 'var(--radius-md)',
                              background: isAssigned ? '#10B981' : 'transparent',
                              border: isAssigned ? '1px solid #10B981' : '1px solid var(--border-medium)',
                              color: isAssigned ? '#fff' : 'var(--text-secondary)',
                              fontWeight: 600,
                              fontSize: '12px',
                              cursor: 'pointer',
                              minWidth: '100px',
                            }}
                          >
                            {isAssigned ? 'Allocated' : 'Grant Access'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Security Actions */}
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>Password Reset</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Send recovery link to student email</div>
                </div>
                <button
                  onClick={handleSendResetPassword}
                  disabled={resetSending}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'transparent',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  {resetSending ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </div>

            {/* Footer Actions */}
            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
            }}>
              <button
                onClick={() => setSelectedStudent(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'transparent',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                style={{
                  padding: '8px 20px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--green-600)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
