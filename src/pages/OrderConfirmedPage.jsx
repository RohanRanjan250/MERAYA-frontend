import OrderConfirmed from "../components/OrderConfirmed/OrderConfirmed";
import Navbar from "../components/Navbar";
import DoubleLine from "../UI/DoubleLine";
import Footer from '../components/FooterSection/Footer'
import BreadCrumb from "../UI/BreadCrumb";
import SEO from "../components/SEO";

export default function OrderConfirmedPage() {
  return (
    <>
      <SEO title="Order Confirmed" description="Your Meraya order confirmation." noIndex />
      <Navbar />
      <DoubleLine />
      <BreadCrumb items={[{ label: "Homepage", link: "/" }, { label: "Cart" }]} />
      <OrderConfirmed />
      <Footer />
    </>
  )
}
