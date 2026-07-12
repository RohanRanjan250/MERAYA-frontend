import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "../api/axios";
import styles from "./Product.module.css";
import { ArrowDownLeft } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { faStar, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { updateReviewReaction, toggleWishlist, addToCart } from "../../API/productmainpageAPI.jsx";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../Context/ToastContext.jsx"; // 1. Import the useToast hook
import RelatedProducts from "../RelatedProduct/RelatedProduct";
import { isLoggedIn } from "../../utils/authCookie";
import { optimizeImage } from "../../utils/cloudinaryImages";

const SIZE_CHART_SIZES = ["XS", "S", "M", "L", "XL"];
const SIZE_CHART_ROWS = [
  { label: "LENGTH", values: [51.6, 52, 52, 52.75, 53] },
  { label: "SHOULDER", values: [14, 14.5, 15, 15.5, 16] },
  { label: "CHEST", values: [32, 34, 36, 38, 40] },
  { label: "WAIST", values: [26, 28, 30, 32, 34] },
  { label: "HIP", values: [35, 37, 39, 41, 43] },
  { label: "SLEEVE LENGTH", values: [22.6, 23, 23, 23.75, 24.25] },
];

export default function Product({ product, setProduct }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(
    product.variants?.find((v) => v.stock > 0)?.size || product.variants?.[0]?.size || ""
  );
  const [openSections, setOpenSections] = useState({});
  const [showSizeChart, setShowSizeChart] = useState(false);
  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const { showToast } = useToast();
  const navigate = useNavigate();
  let isAuth = isLoggedIn();

  // Check if product has any stock
  const hasStock = product.variants && product.variants.length > 0;
  const selectedVariant = product.variants?.find((v) => v.size === selectedSize);
  const isSelectedSoldOut = hasStock && selectedVariant && selectedVariant.stock === 0;

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

      const variant = product.variants.find(v => v.size === selectedSize);

      if (!variant) {
        showToast("Please select a size.", "error");
        return;
      }

      const variantId = variant.id;
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

      const variant = product.variants.find(v => v.size === selectedSize);

      if (!variant) {
        showToast("Please select a size.", "error");
        return;
      }

      if (variant.stock === 0) {
        showToast("This size is sold out.", "error");
        return;
      }

      const variantId = variant.id;
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
            src={optimizeImage(selectedImage, 800)}
            alt={product.title}
            className={styles.mainImage}
          />
          <div className={styles.thumbnails}>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={optimizeImage(img, 150)}
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
                <a
                  href="#"
                  className={styles.sizeChart}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowSizeChart(true);
                  }}
                >
                  VIEW SIZE CHART
                </a>
              </div>
              <div className={styles.sizeOptions}>
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`${styles.sizeBtn} ${selectedSize === variant.size ? styles.activeSize : ""
                      } ${variant.stock === 0 ? styles.soldOutSize : ""}`}
                    onClick={() => setSelectedSize(variant.size)}
                  >
                    {variant.size}
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
              disabled={!hasStock || isSelectedSoldOut}
              style={{
                opacity: !hasStock || isSelectedSoldOut ? 0.6 : 1,
                cursor: !hasStock || isSelectedSoldOut ? 'not-allowed' : 'pointer',
                backgroundColor: !hasStock || isSelectedSoldOut ? '#666' : ''
              }}
            >
              {!hasStock ? (
                'OUT OF STOCK'
              ) : isSelectedSoldOut ? (
                'SOLD OUT'
              ) : (
                <>ADD TO CART<ArrowDownLeft className={styles.arrow} /></>
              )}
            </button>
          </div>
          <a href="#" className={styles.delivery}>
            DELIVERY T&C
          </a>

          <div className={styles.descriptionSection}>
            <button
              type="button"
              className={styles.descriptionToggle}
              onClick={() => toggleSection('description')}
              aria-expanded={!!openSections.description}
            >
              <h3 className={styles.descriptionHeading}>Product Description</h3>
              <span className={styles.descriptionChevron}>{openSections.description ? '−' : '+'}</span>
            </button>
            {openSections.description && (
              <p className={styles.description}>{product.description}</p>
            )}
          </div>
          {product.details && (
            <div className={styles.descriptionSection}>
              <button
                type="button"
                className={styles.descriptionToggle}
                onClick={() => toggleSection('details')}
                aria-expanded={!!openSections.details}
              >
                <h3 className={styles.descriptionHeading}>Details</h3>
                <span className={styles.descriptionChevron}>{openSections.details ? '−' : '+'}</span>
              </button>
              {openSections.details && (
                <ul className={styles.detailsList}>
                  {product.details.split("\n").map((line) => line.trim()).filter(Boolean).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {product.composition && (
            <div className={styles.descriptionSection}>
              <button
                type="button"
                className={styles.descriptionToggle}
                onClick={() => toggleSection('composition')}
                aria-expanded={!!openSections.composition}
              >
                <h3 className={styles.descriptionHeading}>Composition</h3>
                <span className={styles.descriptionChevron}>{openSections.composition ? '−' : '+'}</span>
              </button>
              {openSections.composition && (
                <p className={styles.description}>{product.composition}</p>
              )}
            </div>
          )}
          {product.care && (
            <div className={styles.descriptionSection}>
              <button
                type="button"
                className={styles.descriptionToggle}
                onClick={() => toggleSection('care')}
                aria-expanded={!!openSections.care}
              >
                <h3 className={styles.descriptionHeading}>Care</h3>
                <span className={styles.descriptionChevron}>{openSections.care ? '−' : '+'}</span>
              </button>
              {openSections.care && (
                <p className={styles.description}>{product.care}</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.backgroundText}>MERAYA</div>
      <RelatedProducts heading="RELATED PRODUCTS" collectionId={product.collection_id} />

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
                  <FontAwesomeIcon icon={faUserCircle} className={styles.avatar} />
                  <span className={styles.username}>{review.username}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showSizeChart && (
        <div className={styles.sizeChartOverlay} onClick={() => setShowSizeChart(false)}>
          <div className={styles.sizeChartModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.sizeChartHeader}>
              <h3>Size Chart (in inches)</h3>
              <button
                className={styles.sizeChartClose}
                onClick={() => setShowSizeChart(false)}
                aria-label="Close size chart"
              >
                &times;
              </button>
            </div>
            <table className={styles.sizeChartTable}>
              <thead>
                <tr>
                  <th>DESCRIPTION</th>
                  {SIZE_CHART_SIZES.map((size) => (
                    <th key={size}>{size}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART_ROWS.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    {row.values.map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

