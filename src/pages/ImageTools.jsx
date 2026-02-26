import Seo from '../components/Seo';
import ToolCard from '../components/ToolCard';
import { imageTools } from '../utils/toolData';

function ImageTools() {
  return (
    <>
      <Seo
        title="Image Tools"
        description="Use free online image tools to compress images, resize dimensions, and convert JPG and PNG formats."
        canonicalPath="/image-tools"
      />
      <main className="container page-main">
        <header className="page-header">
          <h1>Image Tools</h1>
          <p>Optimize and convert images directly in your browser with instant preview.</p>
        </header>
        <section className="tool-grid" aria-label="Image tool list">
          {imageTools.map((tool) => (
            <ToolCard
              key={tool.slug}
              to={tool.path}
              title={tool.title}
              description={tool.description}
              icon={<svg viewBox="0 0 24 24" width="24" height="24"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M6 16l4-4 4 4 4-3" fill="none" stroke="currentColor" strokeWidth="1.7"/></svg>}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default ImageTools;
