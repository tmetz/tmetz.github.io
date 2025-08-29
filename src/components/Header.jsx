import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
      style={{ width: '100%', position: 'fixed', top: 0, zIndex: 50 }}
    >
      <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
        <ul style={{ 
          display: 'flex', 
          listStyle: 'none', 
          gap: '2rem', 
          margin: 0,
          padding: 0
        }}>
          <li>
            <a 
              href="#about" 
              style={{ 
                color: isScrolled ? '#374151' : '#ffffff', 
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#a855f7'}
              onMouseLeave={(e) => e.target.style.color = isScrolled ? '#374151' : '#ffffff'}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#resume" 
              style={{ 
                color: isScrolled ? '#374151' : '#ffffff', 
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#a855f7'}
              onMouseLeave={(e) => e.target.style.color = isScrolled ? '#374151' : '#ffffff'}
            >
              Resume
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/tmetz" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: isScrolled ? '#374151' : '#ffffff', 
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#a855f7'}
              onMouseLeave={(e) => e.target.style.color = isScrolled ? '#374151' : '#ffffff'}
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
