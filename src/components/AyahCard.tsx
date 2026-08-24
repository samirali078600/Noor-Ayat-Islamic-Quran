import React from 'react';
import { Bookmark, Copy, Share2, Download, ArrowUpRight, Check } from 'lucide-react';
import { Ayah } from '../types';

interface AyahCardProps {
  ayah: Ayah;
  isSaved: boolean;
  onToggleSave: (ayah: Ayah) => void;
  onShare: (ayah: Ayah) => void;
  onDownload: (ayah: Ayah) => void;
  onSelect: (ayah: Ayah) => void;
  showToast: (msg: string) => void;
  viewMode?: 'card' | 'compact';
  fontSizeScale?: number; // 0: standard, 1: large, 2: extra large
}

export const AyahCard: React.FC<AyahCardProps> = ({
  ayah,
  isSaved,
  onToggleSave,
  onShare,
  onDownload,
  onSelect,
  showToast,
  viewMode = 'card',
  fontSizeScale = 0,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `"${ayah.english}"\n\nHinglish: ${ayah.hinglish}\n\n— Surah ${ayah.surahName} (${ayah.surahNumber}:${ayah.ayahNumber})\nNoor Ayat`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      showToast('Copied successfully ✓');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Could not copy to clipboard.');
    }
  };

  const arabicSizeClasses = [
    'text-xl sm:text-2xl leading-[2.2]',
    'text-2xl sm:text-3xl leading-[2.3]',
    'text-3xl sm:text-4xl leading-[2.4]',
  ][fontSizeScale] || 'text-xl sm:text-2xl leading-[2.2]';

  const englishSizeClasses = [
    'text-base leading-relaxed',
    'text-lg leading-relaxed',
    'text-xl leading-relaxed',
  ][fontSizeScale] || 'text-base leading-relaxed';

  if (viewMode === 'compact') {
    return (
      <div
        onClick={() => onSelect(ayah)}
        className="group relative p-4.5 rounded-3xl bg-white dark:bg-[#0D261B] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 hover:border-[#D4AF37]/60 dark:hover:border-[#D4AF37]/60 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1B4332]/10 dark:bg-[#D4AF37]/15 text-[#1B4332] dark:text-[#D4AF37] border border-[#1B4332]/15 dark:border-[#D4AF37]/30">
              {ayah.surahName} {ayah.surahNumber}:{ayah.ayahNumber}
            </span>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
              • {ayah.category}
            </span>
          </div>
          <p className="text-sm text-[#2D2D2D] dark:text-stone-200 line-clamp-2 font-medium">
            "{ayah.english}"
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(ayah);
            }}
            title={isSaved ? 'Saved' : 'Save to bookmarks'}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isSaved
                ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40'
                : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleCopy}
            title="Copy quote"
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-current" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare(ayah);
            }}
            title="Share quote"
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <article
      onClick={() => onSelect(ayah)}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0D261B] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 hover:border-[#D4AF37]/50 dark:hover:border-[#D4AF37]/60 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Background Bismillah Calligraphy Watermark */}
      <div className="absolute -right-6 -top-6 opacity-[0.035] dark:opacity-[0.06] text-8xl font-serif text-[#1B4332] dark:text-[#D4AF37] pointer-events-none select-none">
        ﷽
      </div>

      {/* Header Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1B4332]/10 dark:bg-[#D4AF37]/15 text-[#1B4332] dark:text-[#D4AF37] border border-[#1B4332]/15 dark:border-[#D4AF37]/30">
              <span>{ayah.surahName}</span>
              <span className="opacity-60">•</span>
              <span>{ayah.surahNumber}:{ayah.ayahNumber}</span>
            </span>

            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F5EFE6] dark:bg-[#153828] text-stone-700 dark:text-stone-300">
              {ayah.category}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs font-arabic font-semibold text-[#D4AF37] dark:text-[#D4AF37]">
              {ayah.surahNameArabic}
            </span>
          </div>
        </div>

        {/* 1. Original Arabic Quran Text */}
        <div className="mb-4 text-right">
          <p className={`font-arabic text-[#1B4332] dark:text-[#E2D8B3] tracking-normal font-bold ${arabicSizeClasses}`} dir="rtl">
            {ayah.arabic}
          </p>
        </div>

        {/* 2. English Translation */}
        <div className="mb-4">
          <p className={`text-[#2D2D2D] dark:text-stone-100 font-medium italic ${englishSizeClasses}`}>
            "{ayah.english}"
          </p>
        </div>

        {/* 3. Simple Hinglish Meaning / Explanation with Gold Border */}
        <div className="p-4 rounded-2xl bg-[#F5EFE6] dark:bg-[#153828]/70 border-l-4 border-[#D4AF37] mb-5">
          <div className="text-[10px] font-bold tracking-wider text-[#1B4332] dark:text-[#D4AF37] uppercase mb-1">
            Hinglish Meaning
          </div>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed font-normal">
            {ayah.hinglish}
          </p>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="pt-3.5 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(ayah);
            }}
            title={isSaved ? 'Remove Bookmark' : 'Save Quote'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              isSaved
                ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span className="hidden xs:inline">{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleCopy}
            title="Copy translation & reference"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden xs:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare(ayah);
            }}
            title="Share via WhatsApp, X, etc."
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Share</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload(ayah);
            }}
            title="Download 9:16 Social Story Image"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Story Card</span>
          </button>
        </div>

        <button
          onClick={() => onSelect(ayah)}
          className="flex items-center gap-1 text-xs font-bold text-[#1B4332] dark:text-[#D4AF37] group-hover:translate-x-0.5 transition-transform cursor-pointer"
        >
          <span>Read</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
