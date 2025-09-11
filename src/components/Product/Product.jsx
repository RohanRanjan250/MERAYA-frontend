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
import {buyProduct, updateReviewReaction} from "../../API/productmainpageAPI.jsx" ;

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        console.log(slug);
        const mockProduct = await buyProduct(slug);

        console.log(mockProduct) ;

        setProduct(mockProduct);
        setSelectedImage(mockProduct.images[0]);
        // setSelectedColor(mockProduct.colors[0]);
        setSelectedSize(mockProduct.variants[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [slug]);

  if (!product) return <p className={styles.loading}>Loading...</p>;

  const reviews = product.reviews || [];
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

  const handleReaction = async (reviewId, action) => {
    try {
      const updatedReview = await updateReviewReaction(reviewId, action);
      setProduct((prev) => ({
        ...prev,
        reviews: prev.reviews.map((r) =>
          r.id === updatedReview.id ? { ...r, ...updatedReview } : r
        ),
      }));
    } catch (error) {
      console.error("Failed to update reaction:", error);
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
          <button className={styles.iconButton}>
            <FontAwesomeIcon icon={faShareFromSquare} size="lg" />
          </button>
          <button className={styles.iconButton}>
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
            <button className={styles.cartBtn}>ADD TO CART<ArrowDownLeft className={styles.arrow}  /></button>
            {/* <button className={styles.checkoutBtn}>Checkout Now</button> */}
          </div>
          <a href="#" className={styles.delivery}>
              DELIVERY T&C
          </a>
        </div>
      </div>
      <div className={styles.backgroundText}>MERAYA</div>

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
                    <button className={styles.actionBtn} onClick={() => handleReaction(review.id, "like")}>
                      <FontAwesomeIcon icon={faThumbsUp} /> {review.likes}
                    </button>
                    <button className={styles.actionBtn} onClick={() => handleReaction(review.id, "dislike")}>
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
