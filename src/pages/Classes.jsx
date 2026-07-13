import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { IconVideo, IconCopy, IconExternalLink, IconX } from '../components/Icons';
import { SubjectIcon } from '../components/Icons';

const subjectColors = {
  Physics: '#3B82F6',
  Chemistry: '#8B5CF6',
  Mathematics: '#D97706',
  Biology: '#059669',
  English: '#DC2626',
  'Computer Science': '#0891B2',
  Nepali: '#E11D48',
};

export default function Classes() {
  const { classes: upcomingClasses = [], getStudentEnrollments } = useData();
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState(null);
  const [copied, setCopied] = useState(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set());

  useEffect(() => {
    let mounted = true;
    async function fetchMyEnrollments() {
      if (user?.id) {
        const ids = await getStudentEnrollments(user.id);
        if (mounted) setEnrolledCourseIds(new Set(ids));
      }
    }
    fetchMyEnrollments();
    return () => { mounted = false; };
  }, [user?.id, getStudentEnrollments]);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handleJoinClass = (link) => {
    window.open(link || 'https://zoom.us', '_blank', 'noopener,noreferrer');
  };

  // Filter classes so Zoom sessions tied to a course only appear to students enrolled in that course
  const filteredClasses = upcomingClasses.filter(cls => {
    const cid = cls.course_id || cls.courseId;
    if (!cid) return true; // Open to all students
    return enrolledCourseIds.has(cid);
  });

  // Group classes by date
  const groupedByDate = filteredClasses.reduce((acc, cls) => {
    const dateLabel = cls.date?.includes('-') ? getDateLabel(cls.date) : (cls.date || 'Today');
    if (!acc[dateLabel]) acc[dateLabel] = [];
    acc[dateLabel].push(cls);
    return acc;
  }, {});

  return (
    <>
      <p style={{
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)',
        marginBottom: 'var(--space-6)',
      }}>
        Your upcoming classes with Zoom links. Click on a class to view joining details.
      </p>

      {Object.entries(groupedByDate).map(([dateLabel, classes]) => (
        <div key={dateLabel} style={{ marginBottom: 'var(--space-8)' }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'var(--text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 'var(--space-4)',
          }}>
            {dateLabel}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="class-list-item"
                onClick={() => setSelectedClass(cls)}
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-5) var(--space-6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-5)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--green-200)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Color Indicator */}
                <div style={{
                  width: 4,
                  height: 44,
                  borderRadius: 2,
                  background: subjectColors[cls.subject] || 'var(--green-400)',
                  flexShrink: 0,
                }} />

                {/* Subject Icon */}
                <SubjectIcon subject={cls.subject} size={18} />

                {/* Time */}
                <div style={{ minWidth: 80 }}>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-primary)',
                  }}>
                    {cls.time}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--text-tertiary)',
                  }}>
                    {cls.duration}
                  </div>
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontWeight: 600,
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-primary)',
                    marginBottom: 2,
                  }}>
                    {cls.subject}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-tertiary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {cls.topic}
                  </div>
                </div>

                {/* Teacher */}
                <div style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-tertiary)',
                  display: 'none',
                }} className="class-list-item__teacher">
                  {cls.teacher}
                </div>

                {/* Status & Action */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: cls.status === 'live' ? '#DCFCE7' : 'var(--neutral-100)',
                    color: cls.status === 'live' ? '#16A34A' : 'var(--neutral-500)',
                  }}>
                    {cls.status === 'live' && (
                      <span style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#16A34A',
                        animation: 'pulse 2s ease infinite',
                      }} />
                    )}
                    {cls.status === 'live' ? 'Live' : 'Scheduled'}
                  </span>

                  <button
                    className="btn btn--primary btn--sm"
                    style={{
                      padding: '6px 14px',
                      fontSize: '12px',
                      gap: 4,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (cls.status === 'live') {
                        handleJoinClass(cls.zoom?.link || cls.joinUrl);
                      } else {
                        setSelectedClass(cls);
                      }
                    }}
                  >
                    {cls.status === 'live' ? (
                      <>
                        <IconVideo size={13} />
                        Join
                      </>
                    ) : 'Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Class Detail Modal */}
      {selectedClass && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-6)',
          }}
          onClick={() => setSelectedClass(null)}
        >
          {/* Backdrop */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
          }} />

          {/* Modal */}
          <div
            style={{
              position: 'relative',
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-2xl)',
              maxWidth: 440,
              width: '100%',
              padding: 0,
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.12)',
              animation: 'fadeIn 0.2s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{
              padding: 'var(--space-6) var(--space-6) var(--space-4)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{
                  width: 4,
                  height: 36,
                  borderRadius: 2,
                  background: subjectColors[selectedClass.subject] || 'var(--green-400)',
                }} />
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-primary)',
                  }}>
                    {selectedClass.subject}
                  </h3>
                  <p style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-tertiary)',
                  }}>
                    {selectedClass.topic}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedClass(null)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-tertiary)',
                  transition: 'all 0.15s ease',
                }}
              >
                <IconX size={14} />
              </button>
            </div>

            {/* Class Info */}
            <div style={{
              padding: '0 var(--space-6)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-3)',
              marginBottom: 'var(--space-5)',
            }}>
              <div style={{
                background: 'var(--neutral-50)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-3) var(--space-4)',
              }}>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: 2 }}>Date</div>
                <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{formatDate(selectedClass.date)}</div>
              </div>
              <div style={{
                background: 'var(--neutral-50)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-3) var(--space-4)',
              }}>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: 2 }}>Time</div>
                <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                  {selectedClass.time}{selectedClass.duration ? ` (${selectedClass.duration})` : ''}
                </div>
              </div>
              <div style={{
                background: 'var(--neutral-50)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-3) var(--space-4)',
                gridColumn: 'span 2',
              }}>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: 2 }}>Teacher</div>
                <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{selectedClass.teacher || 'Seed Society Faculty'}</div>
              </div>
            </div>

            {/* Zoom Details */}
            <div style={{
              padding: '0 var(--space-6)',
              marginBottom: 'var(--space-5)',
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-tertiary)',
                marginBottom: 'var(--space-3)',
              }}>
                Zoom Details
              </div>

              <div style={{
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
              }}>
                {/* Meeting ID */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--space-3) var(--space-4)',
                  borderBottom: '1px solid var(--border-light)',
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Meeting ID</div>
                    <div style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontWeight: 600,
                      fontSize: 'var(--text-sm)',
                      letterSpacing: '0.05em',
                    }}>
                      {selectedClass.zoom?.meetingId || selectedClass.meeting_id || selectedClass.meetingId || 'N/A'}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(selectedClass.zoom?.meetingId || selectedClass.meeting_id || selectedClass.meetingId, 'id')}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      background: copied === 'id' ? 'var(--green-50)' : 'var(--bg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: copied === 'id' ? 'var(--green-600)' : 'var(--text-tertiary)',
                      transition: 'all 0.15s ease',
                    }}
                    title="Copy Meeting ID"
                  >
                    <IconCopy size={13} />
                  </button>
                </div>

                {/* Password */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--space-3) var(--space-4)',
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Password</div>
                    <div style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontWeight: 600,
                      fontSize: 'var(--text-sm)',
                      letterSpacing: '0.05em',
                    }}>
                      {selectedClass.zoom?.password || selectedClass.password || 'N/A'}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(selectedClass.zoom?.password || selectedClass.password, 'pwd')}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      background: copied === 'pwd' ? 'var(--green-50)' : 'var(--bg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: copied === 'pwd' ? 'var(--green-600)' : 'var(--text-tertiary)',
                      transition: 'all 0.15s ease',
                    }}
                    title="Copy Password"
                  >
                    <IconCopy size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* Join Button */}
            <div style={{
              padding: '0 var(--space-6) var(--space-6)',
            }}>
              <button
                className="btn btn--primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px',
                  fontSize: 'var(--text-sm)',
                  gap: 'var(--space-2)',
                }}
                onClick={() => handleJoinClass(selectedClass.zoom?.link || selectedClass.join_url || selectedClass.joinUrl || `https://zoom.us/j/${(selectedClass.zoom?.meetingId || selectedClass.meeting_id || selectedClass.meetingId || '').replace(/\s+/g, '')}`)}
              >
                <IconExternalLink size={15} />
                Join class on Zoom
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function getDateLabel(dateStr) {
  if (!dateStr) return 'Today';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

function formatDate(dateStr) {
  if (!dateStr) return 'Scheduled';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
