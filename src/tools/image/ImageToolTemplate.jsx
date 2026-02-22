import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import FileDropZone from '../../components/FileDropZone';
import Toast from '../../components/Toast';
import AdPlaceholder from '../../components/AdPlaceholder';
import TrustBanner from '../../components/TrustBanner';
import { validateImageFile } from '../../utils/fileValidation';
import { downloadDataUrl, transformImage } from '../../utils/imageProcessing';
import { imageTools } from '../../utils/toolData';

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
  outputName
}) {
  const [file, setFile] = useState(null);
  const [before, setBefore] = useState('');
  const [after, setAfter] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: 'info', message: '' });
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);

  const relatedTools = useMemo(
    () => imageTools.filter((tool) => tool.path !== canonicalPath).slice(0, 3),
    [canonicalPath]
  );

  const handleFiles = (files) => {
    const picked = files[0];
    const error = validateImageFile(picked);
    if (error) {
      setToast({ type: 'error', message: error });
      return;
    }
    setFile(picked);
    setBefore(URL.createObjectURL(picked));
    setAfter('');
    setToast({ type: 'success', message: `${picked.name} loaded.` });
  };

  const process = async () => {
    if (!file) {
      setToast({ type: 'error', message: 'Please upload an image first.' });
      return;
    }

    try {
      setLoading(true);
      const targetWidth = hasResizeInputs && width ? Number(width) : undefined;
      const targetHeight = hasResizeInputs && height ? Number(height) : undefined;

      if (hasResizeInputs && (!targetWidth || !targetHeight)) {
        setToast({ type: 'error', message: 'Enter valid width and height values.' });
        setLoading(false);
        return;
      }

      const result = await transformImage(file, {
        type: outputType,
        quality,
        width: targetWidth,
        height: targetHeight
      });

      setAfter(result.after);
      setToast({ type: 'success', message: 'Image processed successfully.' });
    } catch {
      setToast({ type: 'error', message: 'Image processing failed. Try another file.' });
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!after) {
      setToast({ type: 'error', message: 'No processed image available for download.' });
      return;
    }
    downloadDataUrl(after, outputName);
  };

  return (
    <>
      <Seo title={title} description={description} canonicalPath={canonicalPath} />
      <main className="container page-main tool-page">
        <header className="page-header">
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        <section className="tool-shell" aria-label={`${title} processor`}>
          <FileDropZone
            accept="image/*"
            onFilesSelected={handleFiles}
            label="Upload an image file"
          />

          {hasResizeInputs && (
            <div className="resize-controls">
              <label>
                Width (px)
                <input type="number" min="1" value={width} onChange={(e) => setWidth(e.target.value)} />
              </label>
              <label>
                Height (px)
                <input type="number" min="1" value={height} onChange={(e) => setHeight(e.target.value)} />
              </label>
            </div>
          )}

          <button className="btn btn-primary" type="button" onClick={process} disabled={loading}>
            {loading ? 'Processing...' : buttonLabel}
          </button>
          <button className="btn btn-secondary" type="button" onClick={download}>Download Image</button>
          <TrustBanner />
        </section>

        <section className="preview-grid" aria-label="Image preview comparison">
          <article>
            <h2>Before</h2>
            {before ? <img src={before} alt="Original upload preview" /> : <p className="muted">Upload an image to preview.</p>}
          </article>
          <article>
            <h2>After</h2>
            {after ? <img src={after} alt="Processed result preview" /> : <p className="muted">Process an image to generate output.</p>}
          </article>
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
