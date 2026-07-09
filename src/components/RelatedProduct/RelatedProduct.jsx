import React, { useState, useEffect } from "react";
import ProductCard from "../../UI/SmallProductCard";
import styles from "./RelatedProduct.module.css";
import { fetchRelatedProducts, fetchRelatedProductsCart } from "../../API/related";
import { useNavigate } from "react-router-dom";

const RelatedProducts = ({ heading, collectionId, showAll = false }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      if (!showAll && !collectionId) return;
      try {
        const data = showAll
          ? await fetchRelatedProductsCart()
          : await fetchRelatedProducts(collectionId);
        setProducts(data || []); // Adjust based on your API response
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    }
    getProducts();
  }, [collectionId, showAll]);

  if (!products.length) return null;

  const handleBuyNow = (slug) => {
    navigate(`/product/${slug}`);
  };

  return (
    <div className={styles.relatedContainer}>
      <div className={styles.header}>
        <h2>{heading}</h2>
        <a href="/products" className={styles.viewAll}>
          VIEW ALL
        </a>
      </div>
      <div className={styles.productsRow}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onBuyNow={() => handleBuyNow(product.slug)}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
