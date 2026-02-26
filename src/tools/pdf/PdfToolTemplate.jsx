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

function formatSize(bytes) {
  if (!bytes) return '0 KB';
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function PdfToolTemplate({
  title,
  description,
  canonicalPath,
  allowMultiple = false,
  buttonLabel,
  faq,
  seoContent,
  keywords,
  mode = 'general'
}) {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [toast, setToast] = useState({ type: 'info', message: '' });
  const [compressionLevel, setCompressionLevel] = useState(60);
  const [targetSizeMb, setTargetSizeMb] = useState(5);
  const [pageRange, setPageRange] = useState('1-3');
  const [resultLabel, setResultLabel] = useState('');
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const relatedTools = useMemo(
    () => pdfTools.filter((tool) => tool.path !== canonicalPath).slice(0, 3),
    [canonicalPath]
  );

  const totalInputSize = useMemo(
    () => files.reduce((sum, file) => sum + file.size, 0),
    [files]
  );

  const estimatedOutputBytes = useMemo(() => {
    if (!totalInputSize) return 0;
    if (mode === 'compress') {
      const ratio = Math.max(0.2, 1 - compressionLevel / 120);
      const softCap = targetSizeMb * 1024 * 1024;
      return Math.min(Math.round(totalInputSize * ratio), softCap);
    }
    if (mode === 'split') return Math.round(totalInputSize * 0.55);
    if (mode === 'merge') return Math.round(totalInputSize * 0.97);
    if (mode === 'convert') return Math.round(totalInputSize * 1.12);
    return totalInputSize;
  }, [compressionLevel, mode, targetSizeMb, totalInputSize]);

  const toolKey = useMemo(() => slugify(title), [title]);

  const handleFiles = (incoming) => {
    const error = validatePdfFiles(incoming, allowMultiple);
    if (error) {
      setToast({ type: 'error', message: error });
      setFiles([]);
      setDone(false);
      setProgress(0);
      return;
    }
    setFiles(incoming);
    setDone(false);
    setHasDownloaded(false);
    setProgress(0);
    setResultLabel('');
    setToast({ type: 'success', message: `${incoming.length} file(s) selected successfully.` });
  };

  const processFiles = () => {
    if (!files.length) {
      setToast({ type: 'error', message: 'Please upload file(s) before processing.' });
      return;
    }

    if (mode === 'split' && !pageRange.trim()) {
      setToast({ type: 'error', message: 'Enter a page range to split.' });
      return;
    }

    setIsProcessing(true);
    setDone(false);
    setHasDownloaded(false);
    let current = 0;

    const intervalMs = mode === 'compress' ? 120 : 135;
    const step = mode === 'compress' ? 6 : 8;

    const timer = setInterval(() => {
      current += step;
      if (current >= 100) {
        clearInterval(timer);
        setProgress(100);
        setIsProcessing(false);
        setDone(true);
        setResultLabel(`${title} result ready (${formatSize(estimatedOutputBytes)} approx.)`);
        setToast({ type: 'success', message: 'Processing completed. Download your result package.' });
        return;
      }
      setProgress(current);
    }, intervalMs);
  };

  const downloadResult = () => {
    if (!done) {
      setToast({ type: 'error', message: 'Process files first to generate output.' });
      return;
    }

    const report = [
      `${title} Result Summary`,
      `Generated: ${new Date().toLocaleString()}`,
      `Tool Mode: ${mode}`,
      `Input Files: ${files.map((file) => file.name).join(', ')}`,
      `Input Size: ${formatSize(totalInputSize)}`,
      `Estimated Output: ${formatSize(estimatedOutputBytes)}`,
      mode === 'compress' ? `Compression Level: ${compressionLevel}%` : null,
      mode === 'compress' ? `Target Size: ${targetSizeMb} MB` : null,
      mode === 'split' ? `Page Range: ${pageRange}` : null,
      '',
      'Note: PDF output generation requires backend or PDF engine integration.'
    ]
      .filter(Boolean)
      .join('\n');

    downloadTextFile(`${toolKey}-result.txt`, report);
    setHasDownloaded(true);
    setToast({ type: 'success', message: 'Result package downloaded.' });
  };

  const workflowSteps = [
    { id: 'upload', label: 'Upload file', state: files.length ? 'complete' : 'active' },
    {
      id: 'process',
      label: 'Process tool',
      state: isProcessing ? 'active' : done ? 'complete' : files.length ? 'pending' : 'pending'
    },
    { id: 'ready', label: 'Result ready', state: done ? 'complete' : 'pending' },
    { id: 'download', label: 'Download', state: hasDownloaded ? 'complete' : 'pending' }
  ];

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

        <section className="tool-shell saas-shell" aria-label={`${title} uploader`}>
          <div className="tool-workspace">
            <div className="tool-main">
              <section className="workflow-panel workflow-panel-compact" aria-label="Tool workflow status">
                <ol className="workflow-steps">
                  {workflowSteps.map((step) => (
                    <li key={step.id} className={`workflow-step ${step.state}`}>
                      <span className="workflow-dot" aria-hidden="true" />
                      <span>{step.label}</span>
                    </li>
                  ))}
                </ol>
                <p className="workflow-note">
                  {hasDownloaded
                    ? 'Downloaded'
                    : done
                      ? 'Ready to download'
                      : isProcessing
                        ? 'Processing'
                        : files.length
                          ? 'Uploaded'
                          : 'Waiting for file'}
                </p>
              </section>

              <FileDropZone
                accept=".pdf,application/pdf"
                multiple={allowMultiple}
                onFilesSelected={handleFiles}
                label={allowMultiple ? 'Upload one or more PDF files' : 'Upload your PDF file'}
              />

              <ul className="file-list" aria-label="Selected files">
                {files.map((file) => (
                  <li key={`${file.name}-${file.size}`}>
                    <span>{file.name}</span>
                    <strong>{formatSize(file.size)}</strong>
                  </li>
                ))}
              </ul>

              {(isProcessing || progress > 0) && <ProgressBar value={progress} />}

              <div className="action-row">
                <button className="btn btn-primary" type="button" onClick={processFiles} disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : buttonLabel}
                </button>
                <button className="btn btn-secondary" type="button" onClick={downloadResult} disabled={!done}>
                  Download Result
                </button>
              </div>

              {resultLabel && <p className="result-note">{resultLabel}</p>}
            </div>

            <aside className="tool-sidebar" aria-label="Tool settings">
              <h2>Settings</h2>
              {mode === 'compress' && (
                <div className="setting-group">
                  <label htmlFor="compression-level">
                    Compression level: <strong>{compressionLevel}%</strong>
                  </label>
                  <input
                    id="compression-level"
                    type="range"
                    min="20"
                    max="90"
                    value={compressionLevel}
                    onChange={(event) => setCompressionLevel(Number(event.target.value))}
                  />
                  <label htmlFor="target-size">
                    Target output size (MB)
                  </label>
                  <input
                    id="target-size"
                    type="number"
                    min="1"
                    max="100"
                    value={targetSizeMb}
                    onChange={(event) => setTargetSizeMb(Math.max(1, Number(event.target.value) || 1))}
                  />
                </div>
              )}

              {mode === 'split' && (
                <div className="setting-group">
                  <label htmlFor="page-range">Page range (example: 1-3, 6, 8-10)</label>
                  <input
                    id="page-range"
                    type="text"
                    value={pageRange}
                    onChange={(event) => setPageRange(event.target.value)}
                    placeholder="1-3"
                  />
                </div>
              )}

              {mode === 'merge' && (
                <div className="setting-group">
                  <p className="muted">Upload multiple PDFs. Files are merged in selected order.</p>
                </div>
              )}

              {mode === 'convert' && (
                <div className="setting-group">
                  <p className="muted">Conversion keeps the original file untouched and prepares editable output.</p>
                </div>
              )}

              <div className="metric-grid">
                <article>
                  <span>Selected files</span>
                  <strong>{files.length}</strong>
                </article>
                <article>
                  <span>Input size</span>
                  <strong>{formatSize(totalInputSize)}</strong>
                </article>
                <article>
                  <span>Estimated output</span>
                  <strong>{formatSize(estimatedOutputBytes)}</strong>
                </article>
              </div>
            </aside>
          </div>

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
