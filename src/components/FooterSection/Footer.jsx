import React, { useState } from 'react';
import styles from './Footer.module.css';
import { useToast } from '../../Context/ToastContext';
import API from '../../API/instance';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      showToast('Please enter your email', 'error');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await API.post('/newsletter/subscribe/', { email });

      if (response.status === 201) {
        showToast('Successfully subscribed to newsletter!', 'success');
        setEmail(''); // Clear input
      } else if (response.status === 200) {
        showToast('Email already subscribed', 'info');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      showToast(error.response?.data?.error || 'Failed to subscribe', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        {/* LEFT SIDE */}
        <div className={styles.left}>
          <h3 className={styles.brand}>MERAYA <span className={styles.line}></span></h3>
          <h2 className={styles.title}>SHOP SASSY LIMITED EDITION</h2>
          <div className={styles.contactInfo}>
            <p className={styles.contactItem}>
              <strong>Corporate Office: </strong>
              Sai Serenity, Dwaraka Nagar,<br />
              Banashankari, Bengaluru, Karnataka-560085
            </p>
            <p className={styles.contactItem}>
              <strong>Email:</strong> <a href="mailto:support@meraya.com">support@meraya.co.in</a>
            </p>
            <p className={styles.contactItem}>
              <strong>Phone:</strong> <a href="tel:+919279360532">+91 9279360532</a>
            </p>
            <p className={styles.contactItem}>
              <strong>Opening Hours:</strong> Mon to Sat: 10:30 AM - 6:30 PM
            </p>
          </div>

          {/* Social Media */}
          <div className={styles.socialMedia}>
            <a
              href="https://www.instagram.com/meraya.clo/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Follow us on Instagram"
            >
              <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <label htmlFor="email" className={styles.label}>EMAIL</label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
          />
          <button
            className={styles.button}
            onClick={handleSubscribe}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'SUBSCRIBING...' : 'GET EXCLUSIVE DEALS'}
          </button>
        </div>
        <div className={styles.links}>
          <div className={styles.linkSection}>
            <h4 className={styles.linkHeader}>POLICIES</h4>
            <a href="/shipping-policy">SHIPPING & DELIVERY POLICY</a>
            <a href="/return-policy">RETURN & EXCHANGE POLICY</a>
            <a href="/privacy-policy">PRIVACY POLICY</a>
            <a href="/terms-of-service">TERMS & CONDITIONS</a>
          </div>
          <div className={styles.linkSection}>
            <h4 className={styles.linkHeader}>SUPPORT</h4>
            <a href="/contact">CONTACT US</a>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className={styles.bottom}>
        <div className={styles.leftBottom}>All rights reserved MERAYA 2026
        </div>
        <div className={styles.siteLink}>meraya.co.in</div>
      </div>
    </footer>
  );
};

export default Footer;
