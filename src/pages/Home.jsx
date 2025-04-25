
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import Navbar from "../components/Navbar"
import NewArrivalBanner from "../components/NewArrivalBanner"
import ProductGrid from "../components/ProductGrid"


const Home = () => {
  return (
    <>
      <Navbar/>
      <HeroSection/> 
      <ProductGrid/>
      <NewArrivalBanner/>
      
      <Footer/>
    </>
    
  )
}

export default Home