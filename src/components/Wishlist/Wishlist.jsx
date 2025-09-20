import React, { useEffect, useState } from "react";
import styles from "./Wishlist.module.css";
import ProductCard from "../../UI/ProductCard";
import { fetchWishlist, removeFromWishlist, addToCartWishlist } from "../../API/wishlist";
import { useNavigate } from "react-router-dom";
import success from "../../assets/sad.png"

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadWishlist = async () => {
    try {
      const data = await fetchWishlist();
      console.log(data)
      setProducts(data.items || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);
      setProducts((prev) => prev.filter((p) => p.product_id !== productId));
    } catch (err) {
      console.error("Failed to remove:", err);
    }
  };

  const handleAddToCart = async (productId, variant) => {
    try {
      // 1. Remove from wishlist
      await removeFromWishlist(productId);
      setProducts((prev) => prev.filter((p) => p.product_id !== productId));

      // 2. Add to cart
      console.log(variant)
      await addToCartWishlist(productId, variant);
      alert("Moved to cart!");
    } catch (err) {
      console.error("Failed to move item:", err);
    }
  };

  if (loading) return <p>Loading wishlist...</p>;

  const handleBuyNow = (slug) => {
    navigate(`/product/${slug}`);
  };

  if (!loading && products.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>EMPTY!</h2>
  
        <div className={styles.icon}>
          <img src={success} alt="success" className={styles.success}></img>
        </div>
  
        <p className={styles.thankyou}>
          Your wishlist looks empty :(
        </p>
  
        <div className={styles.buttons}>
          <button onClick={() => navigate("/unified")} className={styles.btn}>
            GO TO CART
          </button>
          <button onClick={() => navigate("/")} className={styles.btnn}>
            HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.heading}>
        <p className={styles.wishlist}>MY WISHLIST</p>
        <p>{products.length} ITEMS</p>
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          {products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.product_id}
              image={p.image[0] || "https://via.placeholder.com/371x400"}
              title={p.name}
              variant={p.variant}
              desc=""
              price={p.price}
              onRemove={handleRemove}
              onAddToCart={handleAddToCart}
              onBuyNow={() => handleBuyNow(p.slug)}
            />
          ))}
        </div>
      </div>
      <div className={styles.backgroundText}>MERAYA</div>
    </>
  );
};

export default Wishlist;
