import React, { useState } from 'react';
import { Layers, ArrowRight, BookOpen, Search } from 'lucide-react';
import { CategoryType, Ayah } from '../types';
import { CATEGORIES_LIST, ALL_AYAT } from '../data';
import { AyahCard } from '../components/AyahCard';

interface CategoriesViewProps {
  onSelectCategory: (categoryName: CategoryType) => void;
  selectedCategory: CategoryType | null;
  onClearCategory: () => void;
  isSaved: (id: number) => boolean;
  onToggleSave: (ayah: Ayah) => void;
  onShare: (ayah: Ayah) => void;
  onDownload: (ayah: Ayah) => void;
  onSelectAyah: (ayah: Ayah) => void;
  showToast: (msg: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  onSelectCategory,
  selectedCategory,
  onClearCategory,
  isSaved,
  onToggleSave,
  onShare,
  onDownload,
  onSelectAyah,
  showToast,
}) => {
  const [search, setSearch] = useState('');

  const filteredCategories = CATEGORIES_LIST.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.arabic.includes(search)
  );

  // If a specific category is selected, display its verses
  if (selectedCategory) {
    const currentCategoryInfo = CATEGORIES_LIST.find((c) => c.name === selectedCategory);
    const categoryAyat = ALL_AYAT.filter((a) => a.category === selectedCategory);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <button
              onClick={onClearCategory}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline mb-2 cursor-pointer"
            >
              ← Back to All Categories
            </button>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-50">
                {selectedCategory}
              </h1>
              {currentCategoryInfo && (
                <span className="font-arabic text-xl sm:text-2xl text-emerald-700 dark:text-emerald-400">
                  {currentCategoryInfo.arabic}
                </span>
              )}
            </div>
            {currentCategoryInfo && (
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-xl">
                {currentCategoryInfo.description} • {categoryAyat.length} Quranic Verses
              </p>
            )}
          </div>
        </div>

        {categoryAyat.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categoryAyat.map((ayah) => (
              <AyahCard
                key={ayah.id}
                ayah={ayah}
                isSaved={isSaved(ayah.id)}
                onToggleSave={onToggleSave}
                onShare={onShare}
                onDownload={onDownload}
                onSelect={onSelectAyah}
                showToast={showToast}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8">
            <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <p className="text-sm text-stone-600 dark:text-stone-300">
              No verses found for this category yet.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EFE6] dark:bg-[#153828] text-[#1B4332] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30 mb-2">
            <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Thematic Quran Index</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#1B4332] dark:text-stone-50">
            Quranic Categories
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">
            Navigate through 20 curated themes covering trials, patience, hope, family, and prayer
          </p>
        </div>

        {/* Search within Categories */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#1B4332] dark:text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories…"
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#0D261B] border border-[#1B4332]/15 dark:border-[#D4AF37]/30 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-xs sm:text-sm outline-none focus:border-[#D4AF37] shadow-2xs"
          />
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {filteredCategories.map((cat) => {
          const count = ALL_AYAT.filter((a) => a.category === cat.name).length;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="group relative p-6 rounded-3xl bg-white dark:bg-[#0D261B] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-arabic text-2xl text-[#1B4332] dark:text-[#D4AF37] font-bold">
                    {cat.arabic}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F5EFE6] dark:bg-[#153828] text-[#1B4332] dark:text-[#D4AF37] border border-[#1B4332]/10 dark:border-[#D4AF37]/30">
                    {count} Ayat
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-[#1B4332] dark:text-stone-100 group-hover:text-[#D4AF37] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-bold text-[#1B4332] dark:text-[#D4AF37]">
                <span>Explore Ayat</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
