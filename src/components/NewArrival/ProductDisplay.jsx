import styles from './ProductDisplay.module.css';
import fallbackImg1 from '../../assets/kurti_3.png';
import fallbackImg2 from '../../assets/kurti_4.png';

const ProductDisplay = () => {
  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.leftTextBlock}>
        <p className={styles.introText}>
          Say hello to the freshest drops in our collection — where desi roots meet everyday cool.
          Whether you’re heading to college, brunching with your gang, or just vibing through the week,
          our latest arrivals bring the perfect blend of comfort, culture, and closet-core style.
        </p>
        <p className={styles.introText}>
          From breathable cotton kurtas with Gen Z cuts to fusion coords that go from 9am to post-sunset plans —
          it’s all about keeping it easy, expressive, and unapologetically you.
        </p>
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.card}>
          <img src={fallbackImg1} alt="Fallback 1" className={styles.productImg} loading="lazy" />
          <p className={styles.description}>
            A placeholder text is a block of nonsensical.
          </p>
          <div className={styles.meta}>
            <h3>PIECE TITLE</h3>
            <div className={styles.metaBottom}>
              <p>$875</p>
              <button>ADD TO CART ↙</button>
            </div>
          </div>
          <hr className={styles.divider} />
        </div>
        <div className={styles.card}>
          <img src={fallbackImg2} alt="Fallback 2" className={styles.productIm} loading="lazy" />
          <p className={styles.description}>
            A placeholder text is a block of nonsensical.
          </p>
          <div className={styles.meta}>
            <h3>PIECE TITLE</h3>
            <div className={styles.metaBottom}>
              <p>$875</p>
              <button>ADD TO CART ↙</button>
            </div>
          </div>
            <hr className={styles.divider} />
        </div>
      </div>

      <div className={styles.backgroundText}>MERAYA</div>
    </div>
  );
};

export default ProductDisplay;
