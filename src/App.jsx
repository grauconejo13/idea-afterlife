import { sampleIdeas } from "./data/sampleIdeas";

function IdeaCard({ idea }) {
  return (
    <article className="idea-card">
      <div className="idea-card__meta">
        <span>{idea.category}</span>
        <span>{idea.status}</span>
      </div>
      <h2>{idea.title}</h2>
      <p>{idea.summary}</p>
      <footer>
        <span>{idea.permission}</span>
        <button type="button" aria-label={`Read the story of ${idea.title}`}>
          Read its story
        </button>
      </footer>
    </article>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Idea Afterlife home">
          Idea Afterlife
        </a>
        <span>Milestone 0</span>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">An archive for unfinished possibilities</p>
          <h1>Good ideas deserve more than one beginning.</h1>
          <p className="hero__copy">
            Leave behind the idea you could not finish—its story, remains, and
            lessons—so someone else might learn from it or carry it forward.
          </p>
          <div className="hero__actions">
            <button type="button">Explore ideas</button>
            <button className="button--quiet" type="button">
              Leave an idea behind
            </button>
          </div>
        </section>

        <section className="archive" aria-labelledby="archive-title">
          <div className="section-heading">
            <p className="eyebrow">Early records</p>
            <h2 id="archive-title">A glimpse of the archive</h2>
          </div>
          <div className="idea-grid">
            {sampleIdeas.map((idea) => (
              <IdeaCard idea={idea} key={idea.id} />
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Some ideas only need another person to begin.</p>
        <p>Prototype scaffold · No accounts or uploads yet</p>
      </footer>
    </div>
  );
}
