import React, { useState, useRef } from "react";
import styles from "./Navbar.module.css";
import logo from "../assets/image.png";
import { FaSearch, FaUser, FaHeart, FaShoppingBag, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

  // Fake product search (replace with API call later)
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      // Example filtering: Replace with backend API call
      const allProducts = ["T-shirt", "Jeans", "Shoes", "Bag", "Cap"];
      const results = allProducts.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.leftMenu}>
          <div className={styles.menuItem}>
            SHOP <span className={styles.dropdown}>▼</span>
          </div>
          <div className={styles.menuItem}>ABOUT</div>
        </div>

        <Link to="/">
          <img src={logo} alt="Meerya Logo" className={styles.logoImage} />
        </Link>

        <div className={styles.iconGroup}>
          <FaSearch
            className={styles.icon}
            onClick={() => setShowSearch(!showSearch)}
          />

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

      {/* 🔍 Search Bar Section */}
      {showSearch && (
        <div className={styles.searchSection}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <FaTimes
              className={styles.closeIcon}
              onClick={() => {
                setShowSearch(false);
                setSearchQuery("");
                setSearchResults([]);
              }}
            />
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className={styles.results}>
              {searchResults.map((item, index) => (
                <div key={index} className={styles.resultItem}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
