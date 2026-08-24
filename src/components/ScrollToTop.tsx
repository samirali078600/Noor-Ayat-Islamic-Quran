import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      title="Scroll to Top"
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-30 p-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-xl shadow-emerald-700/25 transition-all hover:scale-110 active:scale-95 cursor-pointer"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
