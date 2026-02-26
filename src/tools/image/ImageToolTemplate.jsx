import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import FileDropZone from '../../components/FileDropZone';
import ProgressBar from '../../components/ProgressBar';
import Toast from '../../components/Toast';
import AdPlaceholder from '../../components/AdPlaceholder';
import TrustBanner from '../../components/TrustBanner';
import { validateImageFile } from '../../utils/fileValidation';
import { downloadDataUrl, transformImage } from '../../utils/imageProcessing';
import { imageTools } from '../../utils/toolData';

function formatSize(bytes) {
  if (!bytes) return '0 KB';
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function ImageToolTemplate({
  title,
  description,
  canonicalPath,
  outputType,
  quality = 0.85,
  hasResizeInputs = false,
  defaultWidth = '',
  defaultHeight = '',
  buttonLabel,
  outputName,
  allowQualityControl = false,
  enableTargetSizeControl = false,
  defaultMaxSizeKb = 400
}) {
  const [file, setFile] = useState(null);
  const [after, setAfter] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: 'info', message: '' });
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [qualityPercent, setQualityPercent] = useState(Math.round(quality * 100));
  const [maxSizeKb, setMaxSizeKb] = useState(defaultMaxSizeKb);
  const [stats, setStats] = useState({ beforeSizeBytes: 0, afterSizeBytes: 0, qualityUsed: quality });
  const [progress, setProgress] = useState(0);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const relatedTools = useMemo(
    () => imageTools.filter((tool) => tool.path !== canonicalPath).slice(0, 3),
    [canonicalPath]
  );

  const savingsText = useMemo(() => {
    if (!stats.beforeSizeBytes || !stats.afterSizeBytes) return '0%';
    const delta = ((stats.beforeSizeBytes - stats.afterSizeBytes) / stats.beforeSizeBytes) * 100;
    return `${delta.toFixed(1)}%`;
  }, [stats.afterSizeBytes, stats.beforeSizeBytes]);

  const handleFiles = (files) => {
    const picked = files[0];
    const error = validateImageFile(picked);
    if (error) {
      setToast({ type: 'error', message: error });
      return;
    }
    setFile(picked);
    setAfter('');
    setProgress(0);
    setHasDownloaded(false);
    setStats({ beforeSizeBytes: picked.size, afterSizeBytes: 0, qualityUsed: qualityPercent / 100 });
    setToast({ type: 'success', message: `${picked.name} loaded.` });
  };

  const process = async () => {
    if (!file) {
      setToast({ type: 'error', message: 'Please upload an image first.' });
      return;
    }

    let timer;
    try {
      setLoading(true);
      setHasDownloaded(false);
      setProgress(5);
      let current = 5;
      timer = setInterval(() => {
        current = Math.min(current + 8, 92);
        setProgress(current);
      }, 110);
      const targetWidth = hasResizeInputs && width ? Number(width) : undefined;
      const targetHeight = hasResizeInputs && height ? Number(height) : undefined;

      if (hasResizeInputs && (!targetWidth || !targetHeight)) {
        setToast({ type: 'error', message: 'Enter valid width and height values.' });
        clearInterval(timer);
        setProgress(0);
        setLoading(false);
        return;
      }

      const result = await transformImage(file, {
        type: outputType,
        quality: qualityPercent / 100,
        width: targetWidth,
        height: targetHeight,
        maxSizeKb: enableTargetSizeControl ? maxSizeKb : undefined
      });

      setAfter(result.after);
      setStats({
        beforeSizeBytes: result.beforeSizeBytes,
        afterSizeBytes: result.afterSizeBytes,
        qualityUsed: result.qualityUsed
      });
      setProgress(100);
      setToast({ type: 'success', message: 'Image processed successfully.' });
    } catch {
      setProgress(0);
      setToast({ type: 'error', message: 'Image processing failed. Try another file.' });
    } finally {
      if (timer) clearInterval(timer);
      setLoading(false);
    }
  };

  const download = () => {
    if (!after) {
      setToast({ type: 'error', message: 'No processed image available for download.' });
      return;
    }
    downloadDataUrl(after, outputName);
    setHasDownloaded(true);
    setToast({ type: 'success', message: 'Download started.' });
  };

  const workflowSteps = [
    { id: 'upload', label: 'Upload file', state: file ? 'complete' : 'active' },
    { id: 'process', label: 'Process tool', state: loading ? 'active' : after ? 'complete' : 'pending' },
    { id: 'ready', label: 'Result ready', state: after ? 'complete' : 'pending' },
    { id: 'download', label: 'Download', state: hasDownloaded ? 'complete' : 'pending' }
  ];

  return (
    <>
      <Seo title={title} description={description} canonicalPath={canonicalPath} />
      <main className="container page-main tool-page">
        <header className="page-header">
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        <section className="tool-shell saas-shell" aria-label={`${title} processor`}>
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
                    : after
                      ? 'Ready to download'
                      : loading
                        ? 'Processing'
                        : file
                          ? 'Uploaded'
                          : 'Waiting for file'}
                </p>
              </section>

              <FileDropZone
                accept="image/*"
                onFilesSelected={handleFiles}
                label="Upload an image file"
              />

              {(loading || progress > 0) && <ProgressBar value={progress} />}

              <div className="action-row">
                <button className="btn btn-primary" type="button" onClick={process} disabled={loading}>
                  {loading ? 'Processing...' : buttonLabel}
                </button>
                <button className="btn btn-secondary" type="button" onClick={download} disabled={!after}>
                  Download Image
                </button>
              </div>
            </div>

            <aside className="tool-sidebar" aria-label="Tool settings">
              <h2>Settings</h2>

              {(allowQualityControl || outputType === 'image/jpeg') && (
                <div className="setting-group">
                  <label htmlFor="quality-level">
                    Quality: <strong>{qualityPercent}%</strong>
                  </label>
                  <input
                    id="quality-level"
                    type="range"
                    min="20"
                    max="100"
                    value={qualityPercent}
                    onChange={(event) => setQualityPercent(Number(event.target.value))}
                  />
                </div>
              )}

              {enableTargetSizeControl && (
                <div className="setting-group">
                  <label htmlFor="target-kb">Target max size (KB)</label>
                  <input
                    id="target-kb"
                    type="number"
                    min="30"
                    max="5000"
                    value={maxSizeKb}
                    onChange={(event) => setMaxSizeKb(Math.max(30, Number(event.target.value) || 30))}
                  />
                </div>
              )}

              {hasResizeInputs && (
                <div className="setting-group resize-controls">
                  <label>
                    Width (px)
                    <input type="number" min="1" value={width} onChange={(event) => setWidth(event.target.value)} />
                  </label>
                  <label>
                    Height (px)
                    <input type="number" min="1" value={height} onChange={(event) => setHeight(event.target.value)} />
                  </label>
                </div>
              )}

              <div className="metric-grid">
                <article>
                  <span>Input size</span>
                  <strong>{formatSize(stats.beforeSizeBytes)}</strong>
                </article>
                <article>
                  <span>Output size</span>
                  <strong>{formatSize(stats.afterSizeBytes)}</strong>
                </article>
                <article>
                  <span>Reduction</span>
                  <strong>{savingsText}</strong>
                </article>
                <article>
                  <span>Applied quality</span>
                  <strong>{Math.round(stats.qualityUsed * 100)}%</strong>
                </article>
              </div>
            </aside>
          </div>

          <TrustBanner />
        </section>

        <AdPlaceholder type="content" />

        <section className="section">
          <h2>Related Image Tools</h2>
          <div className="inline-links">
            {relatedTools.map((tool) => (
              <Link key={tool.path} to={tool.path}>{tool.title}</Link>
            ))}
          </div>
        </section>
      </main>
      <Toast type={toast.type} message={toast.message} onClose={() => setToast({ type: 'info', message: '' })} />
    </>
  );
}

export default ImageToolTemplate;
