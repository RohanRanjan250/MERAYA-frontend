// OrderHistory.jsx
import React from "react";
import styles from "./OrderHistory.module.css";

const OrderHistory = () => {
  const orders = [
    {
      id: 1,
      title: "SLEEVELESS KURTI",
      size: "S",
      quantity: 1,
      price: "₹149.99",
      status: "In Transit",
      date: "Expected to reach by 7th Sept.",
      image:
        "https://via.placeholder.com/100x150.png?text=Product", // replace with real img
    },
    {
      id: 2,
      title: "SLEEVELESS KURTI",
      size: "S",
      quantity: 1,
      price: "₹149.99",
      status: "Delivered",
      date: "Expected to reach by 7th Sept.",
      image:
        "https://via.placeholder.com/100x150.png?text=Product", // replace with real img
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>ORDER HISTORY</h2>

      {orders.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          <img src={order.image} alt={order.title} className={styles.image} />

          <div className={styles.details}>
            <h3>{order.title}</h3>
            <p>
              SIZE: <span>{order.size}</span>
            </p>
            <p>Qty: {order.quantity}</p>

            <button
              className={`${styles.statusBtn} ${
                order.status === "Delivered" ? styles.delivered : styles.transit
              }`}
            >
              {order.status}
            </button>
          </div>

          <div className={styles.priceSection}>
            <p className={styles.price}>{order.price}</p>
            <p className={styles.date}>{order.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
