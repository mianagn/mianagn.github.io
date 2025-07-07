import * as React from 'react';
import { Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="text-center">
        <p className="text-gray-400 flex items-center justify-center gap-2 text-sm">
          Made with <Heart className="w-4 h-4 text-red-500" /> by {personalInfo.name}
        </p>
      </div>
    </footer>
  );
};

export default Footer;