import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'motion/react';
import { Sparkles, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.role === 'model';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full gap-3 mb-5",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ed811e] to-[#f59e0b] flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20 border border-white/10">
          <Sparkles size={18} className="text-white" />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[85%] px-5 py-4 text-[13px] leading-relaxed transition-all break-words overflow-hidden relative group font-medium",
          isBot 
            ? "bg-white/5 text-slate-200 border border-white/10 rounded-[1.5rem] rounded-tl-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)]" 
            : "bg-gradient-to-tr from-[#003B71] to-[#0a5494] text-white rounded-[1.5rem] rounded-tr-none shadow-[0_8px_20px_-6px_rgba(0,39,113,0.35)] border border-white/5"
        )}
      >
        <div className={cn("prose prose-sm max-w-none [word-break:break-word] overflow-wrap-anywhere font-medium", isBot ? "text-slate-300 prose-invert" : "text-white prose-invert")}>
          <Markdown 
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => (
                <a 
                  {...props} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={cn(
                    "underline underline-offset-4 font-bold transition-colors",
                    isBot ? "text-orange-400 hover:text-orange-300" : "text-orange-300 hover:text-orange-200"
                  )} 
                />
              )
            }}
          >
            {message.content}
          </Markdown>
        </div>
        <div className={cn(
          "text-[8px] mt-2.5 font-bold flex items-center gap-1.5 uppercase tracking-widest",
          isBot ? "text-slate-500" : "text-white/60"
        )}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {!isBot && (
        <div className="w-10 h-10 rounded-xl bg-[#003B71] flex items-center justify-center shrink-0 shadow-md shadow-[#003B71]/20 border border-white/5">
          <User size={18} className="text-white" />
        </div>
      )}
    </motion.div>
  );
};
