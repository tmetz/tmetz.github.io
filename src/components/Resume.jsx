import React from 'react';

const Resume = () => {
  const experience = [
    {
      company: "GitHub",
      position: "Software Engineer III",
      period: "March, 2023 - Present",
      description: "Coming soon",
      technologies: ["React", "Node.js", "TypeScript"]
    },
    {
      company: "GitHub",
      position: "Software Engineer II",
      period: "March, 2022 - March, 2023",
      description: "Coming soon",
      technologies: ["React", "Node.js", "TypeScript"]
    },
    {
      company: "GitHub",
      position: "Technical Support Engineer",
      period: "March, 2020 - March, 2022",
      description: "Coming soon",
      technologies: ["Zendesk"]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Colorado Boulder",
      datesAttended: "2021 - present"
    },
    {
      degree: "Master of Library and Information Science",
      school: "University of Arizona",
      datesAttended: "2008 - 2011"
    }
  ];

  return (
    <section id="resume" className="section section-dark" style={{ backgroundColor: '#1f2937', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 
            className="heading-lg"
            style={{
              fontSize: '2.5rem',
              fontWeight: 600,
              color: '#f9fafb',
              marginBottom: '1rem'
            }}
          >
            Resume
          </h2>
          <div 
            style={{
              width: '60px',
              height: '4px',
              background: 'linear-gradient(135deg, #a855f7 0%, #6b46c1 100%)',
              margin: '0 auto 2rem auto',
              borderRadius: '2px'
            }}
          />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '3rem' 
        }}>
          {/* Experience Section */}
          <div>
            <h3 
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#a855f7',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              💼 Experience
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {experience.map((job, index) => (
                <div
                  key={index}
                  style={{
                    background: '#374151',
                    padding: '2rem',
                    borderRadius: '1rem',
                    border: '1px solid #4b5563',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = '#a855f7';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(168, 85, 247, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#4b5563';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: '#f9fafb', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                      {job.position}
                    </h4>
                    <p style={{ color: '#a855f7', fontSize: '1rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                      {job.company}
                    </p>
                    <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                      {job.period}
                    </p>
                  </div>
                  <p style={{ color: '#d1d5db', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {job.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {job.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        style={{
                          background: 'rgba(168, 85, 247, 0.1)',
                          color: '#a855f7',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          border: '1px solid rgba(168, 85, 247, 0.2)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Download Section */}
          <div>
            <h3 
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#a855f7',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              🎓 Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {education.map((edu, index) => (
                <div
                  key={index}
                  style={{
                    background: '#374151',
                    padding: '2rem',
                    borderRadius: '1rem',
                    border: '1px solid #4b5563',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = '#a855f7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#4b5563';
                  }}
                >
                  <h4 style={{ color: '#f9fafb', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {edu.degree}
                  </h4>
                  <p style={{ color: '#a855f7', fontSize: '1rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    {edu.school}
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                    Dates Attended: {edu.datesAttended}
                  </p>
                </div>
              ))}
            </div>

            {/* Download Resume Section */}
            <div 
              style={{
                marginTop: '2rem',
                background: 'linear-gradient(135deg, #a855f7 0%, #6b46c1 100%)',
                padding: '2rem',
                borderRadius: '1rem',
                textAlign: 'center'
              }}
            >
              <h4 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                Download Resume
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1.5rem' }}>
                Get a detailed copy of my resume in PDF format.
              </p>
              <button
                style={{
                  background: 'white',
                  color: '#6b46c1',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                onClick={() => alert('Resume download feature coming soon!')}
              >
                📄 Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
