import * as React from 'react';
import { useEffect } from 'react';
import AOS from 'aos';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out',
      once: true,
      offset: 50,
      delay: 0,
    });
  }, []);

  return (
    <div className="App">
      <Navigation />
      <main className="relative">
        {/* Unified background for all sections */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-red-50/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.1),transparent_50%)]"></div>
        
        <div className="relative z-10">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;