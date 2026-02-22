import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <section>
          <h2>MyPDF Tools</h2>
          <p>Free online utility tools built for speed, privacy, and productivity.</p>
        </section>
        <section>
          <h2>Tools</h2>
          <ul>
            <li><Link to="/pdf-tools">PDF Tools</Link></li>
            <li><Link to="/image-tools">Image Tools</Link></li>
          </ul>
        </section>
        <section>
          <h2>Company</h2>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </section>
      </div>
      <div className="container footer-note">
        <small>Files are processed securely and deleted automatically.</small>
      </div>
    </footer>
  );
}

export default Footer;
