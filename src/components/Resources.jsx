import React, { useState } from 'react';

const Resources = () => {
  const [showConstruction, setShowConstruction] = useState(true);

  const resources = [
    {
      category: "Learning Platforms",
      items: [
        {
          title: "Khan Academy",
          description: "Free online courses, lessons, and practice for various subjects",
          link: "https://www.khanacademy.org"
        },
        {
          title: "Coursera",
          description: "Online courses from top universities and companies",
          link: "https://www.coursera.org"
        },
        {
          title: "edX",
          description: "Free online courses from leading universities",
          link: "https://www.edx.org"
        },
        {
          title: "MIT OpenCourseWare",
          description: "Free access to MIT course materials",
          link: "https://ocw.mit.edu"
        },
        {
          title: "Udemy",
          description: "Online courses in various fields with expert instructors",
          link: "https://www.udemy.com"
        }
      ]
    },
    {
      category: "Study Tools",
      items: [
        {
          title: "Quizlet",
          description: "Create and study flashcards",
          link: "https://quizlet.com"
        },
        {
          title: "Anki",
          description: "Powerful flashcard app using spaced repetition",
          link: "https://apps.ankiweb.net"
        },
        {
          title: "Wolfram Alpha",
          description: "Computational knowledge engine for math and science",
          link: "https://www.wolframalpha.com"
        },
        {
          title: "Notion",
          description: "All-in-one workspace for notes, tasks, and collaboration",
          link: "https://www.notion.so"
        },
        {
          title: "Evernote",
          description: "Note-taking app for organizing and sharing notes",
          link: "https://evernote.com"
        }
      ]
    },
    {
      category: "Research & References",
      items: [
        {
          title: "Google Scholar",
          description: "Search for scholarly literature and academic papers",
          link: "https://scholar.google.com"
        },
        {
          title: "JSTOR",
          description: "Digital library of academic journals and books",
          link: "https://www.jstor.org"
        },
        {
          title: "ResearchGate",
          description: "Professional network for scientists and researchers",
          link: "https://www.researchgate.net"
        },
        {
          title: "Mendeley",
          description: "Reference manager and academic social network",
          link: "https://www.mendeley.com"
        }
      ]
    },
    {
      category: "Productivity Tools",
      items: [
        {
          title: "Forest",
          description: "Stay focused and plant real trees",
          link: "https://www.forestapp.cc"
        },
        {
          title: "RescueTime",
          description: "Track your digital habits and boost productivity",
          link: "https://www.rescuetime.com"
        },
        {
          title: "Todoist",
          description: "To-do list and task manager",
          link: "https://todoist.com"
        },
        {
          title: "Focus@Will",
          description: "Music scientifically designed to boost concentration",
          link: "https://www.focusatwill.com"
        }
      ]
    },
    {
      category: "Language Learning",
      items: [
        {
          title: "Duolingo",
          description: "Free language learning platform",
          link: "https://www.duolingo.com"
        },
        {
          title: "Memrise",
          description: "Language learning with spaced repetition",
          link: "https://www.memrise.com"
        },
        {
          title: "Busuu",
          description: "Social language learning platform",
          link: "https://www.busuu.com"
        },
        {
          title: "LingoDeer",
          description: "Asian language learning app",
          link: "https://www.lingodeer.com"
        }
      ]
    },
    {
      category: "Math & Science",
      items: [
        {
          title: "Desmos",
          description: "Free online graphing calculator",
          link: "https://www.desmos.com"
        },
        {
          title: "GeoGebra",
          description: "Interactive mathematics software",
          link: "https://www.geogebra.org"
        },
        {
          title: "Brilliant",
          description: "Learn math and science through problem-solving",
          link: "https://brilliant.org"
        },
        {
          title: "PhET Simulations",
          description: "Interactive science and math simulations",
          link: "https://phet.colorado.edu"
        }
      ]
    }
  ];

  return (
    <div className="resources-page">
      {showConstruction && (
        <div className="floating-overlay">
          <div className="floating-construction-card">
            <button className="close-construction" onClick={() => setShowConstruction(false)}>
              ×
            </button>
            <div className="construction-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h2>🚧 Plot Twist: We're Still Building! 🏗️</h2>
            <p>Warning: Side effects of these resources may include becoming too smart for your own good!</p>
            {/* <ul>
              <li>🎓 Knowledge level: "My mom thinks I'm a genius"</li>
              <li>🐱 Study buddies include: Your cat who judges your life choices</li>
              <li>🛋️ Social life status: "Netflix asked if I'm still watching... twice"</li>
              <li>🤓 Achievement unlocked: "Convinced family WiFi slow-down is due to quantum physics research"</li>
              <li>☕ Current motivation level: Somewhere between coffee cup #3 and #7</li>
              <li>📱 Productivity level: Deleted TikTok (reinstalled 3 times today)</li>
              <li>🌟 Success rate: Higher than your phone's battery percentage</li>
              <li>🍕 Essential equipment: Snacks that disappear during loading screens</li>
            </ul> */}
            <div className="construction-footer">
              <div style={{ marginBottom: '10px' }}>
                <span>Loading Resources... </span>
                <br />
                <span>[▓▓▓▓▓▓░░░░] 60% </span>
                <br />
                <span style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>
                  (Loading speed powered by coffee v2.0)
                </span>
              </div>
              <p>
                🎯 Click X to see what we've got so far!
                <br />
                <span style={{ fontSize: '0.8em' }}>No hard hat required, but caffeine recommended ☕</span>
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="container">
        <div className="row">
          {resources.map((category, index) => (
            <div key={index} className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h2>{category.category}</h2>
                </div>
                <div className="list-group list-group-flush">
                  {category.items.map((item, itemIndex) => (
                    <a
                      key={itemIndex}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="list-group-item list-group-item-action"
                    >
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources; 