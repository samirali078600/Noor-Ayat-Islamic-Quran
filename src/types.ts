export type CategoryType =
  | 'Sabr & Patience'
  | 'Patience & Sabr'
  | 'Tawakkul'
  | 'Trust in Allah (Tawakkul)'
  | 'Imaan & Faith'
  | 'Dua'
  | 'Supplication & Dua'
  | 'Forgiveness'
  | 'Forgiveness (Tawbah)'
  | "Allah's Mercy"
  | 'Mercy & Rahmah'
  | 'Hope'
  | 'Hope & Good News'
  | 'Hard Times'
  | 'Rizq'
  | 'Rizq & Wealth'
  | 'Parents'
  | 'Family'
  | 'Prayer'
  | 'Prayer & Salah'
  | 'Guidance'
  | 'Jannah'
  | 'Akhirah'
  | 'Hereafter (Akhirah)'
  | 'Ramadan'
  | 'Gratitude'
  | 'Gratitude & Shukr'
  | 'Justice'
  | 'Justice & Rights'
  | 'Kindness'
  | 'Repentance'
  | 'Good Character & Akhlaq'
  | 'Peace & Contentment'
  | 'Spiritual Growth'
  | 'Love of Allah'
  | 'Nature & Reflection';

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
