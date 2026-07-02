import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { features, subjects, testimonials } from '../data/mockData';
import { IconBook, IconCalendar, IconUsers, IconArrowRight, IconShield, IconVideo } from '../components/Icons';
import './Landing.css';

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Landing() {
  useScrollReveal();
  const data = useData();
  const teachers = data?.teachers || [];

  return (
    <main>
      {/* ---- Hero ---- */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__bg-gradient" />
          <div className="hero__bg-gradient hero__bg-gradient--2" />
          <div className="hero__bg-line hero__bg-line--1" />
          <div className="hero__bg-line hero__bg-line--2" />
          <div className="hero__bg-line hero__bg-line--3" />
        </div>

        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-line" />
            CEE & IOE Entrance Preparation + NEB Tuition
          </div>

          <h1 className="hero__title">
            Your path to engineering & medical<br />
            starts <em>right here</em>
          </h1>

          <p className="hero__subtitle">
            Structured live classes, expert mentors, and comprehensive study materials for CEE, IOE entrance exams and NEB Grade 11 & 12 board preparation.
          </p>

          <div className="hero__actions">
            <Link to="/register" className="btn btn--primary btn--lg">
              Get Started
              <IconArrowRight size={15} />
            </Link>
            <Link to="/login" className="btn btn--outline btn--lg">
              Sign in
            </Link>
          </div>

          <div className="hero__note">
            <span>
              500+ Students Enrolled
              <span className="hero__note-divider" />
              Grade 11 & 12
              <span className="hero__note-divider" />
              CEE & IOE Preparation
            </span>
          </div>
        </div>
      </section>

      {/* ---- Trust Bar ---- */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-bar__inner">
            <p className="trust-bar__label">What we provide</p>
            <div className="trust-bar__items">
              <div className="trust-bar__item">
                <div className="trust-bar__item-icon">
                  <IconVideo size={18} />
                </div>
                Live Zoom classes
              </div>
              <div className="trust-bar__item">
                <div className="trust-bar__item-icon">
                  <IconBook size={18} />
                </div>
                Downloadable notes
              </div>
              <div className="trust-bar__item">
                <div className="trust-bar__item-icon">
                  <IconCalendar size={18} />
                </div>
                Weekly schedule
              </div>
              <div className="trust-bar__item">
                <div className="trust-bar__item-icon">
                  <IconUsers size={18} />
                </div>
                Experienced teachers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Features ---- */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section__header section__header--center reveal">
            <div className="section__label">What you get</div>
            <h2 className="section__title">Everything a student needs, in one place</h2>
            <p className="section__subtitle">
              No scattered resources. Just focused, state-of-the-art learning tools built for ambitious NEB and medical/engineering aspirants.
            </p>
          </div>

          <div className="features__grid reveal">
            {features.map((feature, i) => (
              <div key={i} className="feature-card">
                <div className="feature-card__number">0{i + 1}</div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Subjects ---- */}
      <section className="subjects-section" id="subjects">
        <div className="container">
          <div className="section__header section__header--center reveal">
            <div className="section__label">Subjects</div>
            <h2 className="section__title">Covering the core NEB syllabus</h2>
            <p className="section__subtitle">
              We focus on the subjects that matter most — taught by teachers who know the NEB curriculum inside out.
            </p>
          </div>

          <div className="subjects__grid">
            {subjects.map((subject, i) => (
              <div key={subject.id} className="subject-card reveal" style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="subject-card__indicator" style={{ background: subject.color }} />
                <h3 className="subject-card__name">{subject.name}</h3>
                <p className="subject-card__meta">{subject.chapters} chapters · Grade 11 & 12</p>
                <p className="subject-card__description">{subject.description}</p>
                <div className="subject-card__footer">
                  <div className="subject-card__avatar" style={{ background: subject.color }}>
                    {subject.teacher.split(' ').map(n => n[0]).join('')}
                  </div>
                  {subject.teacher}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Faculty / Teachers Showcase ---- */}
      {teachers.length > 0 && (
        <section className="features-section" style={{ background: 'var(--bg-secondary)', padding: 'var(--space-20) 0' }}>
          <div className="container">
            <div className="section__header section__header--center reveal">
              <div className="section__label">Mentors & Instructors</div>
              <h2 className="section__title">Learn from Nepal's top entrance & board educators</h2>
              <p className="section__subtitle">
                Our faculty consists of experienced gold medalists, university professors, and dedicated subject specialists.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
              {teachers.map((t, idx) => (
                <div key={t.id} className="reveal" style={{
                  background: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-2xl)',
                  padding: 'var(--space-6)',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  transitionDelay: `${idx * 60}ms`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <div style={{
                      width: 54,
                      height: 54,
                      borderRadius: 'var(--radius-xl)',
                      background: 'var(--green-900)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: '18px'
                    }}>
                      {t.avatar || 'TC'}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {t.name}
                      </h4>
                      <div style={{ fontSize: '12px', color: 'var(--green-600)', fontWeight: 600 }}>
                        {t.qualification}
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, minHeight: 38 }}>
                    {t.bio}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-3)' }}>
                    {(t.assignedSubjects || [t.subject]).map(sub => (
                      <span key={sub} style={{
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--neutral-100)',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'var(--text-primary)'
                      }}>
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- How It Works ---- */}
      <section className="how-it-works">
        <div className="container">
          <div className="section__header section__header--center reveal">
            <div className="section__label">Getting started</div>
            <h2 className="section__title">Three steps. That's it.</h2>
            <p className="section__subtitle">
              Sign up, show up, and keep learning. We handle everything else.
            </p>
          </div>

          <div className="how-it-works__grid reveal">
            {[
              {
                num: '01',
                title: 'Create an account',
                description: 'Sign up with your name, grade, and stream. It takes less than a minute to get started and set up your student profile.',
              },
              {
                num: '02',
                title: 'Join your classes',
                description: 'Check your schedule, join Zoom classes with one click, and download study materials for offline use.',
              },
              {
                num: '03',
                title: 'Track your progress',
                description: 'See your attendance, scores, and completion across all subjects. Stay on top of your learning.',
              },
            ].map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-card__number">{step.num}</div>
                <h3 className="step-card__title">{step.title}</h3>
                <p className="step-card__description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Testimonials ---- */}
      <section className="testimonials-section" id="testimonials">
        <div className="container">
          <div className="section__header section__header--center reveal">
            <div className="section__label">From our students</div>
            <h2 className="section__title">What students are saying</h2>
          </div>

          <div className="testimonials__grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <p className="testimonial-card__quote">"{t.quote}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar" style={{ background: t.color }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__grade">{t.grade}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="cta-section">
        <div className="container">
          <div className="cta__content">
            <h2 className="cta__title">Start learning today</h2>
            <p className="cta__subtitle">
              Join 500+ ambitious students preparing for their CEE, IOE entrance and NEB exams with Seed Society.
            </p>
            <div className="cta__actions">
              <Link to="/register" className="cta__btn-primary">
                Start your preparation
                <IconArrowRight size={15} />
              </Link>
              <Link to="/login" className="cta__btn-secondary">
                Sign in to dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
