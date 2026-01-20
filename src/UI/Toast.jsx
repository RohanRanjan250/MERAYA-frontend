import React, { useEffect, useState } from 'react';
import styles from './Toast.module.css';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Toast = ({ message, type, onHide }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade in animation
    setVisible(true);

    // Set a timer to automatically hide the toast
    const timer = setTimeout(() => {
      setVisible(false);
      // Call the onHide callback after the fade out animation completes
      setTimeout(onHide, 300); // Duration should match CSS transition
    }, 4000); // Toast visible for 4 seconds

    return () => clearTimeout(timer);
  }, [message, type, onHide]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onHide, 300);
  };

  if (!message) {
    return null;
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className={styles.icon} />;
      case 'error':
        return <FaTimesCircle className={styles.icon} />;
      case 'info':
        return <FaInfoCircle className={styles.icon} />;
      default:
        return <FaCheckCircle className={styles.icon} />;
    }
  };

  return (
    <div className={styles.toastContainer}>
      <div className={`${styles.toast} ${styles[type]} ${visible ? styles.visible : ''}`}>
        {getIcon()}
        <span className={styles.message}>{message}</span>
        <button className={styles.closeBtn} onClick={handleClose}>
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default Toast;
