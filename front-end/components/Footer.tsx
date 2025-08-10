'use client';

import React from 'react';
import { Twitter } from 'lucide-react';
import SumnifansLogo from './SumniFans';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-8">
          {/* Nome */}
          <div>
            <span className="text-3xl font-black text-white">
              Somnifans
            </span>
          </div>

          {/* Bio */}
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Somnifans turns real fan sentiment into prediction tokens using the 
            power of Twitter and Somnia.
          </p>
          
          {/* Rede Social - Only Twitter */}
          <div className="flex justify-center">
            <a 
              href="#" 
              className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-brand-500 hover:text-white transition-all duration-300"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Direitos Reservados */}
            <div className="text-gray-400 text-sm">
              © 2025 Somnifans. All rights reserved.
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-brand-400 transition-colors">Cookie Policy</a>
            </div>
            
            {/* Powered by */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Powered by</span>
              <SumnifansLogo size="sm" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;