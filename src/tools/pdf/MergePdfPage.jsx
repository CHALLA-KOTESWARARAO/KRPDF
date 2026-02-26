import PdfToolTemplate from './PdfToolTemplate';

const faq = [
  {
    q: 'Can I merge files in a custom order?',
    a: 'Yes. In a full backend flow, selected files can be rearranged before merge processing starts.'
  },
  {
    q: 'Is there a file limit for merge?',
    a: 'You can enforce practical limits server side. The UI currently validates file size and PDF format.'
  },
  {
    q: 'Does merge keep page quality?',
    a: 'A quality-preserving merge does not re-render pages and generally keeps original output fidelity.'
  }
];

const seoContent = [
  'Merge PDF tools are essential when users need to combine invoices, contracts, reports, or scanned pages into a single file. Instead of sending multiple attachments and creating confusion, one merged PDF keeps everything organized in a predictable order. This is useful for business submissions, academic portfolios, and legal document packets where sequence matters. A dependable merge workflow saves time and improves communication because recipients can review all content in one place without extra downloads.',
  'The page design focuses on clear actions and low friction. A prominent drag-and-drop area supports quick file uploads on both touch and desktop devices, while instant validation prevents wrong formats from entering the workflow. After files are selected, users can start processing with one primary button and follow a visible progress bar until completion. These feedback loops improve usability and reduce repeated clicks, which helps improve behavioral signals that matter for search performance and long-term retention.',
  'In production, the frontend can connect to an API that concatenates PDFs in user-defined order and returns a secure download link. Because validation and interaction states are already separated into reusable modules, backend integration can happen without rewriting the interface. This architecture helps teams deploy fast, test confidently, and scale traffic spikes. It also supports ad-friendly placement because content and controls remain clearly separated, ensuring the user never mistakes ads for process actions.',
  'SEO performance for a merge utility improves when pages answer practical intent, not only generic keywords. Visitors often search phrases like combine PDFs online, merge documents for free, or join PDF files on mobile. The guide text and FAQ section address those needs while preserving readability and trust. Combined with semantic headings, internal tool links, and a crawlable URL structure, this page is positioned for discoverability and user satisfaction in a competitive utility search landscape.'
];

function MergePdfPage() {
  return (
    <PdfToolTemplate
      title="Merge PDF"
      description="Combine multiple PDF files into one clean and shareable document."
      canonicalPath="/merge-pdf"
      allowMultiple
      buttonLabel="Merge PDFs"
      faq={faq}
      seoContent={seoContent}
      keywords="merge pdf, combine pdf files, join pdf online"
      mode="merge"
    />
  );
}

export default MergePdfPage;
