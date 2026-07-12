import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { SubjectIcon, IconPlus, IconTrash, IconX } from '../../components/Icons';

export default function AdminClasses() {
  const { classes = [], courses = [], addClass, deleteClass, updateClass } = useData();
  const [showModal, setShowModal] = useState(false);

  // Clean Form State without fluff
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [teacher, setTeacher] = useState('');
  const [date, setDate] = useState('Sunday');
  const [time, setTime] = useState('06:00 AM - 07:30 AM');
  const [meetingId, setMeetingId] = useState('');
  const [password, setPassword] = useState('');
  const [joinUrl, setJoinUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!meetingId || !password) return;

    const courseObj = courses.find(c => c.id === selectedCourseId);
    const finalSubject = subject || (courseObj ? courseObj.subject || courseObj.title : 'General Preparation');

    await addClass({
      subject: finalSubject,
      topic: topic || finalSubject,
      teacher: teacher || 'Seed Society Faculty',
      date: date || 'Today',
      time: time || '06:00 AM',
      meetingId,
      password,
      joinUrl,
      course_id: selectedCourseId || null,
      courseId: selectedCourseId || null,
      zoom: {
        meetingId,
        password,
        link: joinUrl || `https://zoom.us/j/${meetingId.replace(/\s+/g, '')}`,
      },
      status: 'scheduled',
    });

    setSelectedCourseId('');
    setSubject('');
    setTopic('');
    setTeacher('');
    setMeetingId('');
    setPassword('');
    setJoinUrl('');
    setShowModal(false);
  };

  const toggleStatus = (cls) => {
    const nextStatus = cls.status === 'live' ? 'scheduled' : 'live';
    updateClass(cls.id, { status: nextStatus });
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
            Zoom Classes Management
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Schedule interactive Zoom sessions and manage live statuses for entrance preparation courses.
          </p>
        </div>

        <button
          className="btn"
          onClick={() => setShowModal(true)}
          style={{ background: 'var(--green-600)', color: '#fff' }}
        >
          <IconPlus size={16} />
          Schedule Zoom Class
        </button>
      </div>

      <div className="admin-card">
        {classes.length === 0 ? (
          <div style={{ padding: 'var(--space-10)', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '14px' }}>
            No live classes scheduled yet. Click "Schedule Zoom Class" above.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Subject & Topic</th>
                <th>Instructor</th>
                <th>Schedule Time</th>
                <th>Zoom Credentials</th>
                <th>Live Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => {
                const targetCourse = courses.find(c => c.id === (cls.course_id || cls.courseId));
                return (
                <tr key={cls.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <SubjectIcon subject={cls.subject} size={20} />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{cls.subject}</div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{cls.topic}</div>
                        {targetCourse ? (
                          <span style={{ fontSize: '11px', background: 'var(--green-50)', color: 'var(--green-700)', padding: '2px 8px', borderRadius: 12, fontWeight: 600, display: 'inline-block', marginTop: 4 }}>
                            Course: {targetCourse.title}
                          </span>
                        ) : (
                          <span style={{ fontSize: '11px', background: 'var(--neutral-100)', color: 'var(--text-tertiary)', padding: '2px 8px', borderRadius: 12, fontWeight: 600, display: 'inline-block', marginTop: 4 }}>
                            Open to All Students
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{cls.teacher || 'Faculty'}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{cls.time}</div>
                    <div style={{ fontSize: '12px', color: 'var(--green-600)' }}>{cls.date}</div>
                  </td>
                  <td>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600 }}>
                      ID: {cls.zoom?.meetingId || cls.meeting_id || cls.meetingId || 'N/A'}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-tertiary)' }}>
                      Pass: {cls.zoom?.password || cls.password || 'N/A'}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleStatus(cls)}
                      className={`badge ${cls.status === 'live' ? 'badge--green' : 'badge--neutral'}`}
                      style={{ cursor: 'pointer', border: 'none' }}
                      title="Click to toggle Live status"
                    >
                      {cls.status === 'live' ? '● Live Now' : 'Scheduled'}
                    </button>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => deleteClass(cls.id)}
                      className="admin-action-btn admin-action-btn--danger"
                      title="Delete Class"
                    >
                      <IconTrash size={15} />
                    </button>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" style={{ maxWidth: 500 }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h4 className="admin-modal__title">Schedule New Zoom Class</h4>
              <button onClick={() => setShowModal(false)} style={{ cursor: 'pointer', color: 'var(--text-tertiary)', background: 'transparent', border: 'none' }}>
                <IconX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-modal__body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div className="input-group">
                  <label style={{ color: 'var(--green-700)', fontWeight: 700 }}>Select Target Course (Enrollment Required)</label>
                  <select
                    className="input"
                    value={selectedCourseId}
                    onChange={(e) => {
                      setSelectedCourseId(e.target.value);
                      const c = courses.find(x => x.id === e.target.value);
                      if (c && !subject) setSubject(c.subject || c.title);
                    }}
                    style={{ fontWeight: 600, border: '1.5px solid var(--green-300)', background: 'var(--green-25)' }}
                  >
                    <option value="">Open to All Students (General)</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.title} ({c.subject || 'Prep'})</option>
                    ))}
                  </select>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: 4 }}>
                    Only students enrolled in this selected course will see this Zoom class.
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="input-group">
                    <label>Subject / Course Title</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Write subject (e.g. Physics)"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label>Instructor Name</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Write teacher name"
                      value={teacher}
                      onChange={(e) => setTeacher(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Lesson / Topic</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g. Mechanics & Dynamics"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="input-group">
                    <label>Date / Day</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g. Sunday or 2026-07-05"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Time Slot (NPT)</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g. 06:00 AM - 07:30 AM"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="input-group">
                    <label>Zoom Meeting ID</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g. 841 9021 5530"
                      value={meetingId}
                      onChange={(e) => setMeetingId(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Zoom Password</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g. seed2026"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Direct Zoom Join Link (Optional)</label>
                  <input
                    type="url"
                    className="input"
                    placeholder="https://zoom.us/j/..."
                    value={joinUrl}
                    onChange={(e) => setJoinUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-modal__footer">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(false)}
                  style={{ background: 'var(--neutral-150)', color: 'var(--text-secondary)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn"
                  style={{ background: 'var(--green-600)', color: '#fff' }}
                >
                  Publish Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
