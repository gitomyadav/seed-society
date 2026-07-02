import { useData } from '../context/DataContext';

const subjectColors = {
  Physics: '#3B82F6',
  Chemistry: '#8B5CF6',
  Mathematics: '#D97706',
  Biology: '#059669',
  English: '#DC2626',
};

const todayIndex = new Date().getDay();
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Schedule() {
  const { classes = [] } = useData();

  const getClassesForDay = (dayName) => {
    return classes.filter((c) => {
      if (!c.date) return false;
      return c.date.toLowerCase() === dayName.toLowerCase() || c.date.toLowerCase().includes(dayName.toLowerCase().slice(0, 3));
    });
  };

  return (
    <>
      <p style={{
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)',
        marginBottom: 'var(--space-6)',
      }}>
        Your weekly class schedule synced directly with the Seed Society administration database (Nepal Time).
      </p>

      {dayNames.slice(0, 6).map((dayName) => {
        const isToday = dayNames[todayIndex] === dayName;
        const dayClasses = getClassesForDay(dayName);

        return (
          <div key={dayName} className="schedule__day">
            <h3 className="schedule__day-title">
              {dayName}
              {isToday && (
                <span className="badge badge--green">Today</span>
              )}
            </h3>
            <div className="schedule__classes">
              {dayClasses.length === 0 ? (
                <div style={{ padding: '12px 16px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)', color: 'var(--text-tertiary)', fontSize: '13px' }}>
                  No classes currently scheduled for {dayName}.
                </div>
              ) : (
                dayClasses.map((cls, j) => (
                  <div key={j} className="schedule-class-card">
                    <div
                      style={{
                        width: 4,
                        height: 36,
                        borderRadius: 2,
                        background: subjectColors[cls.subject] || 'var(--green-400)',
                        flexShrink: 0,
                      }}
                    />
                    <div className="schedule-class-card__time">{cls.time}</div>
                    <div className="schedule-class-card__subject">{cls.subject || cls.topic}</div>
                    <div className="schedule-class-card__teacher">
                      {cls.teacher || 'Faculty Team'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
