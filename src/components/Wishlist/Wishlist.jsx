import React, { useState } from "react";
import styles from "./Wishlist.module.css";
import ProductCard from "../../UI/ProductCard"; // adjust path as per your folder

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Classic White T-Shirt",
      selling_price: 499,
      show_price: 799,
      discount_percent: 38,
      image: "https://via.placeholder.com/150?text=White+T-Shirt",
    },
    {
      id: 2,
      name: "Blue Denim Jeans",
      selling_price: 1299,
      show_price: 1799,
      discount_percent: 28,
      image: "https://via.placeholder.com/150?text=Denim+Jeans",
    },
    {
      id: 3,
      name: "Sports Running Shoes",
      selling_price: 1999,
      show_price: 2499,
      discount_percent: 20,
      image: "https://via.placeholder.com/150?text=Running+Shoes",
    },
  ]);

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  // Move item to cart (mock action for now)
  const moveToCart = (id) => {
    const item = wishlist.find((p) => p.id === id);
    console.log("Moved to Cart:", item); // replace with API call later
    removeFromWishlist(id);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className={styles.emptyText}>Your wishlist is empty.</p>
      ) : (
        <div className={styles.grid}>
          {wishlist.map((item) => (
            <ProductCard
              key={item.id}
              product={item}         // ✅ pass the whole product
              type="wishlist"        // ✅ let ProductCard know this is wishlist
              onAddToCart={() => moveToCart(item.id)}
              onRemove={() => removeFromWishlist(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
