import React, { useEffect, useState } from "react";
import styles from "./AllProducts.module.css";
import ProductCard from "../../UI/ProductCard";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../API/productmainpageAPI";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadAllProducts = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/get_all_products");
            const data = await response.json();
            console.log(data);
            setProducts(data.products || []);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllProducts();
    }, []);

    const handleAddToCart = async (productId, variant) => {
        try {
            await addToCart(productId, variant);
            alert("Added to cart!");
        } catch (err) {
            console.error("Failed to add to cart:", err);
            alert(err?.error || "Failed to add to cart");
        }
    };

    const handleBuyNow = (slug) => {
        navigate(`/product/${slug}`);
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                Loading products...
            </div>
        );
    }

    if (!loading && products.length === 0) {
        return (
            <div className={styles.container}>
                <h2 className={styles.title}>NO PRODUCTS FOUND</h2>
                <p className={styles.thankyou}>
                    No products available at the moment.
                </p>
                <div className={styles.buttons}>
                    <button onClick={() => navigate("/")} className={styles.btnn}>
                        HOME
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={styles.heading}>
                <p className={styles.allProducts}>ALL PRODUCTS</p>
            </div>

            <div className={styles.container}>
                <div className={styles.grid}>
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            image={product.images?.[0] || "https://via.placeholder.com/371x400"}
                            title={product.name}
                            variant={null}
                            desc=""
                            price={product.selling_price}
                            stock={product.stock}
                            showRemove={false}
                            onRemove={() => { }}
                            onAddToCart={handleAddToCart}
                            onBuyNow={() => handleBuyNow(product.slug)}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.backgroundText}>MERAYA</div>
        </>
    );
};

export default AllProducts;
