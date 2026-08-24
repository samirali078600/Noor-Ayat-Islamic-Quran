import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, MessageCircle, Send, Share2, Check } from 'lucide-react';
import { Ayah } from '../types';

interface ShareModalProps {
  ayah: Ayah | null;
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  ayah,
  isOpen,
  onClose,
  showToast,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !ayah) return null;

  const shareText = `"${ayah.arabic}"\n\n"${ayah.english}"\n\nHinglish: ${ayah.hinglish}\n\n— Surah ${ayah.surahName} (${ayah.surahNumber}:${ayah.ayahNumber})\n\nExplore more Quranic reminders on Noor Ayat`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      showToast('Copied successfully ✓');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Could not copy to clipboard.');
    }
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleTwitter = () => {
    const shortText = `"${ayah.english}"\n\n— Surah ${ayah.surahName} (${ayah.surahNumber}:${ayah.ayahNumber}) #NoorAyat #Quran`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shortText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Surah ${ayah.surahName} ${ayah.surahNumber}:${ayah.ayahNumber} — Noor Ayat`,
          text: shareText,
          url: window.location.href,
        });
        showToast('Shared successfully ✓');
        onClose();
      } catch {
        // User cancelled or error
      }
    } else {
      handleCopy();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-stone-800"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#1B4332]/10 dark:border-[#D4AF37]/20">
            <h3 className="font-serif font-bold text-[#1B4332] dark:text-stone-100 flex items-center gap-2 text-base">
              <Share2 className="w-4 h-4 text-[#D4AF37]" />
              Share Quranic Ayah
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-2xl hover:bg-[#F5EFE6] dark:hover:bg-[#153828] text-stone-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="my-4 p-4 rounded-3xl bg-[#F5EFE6]/60 dark:bg-[#0A2016] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 max-h-40 overflow-y-auto">
            <p className="font-arabic text-sm text-[#1B4332] dark:text-[#D4AF37] leading-loose text-right mb-2 font-bold">
              {ayah.arabic}
            </p>
            <p className="text-xs text-stone-700 dark:text-stone-300 font-serif italic mb-1.5">
              "{ayah.english}"
            </p>
            <div className="text-[11px] font-bold text-[#1B4332] dark:text-[#D4AF37]">
              Surah {ayah.surahName} • {ayah.surahNumber}:{ayah.ayahNumber}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-xs transition-colors border border-emerald-500/20 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleTelegram}
              className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-700 dark:text-sky-300 font-bold text-xs transition-colors border border-sky-500/20 cursor-pointer"
            >
              <Send className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Telegram</span>
            </button>

            <button
              onClick={handleTwitter}
              className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-[#F5EFE6] hover:bg-[#1B4332]/10 dark:bg-[#153828] dark:hover:bg-[#1B4332]/30 text-stone-800 dark:text-stone-200 font-bold text-xs transition-colors border border-[#1B4332]/10 dark:border-[#D4AF37]/20 cursor-pointer"
            >
              <span className="font-bold text-xs">𝕏</span>
              <span>X (Twitter)</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-[#F5EFE6] hover:bg-[#1B4332]/10 dark:bg-[#153828] dark:hover:bg-[#1B4332]/30 text-stone-800 dark:text-stone-200 font-bold text-xs transition-colors border border-[#1B4332]/10 dark:border-[#D4AF37]/20 cursor-pointer"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-[#D4AF37]" />
              )}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#1B4332] dark:bg-[#D4AF37] hover:bg-[#133326] dark:hover:bg-[#c5a028] text-white dark:text-[#0A2016] rounded-2xl font-bold text-xs transition-all shadow-md cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>More Share Options (System)</span>
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
