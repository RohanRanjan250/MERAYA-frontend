import Wishlist from "../components/Wishlist/Wishlist";
import Navbar from "../components/Navbar";
import DoubleLine from "../UI/DoubleLine";
import Footer from '../components/FooterSection/Footer'
import BreadCrumb from "../UI/BreadCrumb";

export default function WishlistPage() {
  return (
    <>
      <Navbar />
      <DoubleLine />
      <BreadCrumb items={[{ label: "Homepage", link: "/" }, { label: "Wishlist" }]} />
      <Wishlist />
      <Footer />
    </>
  )
}
