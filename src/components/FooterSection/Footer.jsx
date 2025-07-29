import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        {/* LEFT SIDE */}
        <div className={styles.left}>
          <h3 className={styles.brand}>MERAYA <span className={styles.line}></span></h3>
          <h2 className={styles.title}>SHOP SASSY LIMITED EDITION</h2>
          <p className={styles.description}>
            Placeholder text helps maintain the structure and appearance of the layout while the content is being developed. 
            Here's an extra line to create some length difference.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <label htmlFor="email" className={styles.label}>EMAIL</label>
          <input type="email" id="email" className={styles.input} />
          <button className={styles.button}>GET EXCLUSIVE DEALS</button>
        </div>
        <div className={styles.links}>
          <a href="#">SHIPPING & RETURNS</a>
          <a href="#">PRIVACY POLICY</a>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className={styles.bottom}>
        <div className={styles.leftBottom}>All rights reserved MERAYA 2025
        </div>
        <div className={styles.siteLink}>meraya.com</div>
      </div>
    </footer>
  );
};

export default Footer;
