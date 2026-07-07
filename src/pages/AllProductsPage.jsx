import React from "react";
import Navbar from "../components/Navbar";
import AllProducts from "../components/AllProducts/AllProducts";
import Footer from "../components/FooterSection/Footer";
import DoubleLine from '../UI/DoubleLine.jsx'
import SEO from '../components/SEO'

const AllProductsPage = () => {
    return (
        <>
            <SEO title="Shop All Products" description="Browse the full Meraya collection." />
            <Navbar />
            <DoubleLine />
            <AllProducts />
            <Footer />
        </>
    );
};

export default AllProductsPage;
