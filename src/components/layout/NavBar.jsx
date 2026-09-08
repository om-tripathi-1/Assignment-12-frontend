import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/Logo-vector.svg";
import searchIcon from "../../assets/icons/search-vector.svg";
import cartIcon from "../../assets/icons/cart-vector.svg";
import userIcon from "../../assets/icons/user-vector.svg";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { itemCount: cartCount } = useCart();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/category?search=${encodeURIComponent(query)}`);
      closeMenu();
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__links">
          {/* Mobile hamburger menu toggle */}
          <button
            className={`header__menu ${isMenuOpen ? "active" : ""}`}
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Brand Logo */}
          <Link to="/" className="header__logo" onClick={closeMenu}>
            <img src={logo} alt="Shop.co Logo" />
          </Link>

          {/* Navigation Links */}
          <nav className={`header__nav-items ${isMenuOpen ? "active" : ""}`}>
            <Link to="/category" onClick={closeMenu}>
              Shop
            </Link>
            <a href="/#top-selling" onClick={closeMenu}>
              On Sale
            </a>
            <a href="/#new-arrivals" onClick={closeMenu}>
              New Arrivals
            </a>
            <a href="/#brands" onClick={closeMenu}>
              Brands
            </a>
          </nav>
        </div>

        <div className="header__actions">
          {/* Product Search Form */}
          <form
            className="header__actions__search-box"
            role="search"
            onSubmit={handleSearchSubmit}
          >
            <img
              src={searchIcon}
              alt=""
              aria-hidden="true"
              className="header__actions__search-box__icon"
            />
            <input
              type="search"
              className="header__actions__search-box__input"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
          </form>

          {/* Mobile Search Icon */}
          <button
            type="button"
            className="header__action__icons search-icon"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            onClick={() => navigate("/category")}
            aria-label="Search"
          >
            <img src={searchIcon} alt="" aria-hidden="true" />
          </button>

          {/* Shopping Cart Link with Counter Badge */}
          <Link
            to="/cart"
            className="header__cart-link"
            aria-label={`Shopping cart containing ${cartCount} items`}
            onClick={closeMenu}
          >
            <img src={cartIcon} alt="Shopping Cart" className="header__action__icons" />
            {cartCount > 0 && <span className="header__cart-count">{cartCount}</span>}
          </Link>

          {/* Authentication / Profile Link */}
          {!isAuthLoading &&
            (isAuthenticated ? (
              <Link
                to="/profile"
                className="header__profile-link"
                aria-label="View Profile"
                onClick={closeMenu}
              >
                <img src={userIcon} alt="User Profile" className="header__action__icons" />
              </Link>
            ) : (
              <Link to="/login" className="header__login-link" onClick={closeMenu}>
                Login
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
};

export default NavBar;

