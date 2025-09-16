import React,{useState} from "react";
import styles from "./SmallProductCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { toggleWishlist } from "../API/productmainpageAPI";

import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onBuyNow }) => {
  const [inWishlist, setInWishlist] = useState(product.in_wishlist || false);
  const [wishlistToast, setWishlistToast] = useState(false);
  const navigate = useNavigate();

  const isAuth = JSON.parse(localStorage.getItem("isAuthenticated"));

  const handleWishlist = async () => {
    try {
      if (!isAuth) {
        navigate("/login");
        return;
      }
      await toggleWishlist(product.id);
      setInWishlist((prev) => !prev);
      setWishlistToast(true);
      setTimeout(() => setWishlistToast(false), 2000);
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };


  return (
    <div className={styles.card} onClick={onBuyNow}>
      <div className={styles.imageWrapper}>
        <img
          src={product.images?.[0] || "https://via.placeholder.com/150"}
          alt={product.name}
        />
        <button className={styles.wishlistBtn} onClick={handleWishlist}>
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
      <div className={styles.details}>
        <p className={styles.brand}>MERAYA's</p>
        <div className={styles.titlePriceRow}>
          <p className={styles.title}>{product.name}</p>
          <span className={styles.whiteLine}></span>
          <span className={styles.price}>₹{product.price}</span>
        </div>
        <p className={styles.description}>{product.description || ""}</p>
      </div>

      {wishlistToast && (
        <div className={styles.toast}>
          {inWishlist ? "Removed from wishlist" : "Added to wishlist"}!
        </div>
      )}
    </div>
  );
};

export default ProductCard;
