import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('noor_ayat_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.remove('bg-stone-50', 'text-stone-900');
      document.body.classList.add('bg-stone-950', 'text-stone-100');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('bg-stone-950', 'text-stone-100');
      document.body.classList.add('bg-stone-50', 'text-stone-900');
    }
    localStorage.setItem('noor_ayat_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
}
