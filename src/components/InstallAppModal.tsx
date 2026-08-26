import React, { useState } from 'react';
import { X, Download, Smartphone, Check, Sparkles, Share, PlusSquare, Monitor, ExternalLink, Copy, CheckCheck } from 'lucide-react';
import { APP_LOGO } from '../assets/logo';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isInIframe?: boolean;
  onInstall: () => Promise<boolean>;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  isInstalled,
  isInIframe = false,
  onInstall,
}) => {
  const [copied, setCopied] = useState(false);
  const [installStatus, setInstallStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const isIOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as unknown as { MSStream?: boolean }).MSStream;

  const handleInstallClick = async () => {
    if (isInstallable) {
      setInstallStatus('Opening installation prompt...');
      const success = await onInstall();
      if (success) {
        setInstallStatus('App installed successfully!');
        setTimeout(() => onClose(), 1200);
      } else {
        setInstallStatus(null);
      }
    } else {
      // If prompt is not ready or blocked by iframe, open full window
      window.open(window.location.href, '_blank');
      setInstallStatus('Opened in browser. Tap menu (⋮) -> Install App.');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="install-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="install-modal-content"
        className="relative w-full max-w-md bg-white dark:bg-[#0A2016] rounded-3xl border border-[#1B4332]/20 dark:border-[#D4AF37]/30 shadow-2xl p-6 sm:p-8 text-center overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Accent Bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] rounded-b-full shadow-md" />

        {/* Close Button */}
        <button
          id="btn-close-install-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* App Logo Display */}
        <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-3xl p-1 bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#1B4332] shadow-xl mb-4 relative group">
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
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mb-5">
          Access 114 Surahs, daily Quran quotes, Hinglish reflections, and audio anytime offline on your home screen.
        </p>

        {isInstalled ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2">
            <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Noor Ayat is already installed on your device!</span>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Primary Action Button */}
            {isInIframe ? (
              <div className="space-y-2">
                <button
                  id="btn-open-new-tab-install"
                  onClick={handleInstallClick}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] hover:from-[#143427] hover:to-[#21513C] dark:from-[#D4AF37] dark:to-[#B89628] dark:hover:from-[#c5a028] dark:hover:to-[#a3801a] text-white dark:text-[#0A2016] font-bold text-sm shadow-lg shadow-[#1B4332]/25 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-[#D4AF37] dark:text-[#0A2016]" />
                  <span>Open in Full Browser Tab to Install</span>
                </button>
                <p className="text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800/40">
                  ⚡ Browsers block 1-click install inside preview frames. Opening in a new tab allows direct installation!
                </p>
              </div>
            ) : (
              <button
                id="btn-confirm-install-app"
                onClick={handleInstallClick}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] hover:from-[#143427] hover:to-[#21513C] dark:from-[#D4AF37] dark:to-[#B89628] dark:hover:from-[#c5a028] dark:hover:to-[#a3801a] text-white dark:text-[#0A2016] font-bold text-sm shadow-lg shadow-[#1B4332]/25 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#D4AF37] dark:text-[#0A2016]" />
                <span>{isInstallable ? '1-Click Install to Home Screen' : 'Install App / Add to Home Screen'}</span>
              </button>
            )}

            {installStatus && (
              <div className="text-xs font-semibold text-[#1B4332] dark:text-[#D4AF37] animate-pulse">
                {installStatus}
              </div>
            )}

            {/* Platform-Specific Step Guide */}
            {isIOS ? (
              <div className="text-left bg-[#F5EFE6] dark:bg-[#071911] p-4 rounded-2xl border border-[#1B4332]/15 dark:border-[#D4AF37]/30 text-xs text-stone-700 dark:text-stone-300 space-y-2">
                <p className="font-bold text-[#1B4332] dark:text-[#D4AF37] flex items-center gap-1.5 text-xs sm:text-sm">
                  <Smartphone className="w-4 h-4" /> Install on iPhone / iPad (Safari):
                </p>
                <ol className="list-decimal list-inside space-y-1.5 text-[12px] leading-relaxed text-stone-600 dark:text-stone-300">
                  <li>
                    Tap the <Share className="w-3.5 h-3.5 inline mx-1 text-sky-600" /> <strong>Share</strong> icon in Safari
                  </li>
                  <li>
                    Scroll down and tap <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-stone-800 dark:text-stone-200" /> <strong>Add to Home Screen</strong>
                  </li>
                  <li>
                    Tap <strong>Add</strong> at top-right to put Noor Ayat on your screen
                  </li>
                </ol>
              </div>
            ) : (
              <div className="text-left bg-[#F5EFE6] dark:bg-[#071911] p-4 rounded-2xl border border-[#1B4332]/15 dark:border-[#D4AF37]/30 text-xs text-stone-700 dark:text-stone-300 space-y-2">
                <p className="font-bold text-[#1B4332] dark:text-[#D4AF37] flex items-center gap-1.5 text-xs sm:text-sm">
                  <Monitor className="w-4 h-4" /> Install on Android / Chrome / Windows:
                </p>
                <ol className="list-decimal list-inside space-y-1.5 text-[12px] leading-relaxed text-stone-600 dark:text-stone-300">
                  <li>
                    Tap your browser menu (three dots <strong>⋮</strong>) in the top-right
                  </li>
                  <li>
                    Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>
                  </li>
                  <li>
                    Tap <strong>Install</strong> to add Noor Ayat directly to your phone apps
                  </li>
                </ol>
              </div>
            )}

            {/* Copy Link Helper */}
            <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-black/30 rounded-2xl border border-stone-200 dark:border-stone-800 text-xs">
              <span className="text-stone-500 truncate mr-2">App URL Link</span>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[#1B4332] dark:text-[#D4AF37] font-semibold text-[11px] hover:bg-stone-50 transition-colors cursor-pointer shrink-0"
              >
                {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        )}

        <div className="mt-5 pt-3 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-400">
          Noor Ayat • Complete Quran Reminders & Surah Wisdom
        </div>
      </div>
    </div>
  );
};
