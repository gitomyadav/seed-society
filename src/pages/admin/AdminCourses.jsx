import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { SubjectIcon, IconPlus, IconTrash, IconX } from '../../components/Icons';

export default function AdminCourses() {
  const { courses, addCourse, deleteCourse } = useData();
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    addCourse({
      title,
      subject: subject || 'General Prep',
      description,
      grade: 12,
      stream: 'Entrance Prep',
    });

    setTitle('');
    setSubject('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
            Course Catalog & Programs
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Create and manage entrance preparation packages (CEE, IOE, Bridge Courses, NEB Tuition).
          </p>
        </div>

        <button
          className="btn"
          onClick={() => setShowModal(true)}
          style={{ background: 'var(--green-600)', color: '#fff' }}
        >
          <IconPlus size={16} />
          Publish New Course
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 'var(--space-6)' }}>
        {courses.map((crs) => (
          <div key={crs.id} className="admin-card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                  <SubjectIcon subject={crs.subject} size={22} />
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {crs.title}
                    </h4>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--green-600)', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>
                      {crs.subject}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteCourse(crs.id)}
                  className="admin-action-btn admin-action-btn--danger"
                  title="Delete Course"
                >
                  <IconTrash size={15} />
                </button>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: 'var(--space-2)' }}>
                {crs.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h4 className="admin-modal__title">Add New Preparation Course</h4>
              <button onClick={() => setShowModal(false)} style={{ cursor: 'pointer', color: 'var(--text-tertiary)', background: 'transparent', border: 'none' }}>
                <IconX size={20} />
              </button>
            </div>

            <form onSubmit={handleAddCourse}>
              <div className="admin-modal__body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div className="input-group">
                  <label>Course Title</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g. CEE Medical Entrance Complete Preparation"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Subject / Course Category</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Write subject or category (e.g. CEE Prep / IOE Prep / Physics)"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Course Overview & Details</label>
                  <textarea
                    className="input"
                    rows={4}
                    placeholder="Provide a clear, concise overview of what this course covers..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
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
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
