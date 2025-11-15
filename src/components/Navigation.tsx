import * as React from 'react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-sm shadow-lg' 
        : 'md:bg-transparent md:backdrop-blur-none md:shadow-none bg-white/90 backdrop-blur-sm shadow-lg'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection('hero')}
            className={`font-bold text-xl transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'md:text-white text-gray-900'
            }`}
          >
            mianagn
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-all duration-300 relative group ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-red-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-gray-900'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div
          className={`md:hidden fixed left-0 right-0 top-16 mx-auto z-40 transition-all duration-500 ease-in-out overflow-hidden
            ${isMenuOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto max-h-[20rem]' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none max-h-0'}
            bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl
            rounded-b-3xl flex flex-col gap-0.5 py-2 px-3`}
          style={{
            left: 0,
            right: 0,
            margin: '0 auto',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-center px-6 py-2.5 text-base font-medium transition-all duration-300
                text-gray-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-red-50
                rounded-xl hover:scale-[1.02] focus:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400/20
                relative group`}
              style={{transitionProperty: 'background, color, transform'}}
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-red-600 transition-all duration-300 group-hover:w-3/4"></span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;