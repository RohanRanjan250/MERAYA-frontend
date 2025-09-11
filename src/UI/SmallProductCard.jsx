import React from "react";
import styles from "./SmallProductCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.images[0]} alt={product.title} />
        <button className={styles.wishlistBtn}>
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
      <div className={styles.details}>
        <p className={styles.brand}>MERAYA's</p>
        <div className={styles.titlePriceRow}>
          <p className={styles.title}>{product.name}</p>
          <span className={styles.whiteLine}></span>
          <span className={styles.price}>
            ₹{product.price}
          </span>
        </div>
        <p className={styles.description}>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
