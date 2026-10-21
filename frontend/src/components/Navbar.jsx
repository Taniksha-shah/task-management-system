import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  // useState #1: toggles mobile nav menu visibility
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navLinks = [
    { path: '/', label: 'cd ~' },
    { path: '/projects', label: 'cd ~/projects' },
    { path: '/contact', label: 'cd ~/contact' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <span className="navbar-prompt">student@portfolio:~$</span>
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? '[ close ]' : '[ menu ]'}
        </button>
      </div>

      <ul className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
        {navLinks.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
