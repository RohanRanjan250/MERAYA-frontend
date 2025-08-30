import React from "react";
import styles from "./OrderSummary.module.css";

const OrderSummary = ({ price, discount, shipping, total }) => {
  return (
    <div className={styles.orderSummary}>
      <h2>Order Summary</h2>
      <div className={styles.row}>
        <span>Price</span>
        <span>₹{price.toFixed(2)}</span>
      </div>
      <div className={styles.row}>
        <span>Discount</span>
        <span>-₹{discount.toFixed(2)}</span>
      </div>
      <div className={styles.row}>
        <span>Shipping</span>
        <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : "Free"}</span>
      </div>
      <div className={styles.row}>
        <span>Coupon Applied</span>
        <span>₹0.00</span>
      </div>

      <hr />

      <div className={`${styles.row} ${styles.total}`}>
        <span>TOTAL</span>
        <span className={styles.totalPrice}>₹{total.toFixed(2)}</span>
      </div>

      <p className={styles.delivery}>
        Estimated Delivery by <b>01 Feb, 2023</b>
      </p>

      <div className={styles.couponBox}>
        <input type="text" placeholder="Coupon Code" />
        <button>Apply</button>
      </div>

      <button className={styles.checkoutBtn}>Proceed to Checkout</button>
    </div>
  );
};

export default OrderSummary;
