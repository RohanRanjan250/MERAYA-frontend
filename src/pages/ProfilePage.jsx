import Contact from "../components/Contact/Contact";
import Navbar from "../components/Navbar";
import DoubleLine from "../UI/DoubleLine";
import ProfileSidebar from "../components/ProfileSidebar/ProfileSidebar";
import { Routes, Route } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import BreadCrumb from "../UI/BreadCrumb";
import Footer from "../components/FooterSection/Footer";
import Address from "../components/Address/Address"


export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <DoubleLine />
      <BreadCrumb items={[{ label: "Homepage", link: "/" }, { label: "My Account" }]} />
      <div className={styles.container}>
        <ProfileSidebar />
        <div className={styles.rightContent}>
          <Routes>
            <Route path="contact" element={<Contact />} />
            <Route path="address" element={<Address/>} />
            {/* <Route path="order" element={}/> */}
          </Routes>
        </div>
      </div>
      <Footer/>
    </>
  );
}
