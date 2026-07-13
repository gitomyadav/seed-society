import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { IconPlus, IconTrash, IconX } from '../../components/Icons';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AdminSchedule() {
  const { classes = [], courses = [], addClass, deleteClass } = useData();
  const [showModal, setShowModal] = useState(false);

  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [subject, setSubject] = useState('Physics');
  const [day, setDay] = useState('Sunday');
  const [time, setTime] = useState('06:00 AM - 07:30 AM');
  const [teacher, setTeacher] = useState('Lokesh Jha');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !time) return;

    await addClass({
      subject,
      topic: subject,
      teacher,
      date: day,
      time,
      course_id: selectedCourseId || null,
      courseId: selectedCourseId || null,
      status: 'scheduled',
    });

    setSelectedCourseId('');
    setShowModal(false);
  };

  return (
    <>
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
            Weekly Class Schedule Manager
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Schedule academic subjects, dates/days, and timings synced directly with the student dashboard.
          </p>
        </div>

        <button
          className="btn"
          onClick={() => setShowModal(true)}
          style={{ background: 'var(--green-600)', color: '#fff' }}
        >
          <IconPlus size={16} />
          Add Schedule Entry
        </button>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Day / Date</th>
              <th>Time Slot (NPT)</th>
              <th>Subject</th>
              <th>Assigned Faculty</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-tertiary)' }}>
                  No class schedule entries found. Click "Add Schedule Entry" above to create one.
                </td>
              </tr>
            ) : (
              classes.map((cls) => {
                const targetCourse = courses.find(c => c.id === (cls.course_id || cls.courseId));
                return (
                <tr key={cls.id}>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    {cls.date || 'Sunday'}
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--green-600)' }}>
                    {cls.time || '06:00 AM'}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{cls.subject || cls.topic || 'General Tuition'}</div>
                    {targetCourse ? (
                      <span style={{ fontSize: '11px', background: 'var(--green-50)', color: 'var(--green-700)', padding: '2px 8px', borderRadius: 12, fontWeight: 600, display: 'inline-block', marginTop: 4 }}>
                        Course: {targetCourse.title}
                      </span>
                    ) : (
                      <span style={{ fontSize: '11px', background: 'var(--neutral-100)', color: 'var(--text-tertiary)', padding: '2px 8px', borderRadius: 12, fontWeight: 600, display: 'inline-block', marginTop: 4 }}>
                        Open to All Students
                      </span>
                    )}
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    {cls.teacher || 'Faculty Team'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => deleteClass(cls.id)}
                      className="admin-action-btn admin-action-btn--danger"
                      title="Remove schedule entry"
                    >
                      <IconTrash size={14} />
                    </button>
                  </td>
                </tr>
              );
            })
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
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
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-2xl)',
            width: '100%',
            maxWidth: '450px',
            padding: 24,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Add Class Schedule
              </h4>
              <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
                <IconX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--green-700)', display: 'block', marginBottom: 6 }}>Select Target Course (Enrollment Required)</label>
                <select
                  className="input"
                  value={selectedCourseId}
                  onChange={(e) => {
                    setSelectedCourseId(e.target.value);
                    const c = courses.find(x => x.id === e.target.value);
                    if (c && subject === 'Physics') setSubject(c.subject || c.title);
                  }}
                  style={{ width: '100%', fontWeight: 600, border: '1.5px solid var(--green-300)', background: 'var(--green-25)' }}
                >
                  <option value="">Open to All Students (General)</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title} ({c.subject || 'Prep'})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Subject / Title</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. Physics / Mathematics"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Day / Date</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. Sunday or 2026-07-05"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Time Slot (Nepal Time)</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. 06:00 AM - 07:30 AM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Faculty / Teacher</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. Lokesh Jha"
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '8px 16px', borderRadius: 'var(--radius-lg)', background: 'transparent', border: '1px solid var(--border-medium)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 20px', borderRadius: 'var(--radius-lg)', background: 'var(--green-600)', border: 'none', color: '#fff', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Save Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
