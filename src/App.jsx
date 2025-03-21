import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navigation from "./components/Navigation";
import Resources from "./components/Resources";
import About from "./components/About";
import Contact from './components/Contact';
import quotesFile from './quotes.txt';

const Home = () => {
  const [embedUrl, setEmbedUrl] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [quotes, setQuotes] = useState([]);

  // Load quotes from file
  useEffect(() => {
    fetch(quotesFile)
      .then(response => response.text())
      .then(text => {
        const quotesArray = text.split('\n')
          .filter(line => line.trim())
          .map(line => {
            const [text, author] = line.split('|');
            return { text: text.trim(), author: author.trim() };
          });
        setQuotes(quotesArray);
        // Set initial random quote
        const randomQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
        setQuote(randomQuote);
      })
      .catch(error => {
        console.error('Error loading quotes:', error);
        // Fallback quotes in case of error
        const fallbackQuotes = [
          { text: "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.", author: "Richard Feynman" },
          { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" }
        ];
        setQuotes(fallbackQuotes);
        setQuote(fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]);
      });
  }, []);

  // Handle video URL from navigation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const videoId = params.get('video');
    if (videoId) {
      setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
    } else {
      setEmbedUrl(""); // Clear the embed URL if no video ID is present
    }
  }, [window.location.search]);

  // Pomodoro States
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    try {
      // First try dictionary API
      const dictResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm.trim()}`);
      const dictData = await dictResponse.json();
      
      if (!dictResponse.ok) {
        // If dictionary search fails, try Wikipedia
        const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${searchTerm.trim()}`);
        const wikiData = await wikiResponse.json();
        
        if (wikiResponse.ok) {
          setSearchResults({
            type: 'wiki',
            title: wikiData.title,
            extract: wikiData.extract,
            thumbnail: wikiData.thumbnail?.source,
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(wikiData.title)}`
          });
        } else {
          setSearchResults({ error: "No results found" });
        }
      } else {
        setSearchResults({ type: 'dictionary', results: dictData });
      }
    } catch (error) {
      setSearchResults({ error: "No results found" });
    }
    setIsSearching(false);
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Play notification sound
      const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
      audio.play();
      
      // Switch between focus and break
      if (isBreak) {
        setTimeLeft(25 * 60); // Back to 25 minutes
        setIsBreak(false);
      } else {
        setTimeLeft(5 * 60); // 5 minute break
        setIsBreak(true);
      }
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setIsBreak(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Add function to clear search results
  const clearSearchResults = () => {
    setSearchResults(null);
    setSearchTerm("");
  };

  // Add structured data for SEO
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "StudyFocus",
      "description": "StudyFocus combines YouTube learning with Pomodoro timer and task management. The perfect study companion for students.",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "YouTube video integration",
        "Pomodoro timer",
        "Task management",
        "Dictionary search",
        "Wikipedia integration",
        "Inspirational quotes"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="app-wrapper">
      {/* Main Content */}
      <main className="main-content" role="main">
        <div className="content-wrapper">
          {/* Video Section */}
          <section className="video-section" aria-label="Video content">
            <div className="video-player">
              {embedUrl ? (
                <div className="video-container">
                  <iframe
                    src={embedUrl}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="video-placeholder">
                  <div className="quote-container">
                    <div className="quote-icon">❝</div>
                    <p className="quote-text">{quote.text}</p>
                    <p className="quote-author">― {quote.author}</p>
                    <button 
                      className="btn btn-outline-secondary mt-3"
                      onClick={() => {
                        const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
                        setQuote(newQuote);
                      }}
                    >
                      New Quote
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="sidebar">
            {/* Search Section */}
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title h5 mb-3">Search</h2>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for words or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                  </button>
                </div>
                {searchResults && (
                  <div className="search-results">
                    {searchResults.error ? (
                      <div className="alert alert-warning">{searchResults.error}</div>
                    ) : searchResults.type === 'dictionary' ? (
                      searchResults.results.map((entry, index) => (
                        <div key={index} className="search-result-item">
                          <div className="word-title">{entry.word}</div>
                          {entry.phonetics && entry.phonetics[0] && (
                            <div className="text-muted mb-2">
                              {entry.phonetics[0].text}
                            </div>
                          )}
                          {entry.meanings.map((meaning, mIndex) => (
                            <div key={mIndex} className="mb-2">
                              <div className="part-of-speech">{meaning.partOfSpeech}</div>
                              {meaning.definitions.map((def, dIndex) => (
                                <div key={dIndex} className="definition-text">
                                  {def.definition}
                                  {def.example && (
                                    <p className="example-text">{def.example}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))
                    ) : (
                      <div className="wiki-result">
                        <h3 className="word-title">{searchResults.title}</h3>
                        {searchResults.thumbnail && (
                          <img
                            src={searchResults.thumbnail}
                            alt={searchResults.title}
                            className="wiki-thumbnail"
                          />
                        )}
                        <p className="wiki-extract">{searchResults.extract}</p>
                        <a
                          href={searchResults.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="wiki-link"
                        >
                          Read more on Wikipedia →
                        </a>
                      </div>
                    )}
                    <button
                      className="close-search"
                      onClick={clearSearchResults}
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Pomodoro Timer */}
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title h5 mb-3">Pomodoro Timer</h2>
                <div className="text-center">
                  <div className="timer-display mb-2">{formatTime(timeLeft)}</div>
                  <div className="timer-label mb-3">
                    {isBreak ? "Break Time" : "Focus Time"}
                  </div>
                  <div className="d-flex justify-content-center gap-2">
                    {!isRunning ? (
                      <button className="btn btn-primary" onClick={handleStart}>
                        Start
                      </button>
                    ) : (
                      <button className="btn btn-warning" onClick={handlePause}>
                        Pause
                      </button>
                    )}
                    <button className="btn btn-secondary" onClick={handleReset}>
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Todo List */}
            <div className="card">
              <div className="card-body">
                <h2 className="card-title h5 mb-3">Todo List</h2>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add a task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                  />
                  <button className="btn btn-primary" onClick={handleAddTask}>
                    Add
                  </button>
                </div>
                <div className="todo-list">
                  {tasks.map((task, index) => (
                    <div key={index} className="todo-item d-flex justify-content-between align-items-center">
                      <span>{task}</span>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteTask(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Theme initialization code
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        {/* Header with semantic navigation */}
        <header className="app-header" role="banner">
          <Navigation theme={theme} toggleTheme={toggleTheme} />
        </header>

        {/* Main content area with semantic structure */}
        <main className="app-main" role="main">
          <Routes>
            <Route 
              path="/" 
              element={
                <article>
                  <Home />
                </article>
              } 
            />
            <Route 
              path="/resources" 
              element={
                <section aria-labelledby="resources-title">
                  <h1 id="resources-title" className="visually-hidden">Educational Resources</h1>
                  <Resources />
                </section>
              } 
            />
            <Route 
              path="/about" 
              element={
                <article aria-labelledby="about-title">
                  <h1 id="about-title" className="visually-hidden">About EdTube</h1>
                  <About />
                </article>
              } 
            />
            <Route 
              path="/contact" 
              element={
                <article aria-labelledby="contact-title">
                  <h1 id="contact-title" className="visually-hidden">Contact Us</h1>
                  <Contact />
                </article>
              } 
            />
          </Routes>
        </main>

        {/* Footer with semantic structure */}
        <footer className="app-footer" role="contentinfo">
          <div className="container">
            <p className="copyright">&copy; 2024 EdTube. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;