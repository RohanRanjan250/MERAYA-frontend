import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OrderConfirmed.module.css";
import successFallback from "../../assets/Success.png"
import { SUCCESS_URL, onImgError } from "../../utils/cloudinaryImages";

const success = SUCCESS_URL;

export default function OrderConfirmed() {
  const navigate = useNavigate();
  const orderId = 128393; // You can pass this dynamically as props

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

      <p className={styles.thankyou}>Thank you for shopping with us!</p>

      <div className={styles.buttons}>
        <button onClick={() => navigate("/")} className={styles.btn}>
          HOME
        </button>
        <button onClick={() => navigate("/orders")} className={styles.btnn}>
          ORDERS
        </button>
      </div>
    </div>
  );
}
