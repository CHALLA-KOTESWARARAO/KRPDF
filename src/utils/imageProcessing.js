export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}

export function loadImageElement(source) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Image loading failed.'));
    img.src = source;
  });
}

export async function transformImage(file, options) {
  const { type, quality = 0.85, width, height } = options;
  const src = await readFileAsDataUrl(file);
  const image = await loadImageElement(src);

  const targetWidth = width || image.width;
  const targetHeight = height || image.height;

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d', { alpha: type === 'image/png' });
  ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

  const output = canvas.toDataURL(type, quality);
  return {
    before: src,
    after: output,
    width: targetWidth,
    height: targetHeight
  };
}

export function downloadDataUrl(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
}
