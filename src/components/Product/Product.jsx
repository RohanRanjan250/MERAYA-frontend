import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "../api/axios";
import styles from "./Product.module.css";
import { ArrowDownLeft } from "lucide-react";

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

      <div className={styles.center}>

      </div>

      {/* Right Section - Details */}
      <div className={styles.right}>
        <p className={styles.brand}>MERAYA's</p>
        <p className={styles.title}>{product.title}</p>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.priceRow}>
            <div className={styles.price}>
                <span className={styles.oldPrice}>£{product.price}</span>
                <span className={styles.newPrice}>£{product.discountPrice}</span>
            </div>
          {/* <span className={styles.sold}>{product.sold} Sold</span> */}
          <span className={styles.rating}>⭐ {product.rating}</span>
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
                View Size Chart
            </a>
          </div>
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
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.cartBtn}>ADD TO CART<ArrowDownLeft className={styles.arrow}  /></button>
          {/* <button className={styles.checkoutBtn}>Checkout Now</button> */}
        </div>
      </div>
    </div>
  );
}
