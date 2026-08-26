import React from 'react';
import { X, Download, Smartphone, Check, Sparkles, Share, PlusSquare } from 'lucide-react';
import { APP_LOGO } from '../assets/logo';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  onInstall: () => Promise<boolean | void>;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  isInstalled,
  onInstall,
}) => {
  if (!isOpen) return null;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: boolean }).MSStream;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#0A2016] rounded-3xl border border-[#1B4332]/20 dark:border-[#D4AF37]/30 shadow-2xl p-6 sm:p-8 text-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-2 bg-[#D4AF37] rounded-b-full shadow-lg" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* App Logo Display */}
        <div className="mx-auto w-24 h-24 rounded-3xl p-1 bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#1B4332] shadow-xl mb-4 relative group">
          <img
            src={APP_LOGO}
            alt="Noor Ayat App Logo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-[22px] shadow-inner"
          />
          <div className="absolute -bottom-1 -right-1 bg-[#1B4332] text-[#D4AF37] p-1.5 rounded-full border border-[#D4AF37] shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        <h3 className="font-serif font-bold text-2xl text-[#1B4332] dark:text-[#D4AF37] mb-1">
          Install Noor Ayat App
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mb-6">
          Access 114 Surahs, daily Quran quotes, Hinglish reflections, and audio anytime offline on your home screen.
        </p>

        {isInstalled ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2">
            <Check className="w-5 h-5" />
            <span>Noor Ayat is already installed on your device!</span>
          </div>
        ) : isInstallable ? (
          <div className="space-y-3">
            <button
              onClick={async () => {
                await onInstall();
                onClose();
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] hover:from-[#143427] hover:to-[#21513C] text-white font-bold text-sm shadow-lg shadow-[#1B4332]/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" />
              <span>Install to Home Screen</span>
            </button>
            <p className="text-[11px] text-stone-400">Fast, lightweight, no App Store account required</p>
          </div>
        ) : isIOS ? (
          <div className="text-left bg-[#F5EFE6] dark:bg-[#071911] p-4 rounded-2xl border border-[#1B4332]/15 dark:border-[#D4AF37]/30 text-xs text-stone-700 dark:text-stone-300 space-y-2.5">
            <p className="font-bold text-[#1B4332] dark:text-[#D4AF37] flex items-center gap-1.5">
              <Smartphone className="w-4 h-4" /> Install on iPhone / iPad:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed">
              <li>Tap the <Share className="w-3.5 h-3.5 inline mx-1 text-sky-600" /> <strong>Share</strong> icon in Safari</li>
              <li>Scroll down and select <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-stone-800 dark:text-stone-200" /> <strong>Add to Home Screen</strong></li>
              <li>Tap <strong>Add</strong> at top right to complete</li>
            </ol>
          </div>
        ) : (
          <div className="text-left bg-[#F5EFE6] dark:bg-[#071911] p-4 rounded-2xl border border-[#1B4332]/15 dark:border-[#D4AF37]/30 text-xs text-stone-700 dark:text-stone-300 space-y-2.5">
            <p className="font-bold text-[#1B4332] dark:text-[#D4AF37] flex items-center gap-1.5">
              <Smartphone className="w-4 h-4" /> Install on Android / Desktop:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed">
              <li>Open your browser menu (three dots <strong>⋮</strong>)</li>
              <li>Tap <strong>"Install App"</strong> or <strong>"Add to Home Screen"</strong></li>
              <li>Confirm to launch directly from your home screen icon</li>
            </ol>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-400">
          Noor Ayat • Complete Quran Reminders & Surah Wisdom
        </div>
      </div>
    </div>
  );
};
