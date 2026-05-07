import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'motion/react';
import { Bot, User } from 'lucide-react';
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
        "flex w-full gap-3 mb-6",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <div className="w-10 h-10 rounded-xl bg-[#dbeafe] flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
          <Bot size={20} className="text-[#2563eb]" />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[85%] px-5 py-4 text-[14px] leading-relaxed transition-all break-words overflow-hidden relative group",
          isBot 
            ? "bg-white text-slate-700 border border-slate-100 rounded-[1.5rem] rounded-tl-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)]" 
            : "bg-blue-600 text-white rounded-[1.5rem] rounded-tr-none shadow-[0_10px_25px_-5px_rgba(37,99,235,0.25)]"
        )}
      >
        <div className={cn("prose prose-sm max-w-none [word-break:break-word] overflow-wrap-anywhere font-medium", isBot ? "text-slate-600" : "text-white prose-invert")}>
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
                    isBot ? "text-blue-600 hover:text-blue-800" : "text-white hover:text-blue-100"
                  )} 
                />
              )
            }}
          >
            {message.content}
          </Markdown>
        </div>
        <div className={cn(
          "text-[9px] mt-3 font-bold flex items-center gap-1.5 uppercase tracking-wider",
          isBot ? "text-slate-300" : "text-white/50"
        )}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {!isBot && (
        <div className="w-10 h-10 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 shadow-md">
          <User size={20} className="text-white" />
        </div>
      )}
    </motion.div>
  );
};
