import React from 'react';
import styles from './Navbar.module.css';
import logo from '../assets/image.png';
import { FaSearch, FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftMenu}>
        <div className={styles.menuItem}>
          SHOP <span className={styles.dropdown}>▼</span>
        </div>
        <div className={styles.menuItem}>ABOUT</div>
      </div>

      <img src={logo} alt='Meerya Logo' className={styles.logoImage} />

      <div className={styles.iconGroup}>
        <FaSearch className={styles.icon} />
        <FaUser className={styles.icon} />
        <FaHeart className={styles.icon} />
        <FaShoppingBag className={styles.icon} />
      </div>
    </nav>
  );
};

export default Navbar;
