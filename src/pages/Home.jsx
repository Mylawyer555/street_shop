import AllProducts from "../components/AllProducts"
import BestSelling from "../components/BestSelling"
import Category from "../components/Category"
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import Navbar from "../components/Navbar"
import NewArrivalBanner from "../components/NewArrivalBanner"
import TodaysSales from "../components/TodaysSales"


const Home = () => {
  return (
    <>
        <Navbar/>
        <HeroSection/>
        {/* <TodaysSales/> */}
       
        <Category/>
        <AllProducts/>
        <NewArrivalBanner/>
         <BestSelling/>
        <Footer/>
    </>
    
  )
}

export default Home