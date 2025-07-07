import React, { useEffect, useRef } from 'react';
import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const Hero: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    // @ts-ignore
    const CLOUDS = window.VANTA && window.VANTA.CLOUDS;
    // @ts-ignore
    const THREE = window.THREE;
    if (!vantaEffect.current && vantaRef.current && CLOUDS && THREE) {
      vantaEffect.current = CLOUDS({
        el: vantaRef.current,
        THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        skyColor:0x68b8d7,
        cloudColor: 0xadc1de,
        cloudShadowColor: 0x122a46,
        sunColor: 0xed2323,
        sunGlareColor: 0xf00000,
        sunlightColor: 0xe10b0b,
        cameraDistance: 0.8,
        cameraHeight: 0.0,
        zoom: 1.2,
        cloudCount: 40,
      });
    }
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={vantaRef} className="min-h-screen w-full relative overflow-hidden">
      {/* Transparent black overlay to mute clouds */}
      <div className="absolute inset-0 bg-black/30 z-1 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-6 py-16 min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                Michael Anagnostou
              </h1>
              {/* Animated aka mianagn */}
              <div className="relative mb-6">
                <span className="gradient-text text-white text-3xl md:text-4xl font-light relative inline-block">
                  aka mianagn
                </span>
              </div>
            </div>
            <div className="text-xl md:text-2xl text-white mb-6 font-light">  
              {personalInfo.title}
            </div>
            <p className="text-lg text-white mb-8 max-w-2xl mx-auto leading-relaxed">
              {personalInfo.tagline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mb-12 justify-center">
            <button
              onClick={scrollToProjects}
              className=" bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              View My Work
            </button>
            <a
              onClick={scrollToContact}
              className="border-2 border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/10 flex items-center justify-center"
            >
              Get In Touch
            </a>
          </div>

          <div className="flex gap-6 justify-center">
            <a
              href={personalInfo.social.github}
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={personalInfo.social.linkedin}
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <button
          onClick={scrollToProjects}
          className="text-white/60 hover:text-white transition-colors duration-300"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;