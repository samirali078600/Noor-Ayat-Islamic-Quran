import React, { useState } from 'react';
import { Sparkles, Heart, ShieldCheck, BookOpen, Send, Check } from 'lucide-react';

interface AboutViewProps {
  showToast: (msg: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ showToast }) => {
  const [feedback, setFeedback] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.message.trim()) return;
    setSubmitted(true);
    showToast('Jazakallah Khair! Your message has been received.');
    setTimeout(() => {
      setFeedback({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Hero Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EFE6] dark:bg-[#153828] text-[#1B4332] dark:text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>About Noor Ayat</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1B4332] dark:text-stone-50">
          Light in the Words of Allah
        </h1>
        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 mt-2 max-w-2xl mx-auto">
          A modern, peaceful, and accessible Quran quotes platform designed for daily spiritual reflection in English and simple Hinglish.
        </p>
      </div>

      {/* Mission & Content Integrity Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D261B] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-[#F5EFE6] dark:bg-[#153828] text-[#1B4332] dark:text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#1B4332] dark:text-stone-100">
            Our Purpose
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            Many young Muslims and seekers around the world search for Quranic guidance in moments of hardship, anxiety, joy, or decision-making. <strong>Noor Ayat</strong> brings together hundreds of powerful Quranic verses categorized by everyday human experiences—such as patience (Sabr), trust (Tawakkul), forgiveness, family, and hope.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D261B] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-[#F5EFE6] dark:bg-[#153828] text-[#1B4332] dark:text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#1B4332] dark:text-stone-100">
            Authenticity & Methodology
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            Every entry maintains a strict separation between:
          </p>
          <ul className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 space-y-1.5 list-disc pl-4">
            <li><strong>Authentic Arabic text:</strong> Preserved in authentic Uthmanic script.</li>
            <li><strong>Verified English translations:</strong> Standard translations (Saheeh International / Clear Quran).</li>
            <li><strong>Simple Hinglish meaning:</strong> Conversational context designed to help readers grasp the practical reflection immediately.</li>
          </ul>
        </div>
      </div>

      {/* Privacy & Technology Guarantees */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#F5EFE6]/60 dark:bg-[#0A2016] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 space-y-4">
        <h3 className="font-serif text-lg font-bold text-[#1B4332] dark:text-stone-100 flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#D4AF37] fill-current" />
          Private, Fast & Client-Side
        </h3>
        <div className="grid sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0D261B] border border-[#1B4332]/10 dark:border-[#D4AF37]/20">
            <h4 className="font-bold text-xs text-[#1B4332] dark:text-[#D4AF37] mb-1">No Logins Required</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Browse freely. Your bookmarks and theme choices are stored privately in your browser's localStorage.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0D261B] border border-[#1B4332]/10 dark:border-[#D4AF37]/20">
            <h4 className="font-bold text-xs text-[#1B4332] dark:text-[#D4AF37] mb-1">Story Card Generator</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Export 1080x1920 high-res social story cards completely inside your device without sending data anywhere.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0D261B] border border-[#1B4332]/10 dark:border-[#D4AF37]/20">
            <h4 className="font-bold text-xs text-[#1B4332] dark:text-[#D4AF37] mb-1">Zero Ads or Tracking</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Pure spiritual experience with no third-party tracking scripts or intrusive advertisements.
            </p>
          </div>
        </div>
      </div>

      {/* Feedback / Suggestions Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D261B] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 shadow-xs">
        <h3 className="font-serif text-lg font-bold text-[#1B4332] dark:text-stone-100 mb-1">
          Suggestions & Corrections
        </h3>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-6">
          Notice a typo or want to suggest a Quranic theme? We value your feedback.
        </p>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-[#F5EFE6] dark:bg-[#153828]/60 border border-[#D4AF37]/30 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#1B4332] text-[#D4AF37] flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#1B4332] dark:text-[#D4AF37]">
              Jazakallah Khair for your submission!
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300">
              May Allah reward you for helping make Noor Ayat better.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={feedback.name}
                  onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                  placeholder="e.g. Abdullah"
                  className="w-full p-3 rounded-2xl bg-[#F5EFE6]/50 dark:bg-[#0A2016] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 text-xs text-stone-900 dark:text-stone-100 outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">
                  Your Email (Optional)
                </label>
                <input
                  type="email"
                  value={feedback.email}
                  onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                  placeholder="e.g. name@example.com"
                  className="w-full p-3 rounded-2xl bg-[#F5EFE6]/50 dark:bg-[#0A2016] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 text-xs text-stone-900 dark:text-stone-100 outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">
                Message / Suggested Ayah / Correction <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={feedback.message}
                onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                placeholder="Write your feedback, correction, or verse suggestion..."
                className="w-full p-3 rounded-2xl bg-[#F5EFE6]/50 dark:bg-[#0A2016] border border-[#1B4332]/10 dark:border-[#D4AF37]/20 text-xs text-stone-900 dark:text-stone-100 outline-none focus:border-[#D4AF37] resize-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1B4332] dark:bg-[#D4AF37] hover:bg-[#133326] dark:hover:bg-[#c5a028] text-white dark:text-[#0A2016] font-bold text-xs rounded-2xl shadow-md transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Feedback</span>
            </button>
          </form>
        )}
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-4 rounded-3xl bg-[#F5EFE6] dark:bg-[#153828]/60 border border-[#1B4332]/10 dark:border-[#D4AF37]/30 text-xs text-stone-700 dark:text-stone-300 leading-relaxed text-center">
        <strong>Important Note:</strong> The Arabic text is the true word of Allah (SWT). All English translations and Hinglish meanings are human efforts to convey the message. For deep scholarly rulings (Fiqh and Tafsir), please consult qualified Islamic scholars and classical Tafsir works (such as Ibn Kathir, As-Sa'di, and Ma'ariful Quran).
      </div>
    </div>
  );
};
