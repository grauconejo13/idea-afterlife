import { useEffect, useMemo, useState } from "react";
import { categories, permissionModes, sampleIdeas } from "./data/sampleIdeas";

function Mark() {
  return <span className="mark" aria-hidden="true">◌</span>;
}

function Header({ onNavigate, view }) {
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
        <button type="button" onClick={() => navigate("about")}>How it works</button>
        <button className="nav__cta" type="button" onClick={() => navigate("submit")}>Leave an idea</button>
      </nav>
    </header>
  );
}

function IdeaCard({ idea, onOpen }) {
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

function Home({ onNavigate, onOpen }) {
  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">An archive for unfinished possibilities</p>
          <h1>Good ideas deserve more than one beginning.</h1>
          <p className="hero__copy">Share the idea you could not finish—its story, remains, and lessons—so someone else might learn from it or carry it forward.</p>
          <div className="button-row">
            <button className="button" type="button" onClick={() => onNavigate("archive")}>Explore the archive</button>
            <button className="button button--quiet" type="button" onClick={() => onNavigate("submit")}>Leave an idea behind</button>
          </div>
        </div>
        <div className="hero__artifact" aria-hidden="true"><span className="artifact-ring" /><span className="artifact-line" /><p>Not lost.<br />Still becoming.</p></div>
      </section>

      <section className="principle-strip" aria-label="Idea Afterlife principles">
        <p><span>01</span> Preserve the story</p><p><span>02</span> Make permission clear</p><p><span>03</span> Credit every revival</p>
      </section>

      <section className="featured section">
        <div className="section-heading"><div><p className="eyebrow">Recently left behind</p><h2>Ideas awaiting another life</h2></div><button className="text-link" type="button" onClick={() => onNavigate("archive")}>View the full archive →</button></div>
        <div className="idea-grid">{sampleIdeas.slice(0, 3).map((idea) => <IdeaCard key={idea.id} idea={idea} onOpen={onOpen} />)}</div>
      </section>

      <section className="manifesto section">
        <p className="manifesto__number">01—03</p>
        <div><p className="eyebrow">Why this exists</p><h2>Finished work has portfolios.<br />Unfinished work deserves a place too.</h2><p>Idea Afterlife is not a marketplace for claiming someone else's thought. It is a record of attempts, lessons, and invitations—with the original creator's intent kept visible.</p></div>
      </section>
    </>
  );
}

function Archive({ onOpen }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [permission, setPermission] = useState("All permissions");
  const filtered = useMemo(() => sampleIdeas.filter((idea) => {
    const text = `${idea.title} ${idea.summary} ${idea.tags.join(" ")}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (category === "All" || idea.category === category) && (permission === "All permissions" || idea.permission === permission);
  }), [query, category, permission]);

  return (
    <section className="archive-page section">
      <div className="page-intro"><p className="eyebrow">The archive</p><h1>What could still become?</h1><p>Browse attempts, fragments, and possibilities shared with clear intentions for what may happen next.</p></div>
      <div className="filters" aria-label="Filter ideas">
        <label className="search"><span className="sr-only">Search ideas</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search titles, stories, or tags" /><span aria-hidden="true">⌕</span></label>
        <label><span className="sr-only">Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span className="sr-only">Permission</span><select value={permission} onChange={(event) => setPermission(event.target.value)}><option>All permissions</option>{permissionModes.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <div className="result-count" aria-live="polite"><span>{String(filtered.length).padStart(2, "0")} records</span><span>Showing what remains</span></div>
      {filtered.length ? <div className="idea-grid idea-grid--archive">{filtered.map((idea) => <IdeaCard key={idea.id} idea={idea} onOpen={onOpen} />)}</div> : <div className="empty-state"><Mark /><h2>Nothing rests here yet.</h2><p>Try removing a filter or searching for a broader possibility.</p><button className="button button--quiet" type="button" onClick={() => { setQuery(""); setCategory("All"); setPermission("All permissions"); }}>Clear filters</button></div>}
    </section>
  );
}

function IdeaDetail({ idea, onBack, onNavigate }) {
  return (
    <article className="detail-page section">
      <button className="text-link back-link" type="button" onClick={onBack}>← Back to archive</button>
      <header className={`detail-hero detail-hero--${idea.accent}`}>
        <div><p className="eyebrow">Record {idea.year} · {idea.category}</p><h1>{idea.title}</h1><p className="detail-hero__summary">{idea.summary}</p><div className="tag-row">{idea.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div></div>
        <div className="detail-seal"><Mark /><span>{idea.status}</span><small>Left by {idea.creator}</small></div>
      </header>
      <div className="detail-layout">
        <div className="detail-story"><section><p className="eyebrow">The idea</p><h2>What it wanted to become</h2><p>{idea.story}</p></section><section><p className="eyebrow">Where it stopped</p><h2>Why it was left behind</h2><p>{idea.stalled}</p></section><section><p className="eyebrow">What it taught</p><blockquote>{idea.lessons}</blockquote></section></div>
        <aside><div className="permission-panel"><p className="eyebrow">Creator permission</p><h2>{idea.permission}</h2><p>Public sharing does not transfer ownership. Credit this record and follow the creator's stated intent.</p></div><div className="remains"><p className="eyebrow">The remains</p><ul>{idea.remains.map((item) => <li key={item}><span aria-hidden="true">◇</span>{item}</li>)}</ul></div></aside>
      </div>
      <section className="last-wish"><p className="eyebrow">The last wish</p><blockquote>“{idea.lastWish}”</blockquote><button className="button" type="button" onClick={() => onNavigate("submit")}>Begin a related idea</button></section>
      <section className="lineage"><div><p className="eyebrow">Lineage</p><h2>No revivals recorded—yet.</h2></div><p>Future continuations will appear here without erasing where the idea began.</p></section>
    </article>
  );
}

function SubmitIdea({ onNavigate }) {
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const submit = (event) => { event.preventDefault(); setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); };
  if (submitted) return <section className="success-page section"><Mark /><p className="eyebrow">Draft received</p><h1>Your idea has somewhere to rest.</h1><p><strong>{title}</strong> exists only in this browser prototype and has not been published. The real draft and review workflow arrives in Milestone 2.</p><button className="button" type="button" onClick={() => onNavigate("archive")}>Return to the archive</button></section>;
  return (
    <section className="submit-page section">
      <div className="page-intro"><p className="eyebrow">Leave an idea behind</p><h1>Tell us what almost existed.</h1><p>You are sharing a record and an invitation—not automatically surrendering ownership.</p></div>
      <form onSubmit={submit}>
        <fieldset><legend><span>01</span> The possibility</legend><label>Idea title<input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What did you call it?" /></label><label>Short summary<textarea required rows="3" placeholder="Describe the possibility in one or two sentences." /></label><div className="form-row"><label>Category<select required defaultValue=""><option value="" disabled>Choose one</option>{categories.slice(1).map((item) => <option key={item}>{item}</option>)}</select></label><label>Status<select required defaultValue=""><option value="" disabled>Choose one</option><option>Unrealized</option><option>Paused</option><option>Abandoned</option><option>Almost made</option><option>Prototype failed</option></select></label></div></fieldset>
        <fieldset><legend><span>02</span> The story</legend><label>What did it want to become?<textarea required rows="6" placeholder="Share the original intention and the story around it." /></label><label>Why did it stop?<textarea required rows="4" placeholder="Time, cost, confidence, technology, life—or something else?" /></label><label>What did it teach you?<textarea rows="3" placeholder="Leave a useful lesson for the next person." /></label></fieldset>
        <fieldset><legend><span>03</span> The remains</legend><div className="upload-placeholder"><Mark /><strong>Media arrives in Milestone 2</strong><p>The production form will accept responsibly limited images, video, documents, and prototype links.</p></div><label>What remains?<textarea rows="3" placeholder="List sketches, research, prototypes, files, or links that exist." /></label><label>Your last wish<textarea required rows="3" placeholder="What do you hope someone does with this idea?" /></label></fieldset>
        <fieldset><legend><span>04</span> Permission</legend><label>How may others respond?<select required defaultValue=""><option value="" disabled>Select a permission mode</option>{permissionModes.map((item) => <option key={item}>{item}</option>)}</select></label><div className="permission-note"><strong>This is an expression of intent, not a legal license.</strong><p>Published ideas will retain creator credit and visible lineage. Formal licensing controls reuse of protected work.</p></div><label className="check"><input required type="checkbox" /> <span>I understand that this prototype does not transfer ownership and that my selected permission will be displayed publicly.</span></label></fieldset>
        <button className="button button--large" type="submit">Preview this idea's afterlife</button>
      </form>
    </section>
  );
}

function About({ onNavigate }) {
  return <section className="about-page section"><div className="page-intro"><p className="eyebrow">How it works</p><h1>An archive, not an idea grab.</h1><p>Idea Afterlife keeps the origin visible while making room for responsible continuation.</p></div><ol className="steps"><li><span>01</span><div><h2>Leave the whole story</h2><p>Share the possibility, what you tried, where it stopped, and what remains.</p></div></li><li><span>02</span><div><h2>State your intention</h2><p>Choose whether people may only view, find inspiration, remix, collaborate, or independently adopt.</p></div></li><li><span>03</span><div><h2>Grow visible lineage</h2><p>Revivals link back to their origin so credit and lessons are never detached from the next attempt.</p></div></li></ol><button className="button" type="button" onClick={() => onNavigate("submit")}>Leave an idea</button></section>;
}

export default function App() {
  const [view, setView] = useState("home");
  const [selectedIdea, setSelectedIdea] = useState(null);
  const navigate = (next) => { setSelectedIdea(null); setView(next); window.scrollTo({ top: 0, behavior: "auto" }); };
  const openIdea = (idea) => { setSelectedIdea(idea); setView("detail"); window.scrollTo({ top: 0, behavior: "auto" }); };
  useEffect(() => { document.title = view === "home" ? "Idea Afterlife" : `${view === "detail" ? selectedIdea?.title : view[0].toUpperCase() + view.slice(1)} · Idea Afterlife`; }, [view, selectedIdea]);
  return <div className="app-shell"><Header onNavigate={navigate} view={view} /><main>{view === "home" && <Home onNavigate={navigate} onOpen={openIdea} />}{view === "archive" && <Archive onOpen={openIdea} />}{view === "detail" && selectedIdea && <IdeaDetail idea={selectedIdea} onBack={() => navigate("archive")} onNavigate={navigate} />}{view === "submit" && <SubmitIdea onNavigate={navigate} />}{view === "about" && <About onNavigate={navigate} />}</main><footer className="site-footer"><div><a className="wordmark" href="#top"><Mark /> Idea Afterlife</a><p>Some ideas only need another person to begin.</p></div><div><p>Public prototype · Milestone 1</p><p>Credit the origin. Continue with care.</p></div></footer></div>;
}
