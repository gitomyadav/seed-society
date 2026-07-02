import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { testimonials } from '../data/mockData';
import { IconBook, IconCalendar, IconUsers, IconArrowRight, IconVideo } from '../components/Icons';
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

  return (
    <main>
      {/* ---- Engineered UI/UX Hero Section ---- */}
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
            Premier Entrance & Academic Portal
          </div>

          <h1 className="hero__title">
            Master CEE Medical & IOE<br />
            Engineering Entrance Exams
          </h1>

          <p className="hero__subtitle">
            An advanced digital learning hub providing structured entrance test preparation, rigorous question banks, and comprehensive Grade 11 & 12 science tuition support.
          </p>

          <div className="hero__actions">
            <Link to="/register" className="btn btn--primary btn--lg">
              Get Started
              <IconArrowRight size={15} />
            </Link>
            <Link to="/login" className="btn btn--outline btn--lg">
              Student Login
            </Link>
          </div>

          <div className="hero__note">
            <span>
              500+ Active Students
              <span className="hero__note-divider" />
              Primary CEE & IOE Focus
              <span className="hero__note-divider" />
              Grade 11 & 12 Tuition Support
            </span>
          </div>
        </div>
      </section>

      {/* ---- Trust / Platform Offerings Bar ---- */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-bar__inner">
            <p className="trust-bar__label">Key Pillars</p>
            <div className="trust-bar__items">
              <div className="trust-bar__item">
                <div className="trust-bar__item-icon">
                  <IconVideo size={18} />
                </div>
                Live interactive sessions
              </div>
              <div className="trust-bar__item">
                <div className="trust-bar__item-icon">
                  <IconBook size={18} />
                </div>
                Verified question banks
              </div>
              <div className="trust-bar__item">
                <div className="trust-bar__item-icon">
                  <IconCalendar size={18} />
                </div>
                Structured exam schedules
              </div>
              <div className="trust-bar__item">
                <div className="trust-bar__item-icon">
                  <IconUsers size={18} />
                </div>
                Direct faculty allocation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Platform Architecture & System Highlights ---- */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section__header section__header--center reveal">
            <div className="section__label">Why Seed Society</div>
            <h2 className="section__title">Built for rigorous academic success</h2>
            <p className="section__subtitle">
              Engineered to streamline your daily entrance exam routines and high school board studies without clutter or distractions.
            </p>
          </div>

          <div className="features__grid reveal">
            <div className="feature-card">
              <div className="feature-card__number">01</div>
              <h3 className="feature-card__title">Entrance Question Banks</h3>
              <p className="feature-card__description">
                Access categorized past entrance papers, high-yield numerical drills, and detailed conceptual solutions tailored for CEE and IOE patterns.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__number">02</div>
              <h3 className="feature-card__title">Grade 11 & 12 Reinforcement</h3>
              <p className="feature-card__description">
                Maintain top college grades with simplified chapter notes, important board exam questions, and structured daily tuition support.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__number">03</div>
              <h3 className="feature-card__title">Organized Academic Routines</h3>
              <p className="feature-card__description">
                Stay aligned with live countdown notices, weekly exam schedules, and direct WhatsApp mentoring from assigned course instructors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Programs / Tracks (CEE and IOE primary focus, then Grade 11 & 12 tuition) ---- */}
      <section className="subjects-section" id="subjects">
        <div className="container">
          <div className="section__header section__header--center reveal">
            <div className="section__label">Academic Programs</div>
            <h2 className="section__title">Focused learning tracks</h2>
            <p className="section__subtitle">
              Choose your targeted preparation pathway to access organized course curriculum.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }} className="reveal">
            <div style={{
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-8)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)'
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-xl)',
                background: 'var(--green-900)',
                color: 'var(--green-400)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '16px',
                fontFamily: 'var(--font-heading)'
              }}>
                CEE
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Medical Entrance Preparation
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                Complete preparation for the Medical Education Commission (MEC) examination. Master high-yield Zoology, Botany, Physics, and Chemistry modules.
              </p>
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', color: 'var(--green-600)', fontWeight: 600, fontSize: '13px' }}>
                MCQ Drills & Past Entrance Solved Papers
              </div>
            </div>

            <div style={{
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-8)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)'
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-xl)',
                background: 'var(--green-900)',
                color: 'var(--green-400)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '16px',
                fontFamily: 'var(--font-heading)'
              }}>
                IOE
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Engineering Entrance Preparation
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                Focused coaching and practice modules tailored for engineering aspirants. Learn numerical shortcuts, advanced calculus, and physics problem solving.
              </p>
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', color: 'var(--green-600)', fontWeight: 600, fontSize: '13px' }}>
                Engineering Math · Physics · Chemistry · English
              </div>
            </div>

            <div style={{
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-8)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)'
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-xl)',
                background: 'var(--green-900)',
                color: 'var(--green-400)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '16px',
                fontFamily: 'var(--font-heading)'
              }}>
                11-12
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Grade 11 & 12 Academic Support
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                Complete tuition support across the NEB science curriculum. Get simplified chapter notes, formula sheets, and exam tips to excel in board examinations.
              </p>
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', color: 'var(--green-600)', fontWeight: 600, fontSize: '13px' }}>
                Full Science Faculty Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Workflow Steps ---- */}
      <section className="how-it-works">
        <div className="container">
          <div className="section__header section__header--center reveal">
            <div className="section__label">Getting Started</div>
            <h2 className="section__title">Start learning in 3 simple steps</h2>
            <p className="section__subtitle">
              Set up your student profile and begin accessing structured study modules right away.
            </p>
          </div>

          <div className="how-it-works__grid reveal">
            {[
              {
                num: '01',
                title: 'Create student profile',
                description: 'Sign up with your academic grade and choose your targeted program (CEE Medical, IOE Engineering, or Grade 11/12).',
              },
              {
                num: '02',
                title: 'Access study modules',
                description: 'Explore organized study notes, numerical practice sets, and review active exam schedules directly inside your dashboard.',
              },
              {
                num: '03',
                title: 'Connect with mentors',
                description: 'Request course allocation and message assigned instructors via WhatsApp for any academic questions or doubts.',
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
            <div className="section__label">Student Voices</div>
            <h2 className="section__title">What our community says</h2>
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

      {/* ---- CTA Section ---- */}
      <section className="cta-section">
        <div className="container">
          <div className="cta__content">
            <h2 className="cta__title">Ready to elevate your preparation?</h2>
            <p className="cta__subtitle">
              Join over 500+ community students preparing for CEE Medical, IOE Engineering, and NEB board exams on Seed Society today.
            </p>
            <div className="cta__actions">
              <Link to="/register" className="cta__btn-primary">
                Get Started Today
                <IconArrowRight size={15} />
              </Link>
              <Link to="/login" className="cta__btn-secondary">
                Sign In To Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
