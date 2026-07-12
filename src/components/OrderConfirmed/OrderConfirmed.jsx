import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./OrderConfirmed.module.css";
import successFallback from "../../assets/Success.png"
import { SUCCESS_URL, onImgError, optimizeImage } from "../../utils/cloudinaryImages";

const success = SUCCESS_URL;

export default function OrderConfirmed() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, items, total } = location.state || {};

  // Reached directly (e.g. bookmark, back button after cart is cleared)
  // without any order to show — nothing real to display, so bounce home
  // instead of rendering a stale/fake confirmation.
  useEffect(() => {
    if (!orderId) {
      navigate("/", { replace: true });
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ORDER CONFIRMED</h2>

      <div className={styles.icon}>
        <img src={success} onError={onImgError(successFallback)} alt="success" className={styles.success}></img>
      </div>

      <p className={styles.text}>
        You Order no. is <span className={styles.orderId}>#{orderId}</span>
      </p>
      <p className={styles.text}>
        You will receive the confirmation email shortly
      </p>

      {items && items.length > 0 && (
        <div style={{ width: '100%', maxWidth: 500, margin: '1.5rem auto', textAlign: 'left' }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '0.75rem 0', borderBottom: '1px solid #444',
              }}
            >
              <img
                src={optimizeImage(item.image?.[0], 120)}
                alt={item.name}
                style={{ width: 56, height: 72, objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div>{item.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#aaa' }}>
                  Size {item.variant} &nbsp;×&nbsp; Qty {item.quantity}
                </div>
              </div>
              <div>₹{(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          {total !== undefined && (
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', fontWeight: 'bold' }}>
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          )}
        </div>
      )}

      <p className={styles.thankyou}>Thank you for shopping with us!</p>

      <div className={styles.buttons}>
        <button onClick={() => navigate("/")} className={styles.btn}>
          HOME
        </button>
        <button onClick={() => navigate("/myaccount/order")} className={styles.btnn}>
          ORDERS
        </button>
      </div>
    </div>
  );
}
