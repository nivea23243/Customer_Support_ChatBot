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

  // Bot messages are rendered as a single chat bubble. Paragraph spacing is handled by Markdown.
  const blocks = [message.content];

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
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ed811e] to-[#f59e0b] flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20 border border-white/10 mt-1">
          <Sparkles size={18} className="text-white" />
        </div>
      )}
      
      <div className={cn(
        "flex flex-col gap-2 max-w-[85%]",
        isBot ? "items-start" : "items-end"
      )}>
        {blocks.map((blockText, index) => {
          const isFirst = index === 0;
          return (
            <div
              key={index}
              className={cn(
                "px-5 py-3.5 text-[13px] leading-relaxed transition-all break-words overflow-hidden relative group font-medium shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)] border",
                isBot 
                  ? "bg-white text-slate-700 border-slate-100 rounded-[1.25rem]" 
                  : "bg-gradient-to-tr from-[#003B71] to-[#0a5494] text-white border-white/5 rounded-[1.25rem]",
                // Visual "tail" only on the first bubble of the group
                isBot && isFirst && "rounded-tl-none",
                !isBot && isFirst && "rounded-tr-none"
              )}
            >
              <div className={cn("prose prose-sm max-w-none [word-break:break-word] overflow-wrap-anywhere font-medium [&>p:not(:last-child)]:mb-4", isBot ? "text-slate-600" : "text-white prose-invert")}>
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
                          isBot ? "text-[#003B71] hover:text-[#ed811e]" : "text-orange-300 hover:text-orange-200"
                        )} 
                      />
                    )
                  }}
                >
                  {blockText}
                </Markdown>
              </div>
            </div>
          );
        })}
        
        <div className={cn(
          "text-[8px] mt-1 font-bold flex items-center gap-1.5 uppercase tracking-widest px-1",
          isBot ? "text-slate-350" : "text-white/60"
        )}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {!isBot && (
        <div className="w-10 h-10 rounded-xl bg-[#003B71] flex items-center justify-center shrink-0 shadow-md shadow-[#003B71]/20 border border-white/5 mt-1">
          <User size={18} className="text-white" />
        </div>
      )}
    </motion.div>
  );
};
