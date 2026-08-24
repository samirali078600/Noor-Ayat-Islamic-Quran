import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Bookmark,
  Layers,
  Sparkles,
  LayoutGrid,
  List,
  Type,
  X,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import { Ayah, CategoryType } from '../types';
import { ALL_AYAT, CATEGORIES_LIST, SURAHS_LIST, searchAyat } from '../data';
import { AyahCard } from '../components/AyahCard';

interface QuotesViewProps {
  initialSearch?: string;
  initialCategory?: CategoryType | null;
  initialSurah?: number | null;
  onClearFilters?: () => void;
  isSaved: (id: number) => boolean;
  onToggleSave: (ayah: Ayah) => void;
  onShare: (ayah: Ayah) => void;
  onDownload: (ayah: Ayah) => void;
  onSelectAyah: (ayah: Ayah) => void;
  showToast: (msg: string) => void;
}

type MainFilter = 'All' | 'Latest' | 'Popular' | 'Saved';

const ITEMS_PER_PAGE = 18;

export const QuotesView: React.FC<QuotesViewProps> = ({
  initialSearch = '',
  initialCategory = null,
  initialSurah = null,
  isSaved,
  onToggleSave,
  onShare,
  onDownload,
  onSelectAyah,
  showToast,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [activeFilter, setActiveFilter] = useState<MainFilter>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedSurah, setSelectedSurah] = useState<number | 'All'>(initialSurah || 'All');
  const [viewMode, setViewMode] = useState<'card' | 'compact'>('card');
  const [fontSizeScale, setFontSizeScale] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Filtered dataset calculation
  const filteredAyat = useMemo(() => {
    let result = ALL_AYAT;

    // 1. Text Search
    if (searchTerm.trim()) {
      result = searchAyat(searchTerm, result);
    }

    // 2. Main Filter (All, Latest, Popular, Saved)
    if (activeFilter === 'Popular') {
      result = result.filter((a) => a.popular || a.featured);
    } else if (activeFilter === 'Latest') {
      result = [...result].reverse();
    } else if (activeFilter === 'Saved') {
      result = result.filter((a) => isSaved(a.id));
    }

    // 3. Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // 4. Surah Filter
    if (selectedSurah !== 'All') {
      result = result.filter((a) => a.surahNumber === selectedSurah);
    }

    return result;
  }, [searchTerm, activeFilter, selectedCategory, selectedSurah, isSaved]);

  const displayedAyat = filteredAyat.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAyat.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveFilter('All');
    setSelectedCategory('All');
    setSelectedSurah('All');
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    activeFilter !== 'All' ||
    selectedCategory !== 'All' ||
    selectedSurah !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EFE6] dark:bg-[#153828] text-[#1B4332] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Quran Quotes Explorer</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#1B4332] dark:text-stone-50">
            500+ Verified Quranic Verses
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">
            Search, filter by theme or Surah, and reflect in English & Hinglish
          </p>
        </div>

        {/* View Switcher & Text Size controls */}
        <div className="flex items-center gap-2 self-start md:self-end shrink-0">
          <div className="flex items-center p-1 bg-[#F5EFE6] dark:bg-[#0D261B] rounded-2xl border border-[#1B4332]/10 dark:border-[#D4AF37]/20">
            <button
              onClick={() => setViewMode('card')}
              title="Grid Card View"
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                viewMode === 'card'
                  ? 'bg-[#1B4332] text-white dark:bg-[#D4AF37] dark:text-[#0A2016] shadow-2xs font-bold'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              title="Compact List View"
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                viewMode === 'compact'
                  ? 'bg-[#1B4332] text-white dark:bg-[#D4AF37] dark:text-[#0A2016] shadow-2xs font-bold'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setFontSizeScale((prev) => (prev + 1) % 3)}
            title="Adjust Text Font Size"
            className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-[#0D261B] hover:bg-[#F5EFE6] dark:hover:bg-[#153828] rounded-2xl text-xs font-bold text-[#1B4332] dark:text-[#D4AF37] border border-[#1B4332]/15 dark:border-[#D4AF37]/30 transition-colors cursor-pointer"
          >
            <Type className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Size: {['Std', 'Large', 'XL'][fontSizeScale]}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0D261B] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 shadow-xs space-y-4">
        {/* Search input + Surah dropdown + Category dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Instant Search Bar */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#1B4332] dark:text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              placeholder="Search across English, Hinglish, Arabic, Surah (e.g. Baqarah, 2:286)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-[#F5EFE6]/60 dark:bg-[#0A2016] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-xs sm:text-sm outline-none focus:border-[#D4AF37]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3 relative">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              className="w-full appearance-none py-2.5 pl-3.5 pr-8 rounded-2xl bg-[#F5EFE6]/60 dark:bg-[#0A2016] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 text-stone-900 dark:text-stone-100 text-xs sm:text-sm outline-none font-medium cursor-pointer"
            >
              <option value="All">All Categories (20)</option>
              {CATEGORIES_LIST.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({ALL_AYAT.filter((a) => a.category === c.name).length})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Surah Selector */}
          <div className="md:col-span-3 relative">
            <select
              value={selectedSurah}
              onChange={(e) => {
                const val = e.target.value === 'All' ? 'All' : parseInt(e.target.value, 10);
                setSelectedSurah(val);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              className="w-full appearance-none py-2.5 pl-3.5 pr-8 rounded-2xl bg-[#F5EFE6]/60 dark:bg-[#0A2016] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 text-stone-900 dark:text-stone-100 text-xs sm:text-sm outline-none font-medium cursor-pointer"
            >
              <option value="All">All Surahs (114)</option>
              {SURAHS_LIST.map((s) => {
                const count = ALL_AYAT.filter((a) => a.surahNumber === s.number).length;
                return (
                  <option key={s.number} value={s.number}>
                    {s.number}. {s.name} {count > 0 ? `(${count})` : ''}
                  </option>
                );
              })}
            </select>
            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Filter Pills (All, Latest, Popular, Saved) */}
        <div className="flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {(['All', 'Popular', 'Latest', 'Saved'] as MainFilter[]).map((tab) => {
              const isSelected = activeFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveFilter(tab);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1B4332] dark:bg-[#D4AF37] text-white dark:text-[#0A2016] shadow-xs'
                      : 'bg-[#F5EFE6] dark:bg-[#153828] text-stone-700 dark:text-stone-300 hover:bg-[#1B4332]/10'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              Showing <strong className="text-[#1B4332] dark:text-[#D4AF37]">{displayedAyat.length}</strong> of {filteredAyat.length} verses
            </span>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid or List of Quotes */}
      {displayedAyat.length > 0 ? (
        <div
          className={
            viewMode === 'card'
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-5'
              : 'space-y-3'
          }
        >
          {displayedAyat.map((ayah) => (
            <AyahCard
              key={ayah.id}
              ayah={ayah}
              isSaved={isSaved(ayah.id)}
              onToggleSave={onToggleSave}
              onShare={onShare}
              onDownload={onDownload}
              onSelect={onSelectAyah}
              showToast={showToast}
              viewMode={viewMode}
              fontSizeScale={fontSizeScale}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">
            No Quran quotes found
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-6">
            We couldn't find any verses matching your current search or filter combination.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-md transition-all"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Load More Button for Large 500+ Dataset Performance */}
      {hasMore && (
        <div className="text-center pt-6">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3.5 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 font-semibold text-sm rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Load More Quotes ({filteredAyat.length - visibleCount} remaining)</span>
            <ChevronDown className="w-4 h-4 text-emerald-600" />
          </button>
        </div>
      )}
    </div>
  );
};
