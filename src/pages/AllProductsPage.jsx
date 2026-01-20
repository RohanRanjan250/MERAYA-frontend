import React from "react";
import Navbar from "../components/Navbar";
import AllProducts from "../components/AllProducts/AllProducts";
import Footer from "../components/FooterSection/Footer";
import DoubleLine from '../UI/DoubleLine.jsx'

const AllProductsPage = () => {
    return (
        <>
            <Navbar />
            <DoubleLine />
            <AllProducts />
            <Footer />
        </>
    );
};

export default AllProductsPage;
