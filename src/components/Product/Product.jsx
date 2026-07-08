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
import { updateReviewReaction, toggleWishlist, addToCart } from "../../API/productmainpageAPI.jsx";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../Context/ToastContext.jsx"; // 1. Import the useToast hook

export default function Product({ product, setProduct }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.variants?.[0]?.[1] || "");
  const { showToast } = useToast();
  const navigate = useNavigate();
  let isAuth = JSON.parse(localStorage.getItem("isAuthenticated"));

  // Check if product has any stock
  const hasStock = product.variants && product.variants.length > 0;

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

      setProduct(prev => ({
        ...prev,
        reviews: prev.reviews.map(r => {
          if (r.id !== reviewId) return r;
          let updated = { ...r };
          if (action === "like") {
            if (r.userReaction === "like") {
              updated.likes -= 1;
              updated.userReaction = null;
            } else {
              updated.likes += 1;
              if (r.userReaction === "dislike") updated.dislikes -= 1;
              updated.userReaction = "like";
            }
          } else if (action === "dislike") {
            if (r.userReaction === "dislike") {
              updated.dislikes -= 1;
              updated.userReaction = null;
            } else {
              updated.dislikes += 1;
              if (r.userReaction === "like") updated.likes -= 1;
              updated.userReaction = "dislike";
            }
          }
          return updated;
        })
      }));

      await updateReviewReaction(reviewId, action);
    } catch (error) {
      console.error("Failed to update reaction:", error);
      showToast("Failed to update reaction.", "error");
    }
  };

  const [inWishlist, setInWishlist] = useState(product.in_wishlist || false);

  const handleWishlist = async () => {
    try {
      if (!isAuth) {
        navigate("/login");
        return;
      }

      const selectedVariant = product.variants.find(variant => variant[1] === selectedSize);

      if (!selectedVariant) {
        showToast("Please select a size.", "error");
        return;
      }

      const variantId = selectedVariant[0];
      // The API call returns the new status and a message
      const response = await toggleWishlist(product.id, variantId);

      // Update state based on the successful response from the backend
      setInWishlist(response.in_wishlist);

      // Show the success message from the backend
      showToast(response.message, "success");

    } catch (error) {
      console.error("Failed to update wishlist:", error);
      // The catch block now only handles genuine errors
      showToast(error.message || "An error occurred while updating your wishlist.", "error");
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        showToast("Product URL copied to clipboard!", "success");
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
        showToast("Failed to copy URL.", "error");
      });
  };

  const handleAddToCart = async () => {
    try {
      if (!isAuth) {
        navigate("/login");
        return;
      }

      const selectedVariant = product.variants.find(variant => variant[1] === selectedSize);

      if (!selectedVariant) {
        showToast("Please select a size.", "error");
        return;
      }

      const variantId = selectedVariant[0];
      await addToCart(product.id, variantId);
      showToast('Added to cart successfully!', 'success');
    } catch (err) {
      console.error("Error adding to cart:", err);
      showToast(err?.error || 'Failed to add to cart', 'error');
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
                className={`${styles.thumb} ${selectedImage === img ? styles.active : ""
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

          <div className={styles.descriptionSection}>
            <h3 className={styles.descriptionHeading}>Product Description</h3>
            <p className={styles.description}>{product.description}</p>
          </div>
          {product.details && (
            <div className={styles.descriptionSection}>
              <h3 className={styles.descriptionHeading}>Details</h3>
              <ul className={styles.detailsList}>
                {product.details.split("\n").map((line) => line.trim()).filter(Boolean).map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          )}
          {product.composition && (
            <div className={styles.descriptionSection}>
              <h3 className={styles.descriptionHeading}>Composition</h3>
              <p className={styles.description}>{product.composition}</p>
            </div>
          )}
          {product.care && (
            <div className={styles.descriptionSection}>
              <h3 className={styles.descriptionHeading}>Care</h3>
              <p className={styles.description}>{product.care}</p>
            </div>
          )}

          <div className={styles.priceRow}>
            <div className={styles.price}>
              <span className={styles.oldPrice}><FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />{product.show_price}</span>
              <span className={styles.newPrice}><FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />{product.selling_price}</span>
            </div>
            <span className={styles.rating}><FontAwesomeIcon icon={faStar} /> {averageRating.toFixed(1)}</span>
          </div>

          {/* Size options - Only show if product has stock */}
          {hasStock && (
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
                {product.variants.map((variant) => (
                  <button
                    key={variant[0]}
                    className={`${styles.sizeBtn} ${selectedSize === variant[1] ? styles.activeSize : ""
                      }`}
                    onClick={() => setSelectedSize(variant[1])}
                  >
                    {variant[1]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className={styles.actions}>
            <button
              className={styles.cartBtn}
              onClick={handleAddToCart}
              disabled={!hasStock}
              style={{
                opacity: !hasStock ? 0.6 : 1,
                cursor: !hasStock ? 'not-allowed' : 'pointer',
                backgroundColor: !hasStock ? '#666' : ''
              }}
            >
              {hasStock ? (
                <>ADD TO CART<ArrowDownLeft className={styles.arrow} /></>
              ) : (
                'OUT OF STOCK'
              )}
            </button>
          </div>
          <a href="#" className={styles.delivery}>
            DELIVERY T&C
          </a>
        </div>
      </div>
      <div className={styles.backgroundText}>MERAYA</div>

      <div className={styles.reviewsSection}>
        <h2 className={styles.reviewsTitle}>REVIEWS</h2>

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
            <h3 className={styles.reviewTitle}>REVIEW LIST</h3>

            {reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewStars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={i < review.rating ? styles.starFilled : styles.starEmpty}
                    />
                  ))}
                </div>

                <p className={styles.reviewDesc}>{review.description}</p>
                <p className={styles.reviewDate}>
                  {review.created_at ? new Date(review.created_at).toLocaleString() : "No date"}
                </p>

                <div className={styles.userInfo}>
                  <img
                    src={`https://i.pravatar.cc/40?u=${review.username}`}
                    alt="user"
                    className={styles.avatar}
                  />
                  <span className={styles.username}>{review.username}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

