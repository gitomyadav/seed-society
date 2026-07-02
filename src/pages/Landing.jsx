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
      {/* ---- Engineered Hero Section ---- */}
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
            CEE Medical & IOE Engineering Preparation Hub
          </div>

          <h1 className="hero__title">
            Empowering ambitious aspirants<br />
            with structured digital learning
          </h1>

          <p className="hero__subtitle">
            A high-performance student portal delivering interactive modules, verified study notes, and organized exam schedules for competitive entrance preparation across Nepal.
          </p>

          <div className="hero__actions">
            <Link to="/register" className="btn btn--primary btn--lg">
              Start Learning Free
              <IconArrowRight size={15} />
            </Link>
            <Link to="/login" className="btn btn--outline btn--lg">
              Student Portal Login
            </Link>
          </div>

          <div className="hero__note">
            <span>
              500+ Active Community Students
              <span className="hero__note-divider" />
              Inclusive Open Access
              <span className="hero__note-divider" />
              Grade 11 & 12 Syllabus
            </span>
          </div>
        </div>
      </section>

      {/* ---- Trust / Core Pillars Bar ---- */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-bar__inner">
            <p className="trust-bar__label">Platform Core Architecture</p>
            <div className="trust-bar__items">
              <div className="trust-bar__item">
                <div className="trust-bar__item-icon">
                  <IconVideo size={18} />
                </div>
                Interactive study sessions
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
                Live academic routines
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

      {/* ---- Core Capabilities / Workflow ---- */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section__header section__header--center reveal">
            <div className="section__label">System Capabilities</div>
            <h2 className="section__title">Designed for rigorous entrance preparation</h2>
            <p className="section__subtitle">
              Built with clean architectural design to provide every student in our community with fast, organized, and reliable learning tools.
            </p>
          </div>

          <div className="features__grid reveal">
            <div className="feature-card">
              <div className="feature-card__number">01</div>
              <h3 className="feature-card__title">Centralized Study Repository</h3>
              <p className="feature-card__description">
                Direct access to structured lecture notes, previous entrance question banks, and revision sheets organized by target curriculum.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__number">02</div>
              <h3 className="feature-card__title">Interactive Course Allocation</h3>
              <p className="feature-card__description">
                Request custom profile allocation and connect instantly with faculty mentors via pre-filled verification pipelines.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__number">03</div>
              <h3 className="feature-card__title">Real-Time Academic Routines</h3>
              <p className="feature-card__description">
                Stay updated with instant notices, exam countdowns, and schedule adjustments published directly by platform administrators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Preparation Tracks (Clean Modern Grid replacing unwanted subject clutter) ---- */}
      <section className="subjects-section" id="subjects">
        <div className="container">
          <div className="section__header section__header--center reveal">
            <div className="section__label">Preparation Tracks</div>
            <h2 className="section__title">Focused on national competitive benchmarks</h2>
            <p className="section__subtitle">
              Targeted learning pathways tailored for Nepal's premier university entrance examinations.
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
                Medical Entrance Prep
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                Comprehensive coverage of Physics, Chemistry, Zoology, and Botany modules specifically aligned with Medical Education Commission (MEC) examination patterns.
              </p>
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', color: 'var(--green-600)', fontWeight: 600, fontSize: '13px' }}>
                Open Study Modules & Past Papers
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
                Engineering Entrance Prep
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                Rigorous practice modules focusing on Engineering Mathematics, Physics problem solving, Chemistry fundamentals, and English aptitude tests.
              </p>
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', color: 'var(--green-600)', fontWeight: 600, fontSize: '13px' }}>
                Advanced Numerical & Formula Banks
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
                NEB
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Grade 11 & 12 Curriculum
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                Foundational board exam reinforcement designed to ensure students excel in their college assessments while laying groundwork for competitive entrance benchmarks.
              </p>
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', color: 'var(--green-600)', fontWeight: 600, fontSize: '13px' }}>
                Complete Science Faculty Support
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
            <h2 className="section__title">Three simple steps</h2>
            <p className="section__subtitle">
              Set up your student profile, join your classes, and stay ahead of your preparation.
            </p>
          </div>

          <div className="how-it-works__grid reveal">
            {[
              {
                num: '01',
                title: 'Create an account',
                description: 'Set up your secure student portal profile in under a minute with your academic grade and stream details.',
              },
              {
                num: '02',
                title: 'Access study modules',
                description: 'Explore verified study materials, revision notes, and check active routines seamlessly inside your dashboard.',
              },
              {
                num: '03',
                title: 'Connect with faculty',
                description: 'Request course allocation and interact with mentors to keep your preparation structured and consistent.',
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
            <div className="section__label">Community Impact</div>
            <h2 className="section__title">What our students say</h2>
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

      {/* ---- Engineered CTA ---- */}
      <section className="cta-section">
        <div className="container">
          <div className="cta__content">
            <h2 className="cta__title">Start learning today</h2>
            <p className="cta__subtitle">
              Join over 500+ ambitious community students preparing for medical and engineering entrance exams on Seed Society.
            </p>
            <div className="cta__actions">
              <Link to="/register" className="cta__btn-primary">
                Create Free Account
                <IconArrowRight size={15} />
              </Link>
              <Link to="/login" className="cta__btn-secondary">
                Sign in to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
