import Cart from "../components/Cart/Cart";
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
      <Cart />
      <RelatedProducts heading="YOU MAY ALSO LIKE"/>
      <Footer />
    </>
  )
}
