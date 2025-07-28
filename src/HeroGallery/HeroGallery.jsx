import styles from './HeroGallery.module.css';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';
import img6 from '../assets/img6.png';
import img7 from '../assets/img7.png';

const HeroGallery = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.imageGrid}>
        <div className={styles.TopImage}>
          <img src={img1} alt="gallery" className={styles.img1} />
          <div className={styles.Topleft}>
            <img src={img2} alt="gallery" className={styles.img2} />
            <img src={img3} alt="gallery" className={styles.img3} />
          </div>
        </div>
        <div className={styles.BottomImage}>
          <div className={styles.BottomLeft}>
            <img src={img4} alt="gallery" className={styles.img4} />
            <img src={img5} alt="gallery" className={styles.img5} />
          </div>
          <div className={styles.BottomRight}>
            <img src={img6} alt="gallery" className={styles.img6} />
            <img src={img7} alt="gallery" className={styles.img7} />
          </div>
        </div>
      </div>

      <div className={styles.centerText}>
        <p className={styles.subtitle}>EVERGREEN</p>
        <h1 className={styles.title}>College Edition</h1>
        <a href="#" className={styles.link}>SHOP COLLECTION</a>
      </div>
    </section>
  );
};

export default HeroGallery;
