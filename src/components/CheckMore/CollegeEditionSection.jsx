import React, { useContext } from "react";
import styles from './CollegeEditionSection.module.css';
import { LandingContext } from "../../Context/LandingpageContext.jsx";

const CollegeEditionSection = () => {
  const { data } = useContext(LandingContext);

  if (!data || data.length === 0) {
    return <div>Loading...</div>; 
  }

  const thumbnails = data; // ✅ backend data already has products

  return (
    <div className={styles.collegeEditionSection}>
      <div className={styles.collegeEditionContainer}>
        
        {/* LEFT SIDE */}
        <div className={styles.collegeEditionLeft}>
          <img
            src={thumbnails[0].images[0]}   // ✅ first image in array
            alt={thumbnails[0].name}
            className={styles.mainModelImg}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.collegeEditionRight}>
          <div className={styles.collegeEditionText}>
            <p className={styles.editionCode}>№{thumbnails[0].id}</p>
            <h2 className={styles.editionTitle}>MERAYA’S {thumbnails[0].name}</h2>
            <p className={styles.editionDescription}>
              {thumbnails[0].description} <span className={styles.whiteLine}></span>
            </p>
            <a href="#" className={styles.buyNow}>
              BUY NOW
            </a>
          </div>

          <div className={styles.collegeThumbnailsWrapper}>
            <div className={styles.collegeThumbnails}>
              {thumbnails.slice(1).map((item, index) => (
                <div key={index} className={styles.collegeThumbCard}>
                  <img
                    src={item.images[0]}   // ✅ use first image
                    alt={item.name}
                    className={styles.thumbImg}
                  />
                  <p className={styles.thumbCode}>№{item.id}</p>
                  <div className={styles.thumbTitle}>
                    {item.name} <span className={styles.whiteLine}></span> ₹{item.selling_price}
                  </div>
                  <p className={styles.thumbDesc}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CollegeEditionSection;
