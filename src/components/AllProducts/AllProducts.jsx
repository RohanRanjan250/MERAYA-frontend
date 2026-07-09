import React, { useEffect, useState } from "react";
import styles from "./AllProducts.module.css";
import ProductCard from "../../UI/ProductCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToCart } from "../../API/productmainpageAPI";
import { useToast } from "../../Context/ToastContext";
import { openAPI } from "../../API/instance";

const SORT_OPTIONS = [
    { value: "", label: "Default" },
    { value: "newest", label: "Newest" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "name", label: "Name" },
];

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get("category") || "";
    const collectionId = searchParams.get("collection") || "";
    const minPrice = searchParams.get("min_price") || "";
    const maxPrice = searchParams.get("max_price") || "";
    const sort = searchParams.get("sort") || "";
    const { showToast } = useToast();

    const [filtersOpen, setFiltersOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [collections, setCollections] = useState([]);
    const [draftFilters, setDraftFilters] = useState({
        category: categoryId,
        collection: collectionId,
        minPrice,
        maxPrice,
        sort,
    });

    useEffect(() => {
        const loadFilterOptions = async () => {
            try {
                const [categoriesRes, collectionsRes] = await Promise.all([
                    openAPI.get("/categories/"),
                    openAPI.get("/collections/"),
                ]);
                setCategories(categoriesRes.data.categories || []);
                setCollections(collectionsRes.data.collections || []);
            } catch (err) {
                console.error("Error fetching filter options:", err);
            }
        };
        loadFilterOptions();
    }, []);

    const loadAllProducts = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (categoryId) params.set("category", categoryId);
            if (collectionId) params.set("collection", collectionId);
            if (minPrice) params.set("min_price", minPrice);
            if (maxPrice) params.set("max_price", maxPrice);
            if (sort) params.set("sort", sort);
            const query = params.toString();
            const url = query ? `/get_all_products?${query}` : `/get_all_products`;
            const response = await openAPI.get(url);
            const data = response.data;
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
        setDraftFilters({ category: categoryId, collection: collectionId, minPrice, maxPrice, sort });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, collectionId, minPrice, maxPrice, sort]);

    const applyFilters = () => {
        const next = new URLSearchParams();
        if (draftFilters.category) next.set("category", draftFilters.category);
        if (draftFilters.collection) next.set("collection", draftFilters.collection);
        if (draftFilters.minPrice) next.set("min_price", draftFilters.minPrice);
        if (draftFilters.maxPrice) next.set("max_price", draftFilters.maxPrice);
        if (draftFilters.sort) next.set("sort", draftFilters.sort);
        setSearchParams(next);
        setFiltersOpen(false);
    };

    const clearFilters = () => {
        setDraftFilters({ category: "", collection: "", minPrice: "", maxPrice: "", sort: "" });
        setSearchParams({});
        setFiltersOpen(false);
    };

    const activeFilterCount = [categoryId, collectionId, minPrice, maxPrice, sort].filter(Boolean).length;

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

    return (
        <>
            <div className={styles.heading}>
                <p className={styles.allProducts}>ALL PRODUCTS</p>
                <button
                    type="button"
                    className={styles.filterToggleBtn}
                    onClick={() => setFiltersOpen((prev) => !prev)}
                >
                    FILTER{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
                </button>
            </div>

            {filtersOpen && (
                <div className={styles.filterPanel}>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Category</label>
                        <select
                            className={styles.filterSelect}
                            value={draftFilters.category}
                            onChange={(e) => setDraftFilters({ ...draftFilters, category: e.target.value })}
                        >
                            <option value="">All Categories</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Collection</label>
                        <select
                            className={styles.filterSelect}
                            value={draftFilters.collection}
                            onChange={(e) => setDraftFilters({ ...draftFilters, collection: e.target.value })}
                        >
                            <option value="">All Collections</option>
                            {collections.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Price Range</label>
                        <div className={styles.priceInputs}>
                            <input
                                type="number"
                                min="0"
                                placeholder="Min"
                                className={styles.filterInput}
                                value={draftFilters.minPrice}
                                onChange={(e) => setDraftFilters({ ...draftFilters, minPrice: e.target.value })}
                            />
                            <input
                                type="number"
                                min="0"
                                placeholder="Max"
                                className={styles.filterInput}
                                value={draftFilters.maxPrice}
                                onChange={(e) => setDraftFilters({ ...draftFilters, maxPrice: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Sort By</label>
                        <select
                            className={styles.filterSelect}
                            value={draftFilters.sort}
                            onChange={(e) => setDraftFilters({ ...draftFilters, sort: e.target.value })}
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterActions}>
                        <button type="button" className={styles.clearBtn} onClick={clearFilters}>
                            CLEAR
                        </button>
                        <button type="button" className={styles.applyBtn} onClick={applyFilters}>
                            APPLY
                        </button>
                    </div>
                </div>
            )}

            {products.length === 0 ? (
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
            ) : (
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
            )}
            <div className={styles.backgroundText}>MERAYA</div>
        </>
    );
};

export default AllProducts;
