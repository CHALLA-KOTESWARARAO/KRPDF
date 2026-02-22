import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import ToolCard from '../components/ToolCard';
import AdPlaceholder from '../components/AdPlaceholder';
import TrustBanner from '../components/TrustBanner';
import { imageTools, pdfTools } from '../utils/toolData';

function Home() {
  return (
    <>
      <Seo
        title="Free PDF and Image Tools"
        description="Use free online PDF and image tools for conversion, compression, resizing, and editing. Fast, secure, and mobile friendly."
        canonicalPath="/"
      />
      <header className="hero">
        <div className="container">
          <p className="hero-kicker">All-in-one file utility platform</p>
          <h1>Fast PDF and Image Tools for Everyday Workflows</h1>
          <p>
            Optimize documents and images in seconds. Built for creators, students, and teams who need quick file processing.
          </p>
          <div className="hero-actions">
            <Link to="/pdf-tools" className="btn btn-primary">Start with PDF Tools</Link>
            <Link to="/image-tools" className="btn btn-ghost">Explore Image Tools</Link>
          </div>
        </div>
      </header>

      <main>
        <section className="section container">
          <h2>Popular PDF Tools</h2>
          <div className="tool-grid">
            {pdfTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                to={tool.path}
                title={tool.title}
                description={tool.description}
                icon={<svg viewBox="0 0 24 24" width="24" height="24"><path d="M5 3h10l4 4v14H5V3zm10 1v4h4" fill="none" stroke="currentColor" strokeWidth="1.7"/></svg>}
              />
            ))}
          </div>
        </section>

        <AdPlaceholder type="content" />

        <section className="section container">
          <h2>Image Tools</h2>
          <div className="tool-grid">
            {imageTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                to={tool.path}
                title={tool.title}
                description={tool.description}
                icon={<svg viewBox="0 0 24 24" width="24" height="24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="9" cy="10" r="2" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M7 17l4-4 3 3 2-2 2 3" fill="none" stroke="currentColor" strokeWidth="1.7"/></svg>}
              />
            ))}
          </div>
          <TrustBanner />
        </section>
      </main>
    </>
  );
}

export default Home;
