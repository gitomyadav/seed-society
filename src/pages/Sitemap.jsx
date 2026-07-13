import { Link } from 'react-router-dom';
import './Sitemap.css';

export default function Sitemap() {
  const sitemapData = [
    { path: '/', label: 'Home', description: 'Main landing page' },
    { path: '/login', label: 'Student Login', description: 'Student authentication' },
    { path: '/register', label: 'Student Register', description: 'Create new student account' },
    { path: '/admin-login', label: 'Admin Login', description: 'Faculty/Admin login' },
    { path: '/privacy', label: 'Privacy Policy', description: 'Privacy and data protection' },
    { path: '/terms', label: 'Terms & Conditions', description: 'Terms of service' },
  ];

  return (
    <div className="sitemap-container">
      <div className="sitemap-content">
        <h1>Sitemap</h1>
        <p className="sitemap-subtitle">All public pages and routes</p>

        <div className="routes-list">
          {sitemapData.map((route, index) => (
            <Link key={index} to={route.path} className="route-item">
              <div className="route-info">
                <span className="route-path">{route.path}</span>
                <span className="route-label">{route.label}</span>
              </div>
              <p className="route-description">{route.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
