import { Ayah } from '../types';
import { AYAT_PART_1 } from './ayatPart1';
import { AYAT_PART_2 } from './ayatPart2';
import { AYAT_PART_3 } from './ayatPart3';
import { AYAT_PART_4 } from './ayatPart4';
import { AYAT_PART_5 } from './ayatPart5';
import { AYAT_PART_6 } from './ayatPart6';
import { AYAT_PART_7 } from './ayatPart7';
import { AYAT_PART_8 } from './ayatPart8';
import { AYAT_PART_9 } from './ayatPart9';
import { AYAT_PART_10 } from './ayatPart10';
import { generate20QuotesForSurah } from './surahQuotesProvider';

export { SURAHS_LIST } from './surahs';
export { CATEGORIES_LIST } from './categories';
export { generate20QuotesForSurah } from './surahQuotesProvider';

// Combine all base verified Ayat entries
export const BASE_AYAT: Ayah[] = [
  ...AYAT_PART_1,
  ...AYAT_PART_2,
  ...AYAT_PART_3,
  ...AYAT_PART_4,
  ...AYAT_PART_5,
  ...AYAT_PART_6,
  ...AYAT_PART_7,
  ...AYAT_PART_8,
  ...AYAT_PART_9,
  ...AYAT_PART_10,
];

// Helper to get exactly 20 quotes (or all verses if totalAyat < 20) for any Surah 1-114
export function getSurahAyat(surahNumber: number): Ayah[] {
  const existing = BASE_AYAT.filter((a) => a.surahNumber === surahNumber);
  return generate20QuotesForSurah(surahNumber, existing);
}

// Global combined list of quotes
export const ALL_AYAT: Ayah[] = BASE_AYAT;

// Helper to get Ayah of the Day based on day of the year
export function getAyahOfTheDay(): Ayah {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = dayOfYear % ALL_AYAT.length;
  return ALL_AYAT[index] || ALL_AYAT[0];
}

// Get Random Ayah
export function getRandomAyah(excludeId?: number): Ayah {
  const available = excludeId ? ALL_AYAT.filter((a) => a.id !== excludeId) : ALL_AYAT;
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex] || ALL_AYAT[0];
}

// Search across Arabic, English, Hinglish, Surah Name, Surah Number, Ayah Number, Category, Tags
export function searchAyat(query: string, ayat: Ayah[] = ALL_AYAT): Ayah[] {
  if (!query || !query.trim()) return ayat;
  const clean = query.trim().toLowerCase();

  // Check if query is in format "2:286" or "2 286"
  const refMatch = clean.match(/^(\d+)[:\s]+(\d+)$/);
  if (refMatch) {
    const sNum = parseInt(refMatch[1], 10);
    const aNum = parseInt(refMatch[2], 10);
    const exact = ayat.filter((a) => a.surahNumber === sNum && a.ayahNumber === aNum);
    if (exact.length > 0) return exact;
  }

  // Check if query is just a single number (match surah number)
  const numOnly = clean.match(/^(\d+)$/);
  if (numOnly) {
    const sNum = parseInt(numOnly[1], 10);
    const bySurahNum = ayat.filter((a) => a.surahNumber === sNum || a.ayahNumber === sNum);
    if (bySurahNum.length > 0) return bySurahNum;
  }

  return ayat.filter((ayah) => {
    return (
      ayah.english.toLowerCase().includes(clean) ||
      ayah.hinglish.toLowerCase().includes(clean) ||
      ayah.arabic.includes(clean) ||
      ayah.surahName.toLowerCase().includes(clean) ||
      ayah.category.toLowerCase().includes(clean) ||
      ayah.tags.some((tag) => tag.toLowerCase().includes(clean)) ||
      `${ayah.surahNumber}:${ayah.ayahNumber}`.includes(clean) ||
      `surah ${ayah.surahName.toLowerCase()}`.includes(clean) ||
      `ayah ${ayah.ayahNumber}`.includes(clean)
    );
  });
}

// Get Ayat by category
export function getAyatByCategory(category: string): Ayah[] {
  return ALL_AYAT.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}

// Get Ayat by Surah Number
export function getAyatBySurah(surahNumber: number): Ayah[] {
  return ALL_AYAT.filter((a) => a.surahNumber === surahNumber);
}

// Get Related Ayat for a given Ayah
export function getRelatedAyat(target: Ayah, limit: number = 4): Ayah[] {
  return ALL_AYAT.filter(
    (a) =>
      a.id !== target.id &&
      (a.category === target.category || a.surahNumber === target.surahNumber)
  ).slice(0, limit);
}
