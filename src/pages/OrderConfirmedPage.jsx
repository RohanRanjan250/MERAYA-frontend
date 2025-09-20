import OrderConfirmed from "../components/OrderConfirmed/OrderConfirmed";
import Navbar from "../components/Navbar";
import DoubleLine from "../UI/DoubleLine";
import Footer from '../components/FooterSection/Footer'
import BreadCrumb from "../UI/BreadCrumb";

export default function OrderConfirmedPage() {
  return (
    <>
      <Navbar />
      <DoubleLine />
      <BreadCrumb items={[{ label: "Homepage", link: "/" }, { label: "Cart" }]} />
      <OrderConfirmed />
      <Footer />
    </>
  )
}
