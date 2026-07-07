import styles from './HeroGallery.module.css';
import img1Fallback from '../../assets/img1.png';
import img2Fallback from '../../assets/img2.png';
import img3Fallback from '../../assets/img3.png';
import img4Fallback from '../../assets/img4.png';
import img5Fallback from '../../assets/img5.png';
import img6Fallback from '../../assets/img6.png';
import img7Fallback from '../../assets/img7.png';

const img1 = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783449803/image_357_q0exvz.png";
const img2 = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783449803/image_358_weulza.png";
const img3 = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783449803/image_354_ghhjtq.png";
const img4 = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783449804/image_359_vodeei.png";
const img5 = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783449971/image_353_1_y9smmz.png";
const img6 = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783449803/image_356_kuift0.png";
const img7 = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783449803/image_355_nycjub.png";

const onImgError = (fallback) => (e) => { e.target.onerror = null; e.target.src = fallback; };

const HeroGallery = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.imageGrid}>
        <div className={styles.TopImage}>
          <img src={img1} onError={onImgError(img1Fallback)} alt="gallery" className={styles.img1} />
          <div className={styles.Topleft}>
            <img src={img2} onError={onImgError(img2Fallback)} alt="gallery" className={styles.img2} />
            <img src={img3} onError={onImgError(img3Fallback)} alt="gallery" className={styles.img3} />
          </div>
        </div>
        <div className={styles.BottomImage}>
          <div className={styles.BottomLeft}>
            <img src={img4} onError={onImgError(img4Fallback)} alt="gallery" className={styles.img4} />
            <img src={img5} onError={onImgError(img5Fallback)} alt="gallery" className={styles.img5} />
          </div>
          <div className={styles.BottomRight}>
            <img src={img6} onError={onImgError(img6Fallback)} alt="gallery" className={styles.img6} />
            <img src={img7} onError={onImgError(img7Fallback)} alt="gallery" className={styles.img7} />
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
