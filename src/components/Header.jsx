import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/pdf-tools', label: 'PDF Tools' },
  { to: '/image-tools', label: 'Image Tools' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

function Header() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <NavLink to="/" className="brand" aria-label="MyPDF Tools homepage">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M4 3h10l6 6v12H4V3zm10 1.5V10h5.5" fill="none" stroke="currentColor" strokeWidth="1.7"/>
            </svg>
          </span>
          <span>MyPDF Tools</span>
        </NavLink>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
