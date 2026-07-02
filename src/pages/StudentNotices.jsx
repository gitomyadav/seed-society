import { useData } from '../context/DataContext';
import { IconBell } from '../components/Icons';

export default function StudentNotices() {
  const { notices } = useData();

  return (
    <>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
          Seed Society Notice Board
        </h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Official announcements, exam routines, and holiday updates from Seed Society administration.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {notices.map((not) => (
          <div key={not.id} style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-6)',
            display: 'flex',
            gap: 'var(--space-5)',
            alignItems: 'flex-start',
            boxShadow: 'var(--shadow-xs)',
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-xl)',
              background: not.priority === 'Urgent' ? '#FEF2F2' : '#EFF6FF',
              color: not.priority === 'Urgent' ? '#DC2626' : '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <IconBell size={22} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 6 }}>
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
                <span style={{ fontSize: '13px', color: 'var(--green-600)', fontWeight: 600 }}>{not.category}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{not.date}</span>
              </div>

              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                {not.title}
              </h4>

              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {not.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
