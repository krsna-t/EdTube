import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="text-center mb-4">About EdTube</h1>
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title h4">Our Mission</h2>
                <p className="card-text">
                EdTube exists because let’s be honest—one moment, you’re watching a physics lecture, and the next, you’re deep into "Salman Khan ki gaadi kaun chala raha tha?" conspiracy theories. Start with calculus, end up debating internet mysteries—classic.
                So yeah, I built this.
                </p>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title h4">What We Offer</h2>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="feature-card">
                      <h3 className="h5">Integrated Learning Environment</h3>
                      <p>Seamlessly combine YouTube videos with study tools for a comprehensive learning experience.</p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="feature-card">
                      <h3 className="h5">Pomodoro Timer</h3>
                      <p>Stay focused with our built-in Pomodoro timer, alternating between study and break sessions.</p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="feature-card">
                      <h3 className="h5">Quick Search</h3>
                      <p>Access dictionary and Wikipedia resources instantly while watching educational content.</p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="feature-card">
                      <h3 className="h5">Inspirational Quotes</h3>
                      <p>Stay motivated with our collection of educational and inspirational quotes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title h4">Our Story</h2>
                <p className="card-text">
                  EdTube exists because, let’s be real—I start a YouTube lecture, and next thing I know, I’m deep into a ‘Sydney Sweeney’s Best Looks’ montage or a ‘Megan Fox Being Iconic’ compilation. That’s when I realized... yeah, this ain't studying. So, I built a tool to keep myself (and, let’s be honest, everyone else) actually learning instead of accidentally becoming a pop culture expert.

                  Now, EdTube keeps evolving—unlike my attention span—powered by user feedback and real research (not just Wikipedia at 2 AM). The goal? Less ‘Where is Megan Fox now?’ and more ‘Oh damn, I actually learned something.
                </p>
                <p className="card-text">
                  Today, EdTube continues to evolve, incorporating user feedback and the latest educational research to provide the best possible learning experience.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h2 className="card-title h4">Get Started</h2>
                <p className="card-text">
                  Ready to enhance your learning experience? Here's how to get started:
                </p>
                <ol className="list-group list-group-numbered">
                  <li className="list-group-item">Paste a YouTube video URL or search for educational content</li>
                  <li className="list-group-item">Use the Pomodoro timer to structure your study sessions</li>
                  <li className="list-group-item">Use the quick search feature to look up terms and concepts</li>
                  <li className="list-group-item">Stay motivated with inspirational quotes during breaks</li>
                </ol>
              </div>
            </div>

            {/* Contact Us Section */}
            <div className="text-center mt-5">
              <h2 className="h4 mb-4">Have Questions?</h2>
              <Link 
                to="/contact"
                className="btn btn-primary btn-lg"
              >
                <i className="fas fa-envelope me-2"></i>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 