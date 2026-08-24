/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, Ayah, CategoryType } from './types';
import { useTheme } from './hooks/useTheme';
import { useBookmarks } from './hooks/useBookmarks';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { SearchModal } from './components/SearchModal';
import { ShareModal } from './components/ShareModal';
import { CardDownloadModal } from './components/CardDownloadModal';
import { DetailModal } from './components/DetailModal';
import { ScrollToTop } from './components/ScrollToTop';

import { HomeView } from './views/HomeView';
import { QuotesView } from './views/QuotesView';
import { CategoriesView } from './views/CategoriesView';
import { SurahsView } from './views/SurahsView';
import { SavedView } from './views/SavedView';
import { RandomView } from './views/RandomView';
import { AboutView } from './views/AboutView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter states passed between views
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [quotesSearchQuery, setQuotesSearchQuery] = useState<string>('');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedAyahForDetail, setSelectedAyahForDetail] = useState<Ayah | null>(null);
  const [selectedAyahForShare, setSelectedAyahForShare] = useState<Ayah | null>(null);
  const [selectedAyahForDownload, setSelectedAyahForDownload] = useState<Ayah | null>(null);

  const { theme, toggleTheme } = useTheme();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const { savedIds, savedAyat, isSaved, toggleSave, clearAllSaved, savedCount } = useBookmarks(showToast);

  // Handlers for cross-view navigation
  const handleSelectCategoryFromHome = (cat: CategoryType) => {
    setSelectedCategory(cat);
    setActiveTab('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSurahFromHome = (surahNumber: number) => {
    setSelectedSurah(surahNumber);
    setActiveTab('surahs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToQuotesWithSearch = (query?: string) => {
    if (query) setQuotesSearchQuery(query);
    setActiveTab('quotes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        savedCount={savedCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={handleTabChange}
            onSelectCategory={handleSelectCategoryFromHome}
            onSelectSurah={handleSelectSurahFromHome}
            onSelectAyah={(ayah) => setSelectedAyahForDetail(ayah)}
            isSaved={isSaved}
            onToggleSave={toggleSave}
            onShare={(ayah) => setSelectedAyahForShare(ayah)}
            onDownload={(ayah) => setSelectedAyahForDownload(ayah)}
            onOpenSearch={() => setIsSearchOpen(true)}
            showToast={showToast}
          />
        )}

        {activeTab === 'quotes' && (
          <QuotesView
            initialSearch={quotesSearchQuery}
            initialCategory={selectedCategory}
            initialSurah={selectedSurah}
            isSaved={isSaved}
            onToggleSave={toggleSave}
            onShare={(ayah) => setSelectedAyahForShare(ayah)}
            onDownload={(ayah) => setSelectedAyahForDownload(ayah)}
            onSelectAyah={(ayah) => setSelectedAyahForDetail(ayah)}
            showToast={showToast}
          />
        )}

        {activeTab === 'categories' && (
          <CategoriesView
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            selectedCategory={selectedCategory}
            onClearCategory={() => setSelectedCategory(null)}
            isSaved={isSaved}
            onToggleSave={toggleSave}
            onShare={(ayah) => setSelectedAyahForShare(ayah)}
            onDownload={(ayah) => setSelectedAyahForDownload(ayah)}
            onSelectAyah={(ayah) => setSelectedAyahForDetail(ayah)}
            showToast={showToast}
          />
        )}

        {activeTab === 'surahs' && (
          <SurahsView
            selectedSurahNumber={selectedSurah}
            onSelectSurah={(num) => setSelectedSurah(num)}
            onClearSurah={() => setSelectedSurah(null)}
            isSaved={isSaved}
            onToggleSave={toggleSave}
            onShare={(ayah) => setSelectedAyahForShare(ayah)}
            onDownload={(ayah) => setSelectedAyahForDownload(ayah)}
            onSelectAyah={(ayah) => setSelectedAyahForDetail(ayah)}
            showToast={showToast}
          />
        )}

        {activeTab === 'saved' && (
          <SavedView
            savedAyat={savedAyat}
            onToggleSave={toggleSave}
            onClearAllSaved={clearAllSaved}
            onShare={(ayah) => setSelectedAyahForShare(ayah)}
            onDownload={(ayah) => setSelectedAyahForDownload(ayah)}
            onSelectAyah={(ayah) => setSelectedAyahForDetail(ayah)}
            setActiveTab={handleTabChange}
            showToast={showToast}
          />
        )}

        {activeTab === 'random' && (
          <RandomView
            isSaved={isSaved}
            onToggleSave={toggleSave}
            onShare={(ayah) => setSelectedAyahForShare(ayah)}
            onDownload={(ayah) => setSelectedAyahForDownload(ayah)}
            onSelectAyah={(ayah) => setSelectedAyahForDetail(ayah)}
            showToast={showToast}
          />
        )}

        {activeTab === 'about' && <AboutView showToast={showToast} />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={handleTabChange} />

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        savedCount={savedCount}
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAyah={(ayah) => {
          setSelectedAyahForDetail(ayah);
        }}
        onNavigateToQuotes={handleNavigateToQuotesWithSearch}
      />

      {/* Quote Detail Modal */}
      <DetailModal
        ayah={selectedAyahForDetail}
        isOpen={!!selectedAyahForDetail}
        onClose={() => setSelectedAyahForDetail(null)}
        isSaved={selectedAyahForDetail ? isSaved(selectedAyahForDetail.id) : false}
        onToggleSave={toggleSave}
        onShare={(ayah) => setSelectedAyahForShare(ayah)}
        onDownload={(ayah) => setSelectedAyahForDownload(ayah)}
        onSelectAyah={(ayah) => setSelectedAyahForDetail(ayah)}
        showToast={showToast}
      />

      {/* Share Modal */}
      <ShareModal
        ayah={selectedAyahForShare}
        isOpen={!!selectedAyahForShare}
        onClose={() => setSelectedAyahForShare(null)}
        showToast={showToast}
      />

      {/* 9:16 Social Story Card Download Modal */}
      <CardDownloadModal
        ayah={selectedAyahForDownload}
        isOpen={!!selectedAyahForDownload}
        onClose={() => setSelectedAyahForDownload(null)}
        showToast={showToast}
      />
    </div>
  );
}
