import React from 'react';
import styles from './PartitionHeader.module.css';

const PartitionHeader = ({ leftText, rightText }) => {
  return (
    <div className={styles.bar}>
      <span className={styles.left}>{leftText}</span>
      <span className={styles.right}>{rightText}</span>
    </div>
  );
};

export default PartitionHeader;
