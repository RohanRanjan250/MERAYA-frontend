import React, { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import logoFallback from "../assets/image.png";
import { FaSearch, FaUser, FaHeart, FaShoppingBag, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../API/authApi";
import { openAPI } from "../API/instance";
import { LOGO_URL, onImgError } from "../utils/cloudinaryImages";
import { isLoggedIn } from "../utils/authCookie";

const logo = LOGO_URL;

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const shopTimeoutRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const [isAuth, setIsAuth] = useState(() => isLoggedIn());

  // Fetch cart item count
  const fetchCartCount = async () => {
    if (isAuth) {
      try {
        const API = (await import("../API/instance")).default;
        const response = await API.get("/cart/");
        const items = response.data.items || [];
        const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartItemCount(totalCount);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    }
  };

  useEffect(() => {
    fetchCartCount();

    const handleCartUpdate = () => {
      fetchCartCount();
    };
    
    const handleAuthChange = () => {
      setIsAuth(isLoggedIn());
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("authChanged", handleAuthChange);
    
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, [isAuth]);

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const API = (await import("../API/instance")).default;
        const response = await API.get("/categories/");
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Top-of-site marquee banner, admin-controlled from the dashboard.
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await openAPI.get("/announcement/");
        setAnnouncement(response.data.is_active ? response.data.message : '');
      } catch (error) {
        console.error("Error fetching announcement:", error);
      }
    };
    fetchAnnouncement();
  }, []);

  const handleShopMouseEnter = () => {
    clearTimeout(shopTimeoutRef.current);
    setShowShopDropdown(true);
  };

  const handleShopMouseLeave = () => {
    shopTimeoutRef.current = setTimeout(() => {
      setShowShopDropdown(false);
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

  // Debounced search function
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim().length === 0) {
      setSearchResults([]);
      setRelatedProducts([]);
      return;
    }

    setIsSearching(true);

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await openAPI.get(`/search/?q=${encodeURIComponent(query)}`);
        const data = response.data;
        setSearchResults(data.results || []);
        setRelatedProducts(data.related || []);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
        setRelatedProducts([]);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query]);

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
    setShowSearch(false);
    setQuery("");
    setSearchResults([]);
    setRelatedProducts([]);
  };

  return (
    <>
      {announcement && (
        <div className={styles.marqueeBar}>
          <div className={styles.marqueeTrack}>
            {/* Repeated enough times (and duplicated as a whole below) so the
                strip stays continuously full — however short the message or
                wide the screen, there's always another copy sliding in from
                the right at the same gap, never a blank stretch of bar. */}
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={`a-${i}`}>{announcement}</span>
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={`b-${i}`}>{announcement}</span>
            ))}
          </div>
        </div>
      )}
      <nav className={styles.navbar}>
        <div className={styles.hamburger} onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <FaBars />
        </div>

        <div className={styles.leftMenu}>
          <div 
            className={styles.menuItem} 
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            onMouseEnter={handleShopMouseEnter}
            onMouseLeave={handleShopMouseLeave}
          >
            SHOP <FaChevronDown className={`${styles.dropdownIcon} ${showShopDropdown ? styles.rotate : ''}`} />
            {showShopDropdown && (
              <div className={styles.dropdownMenu} style={{ left: 0, right: 'auto', minWidth: '200px' }}>
                {categories.map(c => (
                  <Link key={c.id} to={`/products?category=${c.id}`}>{c.name}</Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/products" className={styles.menuItem}>COLLECTIONS</Link>
        </div>

        <Link to="/" className={styles.logoLink}>
          <img src={logo} onError={onImgError(logoFallback)} alt="Meerya Logo" className={styles.logoImage} />
        </Link>

        <div className={styles.iconGroup}>
          <div
            className={`${styles.searchWrapper} ${showSearch ? styles.active : ""
              }`}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className={styles.searchInput}
              autoFocus
            />
            <FaSearch
              className={styles.icon}
              onClick={() => setShowSearch(!showSearch)}
            />
            {showSearch && query && (
              <div className={styles.searchResults}>
                {isSearching ? (
                  <div className={styles.loadingResult}>Searching...</div>
                ) : searchResults.length > 0 ? (
                  <>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        className={styles.resultItem}
                        onClick={() => handleProductClick(product.slug)}
                      >
                        {product.image && (
                          <img src={product.image} alt={product.name} className={styles.resultImage} />
                        )}
                        <div className={styles.resultInfo}>
                          <div className={styles.resultName}>{product.name}</div>
                          <div className={styles.resultPrice}>₹{product.selling_price}</div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : relatedProducts.length > 0 ? (
                  <>
                    <div className={styles.noResult}>No exact matches. Here are some suggestions:</div>
                    {relatedProducts.map((product) => (
                      <div
                        key={product.id}
                        className={styles.resultItem}
                        onClick={() => handleProductClick(product.slug)}
                      >
                        {product.image && (
                          <img src={product.image} alt={product.name} className={styles.resultImage} />
                        )}
                        <div className={styles.resultInfo}>
                          <div className={styles.resultName}>{product.name}</div>
                          <div className={styles.resultPrice}>₹{product.selling_price}</div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className={styles.noResult}>No products found</div>
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
                <a href="/myaccount/order">Orders</a>
                <a href="/wallet">Wallet</a>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
          <Link to="/wishlist">
            <FaHeart className={styles.icon} />
          </Link>
          <Link to="/checkout">
            <div className={styles.cartIconWrapper}>
              <FaShoppingBag className={styles.icon} />
              {cartItemCount > 0 && (
                <span className={styles.cartBadge}>{cartItemCount}</span>
              )}
            </div>
          </Link>
        </div>

        <Link to="/checkout" className={styles.mobileCartIcon}>
          <div className={styles.cartIconWrapper}>
            <FaShoppingBag className={styles.icon} />
            {cartItemCount > 0 && (
              <span className={styles.cartBadge}>{cartItemCount}</span>
            )}
          </div>
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
        <Link to="/products" onClick={closeMobileMenu}>SHOP</Link>
        <Link to="/products" onClick={closeMobileMenu}>COLLECTIONS</Link>
        <Link to="/myaccount/contact" onClick={closeMobileMenu}>ACCOUNT</Link>
        <Link to="/myaccount/order" onClick={closeMobileMenu}>ORDERS</Link>
        <Link to="/wallet" onClick={closeMobileMenu}>WALLET</Link>
        <Link to="/wishlist" onClick={closeMobileMenu}>WISHLIST</Link>

        <hr />
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
    </>
  );
};

export default Navbar;

