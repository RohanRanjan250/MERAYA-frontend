import Checkout from "../components/Checkout/Checkout";
import Navbar from "../components/Navbar";
import DoubleLine from "../UI/DoubleLine";
import Footer from '../components/FooterSection/Footer'
import RelatedProducts from "../components/RelatedProduct/CartRelatedProduct";
import BreadCrumb from "../UI/BreadCrumb";

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <DoubleLine />
      <BreadCrumb items={[{ label: "Homepage", link: "/" }, { label: "Cart" }]} />
      <Checkout />
      <RelatedProducts heading="YOU MAY ALSO LIKE"/>
      <Footer />
    </>
  )
}
