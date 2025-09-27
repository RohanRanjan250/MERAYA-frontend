import React, { useState, useEffect } from "react";
import styles from "./OrderHistory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { fetchOrders } from "../../API/orderAPI";
import returnn from "../../assets/return.png";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reason, setReason] = useState("");
  const [refundMethod, setRefundMethod] = useState("wallet");
  
  // --- FIX 1: Removed the redundant 'confirmChecked' state ---
  const [isChecked, setIsChecked] = useState(false);

  const steps = ["Order placed", "Processing", "Packaging", "Out for delivery", "Delivered"];

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        console.log(data);
        const allowedStatuses = ["Order placed", "Processing", "Packaging", "Out for delivery", "Delivered"];
        const filteredOrders = (data.orders || []).filter(order =>
          allowedStatuses.includes(order.deliveryStatus)
        );

        const withRatings = filteredOrders.map(order => ({
          ...order,
          points: order.rating || 0,
        }));

        setOrders(withRatings);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    loadOrders();
  }, []);

  const toggleExpand = (id) => {
    setExpandedOrder((prev) => (prev === id ? null : id));
  };

  const handleRating = (orderId, rating) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, points: rating } : order
      )
    );
  };

  const renderStars = (order) => {
    const totalStars = 5;
    let stars = [];
    for (let i = 0; i < totalStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          onClick={() => handleRating(order.orderId, i + 1)}
          className={`${styles.star} ${i < order.points ? styles.activeStar : ""}`}
        />
      );
    }
    return stars;
  };

  // Function to reset modal state to avoid stale data
  const handleCloseModal = () => {
      setShowReturnModal(false);
      setReason("");
      setIsChecked(false);
      setRefundMethod("wallet");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>ORDER HISTORY</h2>

      {orders.map((order) => {
        const currentStepIndex = steps.indexOf(order.deliveryStatus);

        return (
          <div
            key={order.orderId}
            className={`${styles.orderCard} ${expandedOrder === order.orderId ? styles.expanded : ""}`}
            onClick={() => toggleExpand(order.orderId)}
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
                <button
                  className={styles.returnBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOrder(order);
                    setShowReturnModal(true);
                  }}
                >
                  Return
                </button>
              )}
            </div>

            {showReturnModal && selectedOrder && selectedOrder.orderId === order.orderId && (
              <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                  <h3>ARE YOU RETURNING THE ORDER?</h3>
                  <div className={styles.icon}>
                    <img src={returnn} alt="returnn" className={styles.returnn}></img>
                  </div>
                  <p>
                    Your Order no. is <span className={styles.orderId}>#ORD{selectedOrder.orderId}</span>
                  </p>
                  <p>You will receive confirmation email/SMS shortly.</p>

                  <textarea
                    placeholder="Enter reason for return..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className={styles.reasonBox}
                    required
                  />

                  <div className={styles.refundOptions}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name={`refundMethod-${selectedOrder.orderId}`} // Unique name for radio group
                        value="original"
                        checked={refundMethod === "original"}
                        onChange={() => setRefundMethod("original")}
                      />
                      <span className={styles.customRadio}></span>
                      Refund to Original Payment Method
                    </label>

                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name={`refundMethod-${selectedOrder.orderId}`} // Unique name for radio group
                        value="wallet"
                        checked={refundMethod === "wallet"}
                        onChange={() => setRefundMethod("wallet")}
                      />
                      <span className={styles.customRadio}></span>
                      Refund to Wallet
                    </label>
                  </div>

                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                      />
                      <span className={styles.customCheckbox}></span>
                      Accept Terms & Conditions
                    </label>
                  </div>

                  <div className={styles.modalButtons}>
                    <button
                      className={styles.returnConfirmBtn}
                      // --- FIX 2: Changed `confirmChecked` to `isChecked` ---
                      disabled={!isChecked || !reason.trim()}
                      onClick={() => {
                        console.log("Return submitted:", {
                          orderId: selectedOrder.orderId,
                          reason,
                          refundMethod,
                        });
                        handleCloseModal(); // Use reset function
                      }}
                    >
                      RETURN
                    </button>
                    <button
                      className={styles.cancelBtn}
                      onClick={handleCloseModal} // Use reset function
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Expanded Section */}
            <div className={styles.expandedSection}>
              {expandedOrder === order.orderId && (
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
                    <span className={styles.stars}>{renderStars(order)}</span>
                    <span>{order.points > 0 ? `You rated ${order.points}/5` : "Rate the product"}</span>
                  </div>

                  <div className={styles.moredetail}>
                    <p>Order ID: ORD{order.orderId}</p>
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