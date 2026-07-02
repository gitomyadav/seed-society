import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { IconBook, IconCheckCircle, IconClock, IconTrendingUp, IconVideo } from '../components/Icons';
import { SubjectIcon } from '../components/Icons';
import { Link } from 'react-router-dom';

export default function DashboardOverview() {
  const { user } = useAuth();
  const { classes: upcomingClasses = [], courses = [], materials = [] } = useData();

  const overviewCards = [
    {
      Icon: IconBook,
      bg: '#EFF6FF',
      color: '#3B82F6',
      label: 'Available Courses',
      value: courses.length || 5,
      trend: 'Live NEB/CEE/IOE',
    },
    {
      Icon: IconVideo,
      bg: '#ECFDF5',
      color: '#059669',
      label: 'Live / Scheduled Classes',
      value: upcomingClasses.length || 4,
      trend: 'Zoom Live Tuition',
    },
    {
      Icon: IconClock,
      bg: '#FFFBEB',
      color: '#D97706',
      label: 'Study Materials',
      value: materials.length || 10,
      trend: 'Notes & Past Papers',
    },
    {
      Icon: IconTrendingUp,
      bg: '#F5F3FF',
      color: '#8B5CF6',
      label: 'Account Status',
      value: user?.status ? user.status.toUpperCase() : 'ACTIVE',
      trend: user?.stream ? `${user.stream} Stream` : 'Seed Society',
    },
  ];

  const displayCourses = courses.length > 0 ? courses.slice(0, 5) : [
    { id: 1, title: 'CEE Medical Entrance Preparation', category: 'Medical' },
    { id: 2, title: 'IOE Engineering Entrance Preparation', category: 'Engineering' },
    { id: 3, title: 'Grade 11 Physics & Chemistry Tuition', category: 'NEB' },
    { id: 4, title: 'Bridge Course for SEE Graduates', category: 'Bridge' },
  ];

  return (
    <>
      {/* Greeting */}
      <div className="overview__greeting">
        <h1>Welcome back, {user?.name?.split(' ')[0] || 'Student'}</h1>
        <p>Here's an overview of your learning progress.</p>
      </div>

      {/* Overview Cards */}
      <div className="overview__cards">
        {overviewCards.map((card, i) => {
          const CardIcon = card.Icon;
          return (
            <div key={i} className="overview-card">
              <div className="overview-card__header">
                <div className="overview-card__icon" style={{ background: card.bg, color: card.color }}>
                  <CardIcon size={18} />
                </div>
                <span className="overview-card__trend overview-card__trend--up">
                  {card.trend}
                </span>
              </div>
              <div className="overview-card__value">{card.value}</div>
              <div className="overview-card__label">{card.label}</div>
            </div>
          );
        })}
      </div>

      {/* Two Column: Classes + Activity */}
      <div className="dashboard__two-col">
        {/* Upcoming Classes */}
        <div className="panel">
          <div className="panel__header">
            <h3 className="panel__title">Upcoming Classes</h3>
            <Link to="/dashboard/classes" className="panel__action">View all</Link>
          </div>
          <div className="panel__body">
            {upcomingClasses.slice(0, 3).map((cls) => (
              <div key={cls.id} className="class-item">
                <div className="class-item__time">
                  <div className="class-item__time-value">{cls.time}</div>
                  <div className="class-item__time-label">{getRelativeDate(cls.date)}</div>
                </div>
                <div
                  className="class-item__divider"
                  style={{ background: getSubjectColor(cls.subject) }}
                />
                <div className="class-item__info">
                  <div className="class-item__subject">{cls.subject}</div>
                  <div className="class-item__topic">{cls.topic}</div>
                </div>
                <span className={`class-item__badge class-item__badge--${cls.status}`}>
                  {cls.status === 'live' ? (
                    <><span className="class-item__live-dot" /> Live</>
                  ) : 'Scheduled'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Study Materials */}
        <div className="panel">
          <div className="panel__header">
            <h3 className="panel__title">Recent Study Materials</h3>
            <Link to="/dashboard/materials" className="panel__action">View all</Link>
          </div>
          <div className="panel__body">
            {materials.length > 0 ? materials.slice(0, 3).map((mat) => (
              <div key={mat.id} className="activity-item" style={{ padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                <div className="activity-item__dot" style={{ background: 'var(--green-500)' }} />
                <div className="activity-item__content">
                  <div className="activity-item__text">
                    <strong>{mat.title}</strong> — {mat.subject || mat.category || 'General'}
                  </div>
                  <div className="activity-item__time" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {mat.file_type ? mat.file_type.toUpperCase() : 'PDF'} • Download available
                  </div>
                </div>
              </div>
            )) : (
              <div style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                No study materials uploaded yet. Check back soon!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Available Courses & Tuition Tracks */}
      <div className="panel">
        <div className="panel__header">
          <h3 className="panel__title">Available Courses & Tuition Tracks</h3>
          <Link to="/dashboard/courses" className="panel__action">View details</Link>
        </div>
        <div className="panel__body">
          {displayCourses.map((course, idx) => {
            const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899'];
            const color = colors[idx % colors.length];
            return (
              <div key={course.id} className="subject-progress" style={{ padding: '12px 0', borderBottom: '1px solid var(--border-light)' }}>
                <SubjectIcon subject={course.category || 'Physics'} size={16} />
                <div className="subject-progress__info">
                  <div className="subject-progress__name" style={{ fontWeight: 600 }}>{course.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: 2 }}>
                    Category: {course.category || 'Entrance Prep'} | Live Zoom & Notes Included
                  </div>
                </div>
                <Link
                  to="/dashboard/courses"
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(52, 211, 153, 0.1)',
                    color: 'var(--green-600)',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  Explore Course →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function getRelativeDate(dateStr) {
  if (!dateStr || !dateStr.includes('-')) return dateStr || 'Today';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

function getSubjectColor(subject) {
  const colors = {
    Physics: '#3B82F6',
    Chemistry: '#8B5CF6',
    Mathematics: '#D97706',
    Biology: '#059669',
    English: '#DC2626',
  };
  return colors[subject] || '#6B7280';
}
