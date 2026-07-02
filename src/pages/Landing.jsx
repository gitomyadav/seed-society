import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { features, subjects, testimonials } from '../data/mockData';
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
            Interactive Entrance & Board Prep Portal
          </div>

          <h1 className="hero__title">
            Your path to engineering & medical<br />
            starts <em>right here</em>
          </h1>

          <p className="hero__subtitle">
            An open, accessible student platform offering structured interactive classes, verified study notes, and organized exam routines for CEE, IOE entrance and NEB Grade 11 & 12 preparation.
          </p>

          <div className="hero__actions">
            <Link to="/register" className="btn btn--primary btn--lg">
              Start Learning Free
              <IconArrowRight size={15} />
            </Link>
            <Link to="/login" className="btn btn--outline btn--lg">
              Student Login
            </Link>
          </div>

          <div className="hero__note">
            <span>
              500+ Students Active
              <span className="hero__note-divider" />
              Inclusive Community Hub
              <span className="hero__note-divider" />
              CEE & IOE Focus
            </span>
          </div>
        </div>
      </section>

      {/* ---- Trust Bar ---- */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-bar__inner">
            <p className="trust-bar__label">Platform Core Pillars</p>
            <div className="trust-bar__items">
              <div className="trust-bar__item">
                <div className="trust-bar__item-icon">
                  <IconVideo size={18} />
                </div>
                Interactive live classes
              </div>
              <div className="trust-bar__item">
                <div className="trust-bar__item-icon">
                  <IconBook size={18} />
                </div>
                Verified study notes
              </div>
              <div className="trust-bar__item">
                <div className="trust-bar__item-icon">
                  <IconCalendar size={18} />
                </div>
                Structured exam routines
              </div>
              <div className="trust-bar__item">
                <div className="trust-bar__item-icon">
                  <IconUsers size={18} />
                </div>
                Expert mentor guidance
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
            <h2 className="section__title">Everything an ambitious aspirant needs</h2>
            <p className="section__subtitle">
              No scattered chat groups or chaotic drives. Just streamlined, structured learning tools designed to give every student equal opportunity to succeed.
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
            <div className="section__label">Curriculum</div>
            <h2 className="section__title">Covering core medical & engineering syllabus</h2>
            <p className="section__subtitle">
              Structured modules tailored specifically for CEE medical entrance, IOE engineering entrance, and NEB science curriculum.
            </p>
          </div>

          <div className="subjects__grid">
            {subjects.map((subject, i) => (
              <div key={subject.id} className="subject-card reveal" style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="subject-card__indicator" style={{ background: subject.color }} />
                <h3 className="subject-card__name">{subject.name}</h3>
                <p className="subject-card__meta">{subject.chapters} chapters · Entrance & Board</p>
                <p className="subject-card__description">{subject.description}</p>
                <div className="subject-card__footer">
                  <div className="subject-card__avatar" style={{ background: subject.color }}>
                    {subject.teacher.split(' ').map(n => n[0]).join('')}
                  </div>
                  Dedicated Faculty Guidance
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- How It Works ---- */}
      <section className="how-it-works">
        <div className="container">
          <div className="section__header section__header--center reveal">
            <div className="section__label">Getting started</div>
            <h2 className="section__title">Three simple steps to start</h2>
            <p className="section__subtitle">
              Create your profile, explore interactive courses, and elevate your exam preparation.
            </p>
          </div>

          <div className="how-it-works__grid reveal">
            {[
              {
                num: '01',
                title: 'Create an account',
                description: 'Sign up with your name, grade, and stream. It takes less than a minute to set up your secure student portal.',
              },
              {
                num: '02',
                title: 'Explore course modules',
                description: 'Browse verified study materials, past question banks, and join interactive class sessions effortlessly.',
              },
              {
                num: '03',
                title: 'Connect with mentors',
                description: 'Request course allocation and receive direct guidance to stay on top of your entrance prep targets.',
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
            <div className="section__label">Community Voice</div>
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

      {/* ---- CTA ---- */}
      <section className="cta-section">
        <div className="container">
          <div className="cta__content">
            <h2 className="cta__title">Start learning today</h2>
            <p className="cta__subtitle">
              Join over 500+ ambitious community students preparing for CEE, IOE, and NEB board exams on Seed Society.
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
