import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { IconPlus, IconTrash, IconX, IconBell } from '../../components/Icons';

export default function AdminNotices() {
  const { notices, addNotice, deleteNotice } = useData();
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Exam Routine');
  const [priority, setPriority] = useState('Urgent');
  const [content, setContent] = useState('');

  const handleAddNotice = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    addNotice({
      title,
      category,
      priority,
      content,
    });

    setTitle('');
    setContent('');
    setShowModal(false);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
            Notice Board & Exam Routines
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Broadcast urgent announcements, entrance prep schedules, and academic guidelines directly to students.
          </p>
        </div>

        <button
          className="btn"
          onClick={() => setShowModal(true)}
          style={{ background: 'var(--green-600)', color: '#fff' }}
        >
          <IconPlus size={16} />
          Post Notice
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {notices.map((not) => (
          <div key={not.id} className="admin-card" style={{ padding: 'var(--space-5) var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-lg)',
                background: not.priority === 'Urgent' ? '#FEF2F2' : '#EFF6FF',
                color: not.priority === 'Urgent' ? '#DC2626' : '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <IconBell size={20} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 4 }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-sm)',
                    background: not.priority === 'Urgent' ? '#FEE2E2' : 'var(--neutral-150)',
                    color: not.priority === 'Urgent' ? '#991B1B' : 'var(--text-secondary)',
                    textTransform: 'uppercase',
                  }}>
                    {not.priority}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--green-600)', fontWeight: 600 }}>{not.category}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{not.date}</span>
                </div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 6 }}>
                  {not.title}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {not.content}
                </p>
              </div>
            </div>

            <button
              onClick={() => deleteNotice(not.id)}
              className="admin-action-btn admin-action-btn--danger"
              title="Delete Notice"
            >
              <IconTrash size={15} />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h4 className="admin-modal__title">Post New Announcement</h4>
              <button onClick={() => setShowModal(false)} style={{ cursor: 'pointer', color: 'var(--text-tertiary)' }}>
                <IconX size={20} />
              </button>
            </div>

            <form onSubmit={handleAddNotice}>
              <div className="admin-modal__body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div className="input-group">
                  <label>Announcement Headline</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g. Grade 11 Chemistry Mid-Term Exam Syllabus"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="admin-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="input-group">
                    <label>Notice Category</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g. Exam Routine / CEE Alert"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label>Priority Level</label>
                    <select className="input" value={priority} onChange={(e) => setPriority(e.target.value)} style={{ padding: '10px' }}>
                      <option value="Urgent">Urgent</option>
                      <option value="High">High</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label>Notice Content</label>
                  <textarea
                    className="input"
                    rows={4}
                    placeholder="Enter complete details for students..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ resize: 'vertical', width: '100%' }}
                    required
                  />
                </div>
              </div>

              <div className="admin-modal__footer">
                <button type="button" className="btn" onClick={() => setShowModal(false)} style={{ background: 'var(--neutral-150)' }}>Cancel</button>
                <button type="submit" className="btn" style={{ background: 'var(--green-600)', color: '#fff' }}>Post Notice</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
