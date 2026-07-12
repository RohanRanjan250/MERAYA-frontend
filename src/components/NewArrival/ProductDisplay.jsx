import styles from './ProductDisplay.module.css';
import { LandingContext } from "../../Context/LandingpageContext.jsx";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import { ArrowDownLeft } from "lucide-react";
import { optimizeImage } from "../../utils/cloudinaryImages";

const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

const ProductDisplay = () => {
  const navigate = useNavigate();
  const { data } = useContext(LandingContext);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (data && data.length > 0) {
      const shuffledData = shuffleArray([...data]); 
      setDisplayedProducts(shuffledData.slice(0, 2));
      setLoading(false);
    } else if (data) {
      setLoading(false);
      setDisplayedProducts([]);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

  const handleBuyNow = async (slug) => {
    try {
      // const res = await buyProduct(id);
      navigate(`/product/${slug}`);
      // console.log("Buy Now Response:", res);
    } catch (err) {
      console.error("Buy Now Error:", err);
    }
  };

  const product1 = displayedProducts[0];
  const product2 = displayedProducts[1];

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
        {product1 ? (
          <div className={styles.card}>
            <img
              src={optimizeImage(product1.images[0], 500) || "https://placehold.co/400x500/cccccc/ffffff?text=Image+Not+Available"}
              alt={product1.name || "Product Image"}
              className={styles.productImg} // Use productImg for both
              loading="lazy"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x500/cccccc/ffffff?text=Load+Error"; }}
            />
            <p className={styles.description}>
              {/* Use product description snippet or default */}
              {product1.description?.substring(0, 50) + '...' || "Discover our latest arrival."}
            </p>
            <div className={styles.meta}>
              <h3>{product1.name || "Product Title"}</h3>
              <div className={styles.metaBottom}>
                 {/* Format price, handle missing price */}
                <p>₹{product1.selling_price ? product1.selling_price.toFixed(2) : "N/A"}</p>
                 {/* Link button to handleBuyNow with the product's slug */}
                <button onClick={() => handleBuyNow(product1.slug)}>VIEW <ArrowDownLeft size={16} style={{ verticalAlign: 'middle' }} /></button>
              </div>
            </div>
            <hr className={styles.divider} />
          </div>
        ) : (
          <div className={styles.card}> {/* Placeholder if no product1 */}
             <p>No product to display.</p>
          </div>
        )}
        {product2 ? (
          <div className={styles.card}>
            <img
              src={optimizeImage(product2.images[0], 500) || "https://placehold.co/400x500/cccccc/ffffff?text=Image+Not+Available"}
              alt={product2.name || "Product Image"}
              className={styles.productIm} 
              loading="lazy"
               onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x500/cccccc/ffffff?text=Load+Error"; }}
            />
            <p className={styles.description}>
              {product2.description?.substring(0, 50) + '...' || "Explore this unique piece."}
            </p>
            <div className={styles.meta}>
              <h3>{product2.name || "Product Title"}</h3>
              <div className={styles.metaBottom}>
                <p>₹{product2.selling_price ? product2.selling_price.toFixed(2) : "N/A"}</p>
                <button onClick={() => handleBuyNow(product2.slug)}>VIEW <ArrowDownLeft size={16} style={{ verticalAlign: 'middle' }} /></button>
              </div>
            </div>
            <hr className={styles.divider} />
          </div>
         ) : (
          <div className={styles.card}>
             <p>More coming soon!</p>
          </div>
        )}
      </div>

      <div className={styles.backgroundText}>MERAYA</div>
    </div>
  );
};

export default ProductDisplay;









  

  const handleBuyNow = async (slug) => {
    // Check if slug is valid before navigating
    if (!slug) {
        console.error("Cannot navigate without a valid product slug.");
        return;
    }
    try {
      navigate(`/product/${slug}`);
    } catch (err) {
      console.error("Navigation Error:", err);
    }
  };

      <div className={styles.gridContainer}>
        {/* Card 1: Display data from the first random product */}
        

        {/* Card 2: Display data from the second random product */}
        
      </div>