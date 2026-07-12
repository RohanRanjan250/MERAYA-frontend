import React, { useState, useEffect } from "react";
import styles from "./OrderHistory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { fetchOrders, initiateReturn, initiateExchange, verifyPayment } from "../../API/orderAPI";
import { submitReview } from "../../API/productmainpageAPI";
import returnnFallback from "../../assets/return.png";
import successFallback from "../../assets/Success.png";
import { useNavigate } from "react-router-dom";
import { RETURN_URL, SUCCESS_URL, onImgError, optimizeImage } from "../../utils/cloudinaryImages";
import { isLoggedIn } from "../../utils/authCookie";
import { useToast } from "../../Context/ToastContext";

const returnn = RETURN_URL;
const success = SUCCESS_URL;

const RETURN_STATUS_LABELS = {
  Requested: "Return Requested",
  Approved: "Return Approved — pickup pending",
  Granted: "Refund Credited",
  Rejected: "Return Rejected",
  Exchanged: "Exchange in Progress",
};

const loadScript = (src) => {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reason, setReason] = useState("");
  const [refundMethod, setRefundMethod] = useState("wallet");
  const [isChecked, setIsChecked] = useState(false);
  const [showReturnConfirmation, setShowReturnConfirmation] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [selectedExchangeVariant, setSelectedExchangeVariant] = useState("");
  const [exchangeChecked, setExchangeChecked] = useState(false);
  const [isExchanging, setIsExchanging] = useState(false);
  const [showExchangeConfirmation, setShowExchangeConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviewDraft, setReviewDraft] = useState(null); // { orderId, productId, rating, title, description }
  const [submittingReview, setSubmittingReview] = useState(false);
  const navigate = useNavigate();
  let isAuth = isLoggedIn();
  const { showToast } = useToast();

  const steps = ["Order placed", "Shipped", "Out for delivery", "Delivered"];

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const loadOrders = async () => {
    try {
      if (!isAuth) {
        navigate("/login");
        return;
      }
      const data = await fetchOrders();
      const allowedStatuses = ["Order placed", "Shipped", "Out for delivery", "Delivered"];
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleExpand = (id) => {
    setExpandedOrder((prev) => (prev === id ? null : id));
  };

  const handleRating = (order, rating) => {
    if (order.deliveryStatus !== "Delivered" || order.has_reviewed) return;
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.orderitem_id === order.orderitem_id ? { ...o, points: rating } : o
      )
    );
    setReviewDraft({
      orderitemId: order.orderitem_id,
      productId: order.product_id,
      rating,
      title: "",
      description: "",
    });
  };

  const handleReviewSubmit = async () => {
    if (!reviewDraft || reviewDraft.rating < 1 || !reviewDraft.description.trim()) return;
    setSubmittingReview(true);
    try {
      const result = await submitReview(
        reviewDraft.productId,
        reviewDraft.rating,
        reviewDraft.title,
        reviewDraft.description
      );
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.orderitem_id === reviewDraft.orderitemId
            ? {
                ...o,
                has_reviewed: true,
                points: result.rating,
                rating: result.rating,
                review_title: result.title,
                review_description: result.description,
              }
            : o
        )
      );
      setReviewDraft(null);
    } catch (err) {
      console.error("Error submitting review:", err);
      alert(err?.error || "Something went wrong while submitting your review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const renderStars = (order) => {
    const totalStars = 5;
    let stars = [];
    for (let i = 0; i < totalStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          onClick={(e) => { e.stopPropagation(); handleRating(order, i + 1); }}
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

  const handleCloseExchangeModal = () => {
    setShowExchangeModal(false);
    setSelectedExchangeVariant("");
    setExchangeChecked(false);
  };

  const handleExchangeSubmit = async () => {
    if (!selectedOrder || !selectedExchangeVariant) return;
    setIsExchanging(true);
    try {
      const data = await initiateExchange(selectedOrder.orderitem_id, Number(selectedExchangeVariant));

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Meraya",
        description: "Exchange delivery fee",
        order_id: data.razorpay_order_id,
        handler: async function (response) {
          try {
            const verificationResult = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              order_id: data.order_id,
            });
            if (verificationResult.success) {
              handleCloseExchangeModal();
              setShowExchangeConfirmation(true);
            } else {
              showToast("Payment verification failed. Please contact support.", "error");
            }
          } catch (error) {
            console.error("Exchange payment verification error:", error);
            showToast("Payment verification failed. Please contact support with your payment ID: " + response.razorpay_payment_id, "error");
          } finally {
            setIsExchanging(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsExchanging(false);
          },
        },
        theme: { color: "#e38012" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Error initiating exchange:", err);
      showToast(err?.error || "Something went wrong while initiating the exchange.", "error");
      setIsExchanging(false);
    }
  };


  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>ORDER HISTORY</h2>

      {!loading && orders.length === 0 && (
        <div className={styles.emptyState}>
          <p>You haven't placed any orders yet.</p>
          <button className={styles.shopNow} onClick={() => navigate("/products")}>
            Shop Now
          </button>
        </div>
      )}

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
                <img src={optimizeImage(order.image, 200)} alt={order.title} className={styles.image} />

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
                  {order.deliveryStatus !== "Delivered" && (
                    <p className={styles.date}>{order.date}</p>
                  )}
                </div>
              </div>

              {order.deliveryStatus === "Delivered" && (
                <>
                  {order.is_exchange_replacement ? (
                    <button className={`${styles.returnBtn} ${styles.alreadyReturned}`} disabled>
                      Not Eligible (Received via Exchange)
                    </button>
                  ) : order.return_status ? (
                    <button className={`${styles.returnBtn} ${styles.alreadyReturned}`} disabled>
                      {RETURN_STATUS_LABELS[order.return_status] || "Already Returned"}
                    </button>
                  ) : order.within_return_window === false ? (
                    <button className={`${styles.returnBtn} ${styles.alreadyReturned}`} disabled>
                      Return/Exchange Window Expired (7 Days)
                    </button>
                  ) : (
                    <>
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
                      {order.available_variants && order.available_variants.length > 0 && (
                        <button
                          className={styles.returnBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                            setShowExchangeModal(true);
                          }}
                        >
                          Exchange
                        </button>
                      )}
                    </>
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
                    <img src={returnn} onError={onImgError(returnnFallback)} alt="returnn" className={styles.returnn}></img>
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
                    <label className={`${styles.radioLabel} ${styles.disabledRadioLabel}`}>
                      <input
                        type="radio"
                        name={`refundMethod-${selectedOrder.orderId}`}
                        value="original"
                        checked={refundMethod === "original"}
                        onChange={() => setRefundMethod("original")}
                        disabled
                      />
                      <span className={styles.customRadio}></span>
                      Refund to Original Payment Method (Currently Unavailable)
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

            {/* EXCHANGE FORM MODAL */}
            {showExchangeModal && selectedOrder && selectedOrder.orderId === order.orderId && (
              <div className={styles.modalOverlay}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                  <h3>EXCHANGE THIS ITEM?</h3>
                  <p>
                    Your Order no. is <span className={styles.orderId}>#ORD{selectedOrder.orderId}</span>
                  </p>
                  <p style={{ color: '#e38012', fontWeight: 'bold' }}>
                    An extra ₹{selectedOrder.exchange_delivery_fee || 150} delivery charge applies for exchanges, as per policy.
                  </p>

                  <div className={styles.refundOptions}>
                    <label style={{ display: 'block', marginBottom: 8 }}>Choose new size:</label>
                    <select
                      value={selectedExchangeVariant}
                      onChange={(e) => setSelectedExchangeVariant(e.target.value)}
                      className={styles.reasonBox}
                    >
                      <option value="">Select a size</option>
                      {(selectedOrder.available_variants || []).map((v) => (
                        <option key={v.id} value={v.id}>{v.size}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={exchangeChecked}
                        onChange={(e) => setExchangeChecked(e.target.checked)}
                      />
                      <span className={styles.customCheckbox}></span>
                      Accept Terms & Conditions
                    </label>
                  </div>

                  <div className={styles.modalButtons}>
                    <button
                      className={styles.returnConfirmBtn}
                      disabled={!exchangeChecked || !selectedExchangeVariant || isExchanging}
                      onClick={handleExchangeSubmit}
                    >
                      {isExchanging ? "PROCESSING..." : `PAY ₹${selectedOrder.exchange_delivery_fee || 150} & EXCHANGE`}
                    </button>
                    <button
                      className={styles.cancelBtn}
                      onClick={handleCloseExchangeModal}
                      disabled={isExchanging}
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

                  {order.deliveryStatus === "Delivered" && (
                    <div className={styles.rating}>
                      {order.has_reviewed ? (
                        <>
                          <span className={styles.stars}>{renderStars(order)}</span>
                          {order.review_title && <p><strong>{order.review_title}</strong></p>}
                          {order.review_description && <p>{order.review_description}</p>}
                        </>
                      ) : (
                        <>
                          <span className={styles.stars}>{renderStars(order)}</span>
                          <span>{order.points > 0 ? `You rated ${order.points}/5` : "Rate the product"}</span>
                          {reviewDraft && reviewDraft.orderitemId === order.orderitem_id && (
                            <div className={styles.reviewForm} onClick={(e) => e.stopPropagation()}>
                              <input
                                type="text"
                                placeholder="Title (optional)"
                                value={reviewDraft.title}
                                onChange={(e) => setReviewDraft({ ...reviewDraft, title: e.target.value })}
                                className={styles.reviewInput}
                              />
                              <textarea
                                placeholder="Share your experience..."
                                value={reviewDraft.description}
                                onChange={(e) => setReviewDraft({ ...reviewDraft, description: e.target.value })}
                                className={styles.reviewTextarea}
                                required
                              />
                              <div className={styles.reviewActions}>
                                <button
                                  className={styles.submitReviewBtn}
                                  onClick={handleReviewSubmit}
                                  disabled={submittingReview || !reviewDraft.description.trim()}
                                >
                                  {submittingReview ? "Submitting..." : "Submit Review"}
                                </button>
                                <button className={styles.cancelReviewBtn} onClick={() => setReviewDraft(null)}>Cancel</button>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

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
            <div className={styles.confirmationIcon}><img src={success} onError={onImgError(successFallback)} alt="success" className={styles.success}></img></div>
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

      {showExchangeConfirmation && selectedOrder && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalContent} ${styles.confirmationContent}`}>
            <h3>EXCHANGE CONFIRMED</h3>
            <div className={styles.confirmationIcon}><img src={success} onError={onImgError(successFallback)} alt="success" className={styles.success}></img></div>
            <p>Your replacement order has been placed for the new size.</p>
            <p>
              Please ship back the original item from order{" "}
              <span className={styles.orderId}>#ORD{selectedOrder.orderId}</span> to complete the exchange.
            </p>
            <p>You will receive the confirmation email shortly with full details.</p>
            <button
              className={styles.cancelBtnn}
              onClick={() => {
                setShowExchangeConfirmation(false);
                setLoading(true);
                loadOrders();
              }}
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