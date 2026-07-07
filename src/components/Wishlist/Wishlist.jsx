import React, { useEffect, useState } from "react";
import styles from "./Wishlist.module.css";
import ProductCard from "../../UI/ProductCard";
import { fetchWishlist, removeFromWishlist, addToCartWishlist } from "../../API/wishlist";
import { useNavigate } from "react-router-dom";
import successFallback from "../../assets/sad.png";
import { useToast } from "../../Context/ToastContext";
import { addToCart } from "../../API/productmainpageAPI";
import { SAD_URL, onImgError } from "../../utils/cloudinaryImages";

const success = SAD_URL;

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();
  let isAuth = JSON.parse(localStorage.getItem("isAuthenticated"));

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const loadWishlist = async () => {
    try {
      const data = await fetchWishlist();
      console.log(data)
      setProducts(data.items || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      showToast('Failed to load wishlist', 'error'); // Corrected message for fetching
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      if (!isAuth) {
        navigate("/login");
        return;
      }
      await removeFromWishlist(productId);
      setProducts((prev) => prev.filter((p) => p.product_id !== productId));
      showToast('Item removed from wishlist!', 'success');
    } catch (err) {
      console.error("Failed to remove:", err);
      showToast(err?.error || 'Failed to remove from wishlist', 'error');
    }
  };

  const handleAddToCart = async (productId, variant) => {
    try {
      if (!isAuth) {
        navigate("/login");
        return;
      }
      // 1. Remove from wishlist
      await removeFromWishlist(productId);
      setProducts((prev) => prev.filter((p) => p.product_id !== productId));

      // 2. Add to cart
      console.log(variant)
      // Assuming variant has an 'id' property for variantId
      await addToCart(productId, variant.id); // Using addToCart from cart API
      showToast('Added to cart successfully!', 'success');
      // The original alert("Moved to cart!"); is replaced by showToast
    } catch (err) {
      console.error("Failed to move item:", err);
      showToast(err?.error || 'Failed to add to cart', 'error');
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
          <img src={success} onError={onImgError(successFallback)} alt="success" className={styles.success}></img>
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
              showRemove={true}
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
