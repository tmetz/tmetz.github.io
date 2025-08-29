import React from 'react';

const About = () => {
  const skills = [
    'Git', 'JavaScript', 'Node.js', 'Python',  
    'React', 'TypeScript',
  ];

  return (
    <section id="about" className="section" style={{ padding: '5rem 0', backgroundColor: '#f9fafb' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 
            className="heading-lg"
            style={{
              fontSize: '2.5rem',
              fontWeight: 600,
              color: '#1f2937',
              marginBottom: '1rem'
            }}
          >
            About Me
          </h2>
          <div 
            style={{
              width: '60px',
              height: '4px',
              background: 'linear-gradient(135deg, #a855f7 0%, #6b46c1 100%)',
              margin: '0 auto',
              borderRadius: '2px'
            }}
          />
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '3rem',
          alignItems: 'flex-start'
        }}>
          {/* Bio section */}
          <div>
            <h3 
              style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#a855f7',
                marginBottom: '1.5rem'
              }}
            >
              Hello there! 👋
            </h3>
            <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4b5563' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                I'm a former teacher and librarian turned software engineer.
              </p>
            </div>
          </div>
          
          {/* Skills section */}
          <div style={{ marginTop: '0' }}>
            <h3 
              style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#a855f7',
                marginBottom: '1.5rem'
              }}
            >
              Skills & Technologies
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
              gap: '0.75rem' 
            }}>
              {skills.map((skill, index) => (
                <div
                  key={index}
                  style={{
                    background: 'white',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: '#374151',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
