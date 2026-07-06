import React, { useEffect, useState } from "react";
import styles from "./AllProducts.module.css";
import ProductCard from "../../UI/ProductCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToCart } from "../../API/productmainpageAPI";
import { useToast } from "../../Context/ToastContext";
import { openAPI } from "../../API/instance";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("category");
    const { showToast } = useToast();

    const loadAllProducts = async () => {
        try {
            const url = categoryId ? `/get_all_products?category=${categoryId}` : `/get_all_products`;
            const response = await openAPI.get(url);
            const data = response.data;
            console.log(data);
            setProducts(data.products || []);
        } catch (err) {
            console.error("Error fetching products:", err);
            showToast('Failed to load products', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllProducts();
    }, [categoryId]);

    const handleAddToCart = async (productId, variant) => {
        try {
            await addToCart(productId, variant);
            showToast('Added to cart successfully!', 'success');
        } catch (err) {
            console.error("Failed to add to cart:", err);
            showToast(err?.error || 'Failed to add to cart', 'error');
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
