<div className="home-page">
  <div className="video-url-form">
    <form onSubmit={handleVideoSubmit} className="url-form">
      <input
        type="text"
        className="form-control"
        placeholder="Enter the URL of the video"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        aria-label="Video URL"
      />
      <button type="submit" className="btn btn-primary">
        Load video
      </button>
    </form>
  </div>

  <div className="quote-section">
    <div className="quote-container">
      <div className="quote-text">
        {quote}
      </div>
      <div className="quote-author">
        — {author}
      </div>
    </div>
  </div>

  <div className="search-section">
    <h2>Search</h2>
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        className="form-control"
        placeholder="Search for words or topics"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search"
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  </div>
</div> 