import Seo from '../components/Seo';

function Terms() {
  return (
    <>
      <Seo
        title="Terms and Conditions"
        description="Review terms and conditions for using MyPDF Tools and related online utility services."
        canonicalPath="/terms-and-conditions"
      />
      <main className="container page-main legal-page">
        <h1>Terms & Conditions</h1>
        <p>By using this website, you agree to comply with these terms and all applicable laws.</p>
        <h2>Permitted Use</h2>
        <p>You may use our tools for lawful personal and business purposes only.</p>
        <h2>Service Availability</h2>
        <p>We may update or discontinue tools at any time to improve performance and reliability.</p>
        <h2>Limitation of Liability</h2>
        <p>The service is provided as-is, and we are not liable for indirect damages resulting from use.</p>
        <h2>Updates</h2>
        <p>Terms may change over time. Continued use of the site means acceptance of revised terms.</p>
      </main>
    </>
  );
}

export default Terms;
