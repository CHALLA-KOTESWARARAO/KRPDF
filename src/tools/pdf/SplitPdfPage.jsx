import PdfToolTemplate from './PdfToolTemplate';

const faq = [
  {
    q: 'Can I extract specific pages?',
    a: 'Yes, backend integration can support custom page ranges and output multiple extracted files.'
  },
  {
    q: 'Does splitting modify original files?',
    a: 'No. Splitting creates new output files while preserving your original source document.'
  },
  {
    q: 'Can I split very large documents?',
    a: 'Large documents can be supported with chunked processing and queue management server side.'
  }
];

const seoContent = [
  'Split PDF tools help users isolate only the pages they need from a larger document. This is useful when sending selected chapters, sharing specific invoice pages, or separating forms from appendices. Instead of manually recreating documents, users can quickly extract meaningful sections and reduce recipient overload. A practical split workflow improves clarity, protects sensitive sections from accidental sharing, and keeps communication focused on relevant content for each audience.',
  'The interface on this page follows a clear task-first model. Users upload a PDF through a large drag-and-drop zone, receive instant validation feedback, and begin processing with a single primary action. A progress bar communicates activity state and prevents uncertainty during processing. After completion, a download action appears in a consistent location. This pattern improves completion rates across devices because users always understand where to click next and whether the process succeeded.',
  'For backend integration, the page is prepared to connect with page-range parsing and document extraction services. Engineering teams can plug in API endpoints without redesigning the UI because business logic is already modular. Validation helpers, toast notifications, and reusable components lower duplication across tools and make ongoing updates safer. The result is a maintainable codebase that can scale from MVP to production traffic while preserving performance and SEO fundamentals.',
  'Users searching split PDF online, extract pages from PDF, or separate PDF pages are often trying to complete urgent tasks quickly. This page addresses that intent by combining direct controls with educational content and common question coverage. Semantic structure, clean URLs, and internal links support discoverability, while content depth helps relevance for search engines. Together, these elements create a utility page that is practical for users and effective for long-term organic growth.'
];

function SplitPdfPage() {
  return (
    <PdfToolTemplate
      title="Split PDF"
      description="Split PDF files into separate page documents with a fast online workflow."
      canonicalPath="/split-pdf"
      buttonLabel="Split PDF"
      faq={faq}
      seoContent={seoContent}
      keywords="split pdf, extract pdf pages, separate pdf"
      mode="split"
    />
  );
}

export default SplitPdfPage;
