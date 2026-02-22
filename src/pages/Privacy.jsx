import Seo from '../components/Seo';

function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Read the privacy policy for MyPDF Tools, including data handling, cookies, and user rights."
        canonicalPath="/privacy-policy"
      />
      <main className="container page-main legal-page">
        <h1>Privacy Policy</h1>
        <p>This policy explains how we collect and use limited data to provide and improve our services.</p>
        <h2>Data Processing</h2>
        <p>Files are processed locally whenever possible, and temporary processing is designed with minimal retention.</p>
        <h2>Cookies and Analytics</h2>
        <p>We may use cookies and analytics tools to understand traffic, detect abuse, and improve product quality.</p>
        <h2>Advertising</h2>
        <p>Ads may be served by third-party providers such as Google AdSense, which can use cookies according to their policies.</p>
        <h2>Contact</h2>
        <p>For privacy requests, use our contact page and include clear details about your inquiry.</p>
      </main>
    </>
  );
}

export default Privacy;
