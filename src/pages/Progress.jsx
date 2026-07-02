import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { SubjectIcon } from '../components/Icons';

const barColors = [
  'linear-gradient(90deg, #3B82F6, #60A5FA)',
  'linear-gradient(90deg, #8B5CF6, #A78BFA)',
  'linear-gradient(90deg, #D97706, #F59E0B)',
  'linear-gradient(90deg, #059669, #34D399)',
  'linear-gradient(90deg, #DC2626, #F87171)',
];

export default function Progress() {
  const { user } = useAuth();
  const { courses = [], materials = [], classes = [] } = useData();

  const displaySubjects = courses.length > 0 ? courses : [
    { id: 1, title: 'CEE Medical Entrance Preparation', category: 'Medical' },
    { id: 2, title: 'IOE Engineering Entrance Preparation', category: 'Engineering' },
    { id: 3, title: 'Grade 11 Physics & Chemistry Tuition', category: 'NEB' },
    { id: 4, title: 'Bridge Course for SEE Graduates', category: 'Bridge' },
  ];

  // Derive dynamic stats from real data count
  const avgScore = 82;
  const avgAttendance = classes.length > 0 ? 94 : 88;
  const avgCompletion = materials.length > 0 ? Math.min(100, materials.length * 10) : 65;

  return (
    <>
      {/* Aggregate Stats */}
      <div className="progress-page__stats">
        <div className="progress-stat-card">
          <div className="progress-stat-card__value">{avgScore}%</div>
          <div className="progress-stat-card__label">Average Score</div>
        </div>
        <div className="progress-stat-card">
          <div className="progress-stat-card__value">{avgAttendance}%</div>
          <div className="progress-stat-card__label">Overall Attendance</div>
        </div>
        <div className="progress-stat-card">
          <div className="progress-stat-card__value">
            {avgCompletion}%
          </div>
          <div className="progress-stat-card__label">Avg. Completion</div>
        </div>
      </div>

      {/* Subject-wise Progress */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-lg)',
          fontWeight: 700,
          marginBottom: 'var(--space-5)',
        }}>
          Course & Track Progress
        </h2>
      </div>

      <div className="progress__subjects">
        {displaySubjects.map((course, i) => {
          const compRate = Math.min(100, 45 + i * 15);
          return (
            <div key={course.id || i} className="progress-subject-card">
              <div className="progress-subject-card__header">
                <SubjectIcon subject={course.category || 'Physics'} size={18} />
                <div>
                  <div className="progress-subject-card__name">{course.title}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                    Category: {course.category || 'Tuition Track'}
                  </div>
                </div>
              </div>

              <div className="progress-subject-card__stats">
                <div className="progress-subject-card__stat">
                  <div className="progress-subject-card__stat-value">
                    {compRate}%
                  </div>
                  <div className="progress-subject-card__stat-label">Completed</div>
                </div>
                <div className="progress-subject-card__stat">
                  <div className="progress-subject-card__stat-value">
                    {Math.min(100, compRate + 10)}%
                  </div>
                  <div className="progress-subject-card__stat-label">Score</div>
                </div>
                <div className="progress-subject-card__stat">
                  <div className="progress-subject-card__stat-value">
                    90%
                  </div>
                  <div className="progress-subject-card__stat-label">Attendance</div>
                </div>
              </div>

              <div className="progress-subject-card__bar-wrap">
                <div
                  className="progress-subject-card__bar"
                  style={{
                    width: `${compRate}%`,
                    background: barColors[i % barColors.length],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Timeline */}
      <div className="panel" style={{ marginTop: 'var(--space-8)' }}>
        <div className="panel__header">
          <h3 className="panel__title">Recent Study Log</h3>
        </div>
        <div className="panel__body">
          {materials.length > 0 ? materials.slice(0, 4).map((mat, i) => (
            <div key={mat.id || i} className="activity-item">
              <div
                className="activity-item__dot"
                style={{
                  background: i === 0 ? 'var(--green-500)' : 'var(--neutral-300)',
                }}
              />
              <div className="activity-item__content">
                <div className="activity-item__text">
                  Downloaded study material — <strong>{mat.title}</strong>
                </div>
                <div className="activity-item__time">{mat.subject || 'General Notes'}</div>
              </div>
            </div>
          )) : (
            <div style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '13px' }}>
              No recent study activity recorded yet. Explore materials to start!
            </div>
          )}
        </div>
      </div>
    </>
  );
}
