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
          <p className={styles.description}>
            Placeholder text helps maintain the structure and appearance of the layout while the content is being developed.
            Here's an extra line to create some length difference.
          </p>
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
          <a href="/return-policy">SHIPPING & RETURNS</a>
          <a href="/privacy-policy">PRIVACY POLICY</a>
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
