function Header({ name, title }) {
  return (
    <header className="header">
      <h1>{name}</h1>
      <p className="header-title">{title}</p>
    </header>
  );
}

export default Header;
