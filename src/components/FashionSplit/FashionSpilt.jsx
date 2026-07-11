import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FashionSplit.module.css';
import leftImgFallback from '../../assets/kurti1.png';
import rightImgFallback from '../../assets/kurti2.png';
import { openAPI } from '../../API/instance';

const LEFT_IMG_URL = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783449361/image_360_us0mvu.png";
const RIGHT_IMG_URL = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783449361/image_361_cli7sv.png";

const findCollectionId = (collections, nameFragment) => {
  const match = collections.find((c) => c.name?.toLowerCase().includes(nameFragment));
  return match?.id ?? null;
};

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
  const navigate = useNavigate();
  const [collectionIds, setCollectionIds] = useState({ officeCore: null, indieEdit: null });

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const { data } = await openAPI.get('/collections/');
        const collections = data.collections || [];
        setCollectionIds({
          officeCore: findCollectionId(collections, 'office core'),
          indieEdit: findCollectionId(collections, 'indie edit'),
        });
      } catch (err) {
        console.error('Error fetching collections for FashionSplit:', err);
      }
    };
    loadCollections();
  }, []);

  const goToCollection = (collectionId) => {
    navigate(collectionId ? `/products?collection=${collectionId}` : '/products');
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.left}
        style={{ backgroundImage: `url(${leftImg})`, cursor: 'pointer' }}
        onClick={() => goToCollection(collectionIds.officeCore)}
      >
        <div className={styles.textOverlay}>
          <p className={styles.brand}>MERAYA’S</p>
          <h1 className={styles.heading}>OFFICE CORE</h1>
        </div>
      </div>

      <div
        className={styles.right}
        style={{ backgroundImage: `url(${rightImg})`, cursor: 'pointer' }}
        onClick={() => goToCollection(collectionIds.indieEdit)}
      >
        <div className={styles.textOverlay}>
          <p className={styles.brand}>MERAYA’S</p>
          <h1 className={styles.headingg}>INDIE EDIT</h1>
        </div>
      </div>
    </div>
  );
};

export default FashionSplit;
