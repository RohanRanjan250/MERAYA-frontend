import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "../api/axios";
import styles from "./Product.module.css";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    // Example mock product (remove later when backend is ready)
    const mockProduct = {
      id: 1,
      title: "Air Max 270 Sneakers",
      price: 120,
      discountPrice: 89,
      sold: 542,
      rating: 4.5,
      description:
        "Step into comfort and style with Nike Air Max 270 Sneakers. Featuring lightweight cushioning and a bold design, perfect for everyday wear.",
      images: [
        "https://via.placeholder.com/400x400.png?text=Main+Image",
        "https://via.placeholder.com/100x100.png?text=Side",
        "https://via.placeholder.com/100x100.png?text=Top",
        "https://via.placeholder.com/100x100.png?text=Back",
      ],
    //   colors: ["red", "blue", "black", "white"],
      sizes: ["S", "M", "L", "XL"],
    };

    setProduct(mockProduct);
    setSelectedImage(mockProduct.images[0]);
    // setSelectedColor(mockProduct.colors[0]);
    setSelectedSize(mockProduct.sizes[0]);
  }, [id]);

  if (!product) return <p className={styles.loading}>Loading...</p>;

  return (
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

      {/* Right Section - Details */}
      <div className={styles.right}>
        <h2 className={styles.title}>{product.title}</h2>

        <div className={styles.priceRow}>
          <span className={styles.oldPrice}>£{product.price}</span>
          <span className={styles.newPrice}>£{product.discountPrice}</span>
          <span className={styles.sold}>{product.sold} Sold</span>
          <span className={styles.rating}>⭐ {product.rating}</span>
        </div>

        <p className={styles.description}>{product.description}</p>

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
          <p>Size: {selectedSize}</p>
          <div className={styles.sizeOptions}>
            {product.sizes.map((size, index) => (
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
          <a href="#" className={styles.sizeChart}>
            View Size Chart
          </a>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.cartBtn}>Add To Cart</button>
          {/* <button className={styles.checkoutBtn}>Checkout Now</button> */}
        </div>
      </div>
    </div>
  );
}
