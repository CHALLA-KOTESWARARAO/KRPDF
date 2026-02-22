import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const PdfTools = lazy(() => import('./pages/PdfTools'));
const ImageTools = lazy(() => import('./pages/ImageTools'));
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PdfToWordPage = lazy(() => import('./tools/pdf/PdfToWordPage'));
const MergePdfPage = lazy(() => import('./tools/pdf/MergePdfPage'));
const CompressPdfPage = lazy(() => import('./tools/pdf/CompressPdfPage'));
const SplitPdfPage = lazy(() => import('./tools/pdf/SplitPdfPage'));

const ImageCompressorPage = lazy(() => import('./tools/image/ImageCompressorPage'));
const ImageResizePage = lazy(() => import('./tools/image/ImageResizePage'));
const JpgToPngPage = lazy(() => import('./tools/image/JpgToPngPage'));
const PngToJpgPage = lazy(() => import('./tools/image/PngToJpgPage'));

function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      Loading tool...
    </div>
  );
}

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/pdf-tools" element={<PdfTools />} />
          <Route path="/image-tools" element={<ImageTools />} />

          <Route path="/pdf-to-word" element={<PdfToWordPage />} />
          <Route path="/merge-pdf" element={<MergePdfPage />} />
          <Route path="/compress-pdf" element={<CompressPdfPage />} />
          <Route path="/split-pdf" element={<SplitPdfPage />} />

          <Route path="/image-compressor" element={<ImageCompressorPage />} />
          <Route path="/image-resize" element={<ImageResizePage />} />
          <Route path="/jpg-to-png" element={<JpgToPngPage />} />
          <Route path="/png-to-jpg" element={<PngToJpgPage />} />

          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
