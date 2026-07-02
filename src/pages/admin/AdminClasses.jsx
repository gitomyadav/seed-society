import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { SubjectIcon, IconPlus, IconTrash, IconX } from '../../components/Icons';

export default function AdminClasses() {
  const { classes = [], addClass, deleteClass, updateClass } = useData();
  const [showModal, setShowModal] = useState(false);

  // Clean Form State without fluff
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
    if (!subject || !meetingId || !password) return;

    await addClass({
      subject,
      topic: topic || subject,
      teacher: teacher || 'Seed Society Faculty',
      date: date || 'Today',
      time: time || '06:00 AM',
      meetingId,
      password,
      joinUrl,
      zoom: {
        meetingId,
        password,
        link: joinUrl || `https://zoom.us/j/${meetingId.replace(/\s+/g, '')}`,
      },
      status: 'scheduled',
    });

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
              {classes.map((cls) => (
                <tr key={cls.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <SubjectIcon subject={cls.subject} size={20} />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{cls.subject}</div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{cls.topic}</div>
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
                      ID: {cls.zoom?.meetingId || cls.meetingId || 'N/A'}
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
              ))}
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="input-group">
                    <label>Subject / Course Name</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Write subject (e.g. CEE Physics)"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
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
