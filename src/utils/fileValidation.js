export const MAX_PDF_MB = 25;
export const MAX_IMAGE_MB = 15;

export function validatePdfFiles(files, allowMultiple = false) {
  if (!files.length) {
    return 'Please upload at least one PDF file.';
  }
  if (!allowMultiple && files.length > 1) {
    return 'This tool accepts one file at a time.';
  }

  for (const file of files) {
    const isPdfType = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdfType) {
      return 'Only PDF files are supported.';
    }
    if (file.size > MAX_PDF_MB * 1024 * 1024) {
      return `Each PDF must be under ${MAX_PDF_MB}MB.`;
    }
  }

  return '';
}

export function validateImageFile(file) {
  if (!file) {
    return 'Please choose an image file.';
  }

  if (!file.type.startsWith('image/')) {
    return 'Only image files are allowed.';
  }

  if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
    return `Image size must be below ${MAX_IMAGE_MB}MB.`;
  }

  return '';
}
