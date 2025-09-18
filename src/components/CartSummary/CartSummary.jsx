import React from "react";
import styles from "./CartSummary.module.css";

const CartSummary = () => {
  const items = [
    {
      id: 1,
      title: "SLEEVELESS KURTI",
      size: "S",
      quantity: 1,
      price: "₹149.99",
      delivery: "Estimated Delivery by 22nd September, 25",
      image: "https://via.placeholder.com/120x150.png?text=Product",
    },
    {
      id: 2,
      title: "SLEEVELESS KURTI",
      size: "S",
      quantity: 2,
      price: "₹149.99",
      delivery: "Estimated Delivery by 22nd September, 25",
      image: "https://via.placeholder.com/120x150.png?text=Product",
    },
  ];

  const address = {
    name: "Vinay Ahuja",
    line: "Flat 26, Orchid Garden Society, Bangalore",
    city: "Bangalore- 290292",
    state: "Karnataka",
    phone: "+91 90389 45678",
  };

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div key={item.id} className={styles.itemCard}>
          {/* Image */}
          <img src={item.image} alt={item.title} className={styles.image} />

          {/* Details */}
          <div className={styles.details}>
            <h3>{item.title}</h3>
            <p className={styles.price}>{item.price}</p>
            <p>
              SIZE <span className={styles.whiteLine}></span><span>{item.size}</span> &nbsp;&nbsp; 
              QUANTITY <span className={styles.whiteLine}></span><span>{String(item.quantity).padStart(2, "0")}</span>
            </p>
            <p className={styles.delivery}>{item.delivery}</p>
          </div>

          {/* Remove Button */}
          <button className={styles.removeBtn}>×</button>
        </div>
      ))}

      {/* Address */}
      <div className={styles.addressSection}>
        <h3>DELIVERING AT</h3>
        <p>
          {address.name} | {address.line}
          <br />
          {address.city}
          <br />
          {address.state}
        </p>
        <p>Mobile Number: {address.phone}</p>
      </div>
    </div>
  );
};

export default CartSummary;
