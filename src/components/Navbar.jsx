import React, { useState, useRef } from "react";
import styles from "./Navbar.module.css";
import logo from "../assets/image.png";
import { FaSearch, FaUser, FaHeart, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../API/authApi";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  let isAuth = JSON.parse(localStorage.getItem("isAuthenticated"));

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };
  
  // --- 1. Create a function to close the menu ---
  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const handleLogout = async () => {
    try {
      if (!isAuth) {
        navigate("/login");
      } else {
        const response = await logout();
        if (response.status === 200) {
          window.location.href = "/";
        } else {
          console.log("some error occured");
        }
      }
      closeMobileMenu(); // Also close menu on logout
    } catch (err) {
      console.log(err);
    }
  };

  const sampleResults = [
    "Red T-Shirt",
    "Blue Jeans",
    "Leather Jacket",
    "Sneakers",
    "Handbag",
  ];

  const filteredResults = sampleResults.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.hamburger} onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <FaBars />
        </div>

        <div className={styles.leftMenu}>
          <div className={styles.menuItem}>
            SHOP <span className={styles.dropdown}>▼</span>
          </div>
          <div className={styles.menuItem}>COLLECTIONS</div>
        </div>

        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="Meerya Logo" className={styles.logoImage} />
        </Link>
        
        <div className={styles.iconGroup}>
          <div
            className={`${styles.searchWrapper} ${
              showSearch ? styles.active : ""
            }`}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className={styles.searchInput}
              autoFocus
            />
            <FaSearch
              className={styles.icon}
              onClick={() => setShowSearch(!showSearch)}
            />
            {showSearch && query && (
              <div className={styles.searchResults}>
                {filteredResults.length > 0 ? (
                  filteredResults.map((item, index) => (
                    <div key={index} className={styles.resultItem}>
                      {item}
                    </div>
                  ))
                ) : (
                  <div className={styles.noResult}>No results found</div>
                )}
              </div>
            )}
          </div>
          <div
            className={styles.userMenu}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaUser className={styles.icon} />
            {showDropdown && (
              <div className={styles.dropdownMenu}>
                <a href="/myaccount/contact">Account</a>
                <a href="/orders">Orders</a>
                <a href="/wallet">Wallet</a>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
          <Link to="/wishlist">
            <FaHeart className={styles.icon} />
          </Link>
          <Link to="/unified">
            <FaShoppingBag className={styles.icon} />
          </Link>
        </div>

        <Link to="/unified" className={styles.mobileCartIcon}>
          <FaShoppingBag className={styles.icon} />
        </Link>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${showMobileMenu ? styles.active : ""}`}>
        <div className={styles.mobileMenuHeader}>
          {/* Use the close function for the 'X' icon as well */}
          <FaTimes className={styles.closeIcon} onClick={closeMobileMenu} />
        </div>

        {/* --- 2. Add onClick to all mobile menu links and convert to <Link> --- */}
        <Link to="/" onClick={closeMobileMenu}>HOME</Link>
        <Link to="/shop" onClick={closeMobileMenu}>SHOP</Link>
        <Link to="/collections" onClick={closeMobileMenu}>COLLECTIONS</Link>
        <Link to="/myaccount/contact" onClick={closeMobileMenu}>ACCOUNT</Link>
        <Link to="/myaccount/order" onClick={closeMobileMenu}>ORDERS</Link>
        <Link to="/wallet" onClick={closeMobileMenu}>WALLET</Link>
        <Link to="/wishlist" onClick={closeMobileMenu}>WISHLIST</Link>

        <hr/>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
    </>
  );
};

export default Navbar;

