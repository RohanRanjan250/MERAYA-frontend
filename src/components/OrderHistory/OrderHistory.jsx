import React, { useState, useEffect } from "react";
import styles from "./OrderHistory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { fetchOrders, initiateReturn } from "../../API/orderAPI";
import returnn from "../../assets/return.png";
import success from "../../assets/Success.png"

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reason, setReason] = useState("");
  const [refundMethod, setRefundMethod] = useState("wallet");
  const [isChecked, setIsChecked] = useState(false);
  const [showReturnConfirmation, setShowReturnConfirmation] = useState(false);

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
  
  const handleCloseModal = () => {
      setShowReturnModal(false);
      setReason("");
      setIsChecked(false);
      setRefundMethod("wallet");
  };
  
  // --- 2. UPDATE onClick handler for the RETURN button ---
  const handleReturnSubmit = async () => {
    try {
      await initiateReturn(
        selectedOrder.orderId,
        selectedOrder.orderitem_id, // make sure your order object has this
        reason,
        refundMethod
      );
      handleCloseModal(); 
      setShowReturnConfirmation(true);
    } catch (err) {
      console.error("Error submitting return:", err);
      alert("Something went wrong while placing the return.");
    }
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
            {/* ... (rest of your order card JSX remains unchanged) ... */}
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
                <>
                  {order.return_status ? (
                    <button className={`${styles.returnBtn} ${styles.alreadyReturned}`} disabled>
                      Already Returned
                    </button>
                  ) : (
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
                </>
              )}

            </div>

            {/* RETURN FORM MODAL */}
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
                        name={`refundMethod-${selectedOrder.orderId}`}
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
                        name={`refundMethod-${selectedOrder.orderId}`}
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
                      disabled={!isChecked || !reason.trim()}
                      onClick={handleReturnSubmit} // Use the new handler
                    >
                      RETURN
                    </button>
                    <button
                      className={styles.cancelBtn}
                      onClick={handleCloseModal}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* ... (rest of your expanded section JSX remains unchanged) ... */}
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

      {/* --- 3. NEW JSX for the confirmation message --- */}
      {/* This is placed outside the .map() loop */}
      {showReturnConfirmation && selectedOrder && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalContent} ${styles.confirmationContent}`}>
            <h3>RETURN PLACED</h3>
            <div className={styles.confirmationIcon}><img src={success} alt="success" className={styles.success}></img></div>
            <p>
              You Order no. is <span className={styles.orderId}>#ORD{selectedOrder.orderId}</span>
            </p>
            <p>You will receive the confirmation email/SMS shortly</p>
            <button
              className={styles.cancelBtnn}
              onClick={() => setShowReturnConfirmation(false)}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;