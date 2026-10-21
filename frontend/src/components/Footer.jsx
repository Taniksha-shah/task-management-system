function Footer({ name }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {year} {name}. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
