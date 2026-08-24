import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
        >
          <div className="flex items-center gap-2.5 px-5 py-3 bg-[#1B4332] dark:bg-[#071911] text-[#FDFBF7] dark:text-[#FDFBF7] rounded-full shadow-2xl backdrop-blur-md text-xs sm:text-sm font-bold border border-[#D4AF37]/40">
            {message.includes('✓') || message.includes('Saved') ? (
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-[#D4AF37] shrink-0" />
            )}
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
