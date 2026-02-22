import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import FileDropZone from '../../components/FileDropZone';
import ProgressBar from '../../components/ProgressBar';
import FAQSection from '../../components/FAQSection';
import Toast from '../../components/Toast';
import AdPlaceholder from '../../components/AdPlaceholder';
import TrustBanner from '../../components/TrustBanner';
import { validatePdfFiles } from '../../utils/fileValidation';
import { pdfTools } from '../../utils/toolData';

function PdfToolTemplate({
  title,
  description,
  canonicalPath,
  allowMultiple = false,
  buttonLabel,
  faq,
  seoContent,
  keywords
}) {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [toast, setToast] = useState({ type: 'info', message: '' });

  const relatedTools = useMemo(
    () => pdfTools.filter((tool) => tool.path !== canonicalPath).slice(0, 3),
    [canonicalPath]
  );

  const handleFiles = (incoming) => {
    const error = validatePdfFiles(incoming, allowMultiple);
    if (error) {
      setToast({ type: 'error', message: error });
      setFiles([]);
      setDone(false);
      return;
    }
    setFiles(incoming);
    setDone(false);
    setProgress(0);
    setToast({ type: 'success', message: `${incoming.length} file(s) selected successfully.` });
  };

  const processFiles = () => {
    if (!files.length) {
      setToast({ type: 'error', message: 'Please upload file(s) before processing.' });
      return;
    }

    setIsProcessing(true);
    setDone(false);
    let current = 0;
    const timer = setInterval(() => {
      current += 8;
      if (current >= 100) {
        clearInterval(timer);
        setProgress(100);
        setIsProcessing(false);
        setDone(true);
        setToast({ type: 'success', message: 'Processing completed. Result is ready to download.' });
        return;
      }
      setProgress(current);
    }, 140);
  };

  return (
    <>
      <Seo
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        keywords={keywords}
      />
      <main className="container page-main tool-page">
        <header className="page-header">
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        <section className="tool-shell" aria-label={`${title} uploader`}>
          <FileDropZone
            accept=".pdf,application/pdf"
            multiple={allowMultiple}
            onFilesSelected={handleFiles}
            label={allowMultiple ? 'Upload one or more PDF files' : 'Upload your PDF file'}
          />

          <ul className="file-list" aria-label="Selected files">
            {files.map((file) => (
              <li key={`${file.name}-${file.size}`}>{file.name}</li>
            ))}
          </ul>

          <ProgressBar value={progress} />

          <button className="btn btn-primary" type="button" onClick={processFiles} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : buttonLabel}
          </button>

          {done && (
            <button className="btn btn-secondary" type="button">
              Download Result
            </button>
          )}

          <TrustBanner />
        </section>

        <AdPlaceholder type="content" />

        <section className="section">
          <h2>Related PDF Tools</h2>
          <div className="inline-links">
            {relatedTools.map((tool) => (
              <Link key={tool.path} to={tool.path}>{tool.title}</Link>
            ))}
          </div>
        </section>

        <FAQSection items={faq} />

        <section className="seo-content" aria-label={`${title} guide`}>
          <h2>{title} Online - Complete Guide</h2>
          {seoContent.map((paragraph) => (
            <p key={paragraph.slice(0, 42)}>{paragraph}</p>
          ))}
        </section>
      </main>
      <Toast type={toast.type} message={toast.message} onClose={() => setToast({ type: 'info', message: '' })} />
    </>
  );
}

export default PdfToolTemplate;
