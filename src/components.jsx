import { useState } from "react";

export function Mark() {
  return <span className="mark" aria-hidden="true">◌</span>;
}

export function Header({ onNavigate, view }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = (next) => {
    onNavigate(next);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <button className="wordmark" type="button" onClick={() => navigate("home")}>
        <Mark /> Idea Afterlife
      </button>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        Menu
      </button>
      <nav id="site-navigation" className={menuOpen ? "nav nav--open" : "nav"} aria-label="Primary navigation">
        <button className={view === "archive" ? "is-active" : ""} type="button" onClick={() => navigate("archive")}>Archive</button>
        <button className={view === "about" ? "is-active" : ""} type="button" onClick={() => navigate("about")}>How it works</button>
        <button className="nav__cta" type="button" onClick={() => navigate("submit")}>Leave an idea</button>
      </nav>
    </header>
  );
}

export function IdeaCard({ idea, onOpen }) {
  return (
    <article className={`idea-card idea-card--${idea.accent}`}>
      <div className="idea-card__visual" aria-hidden="true"><span>{idea.year}</span><Mark /></div>
      <div className="idea-card__body">
        <div className="idea-card__meta"><span>{idea.category}</span><span>{idea.status}</span></div>
        <h3>{idea.title}</h3>
        <p>{idea.summary}</p>
        <div className="idea-card__footer">
          <span className="permission">{idea.permission}</span>
          <button className="text-link" type="button" onClick={() => onOpen(idea)}>Read its story <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </article>
  );
}
