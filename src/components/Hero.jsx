import React from 'react';

const Hero = () => {
  return (
    <section 
      className="hero"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ textAlign: 'center', zIndex: 2 }}>
        <h1 
          className="heading-xl"
          style={{
            fontSize: '3.5rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            animation: 'fadeInUp 1s ease-out'
          }}
        >
          Tammy Metz
        </h1>
        <p 
          className="text-lg"
          style={{
            fontSize: '1.5rem',
            marginBottom: '2rem',
            opacity: 0.9,
            animation: 'fadeInUp 1s ease-out 0.2s both'
          }}
        >
          Software Engineer
        </p>
        <div 
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeInUp 1s ease-out 0.6s both'
          }}
        >
          <a 
            href="#about" 
            className="btn btn-white"
            style={{
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: 500,
              background: 'white',
              color: '#6b46c1',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            Learn More About Me
          </a>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
