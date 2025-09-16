import React from "react";
import styles from "./CartItems.module.css";

const CartItems = ({ items, onQuantityChange, onRemove, onBuyNow }) => {
  return (
    <div className={styles.cartItems}>
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <img
            src={item.image[0] || "https://via.placeholder.com/150"}
            alt={item.name}
            className={styles.image}
            onClick={() => onBuyNow(item.slug)} // ✅ pass slug
          />
          <div className={styles.details}>
            <h3>{item.name}</h3>
            <div className={styles.sizeLabel}>
              <p className={styles.Size}>SIZE </p>
              <span className={styles.whiteLine}></span>
              <p className={styles.selectedSize}>{item.variant}</p>
            </div>

            <div className={styles.actions}>
              <div className={styles.quantity}>
                <button onClick={() => onQuantityChange(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onQuantityChange(item.id, 1)}>+</button>
              </div>

              <button
                className={styles.remove}
                onClick={() => onRemove(item.id)}
              >
                Remove
              </button>
            </div>
          </div>

          <div className={styles.price}>₹{item.price.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
