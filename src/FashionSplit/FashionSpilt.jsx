import React from 'react';
import styles from './FashionSplit.module.css';
import leftImg from '../assets/kurti1.png';
import rightImg from '../assets/kurti2.png';

const FashionSplit = () => {
  return (
    <div className={styles.container}>
      <div
        className={styles.left}
        style={{ backgroundImage: `url(${leftImg})` }}
      >
        <div className={styles.textOverlay}>
          <p className={styles.brand}>MERAYA’S</p>
          <h1 className={styles.heading}>COOL COLLEGE</h1>
        </div>
      </div>

      <div
        className={styles.right}
        style={{ backgroundImage: `url(${rightImg})` }}
      >
        <div className={styles.textOverlay}>
          <p className={styles.brand}>MERAYA’S</p>
          <h1 className={styles.headingg}>AESTHETIC</h1>
        </div>
      </div>
    </div>
  );
};

export default FashionSplit;
