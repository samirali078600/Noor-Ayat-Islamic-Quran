import React, { useState } from 'react';
import { Download, X, Sparkles } from 'lucide-react';
import { APP_LOGO } from '../assets/logo';

interface InstallBannerProps {
  onOpenInstall: () => void;
  isInstalled: boolean;
}

export const InstallBanner: React.FC<InstallBannerProps> = ({ onOpenInstall, isInstalled }) => {
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled || dismissed) return null;

  return (
    <aside
      id="bottom-install-banner"
      aria-label="Install App Prompt"
      className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-white/95 dark:bg-[#0A2016]/95 backdrop-blur-md p-3.5 sm:p-4 rounded-3xl border border-[#D4AF37]/40 shadow-xl shadow-black/15 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative w-11 h-11 rounded-2xl p-0.5 bg-gradient-to-tr from-[#D4AF37] via-[#F3E5AB] to-[#1B4332] shadow-sm shrink-0 overflow-hidden">
          <img
            src={APP_LOGO}
            alt="Noor Ayat Logo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-[14px]"
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1B4332] dark:text-[#D4AF37] truncate">
              Install Noor Ayat App
            </h4>
            <Sparkles className="w-3 h-3 text-[#D4AF37] shrink-0" />
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
            Offline quotes, audio & 114 Surahs
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          id="btn-install-app-banner"
          onClick={onOpenInstall}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#1B4332] hover:bg-[#133326] dark:bg-[#D4AF37] dark:hover:bg-[#c5a028] text-white dark:text-[#0A2016] text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install</span>
        </button>
        <button
          id="btn-dismiss-install-banner"
          onClick={() => setDismissed(true)}
          title="Dismiss"
          className="p-1.5 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
