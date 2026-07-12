import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { SubjectIcon } from '../../components/Icons';

export default function AdminOverview() {
  const { classes, materials, students, courses, teachers } = useData();

  const pendingStudents = students.filter(s => s.status === 'pending');
  const activeStudents = students.filter(s => s.status === 'active').length;
  const liveClasses = classes.filter(c => c.status === 'live').length;

  return (
    <>
      {/* Alert banner if pending approvals exist */}
      {pendingStudents.length > 0 && (
        <div style={{
          background: '#FEF3C7',
          border: '1px solid #FDE68A',
          padding: '16px 20px',
          borderRadius: 'var(--radius-xl)',
          marginBottom: 'var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '24px' }}>⚠️</span>
            <div>
              <div style={{ fontWeight: 700, color: '#92400E', fontSize: '15px' }}>
                {pendingStudents.length} {pendingStudents.length === 1 ? 'Student' : 'Students'} Pending Admission Verification
              </div>
              <div style={{ fontSize: '13px', color: '#B45309' }}>
                New students are waiting for admission approval via WhatsApp. Review their profiles to grant platform access.
              </div>
            </div>
          </div>
          <Link
            to="/admin/students"
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-lg)',
              background: '#92400E',
              color: '#fff',
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'none',
            }}
          >
            Review Admissions →
          </Link>
        </div>
      )}

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-card__value">{students.length}</div>
          <div className="admin-stat-card__label">Total Enrolled Students</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__value">{courses.length}</div>
          <div className="admin-stat-card__label">CEE / IOE / NEB Courses</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__value">{classes.length}</div>
          <div className="admin-stat-card__label">Scheduled Classes</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__value">{teachers.length}</div>
          <div className="admin-stat-card__label">Expert Mentors</div>
        </div>
      </div>

      <div className="admin-overview__grid">
        {/* Recent Classes Table */}
        <div className="admin-card">
          <div className="admin-card__header">
            <h3 className="admin-card__title">Upcoming & Live Zoom Classes</h3>
            <Link to="/admin/classes" style={{ fontSize: '13px', color: 'var(--green-600)', fontWeight: 600 }}>Manage →</Link>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Time</th>
                <th>Teacher</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {classes.slice(0, 5).map((cls) => (
                <tr key={cls.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <SubjectIcon subject={cls.subject} size={16} />
                      <div>
                        <div style={{ fontWeight: 600 }}>{cls.subject}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{cls.topic}</div>
                      </div>
                    </div>
                  </td>
                  <td>{cls.time}</td>
                  <td>{cls.teacher}</td>
                  <td>
                    {cls.status === 'live' ? (
                      <span className="badge badge--green">Live Now</span>
                    ) : (
                      <span className="badge badge--neutral">Scheduled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Enrolled Students */}
        <div className="admin-card">
          <div className="admin-card__header">
            <h3 className="admin-card__title">Recent Student Admissions</h3>
            <Link to="/admin/students" style={{ fontSize: '13px', color: 'var(--green-600)', fontWeight: 600 }}>View All →</Link>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Target & Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 5).map((stu) => (
                <tr key={stu.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{stu.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{stu.email}</div>
                  </td>
                  <td>Grade {stu.grade || 12} ({stu.stream || 'Science'})</td>
                  <td>
                    {stu.status === 'pending' ? (
                      <span className="badge" style={{ background: '#FEF3C7', color: '#92400E', fontSize: '11px' }}>Pending</span>
                    ) : (
                      <span className="badge badge--green" style={{ fontSize: '11px' }}>Active</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
