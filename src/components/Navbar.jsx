
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Pokédex
      </Link>

      <Link to="/" className="nav-link">
        Home
      </Link>

      <Link to="/pokemon" className="nav-link">
        Pokédex
      </Link>
    </nav>
  );
}

export default Navbar;
