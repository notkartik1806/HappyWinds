import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Process from './components/Process';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Packages from './components/Packages';
import Testimonials from './components/Testimonials';
import FAQs from './components/FAQs';
import Resources from './components/Resources';
import Contact from './components/Contact';
import Footer from './components/Footer';
import InteractiveParticles from './components/InteractiveParticles';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div className="app">
      <CustomCursor />
      <InteractiveParticles />
      <Navbar />
      <Hero />
      <About />
      <Process />
      <Portfolio />
      <Services />
      <Packages />
      <Testimonials />
      <FAQs />
      <Resources />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
