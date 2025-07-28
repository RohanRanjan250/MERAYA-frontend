import './App.css'
import Navbar from './Navbar/Navbar';
import DoubleLine from './components/DoubleLine';
import FashionSplit from './FashionSplit/FashionSpilt';
import PartitionHeader from './components/PartitionHeader';
import ProductDisplay from './ProductDisplay/ProductDisplay';

function App() {
  return (
    <>
      <Navbar />
      <DoubleLine />
      <FashionSplit />
      <PartitionHeader leftText="XVI" rightText="NEW ARRIVAL" />
      <DoubleLine />
      <ProductDisplay />
    </>
  )
}

export default App
