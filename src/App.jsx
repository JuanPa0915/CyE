import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import FeaturedTreatments from './components/FeaturedTreatments'
import Booking from './components/Booking'
import Location from './components/Location'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <div className="bg-cream font-sans">
      <Navbar />
      <Hero />
      <Services />
      <FeaturedTreatments />
      <Booking />
      <Location />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
