import { useState, useEffect } from 'react';
import { Ayah } from '../types';
import { ALL_AYAT } from '../data';

const STORAGE_KEY = 'noor_ayat_saved_ids';

export function useBookmarks(showToast?: (msg: string) => void) {
  const [savedIds, setSavedIds] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [1, 14, 22, 30, 49, 53]; // default initial favorites
      } catch {
        return [1, 14, 22, 30];
      }
    }
    return [1, 14, 22, 30];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // ignore storage errors
    }
  }, [savedIds]);

  const isSaved = (id: number) => savedIds.includes(id);

  const toggleSave = (ayah: Ayah) => {
    setSavedIds((prev) => {
      const exists = prev.includes(ayah.id);
      if (exists) {
        if (showToast) showToast('Removed from saved.');
        return prev.filter((id) => id !== ayah.id);
      } else {
        if (showToast) showToast('Saved to your collection.');
        return [ayah.id, ...prev];
      }
    });
  };

  const clearAllSaved = () => {
    setSavedIds([]);
    if (showToast) showToast('All saved quotes cleared.');
  };

  const savedAyat = ALL_AYAT.filter((a) => savedIds.includes(a.id));

  return {
    savedIds,
    savedAyat,
    isSaved,
    toggleSave,
    clearAllSaved,
    savedCount: savedIds.length,
  };
}
