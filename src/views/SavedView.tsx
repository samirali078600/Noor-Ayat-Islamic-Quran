import React, { useState } from 'react';
import { Bookmark, Search, Trash2, Download, BookOpen, ArrowRight } from 'lucide-react';
import { Ayah, ActiveTab } from '../types';
import { AyahCard } from '../components/AyahCard';

interface SavedViewProps {
  savedAyat: Ayah[];
  onToggleSave: (ayah: Ayah) => void;
  onClearAllSaved: () => void;
  onShare: (ayah: Ayah) => void;
  onDownload: (ayah: Ayah) => void;
  onSelectAyah: (ayah: Ayah) => void;
  setActiveTab: (tab: ActiveTab) => void;
  showToast: (msg: string) => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  savedAyat,
  onToggleSave,
  onClearAllSaved,
  onShare,
  onDownload,
  onSelectAyah,
  setActiveTab,
  showToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = savedAyat.filter(
    (a) =>
      a.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.hinglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.surahName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportText = () => {
    if (savedAyat.length === 0) return;
    let exportString = `MY SAVED NOOR AYAT COLLECTION (${savedAyat.length} Verses)\n\n`;
    savedAyat.forEach((a, i) => {
      exportString += `${i + 1}. Surah ${a.surahName} (${a.surahNumber}:${a.ayahNumber})\n`;
      exportString += `Arabic: ${a.arabic}\n`;
      exportString += `English: "${a.english}"\n`;
      exportString += `Hinglish: ${a.hinglish}\n`;
      exportString += `Category: ${a.category}\n\n`;
    });
    exportString += `Generated from Noor Ayat — Reflect. Remember. Return to Allah.`;

    const blob = new Blob([exportString], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'My-Noor-Ayat-Saved-Collection.txt';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Saved collection exported as text file ✓');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EFE6] dark:bg-[#153828] text-[#1B4332] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30 mb-2">
            <Bookmark className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
            <span>Personal Bookmarks</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#1B4332] dark:text-stone-50">
            Saved Quran Quotes
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">
            {savedAyat.length} {savedAyat.length === 1 ? 'verse' : 'verses'} saved locally in your browser
          </p>
        </div>

        {savedAyat.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleExportText}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-[#F5EFE6] dark:bg-[#0D261B] dark:hover:bg-[#153828] text-[#1B4332] dark:text-[#D4AF37] text-xs font-bold border border-[#1B4332]/15 dark:border-[#D4AF37]/30 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export List (.txt)</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all your saved quotes?')) {
                  onClearAllSaved();
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-200 dark:border-rose-900/50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {savedAyat.length > 0 ? (
        <>
          {/* Quick Search within Saved */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#1B4332] dark:text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search in your saved quotes…"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#0D261B] border border-[#1B4332]/15 dark:border-[#D4AF37]/30 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-xs sm:text-sm outline-none focus:border-[#D4AF37] shadow-2xs"
            />
          </div>

          {/* Grid of Saved Quotes */}
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((ayah) => (
                <AyahCard
                  key={ayah.id}
                  ayah={ayah}
                  isSaved={true}
                  onToggleSave={onToggleSave}
                  onShare={onShare}
                  onDownload={onDownload}
                  onSelect={onSelectAyah}
                  showToast={showToast}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-[#0D261B] rounded-3xl border border-[#1B4332]/10 dark:border-[#D4AF37]/20 p-6">
              <p className="text-sm text-stone-600 dark:text-stone-300 font-medium">
                No saved quotes match "{searchTerm}".
              </p>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="py-20 text-center bg-white dark:bg-[#0D261B] rounded-3xl border border-[#1B4332]/10 dark:border-[#D4AF37]/20 p-8 max-w-xl mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-3xl bg-[#F5EFE6] dark:bg-[#153828] text-[#D4AF37] flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/30">
            <Bookmark className="w-7 h-7 fill-current" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#1B4332] dark:text-stone-100 mb-2">
            Your saved collection is empty
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm mx-auto mb-8 leading-relaxed">
            Click the bookmark icon on any Quran quote card to save verses for daily reflection, offline access, and easy sharing.
          </p>
          <button
            onClick={() => setActiveTab('quotes')}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1B4332] dark:bg-[#D4AF37] hover:bg-[#133326] dark:hover:bg-[#c5a028] text-white dark:text-[#0A2016] font-bold text-sm rounded-2xl shadow-md transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Discover Quran Quotes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
