import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" style={{ textDecoration: 'none' }}>
              <img src="/logo-white.png" alt="Seed Society" style={{ height: '42px', width: 'auto' }} />
            </Link>
            <p className="footer__description">
              Empowering CEE & IOE engineering/medical aspirants and NEB Grade 11 & 12 students across Nepal with structured, high-quality education.
            </p>
            <div className="footer__social">
              <a href="https://www.facebook.com/profile.php?id=61561526202753" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/seedsociety2023" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer__column-title">Quick Links</h4>
            <div className="footer__links">
              <Link to="/" className="footer__link">Home</Link>
              <Link to="/#features" className="footer__link">Features</Link>
              <Link to="/#subjects" className="footer__link">Programs</Link>
              <Link to="/register" className="footer__link">Get Started</Link>
              <Link to="/login" className="footer__link">Login</Link>
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
            © 2026 <a href="https://seedsocietynepal.com">Seed Society</a>. All rights reserved.
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
