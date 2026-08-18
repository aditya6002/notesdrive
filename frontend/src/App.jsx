import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import Features from './components/sections/Features.jsx'
import HowItWorks from './components/sections/HowItWorks.jsx'
import SubjectGrid from './components/sections/SubjectGrid.jsx'
import TrustSection from './components/sections/TrustSection.jsx'
import FinalCTA from './components/sections/FinalCTA.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <SubjectGrid />
        <TrustSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
