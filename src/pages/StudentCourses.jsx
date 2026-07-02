import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { SubjectIcon, IconBook, IconCheckCircle } from '../components/Icons';

export default function StudentCourses() {
  const { courses, getStudentEnrollments } = useData();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());

  useEffect(() => {
    let mounted = true;
    async function fetchEnrollments() {
      if (user?.id) {
        const ids = await getStudentEnrollments(user.id);
        if (mounted) setEnrolledCourses(new Set(ids));
      }
    }
    fetchEnrollments();
    return () => { mounted = false; };
  }, [user?.id, getStudentEnrollments]);

  const handleEnrollRequest = (crs) => {
    const phone = '9779807681123';
    const studentName = user?.name || 'a student';
    const studentEmail = user?.email || '';
    const message = `Hi Seed Society Admin! I am ${studentName} (${studentEmail}). I want to enroll in the course: "${crs.title}" (${crs.subject}). Please assign this course to my profile!`;
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const filtered = courses.filter((c) => {
    return c.title.toLowerCase().includes(search.toLowerCase()) || (c.subject && c.subject.toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
            Entrance & Preparation Course Catalog
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Explore available entrance preparation programs. Click to request course assignment via WhatsApp.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          <input
            type="text"
            className="input"
            placeholder="Search course title or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 280, padding: '8px 14px' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
        {filtered.map((crs) => {
          const isEnrolled = enrolledCourses.has(crs.id);
          return (
            <div key={crs.id} style={{
              background: 'var(--bg-primary)',
              border: `1px solid ${isEnrolled ? 'var(--green-400)' : 'var(--border-light)'}`,
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'var(--space-5)',
              boxShadow: isEnrolled ? '0 8px 24px rgba(22, 163, 74, 0.08)' : 'var(--shadow-xs)',
              transition: 'all 0.2s ease',
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                  <SubjectIcon subject={crs.subject} size={24} />
                  <span className="badge badge--green">
                    {crs.subject || 'Preparation'}
                  </span>
                </div>

                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
                  {crs.title}
                </h4>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {crs.description}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)' }}>
                <button
                  onClick={() => handleEnrollRequest(crs)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-xl)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: 'var(--text-sm)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    border: 'none',
                    background: isEnrolled ? 'var(--green-50)' : 'var(--green-600)',
                    color: isEnrolled ? 'var(--green-700)' : '#fff',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isEnrolled ? (
                    <>
                      <IconCheckCircle size={16} />
                      Assigned to Profile
                    </>
                  ) : (
                    <>
                      <IconBook size={16} />
                      Enroll via WhatsApp →
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
