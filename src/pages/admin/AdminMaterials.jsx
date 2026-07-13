import { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { IconUpload, IconTrash, IconX } from '../../components/Icons';

const formatNepalDate = (dateVal) => {
  try {
    const d = dateVal ? new Date(dateVal) : new Date();
    return d.toLocaleDateString('en-US', {
      timeZone: 'Asia/Kathmandu',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }) + ' (NPT)';
  } catch {
    return 'Recent (NPT)';
  }
};

export default function AdminMaterials() {
  const { materials, addMaterial, deleteMaterial } = useData();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const [title, setTitle] = useState('');
  const [driveUrl, setDriveUrl] = useState('');

  const filtered = useMemo(() => {
    return materials.filter(m => {
      return m.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [materials, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !driveUrl) return;

    addMaterial({
      title,
      subject: 'Study Resource',
      type: 'Drive Link',
      format: 'Google Drive',
      grade: 12,
      chapters: 'All',
      fileSize: 'Drive Link',
      size: 'Drive Link',
      drive_url: driveUrl,
      file_url: driveUrl,
      created_at: new Date().toISOString(),
    });

    setTitle('');
    setDriveUrl('');
    setShowModal(false);
  };

  return (
    <>
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
            Google Drive Resources
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Manage shareable Google Drive resource links for students.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <input
            type="text"
            className="input"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 240, padding: '8px 14px' }}
          />
          <button
            className="btn"
            onClick={() => setShowModal(true)}
            style={{ background: 'var(--green-600)', color: '#fff' }}
          >
            <IconUpload size={16} />
            Add Drive Link
          </button>
        </div>
      </div>

      <div className="admin-card">
        {filtered.length === 0 ? (
          <div style={{ padding: 'var(--space-10)', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '14px' }}>
            No Google Drive resources added yet.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Resource Name</th>
                <th>Upload Date</th>
                <th>Google Drive Access</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((mat) => {
                const link = mat.drive_url || mat.file_url;
                return (
                  <tr key={mat.id}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
                        {mat.title}
                      </div>
                    </td>
                    <td style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      {formatNepalDate(mat.created_at)}
                    </td>
                    <td>
                      {link ? (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            padding: '6px 14px',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(59, 130, 246, 0.1)',
                            color: '#2563EB',
                            fontWeight: 600,
                            fontSize: '13px',
                            textDecoration: 'none',
                          }}
                        >
                          Open Google Drive →
                        </a>
                      ) : (
                        <span style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>No link attached</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => deleteMaterial(mat.id)}
                        className="admin-action-btn admin-action-btn--danger"
                        title="Delete resource"
                      >
                        <IconTrash size={14} />
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
            maxWidth: '480px',
            padding: 24,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Add Google Drive Resource
              </h4>
              <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
                <IconX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Resource Title / Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. Complete Mechanics Notes & Formula Sheet"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Google Drive Link</label>
                <input
                  type="url"
                  className="input"
                  placeholder="https://drive.google.com/file/d/..."
                  value={driveUrl}
                  onChange={(e) => setDriveUrl(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '8px 16px', borderRadius: 'var(--radius-lg)', background: 'transparent', border: '1px solid var(--border-medium)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 20px', borderRadius: 'var(--radius-lg)', background: 'var(--green-600)', border: 'none', color: '#fff', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Save Drive Link</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
