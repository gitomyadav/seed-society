import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function Terms() {
  return (
    <div className="container" style={{ padding: 'var(--space-16) var(--space-4)', maxWidth: '840px', margin: '0 auto' }}>
      <div style={{
        background: 'var(--bg-primary)',
        padding: 'var(--space-10)',
        borderRadius: 'var(--radius-2xl)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <Link to="/" style={{ color: 'var(--green-600)', fontWeight: 600, textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Home
          </Link>
        </div>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
          Terms of Service
        </h1>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '13px', marginBottom: 'var(--space-8)' }}>
          Last Updated: July 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
              1. Platform Usage & Purpose
            </h2>
            <p>
              Seed Society is an educational web portal designed to provide structured entrance exam preparation and board study resources for high school students in Nepal. By creating a student profile, you agree to use our study resources, live class links, and community features for personal academic preparation.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
              2. Open Access & Integrity
            </h2>
            <p>
              Our platform provides open access to study materials and notice boards to support equal learning opportunities across our community. Students are expected to maintain academic integrity and respectful communication when interacting with faculty mentors and course administrators.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
              3. Course Allocation
            </h2>
            <p>
              Enrollment requests initiated through our course catalog are subject to review and verification by platform administrators. Administrators reserve the right to organize class groupings and assign study modules based on student academic goals.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
              4. Service Modifications
            </h2>
            <p>
              We continuously improve our platform features, notice routines, and study repositories. We reserve the right to update or adjust course modules as curriculum guidelines evolve.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
