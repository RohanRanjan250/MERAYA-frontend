import React,{useState} from "react";
import styles from "./SmallProductCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { toggleWishlist } from "../API/productmainpageAPI";
import { useToast } from "../Context/ToastContext";
import { isLoggedIn } from "../utils/authCookie";

import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onBuyNow }) => {
  const [, setInWishlist] = useState(product.in_wishlist || false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const isAuth = isLoggedIn();

  const handleWishlist = async () => {
    try {
      if (!isAuth) {
        navigate("/login");
        return;
      }
      await toggleWishlist(product.id);
      setInWishlist((prev) => {
        const next = !prev;
        showToast(next ? "Added to wishlist" : "Removed from wishlist", "success");
        return next;
      });
    } catch (error) {
      showToast(error.message || "Failed to update wishlist", "error");
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
    </div>
  );
};

export default ProductCard;
