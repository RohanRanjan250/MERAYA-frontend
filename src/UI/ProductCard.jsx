import React from "react";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, type, onAddToCart, onRemove, onMove, onSave, onQtyChange }) => {
  return (
    <div className={styles.card}>
      {/* Product Image */}
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </div>
      <div className={styles.info}>
        {/* Product Details */}
        <div className={styles.details}>
            <h3 className={styles.title}>{product.name}</h3>
            <p className={styles.price}>
            ₹{product.selling_price}{" "}
            <span className={styles.oldPrice}>₹{product.show_price}</span>
            </p>
            <p className={styles.discount}>({product.discount_percent}% off)</p>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
            {type === "wishlist" && (
            <>
                <button className={styles.addToCart} onClick={onAddToCart}>
                Move to Cart
                </button>
                <button className={styles.delete} onClick={onRemove}>
                Remove
                </button>
            </>
            )}

            {type === "cart" && (
            <>
                <div className={styles.qtyControl}>
                <button onClick={() => onQtyChange(product.id, -1)} className={styles.qtybutton}>-</button>
                <span className={styles.qtyy}>{product.qty}</span>
                <button onClick={() => onQtyChange(product.id, +1)} className={styles.qtybutton}>+</button>
                </div>
                {/* <button className={styles.secondary} onClick={() => onSave(product.id)}>
                Save for later
                </button> */}
                <button className={styles.delete} onClick={onRemove}>
                Delete
                </button>
            </>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
