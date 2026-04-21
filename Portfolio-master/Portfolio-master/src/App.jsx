import { useMemo, useState } from "react";

const publications = [
  {
    title: "M2NN: A multimodal mobility neural network framework",
    venue: "Transportation Research Part C (2025)",
    category: "transport",
    link: "https://www.sciencedirect.com/science/article/pii/S0968090X25004620",
    value:
      "Demonstrates scalable multimodal traffic prediction with clear operational planning relevance.",
  },
  {
    title: "MSGNN: A multimodal urban traffic speed prediction model",
    venue: "Transportation Research Part C (2023)",
    category: "transport",
    link: "https://www.sciencedirect.com/science/article/pii/S0968090X23003698",
    value:
      "Improves congestion forecasting to support safer, faster, and more proactive traffic operations.",
  },
  {
    title: "Trajectory-user linking with a deep neural network",
    venue: "Australasian Transport Research Forum (2023)",
    category: "methods",
    link: "https://www.australasiantransportresearchforum.org.au/wp-content/uploads/2023/09/ATRF_2023_Paper_43.pdf",
    value:
      "Shows practical representation-learning design for mobility behavior intelligence applications.",
  },
  {
    title: "Online traffic incident prediction with hybrid graph continual learning",
    venue: "Australasian Transport Research Forum (2022)",
    category: "transport",
    link: "https://trid.trb.org/View/2259782",
    value:
      "Highlights deployable continual-learning methods for incident early-warning pipelines.",
  },
];

const experience = [
  "Senior Principal, Data Analytics · The University of Queensland · Feb 2026 – Present",
  "Data Scientist · Department for Infrastructure and Transport · Jun 2024 – Jan 2026",
  "Machine Learning Instructor / TA · The University of Queensland · Feb 2021 – Aug 2024",
];

export default function App() {
  const [tab, setTab] = useState("all");
  const filtered = useMemo(() => {
    if (tab === "all") return publications;
    return publications.filter((item) => item.category === tab);
  }, [tab]);

  return (
    <div>
      <header className="header" id="home">
        <nav className="nav container">
          <a href="#home" className="brand">
            Thanh Tran<span>, PhD</span>
          </a>
          <ul className="nav-links">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#publications">Publications</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
        <div className="hero container">
          <p className="kicker">Principal Data Scientist & AI Engineer</p>
          <h1>Building practical AI systems with research depth.</h1>
          <p className="lead">
            I lead end-to-end data and AI programs, combining multimodal deep learning,
            graph methods, and LLM workflows into deployable solutions.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="mailto:t.tranvo187@gmail.com">
              Contact
            </a>
            <a className="btn" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/thanhvtr">
              LinkedIn
            </a>
            <a className="btn" target="_blank" rel="noreferrer" href="https://thanhvotran.github.io/">
              Personal website
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="section">
          <div className="container card">
            <h2>About</h2>
            <p>
              Senior analytics and AI leader with experience across public-sector
              transport, academia, and enterprise delivery. PhD in multimodal deep
              learning and hands-on track record in production-grade ML and GenAI.
            </p>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container">
            <h2>Experience</h2>
            <div className="timeline">
              {experience.map((item) => (
                <article key={item} className="timeline-item card">
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <h2>Projects</h2>
            <div className="grid">
              <article className="card">
                <h3>Traffic Incident Intelligence</h3>
                <p>Graph + multimodal models for risk forecasting and operational triage.</p>
              </article>
              <article className="card">
                <h3>LLM Decision Copilot</h3>
                <p>Retrieval-assisted assistant for drafting, policy support, and Q&A workflows.</p>
              </article>
              <article className="card muted-card">
                <h3>More projects</h3>
                <p>Additional project case studies and GitHub demos coming soon.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="publications" className="section">
          <div className="container">
            <h2>Publications (Employer Showcase)</h2>
            <p className="section-note">
              Each publication includes links and value framing for potential employers or clients.
            </p>
            <div className="tabs">
              <button className={`tab ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>
                All
              </button>
              <button
                className={`tab ${tab === "transport" ? "active" : ""}`}
                onClick={() => setTab("transport")}
              >
                Transport AI
              </button>
              <button className={`tab ${tab === "methods" ? "active" : ""}`} onClick={() => setTab("methods")}>
                Methods
              </button>
            </div>
            <div className="grid publication-grid">
              {filtered.map((item) => (
                <article className="card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.venue}</p>
                  <p>{item.value}</p>
                  <div className="actions">
                    <a className="btn" href={item.link} target="_blank" rel="noreferrer">
                      Read publication
                    </a>
                    <a className="btn" href="#contact">
                      Discuss this work
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container card">
            <h2>Contact</h2>
            <p>
              Brisbane, Australia · <a href="mailto:t.tranvo187@gmail.com">t.tranvo187@gmail.com</a>
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">© 2026 Thanh Tran, PhD · Principal Data Scientist & AI Engineer</div>
      </footer>
    </div>
  );
}
