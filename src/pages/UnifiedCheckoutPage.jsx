import Unified from "../components/UnifiedCheckout";
import Navbar from "../components/Navbar";
import DoubleLine from "../UI/DoubleLine";
import Footer from '../components/FooterSection/Footer'
import RelatedProducts from "../components/RelatedProduct/CartRelatedProduct";
import BreadCrumb from "../UI/BreadCrumb";

export default function CartPage() {
  return (
    <>
      <Navbar />
      <DoubleLine />
      <BreadCrumb items={[{ label: "Homepage", link: "/" }, { label: "Cart" }]} />
      <Unified />
      <RelatedProducts heading="YOU MAY ALSO LIKE"/>
      <Footer />
    </>
  )
}
