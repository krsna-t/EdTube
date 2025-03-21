import React from 'react';

const Contact = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/_bkt_0/',
      icon: 'fab fa-instagram',
      color: '#E4405F',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/krsna-t',
      icon: 'fab fa-github',
      color: '#333333',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/balkrishna-tiwari/',
      icon: 'fab fa-linkedin',
      color: '#0077B5',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png'
    },
    {
      name: 'Email',
      url: 'mailto:krishna40tiwari@gmail.com',
      icon: 'fas fa-envelope',
      color: '#EA4335',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png'
    }
  ];

  return (
    <div className="contact-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="text-center mb-5">Get in Touch</h1>
            
            {/* Contact Information Card */}
            <div className="card mb-4 contact-card">
              <div className="card-body">
                <div className="text-center mb-4">
                  <div className="contact-icon mb-3">
                    <i className="fas fa-envelope-open-text"></i>
                  </div>
                  <h2 className="card-title h4 mb-3">Let's Connect!</h2>
                  <p className="text-muted mb-4">
                    Feel free to reach out through any of the following platforms. I'll get back to you as soon as possible.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="card contact-card">
              <div className="card-body">
                <div className="row g-4">
                  {socialLinks.map((social, index) => (
                    <div key={index} className="col-md-6">
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link-card"
                        style={{ backgroundColor: social.color }}
                      >
                        <div className="social-logo">
                          <img 
                            src={social.logo} 
                            alt={`${social.name} logo`}
                            className="social-icon"
                          />
                        </div>
                        <div className="social-info">
                          <span className="social-name">{social.name}</span>
                          <span className="social-handle">
                            {social.name === 'Email' ? 'krishna40tiwari@gmail.com' : 
                             social.name === 'Instagram' ? '@_bkt_0' :
                             social.name === 'GitHub' ? '@krsna-t' :
                             'Balkrishna Tiwari'}
                          </span>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 