import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Sparkles, Check } from 'lucide-react';
import { Ayah, CardTheme } from '../types';

interface CardDownloadModalProps {
  ayah: Ayah | null;
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string) => void;
}

const THEMES: CardTheme[] = [
  {
    id: 'emerald',
    name: 'Emerald & Gold',
    bg: '#042f2e', // deep emerald
    accent: '#d97706', // gold
    textArabic: '#fef08a',
    textEnglish: '#f8fafc',
    textHinglish: '#99f6e4',
    badgeBg: '#134e4a',
    badgeText: '#fde047',
    border: '#0d9488',
    patternColor: 'rgba(217, 119, 6, 0.15)',
  },
  {
    id: 'midnight',
    name: 'Midnight Navy',
    bg: '#090d16',
    accent: '#38bdf8',
    textArabic: '#bae6fd',
    textEnglish: '#f8fafc',
    textHinglish: '#cbd5e1',
    badgeBg: '#1e293b',
    badgeText: '#7dd3fc',
    border: '#0284c7',
    patternColor: 'rgba(56, 189, 248, 0.12)',
  },
  {
    id: 'sand',
    name: 'Desert Warm',
    bg: '#fdfbf7',
    accent: '#b45309',
    textArabic: '#78350f',
    textEnglish: '#1c1917',
    textHinglish: '#78716c',
    badgeBg: '#fef3c7',
    badgeText: '#92400e',
    border: '#d97706',
    patternColor: 'rgba(180, 83, 9, 0.08)',
  },
  {
    id: 'noir',
    name: 'Obsidian Noir',
    bg: '#121212',
    accent: '#fbbf24',
    textArabic: '#ffffff',
    textEnglish: '#e2e8f0',
    textHinglish: '#94a3b8',
    badgeBg: '#27272a',
    badgeText: '#fbbf24',
    border: '#52525b',
    patternColor: 'rgba(251, 191, 36, 0.1)',
  },
];

export const CardDownloadModal: React.FC<CardDownloadModalProps> = ({
  ayah,
  isOpen,
  onClose,
  showToast,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<CardTheme>(THEMES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawCard = useCallback(() => {
    if (!ayah) return;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const theme = selectedTheme;
    const isLight = theme.id === 'sand';

    // 1. Background Fill
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, 1080, 1920);

    // 2. Subtle Geometric Decorative Background Lines
    ctx.strokeStyle = theme.patternColor;
    ctx.lineWidth = 2;
    for (let i = -1000; i < 2500; i += 80) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 1920, 1920);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(i + 1920, 0);
      ctx.lineTo(i, 1920);
      ctx.stroke();
    }

    // 3. Elegant Outer Border Frame
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, 960, 1800);

    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(80, 80, 920, 1760);

    // Corner Ornaments
    const drawCorner = (x: number, y: number) => {
      ctx.fillStyle = theme.accent;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCorner(80, 80);
    drawCorner(1000, 80);
    drawCorner(80, 1840);
    drawCorner(1000, 1840);

    // 4. Header: Noor Ayat Branding & Surah Badge
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // App Name
    ctx.font = '600 32px "Cinzel", "Plus Jakarta Sans", serif';
    ctx.fillStyle = theme.accent;
    ctx.fillText('NOOR AYAT', 540, 140);

    ctx.font = '400 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = isLight ? '#78716c' : '#94a3b8';
    ctx.fillText('LIGHT IN THE WORDS OF ALLAH', 540, 180);

    // Divider
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(440, 215);
    ctx.lineTo(640, 215);
    ctx.stroke();

    // Bismillah
    ctx.font = '400 38px "Amiri", "Scheherazade New", serif';
    ctx.fillStyle = theme.accent;
    ctx.fillText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 540, 280);

    // Category & Surah Badge Box
    const badgeText = `SURAH ${ayah.surahName.toUpperCase()} • ${ayah.surahNumber}:${ayah.ayahNumber}`;
    ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
    const badgeWidth = ctx.measureText(badgeText).width + 60;

    ctx.fillStyle = theme.badgeBg;
    ctx.beginPath();
    ctx.roundRect(540 - badgeWidth / 2, 340, badgeWidth, 54, 27);
    ctx.fill();
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = theme.badgeText;
    ctx.fillText(badgeText, 540, 367);

    // 5. Arabic Ayah Text (RTL Multi-line wrapping)
    ctx.font = 'bold 50px "Amiri", "Scheherazade New", serif';
    ctx.fillStyle = theme.textArabic;
    ctx.direction = 'rtl';
    ctx.textAlign = 'center';

    const arabicWords = ayah.arabic.split(' ');
    let currentLine = '';
    const arabicLines: string[] = [];
    const maxArabicWidth = 840;

    for (let n = 0; n < arabicWords.length; n++) {
      const testLine = currentLine + (currentLine ? ' ' : '') + arabicWords[n];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxArabicWidth && n > 0) {
        arabicLines.push(currentLine);
        currentLine = arabicWords[n];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) arabicLines.push(currentLine);

    let startY = 480;
    const arabicLineHeight = 90;
    arabicLines.forEach((line) => {
      ctx.fillText(line, 540, startY);
      startY += arabicLineHeight;
    });

    // Decorative Separator
    startY += 20;
    ctx.direction = 'ltr';
    ctx.textAlign = 'center';
    ctx.font = '400 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = theme.accent;
    ctx.fillText('✦ ✦ ✦', 540, startY);
    startY += 50;

    // 6. English Translation
    ctx.font = '500 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = theme.textEnglish;

    const englishWords = `"${ayah.english}"`.split(' ');
    currentLine = '';
    const englishLines: string[] = [];
    const maxEngWidth = 840;

    for (let n = 0; n < englishWords.length; n++) {
      const testLine = currentLine + (currentLine ? ' ' : '') + englishWords[n];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxEngWidth && n > 0) {
        englishLines.push(currentLine);
        currentLine = englishWords[n];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) englishLines.push(currentLine);

    const engLineHeight = 48;
    englishLines.forEach((line) => {
      ctx.fillText(line, 540, startY);
      startY += engLineHeight;
    });

    // 7. Hinglish Explanation Box
    startY += 40;
    const hinglishBoxY = startY;
    ctx.font = 'italic 26px "Plus Jakarta Sans", sans-serif';
    const hinglishWords = `Hinglish: ${ayah.hinglish}`.split(' ');
    currentLine = '';
    const hinglishLines: string[] = [];
    const maxHingWidth = 800;

    for (let n = 0; n < hinglishWords.length; n++) {
      const testLine = currentLine + (currentLine ? ' ' : '') + hinglishWords[n];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxHingWidth && n > 0) {
        hinglishLines.push(currentLine);
        currentLine = hinglishWords[n];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) hinglishLines.push(currentLine);

    const hinglishBoxHeight = hinglishLines.length * 40 + 40;
    ctx.fillStyle = isLight ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.04)';
    ctx.beginPath();
    ctx.roundRect(100, hinglishBoxY, 880, hinglishBoxHeight, 16);
    ctx.fill();
    ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';
    ctx.stroke();

    ctx.fillStyle = theme.textHinglish;
    let hingStartY = hinglishBoxY + 36;
    hinglishLines.forEach((line) => {
      ctx.fillText(line, 540, hingStartY);
      hingStartY += 40;
    });

    // 8. Footer info
    ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = isLight ? '#78716c' : '#94a3b8';
    ctx.fillText('Reflect • Remember • Return to Allah', 540, 1720);

    ctx.font = '600 24px "Cinzel", "Plus Jakarta Sans", serif';
    ctx.fillStyle = theme.accent;
    ctx.fillText('noorayat.app', 540, 1760);

    // Set preview URL
    const url = canvas.toDataURL('image/png');
    setPreviewUrl(url);
  }, [ayah, selectedTheme]);

  useEffect(() => {
    if (isOpen && ayah) {
      setTimeout(drawCard, 50);
    }
  }, [isOpen, ayah, selectedTheme, drawCard]);

  if (!isOpen || !ayah) return null;

  const handleDownload = () => {
    if (!previewUrl) return;
    setIsGenerating(true);
    try {
      const link = document.createElement('a');
      link.download = `NoorAyat-${ayah.surahName}-${ayah.surahNumber}_${ayah.ayahNumber}.png`;
      link.href = previewUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Image downloaded successfully ✓');
    } catch {
      showToast('Could not download image.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-stone-900 rounded-3xl shadow-2xl overflow-hidden border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row"
        >
          {/* Header on mobile */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-800">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2 text-base">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Download 9:16 Social Story Card
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Left / Preview Area */}
          <div className="flex-1 bg-[#F5EFE6]/60 dark:bg-[#071911] p-6 flex flex-col items-center justify-center overflow-y-auto">
            <div className="relative w-[240px] h-[426px] sm:w-[280px] sm:h-[498px] rounded-3xl shadow-2xl overflow-hidden border-4 border-[#1B4332]/20 dark:border-[#D4AF37]/30 shrink-0 bg-stone-900">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Story card preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm">
                  Generating card...
                </div>
              )}
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-3 text-center">
              1080 × 1920 High-Res • Ready for Instagram Stories & WhatsApp Status
            </p>
          </div>

          {/* Right / Controls Area */}
          <div className="w-full md:w-80 lg:w-96 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#1B4332]/10 dark:border-[#D4AF37]/20 bg-white dark:bg-[#0D261B]">
            <div>
              <div className="hidden md:flex items-center justify-between mb-6">
                <h3 className="font-serif font-bold text-[#1B4332] dark:text-stone-100 text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  Custom Card Generator
                </h3>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-2xl hover:bg-[#F5EFE6] dark:hover:bg-[#153828] text-stone-500 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 block font-serif">
                    Choose Theme Style
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {THEMES.map((th) => {
                      const isSelected = selectedTheme.id === th.id;
                      return (
                        <button
                          key={th.id}
                          onClick={() => setSelectedTheme(th)}
                          className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#D4AF37] bg-[#F5EFE6] dark:bg-[#153828] ring-2 ring-[#D4AF37]/30'
                              : 'border-[#1B4332]/10 dark:border-[#D4AF37]/20 hover:bg-[#F5EFE6]/50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-4 h-4 rounded-full border border-stone-400/30 shrink-0 shadow-2xs"
                              style={{ backgroundColor: th.bg }}
                            />
                            <span className="text-xs font-bold text-[#1B4332] dark:text-stone-200">
                              {th.name}
                            </span>
                          </div>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F5EFE6]/50 dark:bg-[#0A2016] border border-[#1B4332]/10 dark:border-[#D4AF37]/20">
                  <div className="text-xs font-bold text-stone-600 dark:text-stone-400 flex items-center justify-between mb-1">
                    <span>Surah {ayah.surahName}</span>
                    <span>Ayah {ayah.ayahNumber}</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 italic">
                    "{ayah.english}"
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100 dark:border-stone-800 space-y-2.5">
              <button
                onClick={handleDownload}
                disabled={isGenerating || !previewUrl}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#1B4332] dark:bg-[#D4AF37] hover:bg-[#133326] dark:hover:bg-[#c5a028] active:scale-[0.98] text-white dark:text-[#0A2016] rounded-2xl font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isGenerating ? 'Exporting Card...' : 'Download 9:16 PNG Card'}</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors cursor-pointer font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
