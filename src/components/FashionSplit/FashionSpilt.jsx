import React, { useState, useEffect } from 'react';
import styles from './FashionSplit.module.css';
import leftImgFallback from '../../assets/kurti1.png';
import rightImgFallback from '../../assets/kurti2.png';

const LEFT_IMG_URL = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783449361/image_360_us0mvu.png";
const RIGHT_IMG_URL = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783449361/image_361_cli7sv.png";

// CSS background-image has no onError, so preload and fall back to the
// local asset if the Cloudinary URL fails to load.
const useImageWithFallback = (url, fallback) => {
  const [src, setSrc] = useState(url);
  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onerror = () => setSrc(fallback);
  }, [url, fallback]);
  return src;
};

const FashionSplit = () => {
  const leftImg = useImageWithFallback(LEFT_IMG_URL, leftImgFallback);
  const rightImg = useImageWithFallback(RIGHT_IMG_URL, rightImgFallback);

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
