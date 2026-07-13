import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z" />
                </svg>
              </div>
              <span className="footer__logo-text">Seed<span>Society</span></span>
            </div>
            <p className="footer__description">
              Empowering CEE & IOE engineering/medical aspirants and NEB Grade 11 & 12 students across Nepal with structured, high-quality education.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
                  <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="white" />
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer__column-title">Quick Links</h4>
            <div className="footer__links">
              <Link to="/" className="footer__link">Home</Link>
              <Link to="/#features" className="footer__link">Features</Link>
              <Link to="/#subjects" className="footer__link">Subjects</Link>
              <Link to="/register" className="footer__link">Get Started</Link>
              <Link to="/login" className="footer__link">Login</Link>
            </div>
          </div>

          <div>
            <h4 className="footer__column-title">Subjects</h4>
            <div className="footer__links">
              <a href="#" className="footer__link">Physics</a>
              <a href="#" className="footer__link">Chemistry</a>
              <a href="#" className="footer__link">Mathematics</a>
              <a href="#" className="footer__link">Biology</a>
              <a href="#" className="footer__link">English</a>
              <a href="#" className="footer__link">Computer Science</a>
            </div>
          </div>

          <div>
            <h4 className="footer__column-title">Contact</h4>
            <div className="footer__links">
              <span className="footer__link">Janakpur, Nepal</span>
              <a href="https://wa.me/9779807681123" target="_blank" rel="noopener noreferrer" className="footer__link" style={{ color: '#25D366', fontWeight: 600 }}>WhatsApp: +977 980-7681123</a>
              <a href="mailto:hello@seedsocietynepal.com" className="footer__link">hello@seedsocietynepal.com</a>
              <span className="footer__link">Sun–Fri, 8 AM – 6 PM</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 <a href="https://seedsocietynepal.com">Seed Society</a>. All rights reserved. Built in Janakpur, Nepal.
          </p>
          <div className="footer__bottom-links">
            <Link to="/privacy" className="footer__bottom-link">Privacy Policy</Link>
            <Link to="/terms" className="footer__bottom-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
