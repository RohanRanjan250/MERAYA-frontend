import React, { useState, useRef } from 'react';
import styles from './Navbar.module.css';
import logo from '../assets/image.png';
import { FaSearch, FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftMenu}>
        <div className={styles.menuItem}>
          SHOP <span className={styles.dropdown}>▼</span>
        </div>
        <div className={styles.menuItem}>COLLECTIONS</div>
      </div>

      <Link to="/">
        <img src={logo} alt="Meerya Logo" className={styles.logoImage} />
      </Link>

      <div className={styles.iconGroup}>
        {/* Search Input + Icon */}
        <div className={`${styles.searchWrapper} ${showSearch ? styles.active : ""}`}>
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
        </div>

        {/* User Icon with Dropdown */}
        <div
          className={styles.userMenu}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FaUser className={styles.icon} />
          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <a href="/profile">Account</a>
              <a href="/orders">Orders</a>
              <a href="/wallet">Wallet</a>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

        <Link to="/wishlist">
          <FaHeart className={styles.icon} />
        </Link>
        <Link to="/cart">
          <FaShoppingBag className={styles.icon} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
