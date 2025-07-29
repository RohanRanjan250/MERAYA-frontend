import './App.css'
import Navbar from './Navbar/Navbar';
import DoubleLine from './components/DoubleLine';
import FashionSplit from './FashionSplit/FashionSpilt';
import PartitionHeader from './components/PartitionHeader';
import ProductDisplay from './NewArrival/ProductDisplay';
import HeroGallery from './HeroGallery/HeroGallery';
import CollegeEditionSection from './CheckMore/CollegeEditionSection';
import AboutUs from './AboutUs/AboutUs';
import Upcoming from './Upcoming/Upcoming';

function App() {
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
    </>
  )
}

export default App
