import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Clear video URL when location changes
  useEffect(() => {
    setVideoUrl("");
  }, [location]);

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    if (videoUrl) {
      const videoId = extractVideoId(videoUrl);
      if (videoId) {
        navigate(`/?video=${videoId}`, { replace: true });
        window.location.reload();
      } else {
        alert('Please enter a valid YouTube URL');
      }
    }
  };

  const extractVideoId = (url) => {
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtube.com/embed/")) {
      videoId = url.split("embed/")[1]?.split("?")[0];
    }
    return videoId;
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-left">
            <Link className="navbar-brand" to="/" onClick={closeMenu}>
              <svg 
                className="brand-logo"
                viewBox="0 0 160 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Red rounded rectangle background */}
                <rect
                  x="0"
                  y="0"
                  width="160"
                  height="100"
                  rx="25"
                  fill="#FF4444"
                />
                {/* Open Book */}
                <g transform="translate(40, 8)">
                  {/* Left Page */}
                  <path
                    d="M10,10 L40,10 L40,74 L10,74 C5,74 5,10 10,10"
                    fill="#FFFFFF"
                    stroke="#4a5568"
                    strokeWidth="2"
                  />
                  {/* Right Page */}
                  <path
                    d="M70,10 L40,10 L40,74 L70,74 C75,74 75,10 70,10"
                    fill="#FFFFFF"
                    stroke="#4a5568"
                    strokeWidth="2"
                  />
                  {/* Center Binding */}
                  <path
                    d="M40,10 L40,74"
                    stroke="#4CAF50"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Page Lines - Left */}
                  <path
                    d="M15,26 L35,26 M15,42 L35,42 M15,58 L35,58"
                    stroke="#E0E0E0"
                    strokeWidth="1"
                  />
                  {/* Page Lines - Right */}
                  <path
                    d="M45,26 L65,26 M45,42 L65,42 M45,58 L65,58"
                    stroke="#E0E0E0"
                    strokeWidth="1"
                  />
                </g>
              </svg>
              EdTube
            </Link>
            <form onSubmit={handleVideoSubmit} className="search-form">
              <input
                type="text"
                className="form-control"
                placeholder="Search or paste YouTube URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                aria-label="Search or paste YouTube URL"
              />
              <button type="submit" className="btn btn-danger">
                Load Video
              </button>
            </form>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/resources' ? 'active' : ''}`} 
                to="/resources"
              >
                Resources
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} 
                to="/about"
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} 
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Desktop Theme Switcher */}
          <div className="navbar-right">
            <div className="theme-switcher">
              <button
                className="theme-toggle" 
                onClick={toggleTheme}
                data-theme={theme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              >
                {theme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

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
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/resources" 
                className={`nav-link ${location.pathname === '/resources' ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                Resources
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                Contact
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

export default Navigation; 