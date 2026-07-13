import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { SubjectIcon, IconPlus, IconTrash, IconX } from '../../components/Icons';

export default function AdminTeachers() {
  const { teachers, addTeacher, deleteTeacher } = useData();
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [qualification, setQualification] = useState('');
  const [bio, setBio] = useState('');

  const handleAddTeacher = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    addTeacher({
      name,
      email,
      subject: subject || 'General Entrance Prep',
      assignedSubjects: [subject || 'General Entrance Prep'],
      qualification: qualification || 'Senior Educator',
      bio: bio || 'Expert instructor at Seed Society Nepal.',
    });

    setName('');
    setEmail('');
    setSubject('');
    setQualification('');
    setBio('');
    setShowModal(false);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
            Teacher & Faculty Directory
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Manage faculty profiles, expertise areas, and contact credentials.
          </p>
        </div>

        <button
          className="btn"
          onClick={() => setShowModal(true)}
          style={{ background: 'var(--green-600)', color: '#fff' }}
        >
          <IconPlus size={16} />
          Add Faculty Member
        </button>
      </div>

      <div className="admin-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 'var(--space-6)' }}>
        {teachers.map((tch) => (
          <div key={tch.id} className="admin-card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 'var(--radius-xl)',
                  background: 'var(--green-900)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '18px',
                  flexShrink: 0
                }}>
                  {tch.avatar || (tch.name ? tch.name[0] : 'T')}
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {tch.name}
                  </h4>
                  <div style={{ fontSize: '13px', color: 'var(--green-600)', fontWeight: 600 }}>
                    {tch.subject} · {tch.qualification}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{tch.email}</div>
                </div>
              </div>

              <button
                onClick={() => deleteTeacher(tch.id)}
                className="admin-action-btn admin-action-btn--danger"
                title="Remove Faculty"
              >
                <IconTrash size={15} />
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {tch.bio}
            </p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h4 className="admin-modal__title">Add New Instructor</h4>
              <button onClick={() => setShowModal(false)} style={{ cursor: 'pointer', color: 'var(--text-tertiary)', background: 'transparent', border: 'none' }}>
                <IconX size={20} />
              </button>
            </div>

            <form onSubmit={handleAddTeacher}>
              <div className="admin-modal__body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g. Ram Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="e.g. ram@seedsocietynepal.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="admin-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="input-group">
                    <label>Subject / Department</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g. CEE Physics / Medical Botany"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Qualification</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g. Ph.D. Physics"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Biography & Experience</label>
                  <textarea
                    className="input"
                    rows={3}
                    placeholder="Brief summary of teaching experience and specialization..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-modal__footer">
                <button type="button" className="btn" onClick={() => setShowModal(false)} style={{ background: 'var(--neutral-150)' }}>Cancel</button>
                <button type="submit" className="btn" style={{ background: 'var(--green-600)', color: '#fff' }}>Add Faculty Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
