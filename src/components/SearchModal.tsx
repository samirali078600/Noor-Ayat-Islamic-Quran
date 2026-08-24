import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { Ayah } from '../types';
import { searchAyat } from '../data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAyah: (ayah: Ayah) => void;
  onNavigateToQuotes: (query?: string) => void;
}

const POPULAR_SEARCHES = [
  'Sabr',
  'Patience',
  'Tawakkul',
  'Allah',
  'Forgiveness',
  'Hope',
  'Baqarah',
  'Ease',
  'Rizq',
  '2:286',
  '94:5',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectAyah,
  onNavigateToQuotes,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Ayah[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const found = searchAyat(query);
    setResults(found.slice(0, 8)); // Top 8 immediate results
  }, [query]);

  // Keyboard shortcut support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto pt-16 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        >
          {/* Search Input Box */}
          <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-[#1B4332]/10 dark:border-[#D4AF37]/20 bg-[#F5EFE6]/50 dark:bg-[#0A2016]">
            <Search className="w-5 h-5 text-[#1B4332] dark:text-[#D4AF37] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search an ayah, Surah (e.g. Baqarah, 2:286) or topic (e.g. sabr, hope)..."
              className="flex-1 bg-transparent text-stone-900 dark:text-stone-100 placeholder-stone-400 text-sm sm:text-base outline-none font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-2xl hover:bg-[#F5EFE6] dark:hover:bg-[#153828] text-stone-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filter Suggestion Chips */}
          {!query && (
            <div className="p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5 flex items-center gap-1.5 font-serif">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Popular Topics & Queries
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => setQuery(keyword)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#F5EFE6] dark:bg-[#153828] text-[#1B4332] dark:text-[#D4AF37] hover:bg-[#1B4332]/10 dark:hover:bg-[#1B4332]/40 transition-colors border border-[#1B4332]/10 dark:border-[#D4AF37]/25 cursor-pointer"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query && (
            <div className="p-3 sm:p-4 max-h-[60vh] overflow-y-auto">
              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((ayah) => (
                    <div
                      key={ayah.id}
                      onClick={() => {
                        onSelectAyah(ayah);
                        onClose();
                      }}
                      className="p-3.5 rounded-2xl bg-white dark:bg-[#0D261B] hover:bg-[#F5EFE6] dark:hover:bg-[#153828] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[#1B4332] dark:text-[#D4AF37]">
                            Surah {ayah.surahName} {ayah.surahNumber}:{ayah.ayahNumber}
                          </span>
                          <span className="text-xs text-stone-400">• {ayah.category}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 line-clamp-1 font-medium font-serif">
                          "{ayah.english}"
                        </p>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 italic mt-0.5">
                          Hinglish: {ayah.hinglish}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                        <span className="font-arabic text-sm text-[#1B4332] dark:text-[#D4AF37] hidden sm:inline">
                          {ayah.arabic.slice(0, 20)}...
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}

                  {/* View all in quotes page */}
                  <div className="pt-2 text-center">
                    <button
                      onClick={() => {
                        onNavigateToQuotes(query);
                        onClose();
                      }}
                      className="w-full py-2.5 px-4 text-xs font-bold text-[#1B4332] dark:text-[#D4AF37] hover:bg-[#F5EFE6] dark:hover:bg-[#153828] rounded-2xl transition-colors cursor-pointer"
                    >
                      View all results for "{query}" →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <BookOpen className="w-8 h-8 text-stone-300 dark:text-stone-600 mx-auto mb-3" />
                  <p className="text-sm font-bold text-[#1B4332] dark:text-stone-300 font-serif">
                    No results found for "{query}"
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm mx-auto">
                    Try searching for general keywords like "sabr", "dua", "mercy", "peace", or a Surah reference like "2:286".
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
