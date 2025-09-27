import React, { useState, useEffect } from "react";
import styles from "./OrderHistory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {fetchOrders} from "../../API/orderAPI"

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const steps = ["Order placed", "Processing", "Packaging", "Out for delivery", "Delivered"];

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        console.log(data)
        const allowedStatuses = ["Order placed", "Processing", "Packaging", "Out for delivery", "Delivered"];
        const filteredOrders = (data.orders || []).filter(order =>
          allowedStatuses.includes(order.deliveryStatus)
        );
        setOrders(filteredOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    loadOrders();
  }, []);


  const toggleExpand = (id) => {
    setExpandedOrder((prev) => (prev === id ? null : id));
  };

  const renderStars = (count = 0) => {
    const totalStars = 5;
    let stars = [];
    for (let i = 0; i < totalStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={`${styles.star} ${i < count ? styles.activeStar : ""}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>ORDER HISTORY</h2>

      {orders.map((order) => {
        const currentStepIndex = steps.indexOf(order.deliveryStatus);

        return (
          <div
            key={order.id}
            className={`${styles.orderCard} ${expandedOrder === order.id ? styles.expanded : ""}`}
            onClick={() => toggleExpand(order.id)}
          >
            {/* Top Row */}
            <div>
              <div className={styles.topRow}>
                <img src={order.image} alt={order.title} className={styles.image} />

                <div className={styles.details}>
                  <h3>{order.title}</h3>
                  <p>SIZE: <span>{order.size}</span></p>
                  <p>Qty: {order.quantity}</p>

                  <button
                    className={`${styles.statusBtn} ${
                      order.deliveryStatus === "Delivered"
                        ? styles.delivered
                        : styles.transit
                    }`}
                  >
                    {order.deliveryStatus === "Order placed"
                      ? "Order Placed"
                      : order.deliveryStatus === "Delivered"
                      ? "Delivered"
                      : "In Transit"}
                  </button>
                </div>

                <div className={styles.priceSection}>
                  <p className={styles.price}>{order.price}</p>
                  <p className={styles.date}>{order.date}</p>
                </div>
              </div>

              {order.deliveryStatus === "Delivered" && (
                <button className={styles.returnBtn}>Return</button>
              )}
            </div>

            {/* Expanded Section */}
            <div className={styles.expandedSection}>
              {expandedOrder === order.id && (
                <>
                  <h4>DELIVERY STATUS</h4>
                  <ul className={styles.timeline}>
                    {steps.map((step, i) => (
                      <li key={i} className={i <= currentStepIndex ? styles.activeStep : ""}>
                        <span></span>
                        {step}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.rating}>
                    <span className={styles.stars}>{renderStars(order.points)}</span>
                    <span>Rate the product</span>
                  </div>

                  <div className={styles.moredetail}>
                    <p>Order ID: {order.orderId}</p>
                    <p>Delivered to: {order.address}</p>
                    <p>Delivery Date: {order.deliveryDate}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistory;
