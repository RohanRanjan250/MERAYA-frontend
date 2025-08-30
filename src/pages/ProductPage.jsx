import Product from "../components/Product/Product";
import Navbar from "../components/Navbar";
import DoubleLine from "../UI/DoubleLine";
import Footer from "../components/FooterSection/Footer";
import RelatedProducts from "../components/RelatedProduct/RelatedProduct";

export default function ProductPage() {
  return (
    <>
      <Navbar />
      <DoubleLine />
      <Product />
      <RelatedProducts heading="RELATED PRODUCTS" />
      <Footer />
    </>
  )
}
