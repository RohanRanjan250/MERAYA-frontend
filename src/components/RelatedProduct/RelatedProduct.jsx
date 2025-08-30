// RelatedProducts.jsx
import React from "react";
import ProductCard from "../../UI/SmallProductCard";
import styles from "./RelatedProduct.module.css";

const RelatedProducts = ({heading}) => {
  const products = [
    {
      image: "https://via.placeholder.com/350x400",
      brand: "MERAYA's",
      title: "COLLEGE EDITION",
      price: 899,
      description: "Casual comfort wear, perfect for daily use."
    },
    {
      image: "https://via.placeholder.com/350x400",
      brand: "MERAYA's",
      title: "URBAN STYLE",
      price: 1099,
      description: "Trendy design for urban lifestyle."
    },
    {
      image: "https://via.placeholder.com/350x400",
      brand: "MERAYA's",
      title: "CLASSIC FIT",
      price: 999,
      description: "Classic fit with modern touch."
    },
    {
      image: "https://via.placeholder.com/350x400",
      brand: "MERAYA's",
      title: "SPORTS EDITION",
      price: 1299,
      description: "Best choice for sports & casual outings."
    },
    {
      image: "https://via.placeholder.com/350x400",
      brand: "MERAYA's",
      title: "SUMMER WEAR",
      price: 799,
      description: "Lightweight fabric for hot summer days."
    },
    {
      image: "https://via.placeholder.com/350x400",
      brand: "MERAYA's",
      title: "WINTER COLLECTION",
      price: 1499,
      description: "Warm, cozy, and stylish for winters."
    },
    {
      image: "https://via.placeholder.com/350x400",
      brand: "MERAYA's",
      title: "DENIM LOOK",
      price: 1199,
      description: "Stylish denim-inspired casual wear."
    },
    {
      image: "https://via.placeholder.com/350x400",
      brand: "MERAYA's",
      title: "PARTY VIBES",
      price: 1399,
      description: "Make a statement at every party."
    },
    {
      image: "https://via.placeholder.com/350x400",
      brand: "MERAYA's",
      title: "COLLEGE CLASSIC",
      price: 899,
      description: "Designed for everyday college wear."
    },
    {
      image: "https://via.placeholder.com/350x400",
      brand: "MERAYA's",
      title: "FORMAL TOUCH",
      price: 1599,
      description: "Perfect balance of style and elegance."
    },
    {
      image: "https://via.placeholder.com/350x400",
      brand: "MERAYA's",
      title: "ATHLEISURE",
      price: 1299,
      description: "Comfort and performance in one."
    },
    {
      image: "https://via.placeholder.com/350x400",
      brand: "MERAYA's",
      title: "CASUAL BASIC",
      price: 699,
      description: "Simple yet stylish everyday wear."
    }
  ];

  return (
    <div className={styles.relatedContainer}>
      <div className={styles.header}>
        <h2>{heading}</h2>
        <a href="/products" className={styles.viewAll}>VIEW ALL</a>
      </div>
      <div className={styles.productsRow}>
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
