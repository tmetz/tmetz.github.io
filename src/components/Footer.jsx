import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={{
        background: '#111827',
        color: '#f9fafb',
        padding: '3rem 0 2rem',
        borderTop: '1px solid #374151'
      }}
    >
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Contact Info */}
          <div>
            <h4 style={{ 
              fontSize: '1.1rem', 
              fontWeight: 600, 
              color: '#f9fafb',
              marginBottom: '1rem' 
            }}>
              Let's Connect
            </h4>
            <a
              href="mailto:tammy@tammymetz.com"
              style={{
                color: '#a855f7',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#9333ea'}
              onMouseLeave={(e) => e.target.style.color = '#a855f7'}
            >
              tammy@tammymetz.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ 
            color: '#9ca3af', 
            margin: 0,
            fontSize: '0.9rem'
          }}>
            © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
