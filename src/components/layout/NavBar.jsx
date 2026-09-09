import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/Logo-vector.svg";
import searchIcon from "../../assets/icons/search-vector.svg";
import cartIcon from "../../assets/icons/cart-vector.svg";
import userIcon from "../../assets/icons/user-vector.svg";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { getAllProducts } from "../../api/product.service";

const NavBar = () => {
  const navigate = useNavigate();
  const { itemCount: cartCount } = useCart();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);
  const searchRequestRef = useRef(0);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isMobileSearchOpen) searchInputRef.current?.focus();
  }, [isMobileSearchOpen]);

  useEffect(() => {
    const query = searchQuery.trim();
    clearTimeout(searchTimeoutRef.current);

    if (query.length < 2) {
      return undefined;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      const requestId = ++searchRequestRef.current;
      setIsSearching(true);

      try {
        const response = await getAllProducts({ search: query, limit: 5 });
        if (requestId === searchRequestRef.current) {
          setSearchResults(response.products || []);
        }
      } catch (error) {
        if (requestId === searchRequestRef.current) {
          setSearchResults([]);
        }
        console.error("Unable to search products:", error);
      } finally {
        if (requestId === searchRequestRef.current) setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(searchTimeoutRef.current);
  }, [searchQuery]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/category?search=${encodeURIComponent(query)}`);
      closeMenu();
      setIsMobileSearchOpen(false);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (value.trim().length < 2) {
      searchRequestRef.current += 1;
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleSearchResultClick = (productId) => {
    setSearchResults([]);
    setSearchQuery("");
    setIsMobileSearchOpen(false);
    closeMenu();
    navigate(`/products/${productId}`);
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
            className={`header__actions__search-box ${isMobileSearchOpen ? "is-open" : ""}`}
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
              ref={searchInputRef}
              type="search"
              className="header__actions__search-box__input"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search products"
            />
            {(isSearching || searchResults.length > 0) && (
              <div className="header__search-results">
                {isSearching ? (
                  <p className="header__search-status">Searching...</p>
                ) : (
                  searchResults.map((product) => (
                    <button
                      className="header__search-result"
                      key={product._id}
                      type="button"
                      onClick={() => handleSearchResultClick(product._id)}
                    >
                      <span>{product.name}</span>
                      <small>${product.price}</small>
                    </button>
                  ))
                )}
              </div>
            )}
          </form>

          {/* Mobile Search Icon */}
          <button
            type="button"
            className="header__action__icons header__mobile-search-button search-icon"
            onClick={() => setIsMobileSearchOpen((isOpen) => !isOpen)}
            aria-label="Search"
            aria-expanded={isMobileSearchOpen}
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

