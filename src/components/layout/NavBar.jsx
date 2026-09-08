import { useEffect, useState } from "react";
import logo from "../../assets/icons/Logo-vector.svg";
import searchIcon from "../../assets/icons/search-vector.svg";
import cartIcon from "../../assets/icons/cart-vector.svg";
import userIcon from "../../assets/icons/user-vector.svg";
import { Link, useLocation } from "react-router-dom";
import { getCartCount } from "../../api/cart.service";

const NavBar = () => {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadCartCount = () => {
      getCartCount()
        .then(setCartCount)
        .catch(() => setCartCount(0));
    };

    loadCartCount();
    window.addEventListener("cart-updated", loadCartCount);
    return () => window.removeEventListener("cart-updated", loadCartCount);
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__links">
          <button className="header__menu">
            {/* <!-- <img src="assets/icons/hamburger-vector.svg" alt=""> --> */}
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link to="/" className="header__logo">
            <img src={logo} alt="" />
          </Link>
          <div className="header__nav-items">
            <a href="/category">Shop</a>
            <a href="/#top-selling">On Sale</a>
            <a href="/#new-arrivals">New Arrivals</a>
            <a href="/#brands">Brands</a>
          </div>
        </div>
        <div className="header__actions">
          <div className="header__actions__search-box">
            <img src={searchIcon} alt="" className="header__actions__search-box__icon" />
            <input
              type="search"
              className="header__actions__search-box__input"
              placeholder={`Search for products...`}
            />
          </div>
          <img
            src={searchIcon}
            alt="search icon"
            className="header__action__icons search-icon"
          />
          <Link to="/cart" className="header__cart-link" aria-label={`Cart${cartCount ? `, ${cartCount} items` : ""}`}>
            <img
              src={cartIcon}
              alt="cart icon"
              className="header__action__icons"
            />
            {cartCount > 0 && <span className="header__cart-count">{cartCount}</span>}
          </Link>
          <Link to="/login">
            <img
              src={userIcon}
              alt="user icon"
              className="header__action__icons"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
