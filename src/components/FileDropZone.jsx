import { useCallback, useState } from 'react';

function FileDropZone({ accept, multiple = false, onFilesSelected, label }) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      setDragActive(false);
      const files = Array.from(event.dataTransfer.files || []);
      onFilesSelected(files);
    },
    [onFilesSelected]
  );

  const onSelect = (event) => {
    const files = Array.from(event.target.files || []);
    onFilesSelected(files);
  };

  return (
    <label
      className={`drop-zone ${dragActive ? 'active' : ''}`}
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
    >
      <input type="file" accept={accept} multiple={multiple} onChange={onSelect} />
      <strong>{label}</strong>
      <span>Drag and drop here or click to browse</span>
    </label>
  );
}

export default FileDropZone;
