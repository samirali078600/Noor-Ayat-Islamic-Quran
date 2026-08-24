import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Bookmark,
  Copy,
  Share2,
  Download,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { Ayah } from '../types';
import { getRelatedAyat, getAyatBySurah } from '../data';

interface DetailModalProps {
  ayah: Ayah | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (ayah: Ayah) => void;
  onShare: (ayah: Ayah) => void;
  onDownload: (ayah: Ayah) => void;
  onSelectAyah: (ayah: Ayah) => void;
  showToast: (msg: string) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  ayah,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  onShare,
  onDownload,
  onSelectAyah,
  showToast,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Reset audio when ayah changes
    if (audioEl) {
      audioEl.pause();
      setIsPlaying(false);
    }
    setAudioError(false);
  }, [ayah]);

  if (!isOpen || !ayah) return null;

  // Format audio URL from high-quality Quran recitation CDN (Mishary Rashid Alafasy)
  const formatThreeDigits = (num: number) => num.toString().padStart(3, '0');
  const audioSrc = `https://everyayah.com/data/Alafasy_128kbps/${formatThreeDigits(ayah.surahNumber)}${formatThreeDigits(ayah.ayahNumber)}.mp3`;

  const toggleAudio = () => {
    if (isPlaying && audioEl) {
      audioEl.pause();
      setIsPlaying(false);
    } else {
      const audio = new Audio(audioSrc);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        setAudioError(true);
        setIsPlaying(false);
        showToast('Audio recitation not available offline.');
      };
      audio.play().then(() => {
        setIsPlaying(true);
        setAudioEl(audio);
      }).catch(() => {
        setAudioError(true);
        setIsPlaying(false);
      });
    }
  };

  const handleCopy = async () => {
    const text = `"${ayah.arabic}"\n\n"${ayah.english}"\n\nHinglish: ${ayah.hinglish}\n\n— Surah ${ayah.surahName} (${ayah.surahNumber}:${ayah.ayahNumber})\nNoor Ayat`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast('Copied successfully ✓');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Could not copy to clipboard.');
    }
  };

  const moreFromSurah = getAyatBySurah(ayah.surahNumber).filter((a) => a.id !== ayah.id).slice(0, 3);
  const relatedAyat = getRelatedAyat(ayah, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl my-auto bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#1B4332]/10 dark:border-[#D4AF37]/20 bg-[#F5EFE6]/60 dark:bg-[#071911]">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-2xl bg-[#1B4332] text-[#D4AF37] dark:bg-[#153828] border border-[#D4AF37]/30 shadow-2xs">
                <BookOpen className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-serif font-bold text-[#1B4332] dark:text-stone-100 text-base sm:text-lg flex items-center gap-2">
                  <span>Surah {ayah.surahName}</span>
                  <span className="text-xs font-normal text-stone-500">
                    ({ayah.surahNumber}:{ayah.ayahNumber})
                  </span>
                </h2>
                <div className="text-xs text-stone-600 dark:text-stone-400">
                  Category: <span className="font-bold text-[#1B4332] dark:text-[#D4AF37]">{ayah.category}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleAudio}
                title={isPlaying ? 'Pause Recitation' : 'Play Recitation (Mishary Alafasy)'}
                className={`p-2 rounded-2xl transition-all cursor-pointer ${
                  isPlaying
                    ? 'bg-[#1B4332] text-[#D4AF37] border border-[#D4AF37] animate-pulse shadow-xs'
                    : 'bg-white dark:bg-[#0D261B] text-stone-700 dark:text-stone-300 border border-[#1B4332]/15 dark:border-[#D4AF37]/30 hover:bg-[#F5EFE6]'
                }`}
              >
                <Volume2 className="w-5 h-5" />
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-2xl hover:bg-[#F5EFE6] dark:hover:bg-[#153828] text-stone-500 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Reading Content */}
          <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
            {/* Arabic Quran Display */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-[#F5EFE6] dark:bg-[#0A2016] border border-[#1B4332]/15 dark:border-[#D4AF37]/30 text-right">
              <span className="absolute top-3 left-4 text-xs font-bold text-[#1B4332] dark:text-[#D4AF37] font-serif tracking-wide">
                القرآن الكريم
              </span>
              <p className="font-arabic text-2xl sm:text-4xl text-[#1B4332] dark:text-[#D4AF37] leading-[2.4] font-bold my-2">
                {ayah.arabic}
              </p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1B4332]/10 dark:border-[#D4AF37]/20 font-sans text-xs text-stone-600 dark:text-stone-400">
                <span>Surah {ayah.surahName} • Ayah {ayah.ayahNumber}</span>
                <span className="font-arabic text-base text-[#1B4332] dark:text-[#D4AF37]">{ayah.surahNameArabic}</span>
              </div>
            </div>

            {/* English Translation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2 font-serif">
                English Translation (Clear Quran / Sahih)
              </h4>
              <p className="text-lg sm:text-xl font-medium text-stone-900 dark:text-stone-100 leading-relaxed font-serif">
                "{ayah.english}"
              </p>
            </div>

            {/* Hinglish Meaning / Explanation */}
            <div className="p-5 rounded-3xl bg-[#F5EFE6]/60 dark:bg-[#0D261B] border border-[#1B4332]/10 dark:border-[#D4AF37]/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#D4AF37] mb-2 flex items-center gap-1.5 font-serif">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Hinglish Explanation & Reflection
              </h4>
              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                {ayah.hinglish}
              </p>
            </div>

            {/* Tags */}
            {ayah.tags && ayah.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                <span className="text-xs text-stone-400 dark:text-stone-500 mr-1">Topics:</span>
                {ayah.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F5EFE6] dark:bg-[#153828] text-[#1B4332] dark:text-[#D4AF37] border border-[#1B4332]/10 dark:border-[#D4AF37]/30"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons Toolbar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={() => onToggleSave(ayah)}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                  isSaved
                    ? 'bg-[#1B4332] dark:bg-[#D4AF37] text-white dark:text-[#0A2016] border-[#D4AF37]'
                    : 'bg-white dark:bg-[#0D261B] text-stone-700 dark:text-stone-300 border-[#1B4332]/15 dark:border-[#D4AF37]/30 hover:bg-[#F5EFE6]'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Bookmarked' : 'Save'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs font-bold bg-white dark:bg-[#0D261B] text-stone-700 dark:text-stone-300 border border-[#1B4332]/15 dark:border-[#D4AF37]/30 hover:bg-[#F5EFE6] dark:hover:bg-[#153828] transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#D4AF37]" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => onShare(ayah)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs font-bold bg-white dark:bg-[#0D261B] text-stone-700 dark:text-stone-300 border border-[#1B4332]/15 dark:border-[#D4AF37]/30 hover:bg-[#F5EFE6] dark:hover:bg-[#153828] transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Share</span>
              </button>

              <button
                onClick={() => onDownload(ayah)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs font-bold bg-[#1B4332] dark:bg-[#D4AF37] hover:bg-[#133326] dark:hover:bg-[#c5a028] text-white dark:text-[#0A2016] shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Story Card</span>
              </button>
            </div>

            {/* More From This Surah */}
            {moreFromSurah.length > 0 && (
              <div className="pt-6 border-t border-stone-100 dark:border-stone-800">
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-3">
                  More from Surah {ayah.surahName}
                </h4>
                <div className="space-y-2">
                  {moreFromSurah.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onSelectAyah(item)}
                      className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-stone-200/60 dark:border-stone-800 transition-colors cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-0.5">
                          Ayah {item.ayahNumber}
                        </div>
                        <p className="text-xs text-stone-700 dark:text-stone-300 line-clamp-1">
                          "{item.english}"
                        </p>
                      </div>
                      <span className="font-arabic text-sm text-stone-400 shrink-0">
                        {item.arabic.slice(0, 25)}...
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Ayat */}
            {relatedAyat.length > 0 && (
              <div className="pt-4">
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-3">
                  Related Ayat in {ayah.category}
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {relatedAyat.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onSelectAyah(item)}
                      className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-stone-200/60 dark:border-stone-800 transition-colors cursor-pointer"
                    >
                      <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 mb-1">
                        Surah {item.surahName} ({item.surahNumber}:{item.ayahNumber})
                      </div>
                      <p className="text-xs text-stone-800 dark:text-stone-200 line-clamp-2 font-medium">
                        "{item.english}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
