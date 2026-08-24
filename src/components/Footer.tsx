import React from 'react';
import { ActiveTab } from '../types';
import { Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="w-full bg-white dark:bg-[#0A2016] border-t border-[#1B4332]/10 dark:border-[#D4AF37]/20 py-12 px-4 sm:px-6 lg:px-8 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-2xl bg-[#1B4332] dark:bg-[#0F2D1F] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-xs">
            <span className="font-arabic font-bold text-base leading-none pt-0.5">نور</span>
          </div>
          <span className="font-serif font-bold text-xl tracking-wider text-[#1B4332] dark:text-[#D4AF37]">
            NOOR AYAT
          </span>
        </div>

        {/* Peaceful Motto */}
        <p className="font-arabic text-[#1B4332] dark:text-[#D4AF37] text-xl mb-1">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 tracking-wide mb-6">
          “Reflect. Remember. Return to Allah.”
        </p>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-6 mb-8 text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300">
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-[#1B4332] dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => {
              setActiveTab('quotes');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-[#1B4332] dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            Quran Quotes
          </button>
          <button
            onClick={() => {
              setActiveTab('categories');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-[#1B4332] dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            Categories
          </button>
          <button
            onClick={() => {
              setActiveTab('surahs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-[#1B4332] dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            Surahs
          </button>
          <button
            onClick={() => {
              setActiveTab('saved');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-[#1B4332] dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            Saved Quotes
          </button>
          <button
            onClick={() => {
              setActiveTab('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-[#1B4332] dark:hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            About
          </button>
        </div>

        {/* Mandatory Educational Disclaimer */}
        <div className="max-w-2xl text-xs text-stone-600 dark:text-stone-300 leading-relaxed p-4 rounded-3xl bg-[#F5EFE6] dark:bg-[#153828]/60 border border-[#1B4332]/10 dark:border-[#D4AF37]/25 mb-6">
          Quran references are provided for educational and reflection purposes. Verify translations with a trusted Quran source.
        </div>

        <p className="text-xs text-stone-400 dark:text-stone-500 flex items-center justify-center gap-1">
          <span>Made for Islamic reflection & seeking knowledge</span>
          <Heart className="w-3 h-3 text-[#D4AF37] fill-current" />
        </p>
      </div>
    </footer>
  );
};
