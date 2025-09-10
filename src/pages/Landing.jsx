import  React,{useContext , useEffect} from 'react'
import Navbar from '../components/Navbar.jsx'
import DoubleLine from '../UI/DoubleLine.jsx'
import FashionSplit from '../components/FashionSplit/FashionSpilt'
import PartitionHeader from '../UI/PartitionHeader'
import ProductDisplay from '../components/NewArrival/ProductDisplay'
import HeroGallery from '../components/HeroGallery/HeroGallery'
import CollegeEditionSection from '../components/CheckMore/CollegeEditionSection'
import AboutUs from '../components/AboutUs/AboutUs'
import Upcoming from '../components/Upcoming/Upcoming'
import Footer from '../components/FooterSection/Footer'
import { LandingProvider } from '../Context/LandingpageContext.jsx'
import { LandingContext } from "../Context/LandingpageContext.jsx";

export default function Landing() {
  const { fetchLandingData } = useContext(LandingContext);
  useEffect(()=>{
    console.log("hi")
    fetchLandingData() ;
  },[])
  

  return (
    <>
        <Navbar />
        <DoubleLine />
        <FashionSplit />
        <PartitionHeader leftText="XVI" rightText="NEW ARRIVAL" />
        <DoubleLine />
        <ProductDisplay />
        <HeroGallery />
        <PartitionHeader leftText="XVII" rightText="CHECK MORE" />
        <DoubleLine />
        <CollegeEditionSection />
        <PartitionHeader leftText="XVIII" rightText="ABOUT US" />
        <DoubleLine />
        <AboutUs />
        <PartitionHeader leftText="XIX" rightText="UPCOMING" />
        <DoubleLine />
        <Upcoming />
        <Footer />
    </>
  )
}
