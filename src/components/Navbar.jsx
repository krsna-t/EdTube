import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    const videoUrl = e.target.elements.videoUrl.value;
    
    try {
      const url = new URL(videoUrl);
      let videoId = '';

      if (url.hostname === 'youtu.be') {
        videoId = url.pathname.slice(1);
      } else if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
        videoId = url.searchParams.get('v');
      }

      if (videoId) {
        window.location.hash = `/?video=${videoId}`;
        e.target.elements.videoUrl.value = '';
      }
    } catch (error) {
      console.error('Invalid URL');
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-left">
            <Link to="/" className="navbar-brand" onClick={closeMenu}>
              EdTube
            </Link>

            {/* Video URL Form - Only visible on desktop */}
            <form className="search-form" onSubmit={handleVideoSubmit}>
              <input
                type="url"
                name="videoUrl"
                className="form-control"
                placeholder="Enter the URL of the video"
                aria-label="Video URL"
              />
              <button type="submit" className="btn btn-primary">
                Load video
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <ul className="navbar-nav">
            <li>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/resources" className={`nav-link ${location.pathname === '/resources' ? 'active' : ''}`}>
                Resources
              </Link>
            </li>
            <li>
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                contact
              </Link>
            </li>
          </ul>

          {/* Desktop Theme Switcher */}
          <button
            className="theme-switcher"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Hamburger Menu Button */}
          <button 
            className={`hamburger-menu ${isOpen ? 'open' : ''}`}
            onClick={toggleMenu} 
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
          <ul className="navbar-nav">
            <li>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/resources" className={`nav-link ${location.pathname === '/resources' ? 'active' : ''}`} onClick={closeMenu}>
                Resources
              </Link>
            </li>
            <li>
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={closeMenu}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} onClick={closeMenu}>
                contact
              </Link>
            </li>
          </ul>
          
          {/* Theme Switcher for Mobile */}
          <div className="mobile-theme-toggle">
            <button
              className="theme-switcher"
              onClick={() => {
                toggleTheme();
                closeMenu();
              }}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="theme-text">
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
              </span>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 