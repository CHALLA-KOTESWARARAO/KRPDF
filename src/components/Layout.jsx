import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AdPlaceholder from './AdPlaceholder';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function Layout({ children }) {
  return (
    <div className="site-shell">
      <ScrollToTop />
      <Header />
      <AdPlaceholder type="header" />
      <main>{children}</main>
      <AdPlaceholder type="footer" />
      <Footer />
    </div>
  );
}

export default Layout;
