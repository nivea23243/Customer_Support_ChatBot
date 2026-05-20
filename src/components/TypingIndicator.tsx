import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="flex w-full gap-3 mb-5 justify-start"
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ed811e] to-[#f59e0b] flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20 border border-white/10">
        <Sparkles size={18} className="text-white animate-pulse" />
      </div>
      
      <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-[1.5rem] rounded-tl-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: ["0%", "-40%", "0%"],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 bg-[#ed811e]/60 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
};
