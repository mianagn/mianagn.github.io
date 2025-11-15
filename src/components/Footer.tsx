import * as React from 'react';
import { Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500" /> by {personalInfo.name}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;