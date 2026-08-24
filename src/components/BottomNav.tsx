import React from 'react';
import { Compass, BookOpen, Layers, Bookmark, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
}) => {
  const items: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Compass className="w-5 h-5" /> },
    { id: 'quotes', label: 'Quotes', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'surahs', label: 'Surahs', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'categories', label: 'Topics', icon: <Layers className="w-5 h-5" /> },
    { id: 'saved', label: 'Saved', icon: <Bookmark className="w-5 h-5" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 dark:bg-[#071911]/95 backdrop-blur-lg border-t border-[#1B4332]/10 dark:border-[#D4AF37]/20 px-2 py-1.5 shadow-2xl safe-bottom">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all relative cursor-pointer ${
                isActive
                  ? 'text-[#1B4332] dark:text-[#D4AF37] font-bold bg-[#F5EFE6]/60 dark:bg-[#153828]/60'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.id === 'saved' && savedCount > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#D4AF37] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {savedCount > 99 ? '99+' : savedCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
