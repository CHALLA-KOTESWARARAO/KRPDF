import Seo from '../components/Seo';
import ToolCard from '../components/ToolCard';
import { pdfTools } from '../utils/toolData';

function PdfTools() {
  return (
    <>
      <Seo
        title="PDF Tools"
        description="Free PDF conversion and optimization tools including PDF to Word, Merge PDF, Compress PDF, and Split PDF."
        canonicalPath="/pdf-tools"
      />
      <main className="container page-main">
        <header className="page-header">
          <h1>PDF Tools</h1>
          <p>Choose a tool to convert, merge, compress, or split your PDF documents.</p>
        </header>
        <section className="tool-grid" aria-label="PDF tool list">
          {pdfTools.map((tool) => (
            <ToolCard
              key={tool.slug}
              to={tool.path}
              title={tool.title}
              description={tool.description}
              icon={<svg viewBox="0 0 24 24" width="24" height="24"><path d="M6 3h9l5 5v13H6z" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M15 3v5h5" fill="none" stroke="currentColor" strokeWidth="1.7"/></svg>}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default PdfTools;
