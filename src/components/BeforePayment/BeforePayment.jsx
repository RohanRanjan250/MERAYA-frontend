import React from "react";
import Cart from "../CartSummary/CartSummary";
import OrderSummary from "../OrderSummary/OrderSummary";
import styles from "./BeforePayment.module.css";

const BeforePayment = () => {
  const items = [
    { id: 1, title: "SLEEVELESS KURTI", size: "S", quantity: 1, price: 149.99, delivery: "Estimated Delivery by 22nd September, 25", image: "https://via.placeholder.com/120x150.png?text=Product" },
    { id: 2, title: "SLEEVELESS KURTI", size: "S", quantity: 1, price: 149.99, delivery: "Estimated Delivery by 22nd September, 25", image: "https://via.placeholder.com/120x150.png?text=Product" },
  ];

  const price = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = price * 0.1; // Example 10% discount
  const shipping = 0;
  const total = price - discount + shipping;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
        <div className={styles.heading}>
            <div className={styles.steps}>
                <p className={styles.wishlist}>MY CART</p>
                <p className={styles.whiteLine}></p>
                <p className={styles.current}>ADDRESS</p>
            </div>
                <p>{totalItems} ITEMS</p>
        </div>
        <div className={styles.container}>
        {/* Left - Cart Items */}
        <div className={styles.left}>
            <Cart />
        </div>

        {/* Right - Order Summary */}
        <div className={styles.right}>
            <OrderSummary price={price} discount={discount} shipping={shipping} total={total} />
        </div>
        </div>
    </>
  );
};

export default BeforePayment;
