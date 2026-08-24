import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Dice5,
  Compass,
  ArrowRight,
  Sparkles,
  Bookmark,
  Share2,
  Copy,
  Download,
  Check,
  ChevronRight,
  TrendingUp,
  Flame,
  RefreshCw,
  Layers,
  BookOpen,
} from 'lucide-react';
import { Ayah, ActiveTab, CategoryType } from '../types';
import { getAyahOfTheDay, getRandomAyah, ALL_AYAT, CATEGORIES_LIST, SURAHS_LIST, getSurahAyat } from '../data';
import { AyahCard } from '../components/AyahCard';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectCategory: (cat: CategoryType) => void;
  onSelectSurah: (surahNumber: number) => void;
  onSelectAyah: (ayah: Ayah) => void;
  isSaved: (id: number) => boolean;
  onToggleSave: (ayah: Ayah) => void;
  onShare: (ayah: Ayah) => void;
  onDownload: (ayah: Ayah) => void;
  onOpenSearch: () => void;
  showToast: (msg: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  onSelectCategory,
  onSelectSurah,
  onSelectAyah,
  isSaved,
  onToggleSave,
  onShare,
  onDownload,
  onOpenSearch,
  showToast,
}) => {
  const [surahFilter, setSurahFilter] = useState('');
  const [copiedAyahId, setCopiedAyahId] = useState<number | null>(null);
  const ayahOfTheDay = getAyahOfTheDay();

  // Instant Random Generator State on Home Page
  const [homeRandomAyah, setHomeRandomAyah] = useState<Ayah>(() => getRandomAyah());
  const [homeRandomCategory, setHomeRandomCategory] = useState<string>('All');
  const [isSpinning, setIsSpinning] = useState(false);

  const handleHomeShuffle = () => {
    setIsSpinning(true);
    let pool = ALL_AYAT;
    if (homeRandomCategory !== 'All') {
      pool = ALL_AYAT.filter((a) => a.category === homeRandomCategory);
    }
    const filteredPool = pool.filter((a) => a.id !== homeRandomAyah.id);
    const chosen =
      filteredPool.length > 0
        ? filteredPool[Math.floor(Math.random() * filteredPool.length)]
        : pool[0] || ALL_AYAT[0];

    setTimeout(() => {
      setHomeRandomAyah(chosen);
      setIsSpinning(false);
      showToast('Shuffled to new Ayah for reflection ✨');
    }, 200);
  };

  // Curated trending & reflection ayat
  const trendingAyat = ALL_AYAT.filter((a) => a.popular || a.featured).slice(0, 2);
  const featuredAyat = ALL_AYAT.filter((a) => a.featured).slice(2, 8);

  const filteredSurahs = SURAHS_LIST.filter(
    (s) =>
      s.name.toLowerCase().includes(surahFilter.toLowerCase()) ||
      s.meaning.toLowerCase().includes(surahFilter.toLowerCase()) ||
      s.number.toString().includes(surahFilter)
  ).slice(0, 12);

  const handleCopy = async (ayah: Ayah, e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `"${ayah.english}"\n\nHinglish: ${ayah.hinglish}\n\n— Surah ${ayah.surahName} (${ayah.surahNumber}:${ayah.ayahNumber})\nNoor Ayat`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedAyahId(ayah.id);
      showToast('Copied to clipboard ✓');
      setTimeout(() => setCopiedAyahId(null), 2000);
    } catch {
      showToast('Could not copy to clipboard.');
    }
  };

  const savedCount = ALL_AYAT.filter((a) => isSaved(a.id)).length;

  return (
    <div className="space-y-12 sm:space-y-16 py-6 sm:py-8">
      {/* 1. Peaceful Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto px-4 pt-2 sm:pt-4">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-[#D4AF37]/10 dark:bg-[#1B4332]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EFE6] dark:bg-[#153828] text-[#1B4332] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30 mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Quranic Wisdom for Daily Peace</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1B4332] dark:text-stone-50 tracking-tight leading-[1.15] mb-3">
          Find Light in the Words of Allah
        </h1>

        <p className="text-sm sm:text-lg text-stone-600 dark:text-stone-300 max-w-xl mx-auto font-normal leading-relaxed mb-6">
          Explore curated Quranic verses in English & conversational Hinglish.
        </p>

        {/* Prominent Search Bar */}
        <div className="max-w-xl mx-auto mb-6">
          <div
            onClick={onOpenSearch}
            className="flex items-center gap-3 p-3 sm:p-3.5 rounded-full bg-white dark:bg-[#0D261B] border border-[#1B4332]/15 dark:border-[#D4AF37]/30 shadow-md hover:shadow-lg hover:border-[#D4AF37] dark:hover:border-[#D4AF37] transition-all cursor-pointer group"
          >
            <Search className="w-4.5 h-4.5 text-[#1B4332] dark:text-[#D4AF37] group-hover:scale-110 transition-transform shrink-0 ml-2" />
            <span className="flex-1 text-left text-xs sm:text-sm text-stone-400 dark:text-stone-400 font-medium">
              Search an ayah, Surah or topic (e.g. Sabr, 2:286)...
            </span>
            <span className="hidden sm:inline-block px-4 py-1.5 text-xs font-bold text-white bg-[#1B4332] hover:bg-[#133326] rounded-full transition-colors">
              Search
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('quotes')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B4332] hover:bg-[#133326] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#1B4332]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            <span>Explore All Quotes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('instant-random-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                handleHomeShuffle();
              } else {
                setActiveTab('random');
              }
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#0D261B] hover:bg-[#F5EFE6] dark:hover:bg-[#153828] text-stone-800 dark:text-stone-200 border border-[#1B4332]/15 dark:border-[#D4AF37]/30 font-bold text-xs sm:text-sm shadow-2xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Dice5 className="w-4 h-4 text-[#D4AF37]" />
            <span>Shuffle Random Ayah</span>
          </button>
        </div>
      </section>

      {/* 2. Primary Bento Grid Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
          {/* Bento Card 1: Ayah of the Day (Col Span 8) */}
          <div
            onClick={() => onSelectAyah(ayahOfTheDay)}
            className="md:col-span-8 bg-white dark:bg-[#0D261B] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#1B4332]/10 dark:border-[#D4AF37]/25 flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
          >
            {/* Watermark Calligraphy */}
            <div className="absolute -right-8 -top-8 opacity-[0.035] dark:opacity-[0.06] text-9xl sm:text-[160px] font-serif text-[#1B4332] dark:text-[#D4AF37] pointer-events-none select-none">
              ﷽
            </div>

            <div>
              {/* Header with pill and quick actions */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="px-3.5 py-1 bg-[#1B4332]/10 dark:bg-[#D4AF37]/15 text-[#1B4332] dark:text-[#D4AF37] rounded-full text-[10px] font-bold tracking-widest uppercase border border-[#1B4332]/10 dark:border-[#D4AF37]/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
                  <span>Ayah of the Day</span>
                </span>

                <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => handleCopy(ayahOfTheDay, e)}
                    title="Copy Ayah"
                    className="p-2 hover:bg-[#F5EFE6] dark:hover:bg-[#153828] text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-xl transition-colors cursor-pointer"
                  >
                    {copiedAyahId === ayahOfTheDay.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onShare(ayahOfTheDay);
                    }}
                    title="Share"
                    className="p-2 hover:bg-[#F5EFE6] dark:hover:bg-[#153828] text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(ayahOfTheDay);
                    }}
                    title="Save to bookmarks"
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isSaved(ayahOfTheDay.id)
                        ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40'
                        : 'text-stone-500 hover:bg-[#F5EFE6] dark:hover:bg-[#153828]'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved(ayahOfTheDay.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Arabic Verse */}
              <div className="text-right mb-6">
                <p
                  className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1B4332] dark:text-[#E2D8B3] leading-relaxed font-bold"
                  dir="rtl"
                >
                  {ayahOfTheDay.arabic}
                </p>
              </div>

              {/* English Translation */}
              <div className="space-y-4 mb-6">
                <p className="text-base sm:text-lg font-medium text-[#2D2D2D] dark:text-stone-100 italic leading-relaxed">
                  "{ayahOfTheDay.english}"
                </p>

                {/* Hinglish Meaning Bento Box */}
                <div className="p-4 bg-[#F5EFE6] dark:bg-[#153828]/70 rounded-2xl border-l-4 border-[#D4AF37]">
                  <p className="text-[10px] font-bold text-[#1B4332] dark:text-[#D4AF37] uppercase tracking-wider mb-1">
                    Hinglish Meaning
                  </p>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed font-normal">
                    {ayahOfTheDay.hinglish}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Surah Reference Bar */}
            <div className="pt-4 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 border-t border-stone-100 dark:border-stone-800/80">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#D4AF37] dark:text-[#D4AF37]">
                  Surah {ayahOfTheDay.surahName}
                </span>
                <span>•</span>
                <span>
                  {ayahOfTheDay.surahNumber}:{ayahOfTheDay.ayahNumber}
                </span>
                <span className="hidden sm:inline text-stone-400">({ayahOfTheDay.category})</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownload(ayahOfTheDay);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1B4332] dark:text-[#D4AF37] hover:underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Story Card</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Column (4 Cols): Daily Progress + Saved Box */}
          <div className="md:col-span-4 flex flex-col gap-4 sm:gap-5">
            {/* Bento Card 2: Daily Progress (Forest Green + Gold) */}
            <div className="bg-[#1B4332] dark:bg-[#0A2016] rounded-3xl p-6 text-white shadow-lg border border-[#D4AF37]/30 flex flex-col justify-between min-h-[190px]">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
                    Daily Reflection
                  </h3>
                  <Flame className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <p className="text-xs text-stone-200 leading-relaxed">
                  Reflect on Quranic reminders daily to keep your heart at peace and connected.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-end">
                <div>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#D4AF37]">
                    114
                  </span>
                  <p className="text-[10px] uppercase tracking-wider text-stone-300 mt-0.5">
                    Surahs Available
                  </p>
                </div>
                <div className="flex space-x-1.5 items-end">
                  <div className="w-2.5 h-9 bg-white/15 rounded-full relative overflow-hidden">
                    <div className="absolute bottom-0 w-full h-6 bg-[#D4AF37] rounded-full" />
                  </div>
                  <div className="w-2.5 h-9 bg-white/15 rounded-full relative overflow-hidden">
                    <div className="absolute bottom-0 w-full h-8 bg-[#D4AF37] rounded-full" />
                  </div>
                  <div className="w-2.5 h-9 bg-white/15 rounded-full relative overflow-hidden">
                    <div className="absolute bottom-0 w-full h-5 bg-[#D4AF37] rounded-full" />
                  </div>
                  <div className="w-2.5 h-9 bg-white/15 rounded-full relative overflow-hidden">
                    <div className="absolute bottom-0 w-full h-9 bg-[#D4AF37] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Card 3: Saved Collection Stat */}
            <div
              onClick={() => setActiveTab('saved')}
              className="bg-white dark:bg-[#0D261B] rounded-3xl p-5 shadow-xs border border-[#1B4332]/10 dark:border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 bg-[#F5EFE6] dark:bg-[#153828] rounded-2xl flex items-center justify-center text-xl text-[#D4AF37] group-hover:scale-105 transition-transform">
                  ⭐
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B4332] dark:text-[#D4AF37]">
                    {savedCount} {savedCount === 1 ? 'Verse' : 'Verses'} Saved
                  </h4>
                  <p className="text-[10px] text-stone-400 dark:text-stone-400 uppercase tracking-wider font-semibold">
                    Your Personal Collection
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
            </div>

            {/* Bento Card 4: Featured Surah Highlight */}
            <div
              onClick={() => onSelectSurah(18)}
              className="p-5 bg-gradient-to-br from-[#1B4332] to-[#0A2016] rounded-3xl text-white border border-[#D4AF37]/20 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                  Featured Surah
                </p>
                <span className="font-arabic text-sm text-[#D4AF37]">الكهف</span>
              </div>
              <h4 className="font-serif text-lg font-bold">Surah Al-Kahf</h4>
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/10">
                <span className="text-[11px] text-stone-300">110 Total Ayat</span>
                <span className="text-[10px] bg-[#D4AF37] hover:bg-[#c5a028] text-white px-3 py-1 rounded-full font-bold">
                  Explore
                </span>
              </div>
            </div>
          </div>

          {/* Bento Card 5: Popular Categories Bento Block (Col Span 4) */}
          <div className="md:col-span-4 bg-white dark:bg-[#0D261B] rounded-3xl p-6 shadow-xs border border-[#1B4332]/10 dark:border-[#D4AF37]/20 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#D4AF37]">
                Popular Categories
              </h3>
              <button
                onClick={() => setActiveTab('categories')}
                className="text-xs text-[#D4AF37] font-bold hover:underline cursor-pointer"
              >
                View All (20)
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { name: 'Patience & Sabr' as CategoryType, label: 'Sabr', icon: '🌿' },
                { name: 'Supplication & Dua' as CategoryType, label: 'Dua', icon: '🤲' },
                { name: 'Trust in Allah (Tawakkul)' as CategoryType, label: 'Tawakkul', icon: '⚖️' },
                { name: 'Hope & Good News' as CategoryType, label: 'Hope', icon: '✨' },
              ].map((item) => (
                <div
                  key={item.label}
                  onClick={() => onSelectCategory(item.name)}
                  className="p-3.5 bg-[#F5EFE6] dark:bg-[#153828] rounded-2xl flex flex-col items-center justify-center hover:bg-[#1B4332] dark:hover:bg-[#D4AF37] hover:text-white dark:hover:text-[#0A2016] transition-all cursor-pointer group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="text-xs mt-1.5 font-bold tracking-tight">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 text-center">
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Arranged by life situations & spiritual emotions.
              </p>
            </div>
          </div>

          {/* Bento Card 6: Trending & Reflection Verses (Col Span 8) */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Trending Card with Gold Bottom Accent */}
            <div
              onClick={() => onSelectAyah(trendingAyat[0] || ayahOfTheDay)}
              className="bg-white dark:bg-[#0D261B] rounded-3xl p-6 shadow-xs border border-[#1B4332]/10 dark:border-[#D4AF37]/20 flex flex-col justify-between border-b-4 border-b-[#D4AF37] cursor-pointer hover:shadow-md transition-all"
            >
              <div>
                <span className="text-[9px] bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300/40 px-2 py-0.5 rounded-full font-bold mb-3 inline-flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>TRENDING</span>
                </span>
                <p className="text-sm font-medium text-[#2D2D2D] dark:text-stone-100 leading-relaxed italic mb-3">
                  "{trendingAyat[0]?.english || 'Indeed, with hardship [will be] ease.'}"
                </p>
              </div>
              <p className="text-xs text-stone-400 dark:text-stone-400 font-semibold mt-auto pt-2">
                Surah {trendingAyat[0]?.surahName || 'Ash-Sharh'} •{' '}
                {trendingAyat[0]?.surahNumber || 94}:{trendingAyat[0]?.ayahNumber || 6}
              </p>
            </div>

            {/* Reflection Card with Pine Green Bottom Accent */}
            <div
              onClick={() => onSelectAyah(trendingAyat[1] || ayahOfTheDay)}
              className="bg-white dark:bg-[#0D261B] rounded-3xl p-6 shadow-xs border border-[#1B4332]/10 dark:border-[#D4AF37]/20 flex flex-col justify-between border-b-4 border-b-[#1B4332] dark:border-b-emerald-500 cursor-pointer hover:shadow-md transition-all"
            >
              <div>
                <span className="text-[9px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40 px-2 py-0.5 rounded-full font-bold mb-3 inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>REFLECTION</span>
                </span>
                <p className="text-sm font-medium text-[#2D2D2D] dark:text-stone-100 leading-relaxed italic mb-3">
                  "{trendingAyat[1]?.english || 'Be patient; indeed, the promise of Allah is truth.'}"
                </p>
              </div>
              <p className="text-xs text-stone-400 dark:text-stone-400 font-semibold mt-auto pt-2">
                Surah {trendingAyat[1]?.surahName || 'Ar-Rum'} •{' '}
                {trendingAyat[1]?.surahNumber || 30}:{trendingAyat[1]?.ayahNumber || 60}
              </p>
            </div>
          </div>

          {/* Bento Card 7: 9:16 Social Story Card Generator Promo (Col Span 12) */}
          <div className="md:col-span-12 bg-[#F5EFE6]/70 dark:bg-[#0D261B]/60 rounded-3xl p-5 sm:p-6 border border-dashed border-[#1B4332]/25 dark:border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5 text-center sm:text-left">
              <span className="text-3xl">🎨</span>
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#1B4332] dark:text-[#D4AF37] block">
                  Generate beautiful 9:16 Story Cards for Instagram & WhatsApp Status
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  Export high-resolution images instantly with Arabic calligraphy & Hinglish context.
                </span>
              </div>
            </div>
            <button
              onClick={() => onDownload(ayahOfTheDay)}
              className="bg-[#1B4332] dark:bg-[#D4AF37] text-white dark:text-[#0A2016] px-5 py-2.5 rounded-2xl text-xs font-bold hover:scale-105 transition-all shadow-md shrink-0 cursor-pointer"
            >
              Create Now
            </button>
          </div>
        </div>
      </section>

      {/* 3. Dedicated Interactive Random Ayah Wisdom Hub (Home Page Random Upgrade) */}
      <section id="instant-random-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-white via-[#FAF6F0] to-white dark:from-[#0D261B] dark:via-[#091D14] dark:to-[#0D261B] rounded-3xl p-6 sm:p-8 border border-[#1B4332]/15 dark:border-[#D4AF37]/30 shadow-md">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200/80 dark:border-stone-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/10 dark:bg-[#D4AF37]/15 text-[#1B4332] dark:text-[#D4AF37] text-xs font-bold border border-[#1B4332]/15 dark:border-[#D4AF37]/30 mb-2">
                <Dice5 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Instant Wisdom Generator</span>
              </div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#1B4332] dark:text-stone-50">
                Random Ayah for Immediate Serenity
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                Shuffle anytime or filter by emotional theme to receive immediate guidance
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={handleHomeShuffle}
                disabled={isSpinning}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#1B4332] dark:bg-[#D4AF37] hover:bg-[#133326] dark:hover:bg-[#c5a028] text-white dark:text-[#0A2016] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>Shuffle Another Ayah</span>
              </button>

              <button
                onClick={() => setActiveTab('random')}
                className="text-xs font-bold text-stone-600 dark:text-[#D4AF37] hover:underline px-3 py-2"
              >
                Full Screen →
              </button>
            </div>
          </div>

          {/* Quick Theme Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 shrink-0">Filter Mood:</span>
            {['All', 'Patience & Sabr', 'Supplication & Dua', 'Trust in Allah (Tawakkul)', 'Hope & Good News', 'Gratitude & Shukr', 'Peace & Contentment'].map((theme) => (
              <button
                key={theme}
                onClick={() => {
                  setHomeRandomCategory(theme);
                  // Trigger shuffle for that category
                  setTimeout(() => {
                    let pool = ALL_AYAT;
                    if (theme !== 'All') {
                      pool = ALL_AYAT.filter((a) => a.category === theme);
                    }
                    const chosen = pool[Math.floor(Math.random() * pool.length)] || ALL_AYAT[0];
                    setHomeRandomAyah(chosen);
                  }, 50);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  homeRandomCategory === theme
                    ? 'bg-[#1B4332] dark:bg-[#D4AF37] text-white dark:text-[#0A2016] shadow-xs'
                    : 'bg-white dark:bg-[#153828] text-stone-600 dark:text-stone-300 border border-[#1B4332]/10 dark:border-[#D4AF37]/20 hover:border-[#D4AF37]'
                }`}
              >
                {theme === 'All' ? '🌟 All Themes' : theme}
              </button>
            ))}
          </div>

          {/* Animated Random Ayah Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={homeRandomAyah.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              onClick={() => onSelectAyah(homeRandomAyah)}
              className="group p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#071911] border border-[#1B4332]/15 dark:border-[#D4AF37]/30 shadow-sm hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
            >
              {/* Watermark Calligraphy */}
              <div className="absolute -right-6 -top-6 opacity-[0.03] dark:opacity-[0.05] text-8xl font-serif text-[#1B4332] dark:text-[#D4AF37] pointer-events-none select-none">
                ﷽
              </div>

              {/* Badges & Actions */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#1B4332]/10 dark:bg-[#D4AF37]/20 text-[#1B4332] dark:text-[#D4AF37] border border-[#1B4332]/15 dark:border-[#D4AF37]/30">
                    Surah {homeRandomAyah.surahName} ({homeRandomAyah.surahNumber}:{homeRandomAyah.ayahNumber})
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F5EFE6] dark:bg-[#153828] text-stone-600 dark:text-stone-300">
                    {homeRandomAyah.category}
                  </span>
                </div>

                <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => handleCopy(homeRandomAyah, e)}
                    title="Copy Ayah"
                    className="p-2 hover:bg-[#F5EFE6] dark:hover:bg-[#153828] text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-xl transition-colors cursor-pointer"
                  >
                    {copiedAyahId === homeRandomAyah.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onShare(homeRandomAyah);
                    }}
                    title="Share"
                    className="p-2 hover:bg-[#F5EFE6] dark:hover:bg-[#153828] text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(homeRandomAyah);
                    }}
                    title="Save to bookmarks"
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isSaved(homeRandomAyah.id)
                        ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40'
                        : 'text-stone-500 hover:bg-[#F5EFE6] dark:hover:bg-[#153828]'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved(homeRandomAyah.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Arabic */}
              <div className="text-right mb-5">
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#1B4332] dark:text-[#E2D8B3] leading-relaxed" dir="rtl">
                  {homeRandomAyah.arabic}
                </p>
              </div>

              {/* English */}
              <p className="text-base sm:text-lg font-medium text-[#2D2D2D] dark:text-stone-100 italic leading-relaxed mb-4">
                "{homeRandomAyah.english}"
              </p>

              {/* Hinglish Explanation Box */}
              <div className="p-4 bg-[#F5EFE6] dark:bg-[#153828]/60 rounded-2xl border-l-4 border-[#D4AF37] mb-5">
                <p className="text-[10px] font-bold text-[#1B4332] dark:text-[#D4AF37] uppercase tracking-wider mb-1">
                  Hinglish Tafakkur
                </p>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed">
                  {homeRandomAyah.hinglish}
                </p>
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSurah(homeRandomAyah.surahNumber);
                  }}
                  className="font-bold text-[#1B4332] dark:text-[#D4AF37] hover:underline flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Explore Surah {homeRandomAyah.surahName} (All 20 Quotes)</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownload(homeRandomAyah);
                  }}
                  className="inline-flex items-center gap-1.5 font-bold text-[#1B4332] dark:text-[#D4AF37] hover:underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Story Card</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. Featured Curated Ayat Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#1B4332] dark:text-stone-50">
              Curated Quotes for Reflection
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              Hand-picked Quranic verses for hope, patience, and gratitude
            </p>
          </div>
          <button
            onClick={() => setActiveTab('quotes')}
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#D4AF37] hover:underline cursor-pointer"
          >
            <span>Browse All Quotes</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredAyat.map((ayah) => (
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
      </section>

      {/* 5. Explore by Surah Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332] dark:bg-[#153828] text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30 mb-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chapter-Wise Reflection</span>
            </div>
            <h2 className="font-serif font-bold text-xl sm:text-3xl text-[#1B4332] dark:text-stone-50">
              Explore by Surah
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              Browse all 114 chapters with English meanings and 20 quotes per Surah
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={surahFilter}
                onChange={(e) => setSurahFilter(e.target.value)}
                placeholder="Search Surah…"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-[#0D261B] border border-[#1B4332]/15 dark:border-[#D4AF37]/30 text-stone-900 dark:text-stone-100 placeholder-stone-400 outline-none focus:border-[#D4AF37]"
              />
            </div>
            <button
              onClick={() => setActiveTab('surahs')}
              className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold bg-[#1B4332] text-white dark:bg-[#D4AF37] dark:text-[#0A2016] transition-transform hover:scale-105 shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>Explore All 114</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Famous Surahs Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          <span className="text-xs font-bold text-stone-500 dark:text-stone-400 shrink-0">Popular:</span>
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
            { num: 67, name: 'Al-Mulk' },
            { num: 93, name: 'Ad-Duha' },
            { num: 94, name: 'Ash-Sharh' },
            { num: 112, name: 'Al-Ikhlas' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => onSelectSurah(s.num)}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#0D261B] hover:bg-[#1B4332] hover:text-white dark:hover:bg-[#D4AF37] dark:hover:text-[#0A2016] text-stone-700 dark:text-stone-300 border border-[#1B4332]/10 dark:border-[#D4AF37]/20 transition-all shrink-0 cursor-pointer shadow-2xs"
            >
              {s.num}. {s.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredSurahs.map((surah) => {
            const quotesCount = getSurahAyat(surah.number).length;
            return (
              <button
                key={surah.number}
                onClick={() => onSelectSurah(surah.number)}
                className="p-4 rounded-3xl bg-white dark:bg-[#0D261B] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] shadow-2xs hover:shadow-md transition-all text-left group cursor-pointer flex flex-col justify-between relative overflow-hidden"
              >
                {/* Gold Top Indicator badge */}
                <span className="absolute top-0 right-0 bg-[#D4AF37] text-[#0A2016] text-[8px] font-extrabold px-2 py-0.5 rounded-bl-lg">
                  {quotesCount >= 20 ? '20 Quotes' : `${quotesCount} Verses`}
                </span>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-xl bg-[#1B4332]/10 dark:bg-[#D4AF37]/15 text-[#1B4332] dark:text-[#D4AF37] font-bold text-xs flex items-center justify-center border border-[#1B4332]/15 dark:border-[#D4AF37]/30">
                    {surah.number}
                  </span>
                  <span className="font-arabic text-sm font-semibold text-[#D4AF37] group-hover:scale-105 transition-transform">
                    {surah.arabicName}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 group-hover:text-[#1B4332] dark:group-hover:text-[#D4AF37] truncate transition-colors">
                    {surah.name}
                  </h4>
                  <p className="text-[10px] text-stone-400 dark:text-stone-400 truncate">
                    {surah.meaning}
                  </p>
                  <div className="text-[10px] text-[#D4AF37] font-bold mt-1">
                    {quotesCount} quotes
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

