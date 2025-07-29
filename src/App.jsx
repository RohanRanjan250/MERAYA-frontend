import './App.css'
import Navbar from './Navbar/Navbar';
import DoubleLine from './components/DoubleLine';
import FashionSplit from './FashionSplit/FashionSpilt';
import PartitionHeader from './components/PartitionHeader';
import ProductDisplay from './ProductDisplay/ProductDisplay';
import HeroGallery from './HeroGallery/HeroGallery';
import CollegeEditionSection from './CollegeEdition/CollegeEditionSection';

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
    </>
  )
}

export default App
