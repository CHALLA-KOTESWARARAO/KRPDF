import Header from './Header';
import Footer from './Footer';
import AdPlaceholder from './AdPlaceholder';

function Layout({ children }) {
  return (
    <div className="site-shell">
      <Header />
      <AdPlaceholder type="header" />
      <main>{children}</main>
      <AdPlaceholder type="footer" />
      <Footer />
    </div>
  );
}

export default Layout;
