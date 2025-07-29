import React from 'react';
import styles from './Upcoming.module.css';

// Replace with actual image imports
import img1 from '../assets/upcoming1.png';
import img2 from '../assets/upcoming2.png';
import img3 from '../assets/upcoming3.png';
import img4 from '../assets/upcoming4.png';
import img5 from '../assets/upcoming5.png';
import img6 from '../assets/upcoming6.png';

const Upcoming = () => {
  return (
    <div className={styles.container}>
        <div className={styles.imageGrid}>
            <div className={styles.Top}>
                <img src={img1} className={`${styles.image1} ${styles.imgTopLeft}`} alt="model1" />
                <img src={img2} className={`${styles.image2} ${styles.imgMidLeft}`} alt="model2" />
            </div>
            <div className={styles.Bottom}>
                <div className={styles.BottomLeft}>
                    <img src={img3} className={`${styles.image3} ${styles.imgTopRight}`} alt="model3" />
                    <img src={img4} className={`${styles.image4} ${styles.imgBottomLeft}`} alt="model4" />
                </div>
                <div className={styles.BottomRight}>
                    <img src={img5} className={`${styles.image5} ${styles.imgBottomRight}`} alt="model5" />
                    <img src={img6} className={`${styles.image6} ${styles.imgRightBottom}`} alt="model6" />
                </div>
            </div>
        </div>

      {/* CENTER CONTENT */}
      <div className={styles.centerText}>
        <p className={styles.releaseText}>Releasing soon</p>
        <p className={styles.brand}>MERAYA’S</p>
        <h2 className={styles.title}>Everyday Wear</h2>
        <div className={styles.doubleLine}></div>
        <p className={styles.description}>
          Placeholder text helps maintain the structure and appearance of the layout while the content is being
          developed. Here’s an extra line to create some length difference.
        </p>
        <a href="#" className={styles.buyNow}>BUY NOW</a>
      </div>
    </div>
  );
};

export default Upcoming;
