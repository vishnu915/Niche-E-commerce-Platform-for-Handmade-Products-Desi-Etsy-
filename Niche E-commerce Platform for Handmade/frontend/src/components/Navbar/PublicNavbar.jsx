import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

const PublicNavbar = () => {
  return (
    <nav className="public-navbar">
      <div className="nav-brand">
        <Link to="/" className="site-name">
          Desi Etsy
        </Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;
