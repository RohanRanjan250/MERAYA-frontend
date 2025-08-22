import React, { useState, useRef } from 'react';
import styles from './Navbar.module.css';
import logo from '../assets/image.png';
import { FaSearch, FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 100); // 1 second delay
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    window.location.href = "/";
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftMenu}>
        <div className={styles.menuItem}>
          SHOP <span className={styles.dropdown}>▼</span>
        </div>
        <div className={styles.menuItem}>ABOUT</div>
      </div>

      <img src={logo} alt="Meerya Logo" className={styles.logoImage} />

      <div className={styles.iconGroup}>
        <FaSearch className={styles.icon} />

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

        <FaHeart className={styles.icon} />
        <FaShoppingBag className={styles.icon} />
      </div>
    </nav>
  );
};

export default Navbar;
