import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "../api/axios";
import styles from "./Product.module.css";
import { ArrowDownLeft } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import {updateReviewReaction, toggleWishlist, addToCart} from "../../API/productmainpageAPI.jsx" ;
import { useNavigate } from "react-router-dom";

export default function Product({ product, setProduct }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.variants[0]);
  const navigate = useNavigate();
  const [toastVisible, setToastVisible] = useState(false);
  const [wishlistToast, setWishlistToast] = useState(false);
  let isAuth = JSON.parse(localStorage.getItem("isAuthenticated"));
  console.log(product);

  const reviews = product.reviews || [];
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

  const handleReaction = async (reviewId, action) => {
  try {
    if (!isAuth) {
      navigate("/login"); 
      return; 
    }

    // ✅ only update frontend if logged in
    setProduct(prev => ({
      ...prev,
      reviews: prev.reviews.map(r => {
        if (r.id !== reviewId) return r;

        let updated = { ...r };

        if (action === "like") {
          if (r.userReaction === "like") { // already liked, remove like
            updated.likes -= 1;
            updated.userReaction = null;
          } else { // add like
            updated.likes += 1;
            if (r.userReaction === "dislike") updated.dislikes -= 1; // remove dislike if any
            updated.userReaction = "like";
          }
        } else if (action === "dislike") {
          if (r.userReaction === "dislike") { // already disliked, remove dislike
            updated.dislikes -= 1;
            updated.userReaction = null;
          } else { // add dislike
            updated.dislikes += 1;
            if (r.userReaction === "like") updated.likes -= 1; // remove like if any
            updated.userReaction = "dislike";
          }
        }

        return updated;
      })
    }));

    // ✅ update backend only if authenticated
    await updateReviewReaction(reviewId, action);
    } catch (error) {
      console.error("Failed to update reaction:", error);
    }
  };


  const [inWishlist, setInWishlist] = useState(product.in_wishlist || false);

  const handleWishlist = async () => {
    try {
      if (!isAuth) {
        console.log("not logged in")
        navigate("/login");
        return ;
      } else {
        await toggleWishlist(product.id);
        setInWishlist((prev) => !prev);
        setWishlistToast(true);
        setTimeout(() => setWishlistToast(false), 2000); // hide after 2 seconds
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    console.log(url);
    navigator.clipboard.writeText(url)
      .then(() => {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2000); // hide after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  const handleAddToCart = async () => {
    try {
      if (!isAuth) {
        navigate("/login");
        return;
      }

      const res = await addToCart(product.id, selectedSize);
      console.log(res);
      alert("Product added to cart! ✅"); // later replace with toast
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  return (
    <div className={styles.product}>
      <div className={styles.container}>
        {/* Left Section - Images */}
        <div className={styles.left}>
          <img
            src={selectedImage}
            alt={product.title}
            className={styles.mainImage}
          />
          <div className={styles.thumbnails}>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className={`${styles.thumb} ${
                  selectedImage === img ? styles.active : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div className={styles.center}>
          <button className={styles.iconButton} onClick={handleShare}>
            <FontAwesomeIcon icon={faShareFromSquare} size="lg" />
          </button>
          <button className={styles.iconButton} onClick={handleWishlist}>
            <FontAwesomeIcon icon={farHeart} size="lg" />
          </button>
        </div>

        {/* Right Section - Details */}
        <div className={styles.right}>
          <p className={styles.brand}>MERAYA's</p>
          <p className={styles.title}>{product.name}</p>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.priceRow}>
              <div className={styles.price}>
                  <span className={styles.oldPrice}><FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />{product.show_price}</span>
                  <span className={styles.newPrice}><FontAwesomeIcon icon={faIndianRupeeSign} size="xs"/>{product.selling_price}</span>
              </div>
            {/* <span className={styles.sold}>{product.sold} Sold</span> */}
            <span className={styles.rating}><FontAwesomeIcon icon={faStar} /> {averageRating}</span>
          </div>


          {/* Color options */}
          {/* <div className={styles.colorSection}>
            <p>Color: {selectedColor}</p>
            <div className={styles.colorOptions}>
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className={`${styles.colorBtn} ${
                    selectedColor === color ? styles.activeColor : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div> */}

          {/* Size options */}
          <div className={styles.sizeSection}>
            <div className={styles.sizeHeader}>
              <div className={styles.sizeLabel}>
                  <p className={styles.Size}>Size: </p>
                  <span className={styles.whiteLine}></span>
                  <p className={styles.selectedSize}>{selectedSize}</p>
              </div>
              <a href="#" className={styles.sizeChart}>
                  VIEW SIZE CHART
              </a>
            </div>
            <div className={styles.sizeOptions}>
              {product.variants.map((size, index) => (
                <button
                  key={index}
                  className={`${styles.sizeBtn} ${
                    selectedSize === size ? styles.activeSize : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <button className={styles.cartBtn} onClick={handleAddToCart}>ADD TO CART<ArrowDownLeft className={styles.arrow}  /></button>
            {/* <button className={styles.checkoutBtn}>Checkout Now</button> */}
          </div>
          <a href="#" className={styles.delivery}>
              DELIVERY T&C
          </a>
        </div>
      </div>
      <div className={styles.backgroundText}>MERAYA</div>
      
      {toastVisible && (
        <div className={styles.toast}>
          Product URL copied to clipboard!
        </div>
      )}

      {wishlistToast && (
        <div className={styles.toast}>
          {inWishlist ? "Removed from wishlist" : "Added to wishlist"}!
        </div>
      )}

      <div className={styles.reviewsSection}>
        <p className={styles.title}>REVIEWS</p>

        <div className={styles.containerr}>
          {/* Left Side - Rating Summary */}
          <div className={styles.summary}>
            <div className={styles.ratingCircle}>
              <span className={styles.ratingNumber}>{averageRating.toFixed(1)}</span>
            </div>
            <div className={styles.s}>
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className={i < Math.round(averageRating) ? styles.starFilled : styles.starEmpty} />
                ))}
              </div>
              <p className={styles.reviewCount}>from {totalReviews.toLocaleString()} reviews</p>
            </div>
          </div>

          {/* Right Side - Review List */}
          <div className={styles.reviewList}>
            <h3 className={styles.listTitle}>REVIEW LIST</h3>

            {reviews.map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                <div className={styles.reviewStars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={i < review.rating ? styles.starFilled : styles.starEmpty}
                    />
                  ))}
                </div>

                {/* <h4 className={styles.reviewTitle}>{review.title}</h4> */}
                <p className={styles.reviewDesc}>{review.description}</p>
                <p className={styles.reviewDate}>
                  {review.created_at ? new Date(review.created_at).toLocaleString() : "No date"}
                </p>

                <div className={styles.reviewFooter}>
                  <div className={styles.userInfo}>
                    <img
                      src={`https://i.pravatar.cc/40?u=${review.username}`} // avatar placeholder based on username
                      alt="user"
                      className={styles.avatar}
                    />
                    <span className={styles.username}>{review.username}</span>
                  </div>

                  <div className={styles.actions}>
                    <button 
                      className={`${styles.actionBtn} ${review.userReaction === "like" ? styles.activeReaction : ""}`} 
                      onClick={() => handleReaction(review.id, "like")}
                    >
                      <FontAwesomeIcon icon={faThumbsUp} /> {review.likes}
                    </button>

                    <button 
                      className={`${styles.actionBtn} ${review.userReaction === "dislike" ? styles.activeReaction : ""}`} 
                      onClick={() => handleReaction(review.id, "dislike")}
                    >
                      <FontAwesomeIcon icon={faThumbsDown} /> 
                      {/* {review.dislikes} */}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
