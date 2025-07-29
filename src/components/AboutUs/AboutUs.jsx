import React from 'react';
import styles from './AboutUs.module.css';
import modelImage from '../../assets/model.png';
import handImage from '../../assets/hand.png';

const AboutUs = () => {
  return (
    <div className={styles.showcaseSection}>
      {/* LEFT SIDE */}
      <div className={styles.left}>
        <p className={styles.topLine}>CRAFTED <span className={styles.line}></span> IN</p>
        <h2 className={styles.heading}>Co–Ord Sets</h2>
        <p className={styles.description}>
          Temporarily used to fill a space where actual content will eventually appear. It serves as a visual placeholder to help designers and developers visualize....
        </p>
        <img src={handImage} alt="Close-up hand" className={styles.handImage} />
        <a href="#" className={styles.learnMore}>LEARN MORE</a>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.right}>
        <div className={styles.textOverlay}>
          <p>
            Temporarily used to fill a space where actual content will eventually appear. It serves as a visual placeholder to help designers and developers visualize . Temporarily used to fill a space where actual content will eventually appear. It serves as a visual placeholder to help designers and developers visualize . Temporarily used to fill a space where actual content will eventually appear. It serves as a visual placeholder to help designers and developers visualize.
          </p>
        </div>
        <img src={modelImage} alt="Model" className={styles.modelImage} />
        <p className={styles.signature}>Martin Schleifer</p>
      </div>
    </div>
  );
};

export default AboutUs;
