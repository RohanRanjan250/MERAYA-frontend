import React from 'react';
import styles from './AboutUs.module.css';
import modelImageFallback from '../../assets/model.png';
import handImageFallback from '../../assets/hand.png';

const modelImage = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783449804/image_353_jnfqib.png";
const handImage = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783450263/hand_qr3p5b.png";
const onImgError = (fallback) => (e) => { e.target.onerror = null; e.target.src = fallback; };

const AboutUs = () => {
  return (
    <div className={styles.showcaseSection}>
      {/* LEFT SIDE */}
      <div className={styles.left}>
        <p className={styles.topLine}>CRAFTED </p>
          {/* <span className={styles.line}></span> IN</p> */}
        <h2 className={styles.heading}>Shirts</h2>
        <p className={styles.description}>
          Every shirt is thoughtfully crafted with precision, premium fabrics, and timeless design. Made to complement your everyday style with effortless sophistication...
        </p>
        <img src={handImage} onError={onImgError(handImageFallback)} alt="Close-up hand" className={styles.handImage} />
        <a href="#" className={styles.learnMore}>Buy Now</a>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.right}>
        {/* <div className={styles.textOverlay}>
          <p>
            Temporarily used to fill a space where actual content will eventually appear. It serves as a visual placeholder to help designers and developers visualize . Temporarily used to fill a space where actual content will eventually appear. It serves as a visual placeholder to help designers and developers visualize . Temporarily used to fill a space where actual content will eventually appear. It serves as a visual placeholder to help designers and developers visualize.
          </p>
        </div> */}
        <img src={modelImage} onError={onImgError(modelImageFallback)} alt="Model" className={styles.modelImage} />
        {/* <p className={styles.signature}>Martin Schleifer</p> */}
      </div>
    </div>
  );
};

export default AboutUs;
