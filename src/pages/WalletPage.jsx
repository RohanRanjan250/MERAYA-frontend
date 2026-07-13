import React from "react";
import Navbar from "../components/Navbar";
import Wallet from "../components/Wallet/Wallet";
import Footer from "../components/FooterSection/Footer";
import DoubleLine from "../UI/DoubleLine";
import SEO from "../components/SEO";

const WalletPage = () => {
    return (
        <>
            <SEO title="Wallet" description="Your Meraya wallet balance." noIndex />
            <Navbar />
            <DoubleLine />
            <Wallet />
            <Footer />
        </>
    );
};

export default WalletPage;
