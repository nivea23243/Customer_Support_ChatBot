import React from 'react';
import Markdown from 'react-markdown';
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
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200">
          <Bot size={18} className="text-blue-600" />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 text-sm shadow-sm transition-all",
          isBot 
            ? "bg-white text-slate-700 border border-slate-200 rounded-2xl rounded-tl-none" 
            : "bg-blue-600 text-white rounded-2xl rounded-tr-none shadow-md"
        )}
      >
        <div className={cn("prose prose-sm max-w-none leading-relaxed", isBot ? "text-slate-700" : "text-white prose-invert")}>
          <Markdown>{message.content}</Markdown>
        </div>
        <div className={cn(
          "text-[9px] mt-2 opacity-50 font-bold uppercase tracking-widest",
          isBot ? "text-slate-400" : "text-blue-100"
        )}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
          <User size={18} className="text-white" />
        </div>
      )}
    </motion.div>
  );
};
