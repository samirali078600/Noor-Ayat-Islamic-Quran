import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Filter,
  Layers,
  Star,
  Check,
} from 'lucide-react';
import { SURAHS_LIST, ALL_AYAT, getSurahAyat } from '../data';
import { Ayah } from '../types';
import { AyahCard } from '../components/AyahCard';

interface SurahsViewProps {
  selectedSurahNumber: number | null;
  onSelectSurah: (surahNumber: number) => void;
  onClearSurah: () => void;
  isSaved: (id: number) => boolean;
  onToggleSave: (ayah: Ayah) => void;
  onShare: (ayah: Ayah) => void;
  onDownload: (ayah: Ayah) => void;
  onSelectAyah: (ayah: Ayah) => void;
  showToast: (msg: string) => void;
}

const POPULAR_SURAH_NUMBERS = [1, 2, 3, 4, 12, 14, 17, 18, 19, 20, 36, 55, 56, 67, 93, 94, 97, 103, 108, 112, 113, 114];

export const SurahsView: React.FC<SurahsViewProps> = ({
  selectedSurahNumber,
  onSelectSurah,
  onClearSurah,
  isSaved,
  onToggleSave,
  onShare,
  onDownload,
  onSelectAyah,
  showToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Popular' | 'Meccan' | 'Medinan' | 'Juz 30'>('All');
  const [verseSearch, setVerseSearch] = useState('');
  const [selectedVerseCategory, setSelectedVerseCategory] = useState<string>('All');

  // Filter Surahs
  const filteredSurahs = useMemo(() => {
    return SURAHS_LIST.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.arabicName.includes(searchTerm) ||
        s.number.toString().includes(searchTerm);

      if (!matchesSearch) return false;

      if (filterType === 'Popular') {
        return POPULAR_SURAH_NUMBERS.includes(s.number);
      }
      if (filterType === 'Meccan') {
        return s.revelation.toLowerCase() === 'meccan';
      }
      if (filterType === 'Medinan') {
        return s.revelation.toLowerCase() === 'medinan';
      }
      if (filterType === 'Juz 30') {
        return s.number >= 78 && s.number <= 114;
      }
      return true;
    });
  }, [searchTerm, filterType]);

  // If a Surah is selected, show its verses and dedicated Surah hub
  if (selectedSurahNumber) {
    const surahInfo = SURAHS_LIST.find((s) => s.number === selectedSurahNumber);
    const surahAyat = getSurahAyat(selectedSurahNumber);

    // Filter verses inside this Surah
    const filteredVerses = surahAyat.filter((a) => {
      const matchesSearch =
        !verseSearch.trim() ||
        a.english.toLowerCase().includes(verseSearch.toLowerCase()) ||
        a.hinglish.toLowerCase().includes(verseSearch.toLowerCase()) ||
        a.arabic.includes(verseSearch) ||
        a.ayahNumber.toString() === verseSearch.trim();

      const matchesCat =
        selectedVerseCategory === 'All' || a.category.toLowerCase() === selectedVerseCategory.toLowerCase();

      return matchesSearch && matchesCat;
    });

    const categoriesInThisSurah = Array.from(new Set(surahAyat.map((a) => a.category)));

    const prevSurahNum = selectedSurahNumber > 1 ? selectedSurahNumber - 1 : 114;
    const nextSurahNum = selectedSurahNumber < 114 ? selectedSurahNumber + 1 : 1;
    const prevSurah = SURAHS_LIST.find((s) => s.number === prevSurahNum);
    const nextSurah = SURAHS_LIST.find((s) => s.number === nextSurahNum);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-fadeIn">
        {/* Navigation & Surah Jumper Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            onClick={onClearSurah}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1B4332] dark:text-[#D4AF37] hover:underline cursor-pointer group bg-white dark:bg-[#0D261B] px-4 py-2 rounded-full border border-[#1B4332]/10 dark:border-[#D4AF37]/20 shadow-xs"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All 114 Surahs</span>
          </button>

          {/* Quick Chapter Switcher Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 hidden sm:inline">
              Jump to Chapter:
            </span>
            <select
              value={selectedSurahNumber}
              onChange={(e) => onSelectSurah(Number(e.target.value))}
              className="bg-white dark:bg-[#0D261B] border border-[#1B4332]/15 dark:border-[#D4AF37]/30 text-stone-900 dark:text-stone-100 text-xs font-bold rounded-2xl px-3.5 py-2 outline-none focus:border-[#D4AF37] shadow-xs cursor-pointer"
            >
              {SURAHS_LIST.map((s) => (
                <option key={s.number} value={s.number}>
                  {s.number}. Surah {s.name} ({s.arabicName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Surah Bento Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1B4332] via-[#143828] to-[#0A2016] text-white p-6 sm:p-10 border border-[#D4AF37]/30 shadow-xl">
          {/* Subtle background calligraphy watermark */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 font-arabic text-8xl sm:text-9xl text-white/5 pointer-events-none select-none">
            {surahInfo?.arabicName}
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#0A2016] text-xs font-extrabold uppercase tracking-wider shadow-sm">
                  Chapter {selectedSurahNumber} of 114
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-stone-200 text-xs font-medium backdrop-blur-sm border border-white/10">
                  {surahInfo?.revelation} Revelation
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-stone-200 text-xs font-medium backdrop-blur-sm border border-white/10">
                  {surahInfo?.totalAyat} Total Verses
                </span>
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40">
                  ✨ {surahAyat.length} Quotes in Noor Ayat
                </span>
              </div>

              <div className="flex items-baseline gap-4 flex-wrap">
                <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-50 tracking-tight">
                  Surah {surahInfo?.name}
                </h1>
                <span className="font-arabic text-3xl sm:text-4xl text-[#D4AF37] font-bold">
                  {surahInfo?.arabicName}
                </span>
              </div>

              <p className="text-sm sm:text-base text-stone-300 mt-2 font-normal max-w-2xl">
                Meaning: <span className="font-semibold text-white">"{surahInfo?.meaning}"</span>
                {surahAyat.length >= 20 ? ' • Complete Curated 20 Quotes Collection' : ' • Key Verses for Daily Reflection & Wisdom'}
              </p>
            </div>

            {/* Quick Prev / Next Navigation */}
            <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
              <button
                onClick={() => onSelectSurah(prevSurahNum)}
                title={`Previous: Surah ${prevSurah?.name}`}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white text-xs font-bold backdrop-blur-sm border border-white/15 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev:</span>
                <span>{prevSurah?.name}</span>
              </button>

              <button
                onClick={() => onSelectSurah(nextSurahNum)}
                title={`Next: Surah ${nextSurah?.name}`}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#D4AF37] hover:bg-[#c5a028] text-[#0A2016] text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <span className="hidden sm:inline">Next:</span>
                <span>{nextSurah?.name}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Verses Filter & Search in this Surah */}
        <div className="bg-white dark:bg-[#0D261B] rounded-3xl p-4 sm:p-5 border border-[#1B4332]/10 dark:border-[#D4AF37]/20 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Chips inside Surah */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedVerseCategory('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedVerseCategory === 'All'
                  ? 'bg-[#1B4332] text-white dark:bg-[#D4AF37] dark:text-[#0A2016] shadow-2xs'
                  : 'bg-[#F5EFE6] dark:bg-[#153828] text-stone-600 dark:text-stone-300 hover:text-[#1B4332]'
              }`}
            >
              All Quotes ({surahAyat.length})
            </button>
            {categoriesInThisSurah.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedVerseCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedVerseCategory === cat
                    ? 'bg-[#1B4332] text-white dark:bg-[#D4AF37] dark:text-[#0A2016] shadow-2xs'
                    : 'bg-[#F5EFE6] dark:bg-[#153828] text-stone-600 dark:text-stone-300 hover:text-[#1B4332]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search inside Surah */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={verseSearch}
              onChange={(e) => setVerseSearch(e.target.value)}
              placeholder={`Search in Surah ${surahInfo?.name}…`}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-[#F5EFE6]/70 dark:bg-[#153828] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-xs outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Verses Grid */}
        {filteredVerses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVerses.map((ayah) => (
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
          <div className="text-center py-16 bg-white dark:bg-[#0D261B] rounded-3xl border border-[#1B4332]/10 dark:border-[#D4AF37]/20 p-8 shadow-xs">
            <BookOpen className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
            <p className="text-base font-serif font-bold text-[#1B4332] dark:text-stone-200">
              No matching verses found in Surah {surahInfo?.name}.
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Try adjusting your search keywords or category filters.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white dark:bg-[#0D261B] p-6 sm:p-8 rounded-3xl border border-[#1B4332]/10 dark:border-[#D4AF37]/25 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EFE6] dark:bg-[#153828] text-[#1B4332] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Dedicated Surah Explorer & Chapters Hub</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#1B4332] dark:text-stone-50">
            Explore All 114 Surahs
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-xl">
            Browse through all 114 chapters of the Noble Quran with 20 quotes per Surah, English translations, Arabic calligraphy, and conversational Hinglish wisdom.
          </p>
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, meaning, number (e.g. Baqarah, 2)..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F5EFE6]/70 dark:bg-[#153828] border border-[#1B4332]/10 dark:border-[#D4AF37]/30 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-xs sm:text-sm outline-none focus:border-[#D4AF37] shadow-xs"
          />
        </div>
      </div>

      {/* Quick Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-white dark:bg-[#0D261B] rounded-2xl border border-[#1B4332]/10 dark:border-[#D4AF37]/20 text-xs font-bold shadow-2xs scrollbar-none">
          {[
            { id: 'All', label: 'All 114 Surahs (20 Quotes Each)' },
            { id: 'Popular', label: '⭐ Popular Chapters' },
            { id: 'Meccan', label: 'Meccan (86)' },
            { id: 'Medinan', label: 'Medinan (28)' },
            { id: 'Juz 30', label: 'Juz 30 / Amma' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                filterType === tab.id
                  ? 'bg-[#1B4332] dark:bg-[#D4AF37] text-white dark:text-[#0A2016] shadow-2xs font-extrabold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
          Showing <strong className="text-[#1B4332] dark:text-[#D4AF37]">{filteredSurahs.length}</strong> Surahs
        </span>
      </div>

      {/* Popular Fast-Jumper Chips */}
      {filterType === 'All' && (
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-wider font-bold text-stone-500 dark:text-stone-400">
            ⭐ Quick Jump to Beloved Surahs:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { num: 1, name: 'Al-Fatihah' },
              { num: 2, name: 'Al-Baqarah' },
              { num: 3, name: 'Ali \'Imran' },
              { num: 4, name: 'An-Nisa' },
              { num: 5, name: 'Al-Ma\'idah' },
              { num: 6, name: 'Al-An\'am' },
              { num: 12, name: 'Yusuf' },
              { num: 18, name: 'Al-Kahf' },
              { num: 19, name: 'Maryam' },
              { num: 20, name: 'Taha' },
              { num: 36, name: 'Ya-Sin' },
              { num: 55, name: 'Ar-Rahman' },
              { num: 56, name: 'Al-Waqi\'ah' },
              { num: 67, name: 'Al-Mulk' },
              { num: 93, name: 'Ad-Duha' },
              { num: 94, name: 'Ash-Sharh' },
              { num: 112, name: 'Al-Ikhlas' },
            ].map((item) => (
              <button
                key={item.num}
                onClick={() => onSelectSurah(item.num)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-[#0D261B] hover:bg-[#1B4332] hover:text-white dark:hover:bg-[#D4AF37] dark:hover:text-[#0A2016] text-[#1B4332] dark:text-[#D4AF37] border border-[#1B4332]/10 dark:border-[#D4AF37]/30 transition-all shadow-2xs cursor-pointer"
              >
                {item.num}. {item.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid of Surahs (Bento Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {filteredSurahs.map((surah) => {
          const quotesCount = getSurahAyat(surah.number).length;

          return (
            <div
              key={surah.number}
              onClick={() => onSelectSurah(surah.number)}
              className="group p-5 rounded-3xl bg-white dark:bg-[#0D261B] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              {/* Gold Top Indicator badge */}
              <span className="absolute top-0 right-0 bg-[#D4AF37] text-[#0A2016] text-[9px] font-extrabold px-3 py-0.5 rounded-bl-xl shadow-2xs">
                {quotesCount >= 20 ? '20 Quotes' : `${quotesCount} Verses`}
              </span>

              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-[#F5EFE6] dark:bg-[#153828] text-[#1B4332] dark:text-[#D4AF37] font-bold text-xs flex items-center justify-center border border-[#1B4332]/10 dark:border-[#D4AF37]/30 shrink-0 group-hover:scale-105 transition-transform">
                    {surah.number}
                  </span>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#1B4332] dark:text-stone-100 group-hover:text-[#D4AF37] dark:group-hover:text-[#D4AF37] truncate transition-colors">
                      {surah.name}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                      {surah.meaning}
                    </p>
                  </div>
                </div>

                <span className="font-arabic text-xl text-stone-400 group-hover:text-[#1B4332] dark:group-hover:text-[#D4AF37] transition-colors shrink-0">
                  {surah.arabicName}
                </span>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between mt-1 text-[11px]">
                <span className="text-stone-400 font-medium">
                  {surah.revelation} • {surah.totalAyat} Total Verses
                </span>

                <div className="flex items-center gap-1 font-bold text-[#1B4332] dark:text-[#D4AF37]">
                  <span>{quotesCount} Quotes</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
