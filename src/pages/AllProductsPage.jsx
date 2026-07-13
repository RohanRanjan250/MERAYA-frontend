import React from "react";
import Navbar from "../components/Navbar";
import AllProducts from "../components/AllProducts/AllProducts";
import Footer from "../components/FooterSection/Footer";
import DoubleLine from '../UI/DoubleLine.jsx'
import SEO from '../components/SEO'

const AllProductsPage = () => {
    return (
        <>
            {/* path is pinned to the bare /products URL so filter query strings
                (?category=, ?collection=, etc.) don't get indexed as separate
                duplicate pages */}
            <SEO title="Shop All Products" description="Browse the full Meraya collection." path="/products" />
            <Navbar />
            <DoubleLine />
            <AllProducts />
            <Footer />
        </>
    );
};

export default AllProductsPage;
