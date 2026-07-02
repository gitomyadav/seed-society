import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function Privacy() {
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
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '13px', marginBottom: 'var(--space-8)' }}>
          Last Updated: July 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
              1. Information We Collect
            </h2>
            <p>
              When you register on the Seed Society platform, we collect standard basic profile information including your full name, email address, academic grade, target entrance stream (CEE Medical or IOE Engineering), and contact phone/WhatsApp number. This information is strictly collected to personalize your study dashboard and verify course allocation requests.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
              2. How We Use Your Information
            </h2>
            <p>
              Your profile data is used exclusively to grant secure access to study modules, coordinate schedule notifications, and enable direct WhatsApp verification with faculty advisors. We do not sell, share, or monetize student information under any circumstances.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
              3. Data Security & Row-Level Access
            </h2>
            <p>
              Our database implements strict Row-Level Security (RLS) policies. Student profiles are protected within secure authenticated sessions, ensuring that only authorized administrators and course instructors can review enrollment data.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
              4. Community Commitment
            </h2>
            <p>
              As an initiative focused on community impact and educational accessibility across Nepal, we respect student privacy and maintain high ethical standards in managing our digital learning space.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
