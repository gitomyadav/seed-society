import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { IconFileText } from '../components/Icons';

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

export default function Materials() {
  const { materials } = useData();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return materials.filter((m) => {
      return m.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [materials, search]);

  const handleOpenMaterial = (material) => {
    const link = material.drive_url || material.file_url;
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      {/* Search Bar */}
      <div className="student-page__header" style={{ marginBottom: 'var(--space-6)', maxWidth: '420px', width: '100%' }}>
        <input
          type="text"
          className="input"
          placeholder="Search Google Drive resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: '10px 16px' }}
        />
      </div>

      {/* Results count */}
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-5)' }}>
        Showing {filtered.length} of {materials.length} resources
      </p>

      {/* Clean Materials Grid */}
      <div className="materials__grid">
        {filtered.map((material) => {
          const link = material.drive_url || material.file_url;
          return (
            <div key={material.id} className="material-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="material-card__header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-lg)',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: 'var(--green-600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <IconFileText size={20} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Google Drive Document
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', background: 'var(--bg-secondary)', padding: '4px 8px', borderRadius: '4px', fontWeight: 500 }}>
                    Uploaded: {formatNepalDate(material.created_at)}
                  </span>
                </div>

                <h3 className="material-card__title" style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>
                  {material.title}
                </h3>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleOpenMaterial(material)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-lg)',
                    background: link ? 'var(--green-600)' : 'var(--bg-secondary)',
                    color: link ? '#fff' : 'var(--text-tertiary)',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: link ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  disabled={!link}
                >
                  {link ? 'Open Google Drive →' : 'No Link Assigned'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: 'var(--space-16) 0',
          color: 'var(--text-tertiary)',
        }}>
          <IconFileText size={48} style={{ color: 'var(--neutral-200)', marginBottom: 'var(--space-4)' }} />
          <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)', color: 'var(--text-secondary)' }}>
            No resources found
          </h3>
          <p>Try entering a different search keyword.</p>
        </div>
      )}
    </>
  );
}
