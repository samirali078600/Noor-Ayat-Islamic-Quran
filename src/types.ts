export type CategoryType =
  | 'Sabr & Patience'
  | 'Tawakkul'
  | 'Imaan & Faith'
  | 'Dua'
  | 'Forgiveness'
  | "Allah's Mercy"
  | 'Hope'
  | 'Hard Times'
  | 'Rizq'
  | 'Parents'
  | 'Family'
  | 'Prayer'
  | 'Guidance'
  | 'Jannah'
  | 'Akhirah'
  | 'Ramadan'
  | 'Gratitude'
  | 'Justice'
  | 'Kindness'
  | 'Repentance';

export interface Ayah {
  id: number;
  surahNumber: number;
  surahName: string;
  surahNameArabic: string;
  ayahNumber: number;
  arabic: string;
  english: string;
  hinglish: string;
  category: CategoryType;
  tags: string[];
  popular?: boolean;
  featured?: boolean;
}

export interface Surah {
  number: number;
  name: string;
  arabicName: string;
  meaning: string;
  totalAyat: number;
  revelation: 'Meccan' | 'Medinan';
}

export interface CategoryInfo {
  id: CategoryType;
  name: CategoryType;
  arabic: string;
  description: string;
  icon: string;
  color: string;
  bgGrad: string;
}

export type ActiveTab = 'home' | 'quotes' | 'categories' | 'surahs' | 'saved' | 'random' | 'about';

export interface CardTheme {
  id: string;
  name: string;
  bg: string;
  accent: string;
  textArabic: string;
  textEnglish: string;
  textHinglish: string;
  badgeBg: string;
  badgeText: string;
  border: string;
  patternColor: string;
}
