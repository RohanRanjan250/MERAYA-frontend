import React from "react";
import Navbar from "../components/Navbar";
import Wallet from "../components/Wallet/Wallet";
import Footer from "../components/FooterSection/Footer";
import DoubleLine from "../UI/DoubleLine";

const WalletPage = () => {
    return (
        <>
            <Navbar />
            <DoubleLine />
            <Wallet />
            <Footer />
        </>
    );
};

export default WalletPage;
