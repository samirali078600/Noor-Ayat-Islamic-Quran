import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dice5, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { Ayah, CategoryType } from '../types';
import { getRandomAyah, ALL_AYAT, CATEGORIES_LIST } from '../data';
import { AyahCard } from '../components/AyahCard';

interface RandomViewProps {
  isSaved: (id: number) => boolean;
  onToggleSave: (ayah: Ayah) => void;
  onShare: (ayah: Ayah) => void;
  onDownload: (ayah: Ayah) => void;
  onSelectAyah: (ayah: Ayah) => void;
  showToast: (msg: string) => void;
}

export const RandomView: React.FC<RandomViewProps> = ({
  isSaved,
  onToggleSave,
  onShare,
  onDownload,
  onSelectAyah,
  showToast,
}) => {
  const [currentAyah, setCurrentAyah] = useState<Ayah>(() => getRandomAyah());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isSpinning, setIsSpinning] = useState(false);

  const handleGetRandom = () => {
    setIsSpinning(true);
    let pool = ALL_AYAT;
    if (selectedCategory !== 'All') {
      pool = ALL_AYAT.filter((a) => a.category === selectedCategory);
    }
    const filteredPool = pool.filter((a) => a.id !== currentAyah.id);
    const chosen =
      filteredPool.length > 0
        ? filteredPool[Math.floor(Math.random() * filteredPool.length)]
        : pool[0] || ALL_AYAT[0];

    setTimeout(() => {
      setCurrentAyah(chosen);
      setIsSpinning(false);
      showToast('New Ayah loaded for reflection ✨');
    }, 200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 text-center">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EFE6] dark:bg-[#153828] text-[#1B4332] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Spiritual Serenity</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#1B4332] dark:text-stone-50">
          Random Quranic Reflection
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 mt-1 max-w-lg mx-auto">
          Need guidance or peace right now? Receive an unexpected verse from the Noble Quran.
        </p>
      </div>

      {/* Category selector for targeted random reflection */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white dark:bg-[#0D261B] border border-[#1B4332]/15 dark:border-[#D4AF37]/30 py-2 px-3.5 rounded-2xl shadow-2xs">
          <Layers className="w-4 h-4 text-[#1B4332] dark:text-[#D4AF37]" />
          <span className="text-xs font-medium text-stone-500">Theme:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-transparent text-xs font-bold text-stone-800 dark:text-stone-200 outline-none cursor-pointer"
          >
            <option value="All">All Themes (Any Topic)</option>
            {CATEGORIES_LIST.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGetRandom}
          disabled={isSpinning}
          className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#1B4332] dark:bg-[#D4AF37] hover:bg-[#133326] dark:hover:bg-[#c5a028] active:scale-95 text-white dark:text-[#0A2016] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>Give Me Another Ayah</span>
        </button>
      </div>

      {/* Active Ayah Card with entry animation */}
      <div className="text-left max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAyah.id}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <AyahCard
              ayah={currentAyah}
              isSaved={isSaved(currentAyah.id)}
              onToggleSave={onToggleSave}
              onShare={onShare}
              onDownload={onDownload}
              onSelect={onSelectAyah}
              showToast={showToast}
              fontSizeScale={1}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="text-xs text-stone-400 dark:text-stone-500 pt-4">
        “Verily, in the remembrance of Allah do hearts find rest.” — Surah Ar-Ra'd (13:28)
      </p>
    </div>
  );
};
