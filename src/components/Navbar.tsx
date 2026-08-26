import React from 'react';
import {
  Search,
  Bookmark,
  Sun,
  Moon,
  Compass,
  Sparkles,
  BookOpen,
  Layers,
  Info,
  Dice5,
  Download,
} from 'lucide-react';
import { ActiveTab } from '../types';
import { APP_LOGO } from '../assets/logo';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedCount: number;
  onOpenSearch: () => void;
  onOpenInstall?: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSearch,
  onOpenInstall,
  theme,
  toggleTheme,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'quotes', label: 'Quran Quotes', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'surahs', label: 'Explore by Surah', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'categories', label: 'Categories', icon: <Layers className="w-4 h-4" /> },
    {
      id: 'saved',
      label: 'Saved',
      icon: <Bookmark className="w-4 h-4" />,
    },
    { id: 'random', label: 'Random', icon: <Dice5 className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDFBF7]/90 dark:bg-[#071911]/90 backdrop-blur-md border-b border-[#1B4332]/10 dark:border-[#D4AF37]/20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-2xl p-0.5 bg-gradient-to-tr from-[#D4AF37] via-[#F3E5AB] to-[#1B4332] shadow-md group-hover:scale-105 transition-transform overflow-hidden">
            <img
              src={APP_LOGO}
              alt="Noor Ayat App Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-[14px]"
            />
          </div>
          <div>
            <div className="font-serif font-bold text-xl tracking-wider text-[#1B4332] dark:text-[#D4AF37] flex items-center gap-1.5">
              <span>Noor Ayat</span>
            </div>
            <p className="text-[9px] uppercase tracking-widest text-[#1B4332]/70 dark:text-[#D4AF37]/80 font-medium italic">
              Reflect. Remember. Return.
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'text-[#1B4332] dark:text-[#D4AF37] bg-[#F5EFE6] dark:bg-[#153828] border border-[#D4AF37]/40 shadow-xs font-bold'
                    : 'text-stone-600 dark:text-stone-300 hover:text-[#1B4332] dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/60'
                }`}
              >
                {isActive && (
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full shrink-0" />
                )}
                <span>{item.label}</span>
                {item.id === 'saved' && savedCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#D4AF37] text-white shrink-0">
                    {savedCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Search Button + Install App + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-white dark:bg-[#0D261B] hover:bg-[#F5EFE6] dark:hover:bg-[#153828] text-stone-600 dark:text-stone-300 border border-[#1B4332]/15 dark:border-[#D4AF37]/30 text-xs font-medium transition-colors shadow-2xs cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#1B4332] dark:text-[#D4AF37]" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 bg-[#F5EFE6] dark:bg-[#081B12] rounded-md border border-[#1B4332]/10 dark:border-[#D4AF37]/20 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Install App Button */}
          {onOpenInstall && (
            <button
              onClick={onOpenInstall}
              title="Install App"
              className="flex items-center gap-1.5 bg-[#1B4332] dark:bg-[#D4AF37] hover:bg-[#143427] dark:hover:bg-[#c5a028] text-white dark:text-[#0A2016] px-3 sm:px-4 py-2 rounded-full text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Install App</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#0D261B] hover:bg-[#F5EFE6] dark:hover:bg-[#153828] text-stone-600 dark:text-stone-300 border border-[#1B4332]/15 dark:border-[#D4AF37]/30 transition-colors shadow-2xs cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#D4AF37]" />
            ) : (
              <Moon className="w-4 h-4 text-[#1B4332]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
