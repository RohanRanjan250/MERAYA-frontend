import React, { useState } from "react";
import CartItems from "../CartItems/CartItems";
import OrderSummary from "../OrderSummary/OrderSummary";
import styles from "./Cart.module.css";

const Cart = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Sleeveless Kurti",
      size: "S",
      quantity: 1,
      price: 149.99,
      image: "/images/kurti.jpg",
    },
    {
      id: 2,
      name: "Sleeveless Kurti",
      size: "S",
      quantity: 1,
      price: 149.99,
      image: "/images/kurti.jpg",
    },
    {
      id: 3,
      name: "Sleeveless Kurti",
      size: "S",
      quantity: 2,
      price: 149.99,
      image: "/images/kurti.jpg",
    },
  ]);

  const handleQuantityChange = (id, change) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const price = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = price * 0.1; // example: 10% discount
  const shipping = 0;
  const total = price - discount + shipping;

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div className={styles.heading}>
        <p className={styles.wishlist}>MY CART</p>
        <p>{totalItems} ITEMS</p>
      </div>
      <div className={styles.cartPage}>
        <div className={styles.cartItemsSection}>
          <CartItems
            items={cart}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        </div>
        <div className={styles.orderSummarySection}>
          <OrderSummary
            price={price}
            discount={discount}
            shipping={shipping}
            total={total}
          />
        </div>
      </div>
    </>
  );
};

export default Cart;
