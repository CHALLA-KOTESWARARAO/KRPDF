import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you are looking for does not exist. Browse all available PDF and image tools from here."
        canonicalPath="/404"
        noIndex
      />
      <main className="container page-main not-found">
        <h1>404 - Page Not Found</h1>
        <p>The page you requested is unavailable. Continue with one of these paths:</p>
        <div className="hero-actions">
          <Link to="/" className="btn btn-primary">Go Home</Link>
          <Link to="/pdf-tools" className="btn btn-ghost">View PDF Tools</Link>
        </div>
      </main>
    </>
  );
}

export default NotFound;
