
import GauranteeTrustBadge from "@/components/GauranteeTrustBadge"
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import Navbar from "../components/Navbar"

import ProductGrid from "../components/ProductGrid"


const Home = () => {
  return (
    <>
      <Navbar/>
      <HeroSection/> 
      <GauranteeTrustBadge/>
      <ProductGrid/>
      
      
      <Footer/>
    </>
    
  )
}

export default Home