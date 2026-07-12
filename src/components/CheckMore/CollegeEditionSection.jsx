import React, { useContext } from "react";
import styles from './CollegeEditionSection.module.css';
import { LandingContext } from "../../Context/LandingpageContext.jsx";
import { useNavigate } from "react-router-dom";

const CollegeEditionSection = () => {
  const navigate = useNavigate();
  const { data } = useContext(LandingContext);
  

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }
  

  const thumbnails = data;
  // console.log(thumbnails) ;

  const handleBuyNow = async (slug) => {
    try {
      // const res = await buyProduct(id);
      navigate(`/product/${slug}`);
      // console.log("Buy Now Response:", res);
    } catch (err) {
      console.error("Buy Now Error:", err);
    }
  };

  return (
    <div className={styles.collegeEditionSection}>
      <div className={styles.collegeEditionContainer}>
        
        {/* LEFT SIDE */}
        <div className={styles.collegeEditionLeft}>
          <img
            src={thumbnails[0].images[0]}
            alt={thumbnails[0].name}
            className={styles.mainModelImg}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.collegeEditionRight}>
          <div className={styles.collegeEditionText}>
            <p className={styles.editionCode}>№01</p>
            <h2 className={styles.editionTitle}>MERAYA’S {thumbnails[0].name}</h2>
            <p className={styles.editionDescription}>
              {thumbnails[0].description} <span className={styles.whiteLine}></span>
            </p>
            {thumbnails[0].is_out_of_stock && (
              <p style={{ color: '#ff6b6b', fontWeight: 'bold' }}>OUT OF STOCK</p>
            )}
            <button
              className={styles.buyNow}
              onClick={() => handleBuyNow(thumbnails[0].slug)} // ✅ send product id
            >
              BUY NOW
            </button>
          </div>

          <div className={styles.collegeThumbnailsWrapper}>
            <div className={styles.collegeThumbnails}>
              {thumbnails.slice(1).map((item, index) => (
                <div
                  key={index}
                  className={styles.collegeThumbCard}
                  onClick={() => handleBuyNow(item.slug)} // ✅ send product id
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className={styles.thumbImg}
                  />
                  <p className={styles.thumbCode}>№{String(index + 2).padStart(2, '0')}</p>
                  <div className={styles.thumbTitle}>
                    <span className={styles.thumbName}>{item.name}</span>
                    <span className={styles.whiteLine}></span>
                    <span className={styles.thumbPrice}>₹{item.selling_price}</span>
                  </div>
                  {item.is_out_of_stock && (
                    <p style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '0.8rem' }}>OUT OF STOCK</p>
                  )}
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
