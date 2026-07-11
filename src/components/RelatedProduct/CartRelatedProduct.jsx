import React, { useState, useEffect } from "react";
import ProductCard from "../../UI/SmallProductCard";
import styles from "./RelatedProduct.module.css";
import { fetchRelatedProductsCart } from "../../API/related";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/authCookie";

const CartRelatedProduct = ({ heading }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  let isAuth = isLoggedIn();

  useEffect(() => {
    async function getProducts() {
      try {
        const data = await fetchRelatedProductsCart();
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    }
    getProducts();
  }, []);

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

export default CartRelatedProduct;
