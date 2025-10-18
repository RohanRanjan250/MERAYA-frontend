import React, { useEffect, useState } from 'react';
import styles from './Toast.module.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

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
    }, 3000); // Toast visible for 3 seconds

    return () => clearTimeout(timer);
  }, [message, type, onHide]);

  if (!message) {
    return null;
  }

  const icon = type === 'success' 
    ? <FaCheckCircle className={styles.icon} /> 
    : <FaTimesCircle className={styles.icon} />;

  return (
    <div className={`${styles.toast} ${styles[type]} ${visible ? styles.visible : ''}`}>
      {icon}
      <span>{message}</span>
    </div>
  );
};

export default Toast;
