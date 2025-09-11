// RelatedProducts.jsx
import React,{useState, useEffect} from "react";
import ProductCard from "../../UI/SmallProductCard";
import styles from "./RelatedProduct.module.css";
import {fetchRelatedProducts} from "../../API/related"

const RelatedProducts = ({ heading, collectionId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      if (!collectionId) return;
      const data = await fetchRelatedProducts(collectionId);
      setProducts(data);
    }
    getProducts();
  }, [collectionId]);

  if (!products.length) return null;

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
