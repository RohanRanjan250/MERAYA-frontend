// src/pages/Cart/Cart.jsx
import React, { useState } from "react";
import ProductCard from "../../UI/ProductCard";
import styles from "./Cart.module.css";

const Cart = () => {
  // Example initial cart (later you’ll fetch this from API or context)
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Blue Kurti with Embroidery",
      selling_price: 1299,
      show_price: 1999,
      discount_percent: 35,
      qty: 1,
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "White Kurti",
      selling_price: 899,
      show_price: 1499,
      discount_percent: 40,
      qty: 2,
      image: "https://via.placeholder.com/150"
    }
  ]);

  // Handle quantity change
  const handleQtyChange = (id, change) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + change) }
          : item
      )
    );
  };

  // Handle remove
  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Total Calculation
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.selling_price * item.qty,
    0
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>My Cart</h2>

      <div className={styles.cartItems}>
        {cart.length > 0 ? (
          cart.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              type="cart"
              onQtyChange={handleQtyChange}
              onRemove={() => handleRemove(product.id)}
            />
          ))
        ) : (
          <p className={styles.empty}>Your cart is empty.</p>
        )}
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className={styles.summary}>
          <h3>Total: ₹{totalPrice}</h3>
          <button className={styles.checkoutBtn}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;

