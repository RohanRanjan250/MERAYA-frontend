import Contact from "../components/Contact/Contact";
import Navbar from "../components/Navbar";
import DoubleLine from "../UI/DoubleLine";
import ProfileSidebar from "../components/ProfileSidebar/ProfileSidebar";
import { Routes, Route } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import BreadCrumb from "../UI/BreadCrumb";
import Footer from "../components/FooterSection/Footer";
import Address from "../components/Address/Address"
import OrderHistory from "../components/OrderHistory/OrderHistory";
import { useLocation } from "react-router-dom";
import SEO from "../components/SEO";


export default function ProfilePage() {
  const location = useLocation();

  const getCurrentLabel = () => {
    const path = location.pathname.split('/').pop(); // Gets 'contact', 'address', or 'order'
    switch (path) {
        case 'contact':
            return 'Contact Information';
        case 'address':
            return 'My Addresses';
        case 'order':
            return 'Order History';
        default:
            return 'My Account'; // Fallback
    }
  };

  const breadcrumbItems = [
      { label: "Homepage", link: "/" },
      { label: "My Account", link: "/myaccount/contact" }, // Link to a default tab
      { label: getCurrentLabel() } // The dynamic part
  ];

  return (
    <>
      <SEO title="My Account" description="Manage your Meraya account." noIndex />
      <Navbar />
      <DoubleLine />
      <BreadCrumb items={breadcrumbItems}/>
      <div className={styles.container}>
        <ProfileSidebar />
        <div className={styles.rightContent}>
          <Routes>
            <Route path="contact" element={<Contact />} />
            <Route path="address" element={<Address/>} />
            <Route path="order" element={<OrderHistory/>}/>
          </Routes>
        </div>
      </div>
      <Footer/>
    </>
  );
}
