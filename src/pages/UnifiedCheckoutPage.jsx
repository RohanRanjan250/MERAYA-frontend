import Unified from "../components/UnifiedCheckout";
import Navbar from "../components/Navbar";
import DoubleLine from "../UI/DoubleLine";
import Footer from '../components/FooterSection/Footer'
import RelatedProducts from "../components/RelatedProduct/CartRelatedProduct";
import BreadCrumb from "../UI/BreadCrumb";
import SEO from "../components/SEO";

export default function UnifiedCheckoutPage() {
  return (
    <>
      <SEO title="Checkout" description="Complete your Meraya order securely." noIndex />
      <Navbar />
      <DoubleLine />
      <BreadCrumb items={[{ label: "Homepage", link: "/" }, { label: "Cart" }]} />
      <Unified />
      <RelatedProducts heading="YOU MAY ALSO LIKE"/>
      <Footer />
    </>
  )
}
