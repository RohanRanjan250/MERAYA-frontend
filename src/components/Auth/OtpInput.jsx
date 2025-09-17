import React from "react";
import styles from "./OtpInput.module.css";

const OtpInput = ({ value, onChange }) => {
  const digits = value.split("");

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        name="otp"
        value={value}
        onChange={(e) => {
          const newVal = e.target.value.replace(/\D/g, "").slice(0, 6);
          onChange(newVal);
        }}
        className={styles.hiddenInput}
        required
      />

      <div
        className={styles.boxes}
        onClick={() =>
          document.querySelector(`.${styles.hiddenInput}`).focus()
        }
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.box}>
            {digits[i] || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtpInput;
