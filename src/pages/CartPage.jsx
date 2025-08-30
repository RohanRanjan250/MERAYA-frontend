import Cartt from "../components/Cartt/Cartt";
import Navbar from "../components/Navbar";
import DoubleLine from "../UI/DoubleLine";
import Footer from '../components/FooterSection/Footer'
import RelatedProducts from "../components/RelatedProduct/RelatedProduct";
// import Cart from "../components/Cart/Cart";

export default function CartPage() {
  return (
    <>
      <Navbar />
      <DoubleLine />
      <Cartt />
      <RelatedProducts heading="YOU MAY ALSO LIKE"/>
      <Footer />
    </>
  )
}
