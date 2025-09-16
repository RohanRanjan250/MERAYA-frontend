import React, { useEffect, useState } from "react";
import CartItems from "../CartItems/CartItems";
import OrderSummary from "../OrderSummary/OrderSummary";
import styles from "./Cart.module.css";
import { fetchCart, changeCartQuantity, removeFromCart } from "../../API/cart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await fetchCart();
        console.log(data);
        setCart(data.items || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  const handleQuantityChange = async (id, change) => {
    const action = change === 1 ? "increment" : "decrement";

    // optimistic update in frontend
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );

    try {
      await changeCartQuantity(id, action);
    } catch (err) {
      console.error("Failed to update cart:", err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      setCart((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (loading) return <p>Loading cart...</p>;

  const price = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = price * 0.1; // 10% discount
  const shipping = 0;
  const total = price - discount + shipping;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleBuyNow = (slug) => {
    navigate(`/product/${slug}`); 
  };

  return (
    <>
      <div className={styles.heading}>
        <p className={styles.wishlist}>MY CART</p>
        <p>{totalItems} ITEMS</p>
      </div>
      <div className={styles.cartPage}>
        <div className={styles.cartItemsSection}>
          <CartItems
            items={cart}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
            onBuyNow={handleBuyNow} 
          />
        </div>
        <div className={styles.orderSummarySection}>
          <OrderSummary
            price={price}
            discount={discount}
            shipping={shipping}
            total={total}
          />
        </div>
      </div>
    </>
  );
};

export default Cart;
