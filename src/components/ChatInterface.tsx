import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, MessageCircle, X, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Message } from '../types';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { getGeminiResponse } from '../services/geminiService';
import { cn } from '../lib/utils';

const SUGGESTIONS = [
  { label: "🚀 Campus Careers", query: "Tell me about the Campus to Corporate Program and how to apply" },
  { label: "🔬 R&D Innovations", query: "What are some of Cadila's world-first innovations in research?" },
  { label: "🌍 Global Outreach", query: "Where are Cadila's global offices and manufacturing locations?" },
  { label: "🤝 CDMO Services", query: "What CDMO and manufacturing services does Cadila offer?" },
];

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'greeting',
      role: 'model',
      content: "Hello! 👋 Welcome to our support. We are here to help you. How can I assist you today?",
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await getGeminiResponse([...messages, userMessage]);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response.text || "I'm sorry, I couldn't process that. How else can I help?",
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "Oops! Something went wrong on my end. Please try again.",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSendMessage(input);
    setInput('');
  };

  const handleSuggestionClick = (queryText: string) => {
    handleSendMessage(queryText);
  };

  const handleReset = () => {
    if (window.confirm("Clear this conversation and start fresh?")) {
      setMessages([
        {
          id: 'greeting',
          role: 'model',
          content: "Hello! 👋 Welcome to our support. We are here to help you. How can I assist you today?",
          timestamp: Date.now(),
        }
      ]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[200] flex flex-col items-end w-[calc(100%-2.5rem)] sm:w-[380px] pointer-events-none font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-full h-[65vh] max-h-[480px] sm:h-[580px] sm:max-h-[calc(100vh-140px)] bg-gradient-to-b from-[#0b0f19] via-[#0e1629] to-[#040814] rounded-[2.5rem] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden mb-4 pointer-events-auto border border-white/10"
          >
            {/* Elegant Brand Header */}
            <div className="bg-white/5 backdrop-blur-xl px-6 py-5 flex items-center justify-between text-white border-b border-white/5 relative overflow-hidden shrink-0">
              {/* Subtle background decorative shapes */}
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-11 h-11 bg-gradient-to-tr from-[#ed811e] to-[#f59e0b] rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-orange-500/25">
                    <Sparkles size={18} className="animate-pulse" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#090f1c] rounded-full z-10 animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-extrabold tracking-tight">Cadila Concierge</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    <p className="text-[9px] text-blue-300 font-bold uppercase tracking-wider">Active & Ready</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 relative z-10">
                {messages.length > 1 && (
                  <button 
                    onClick={handleReset}
                    title="Reset Conversation"
                    className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-xl"
                  >
                    <RotateCcw size={16} />
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-xl"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-5 pt-6 pb-14 space-y-6 scrollbar-hide bg-[#060a13]/40 relative z-0">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips - Clean 2x2 Grid Structure */}
            <div className="px-5 py-3.5 bg-[#090f1d] border-t border-white/5 grid grid-cols-2 gap-2 shrink-0 relative z-10">
              {SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSuggestionClick(s.query)}
                  className="text-[10px] font-bold text-slate-300 bg-white/5 hover:bg-[#ed811e] hover:text-white hover:border-[#ed811e] px-2.5 py-2.5 rounded-xl border border-white/5 transition-all shadow-sm active:scale-95 duration-200 disabled:opacity-50 disabled:pointer-events-none text-center truncate"
                  title={s.label}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Premium Input Form */}
            <div className="p-4 bg-[#050a14] border-t border-white/5 shrink-0 relative z-10">
              <form 
                onSubmit={handleSubmit}
                className="w-full flex items-center gap-2 bg-white/5 border border-white/10 rounded-[1.25rem] p-1.5 pl-4 focus-within:ring-4 focus-within:ring-orange-500/10 focus-within:border-[#ed811e]/30 transition-all duration-300"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-xs outline-none text-slate-200 placeholder-slate-500 font-medium py-2"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300",
                    input.trim() && !isLoading 
                      ? "bg-gradient-to-tr from-[#ed811e] to-[#f97316] text-white shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 cursor-pointer" 
                      : "bg-white/5 text-slate-500 cursor-not-allowed border border-white/5"
                  )}
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </form>
              <div className="mt-3 text-center">
                <p className="text-[8px] text-slate-600 font-black uppercase tracking-[0.25em]">The Care Continues...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button - Hides when chatbot is open */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="w-15 h-15 rounded-2xl flex items-center justify-center bg-gradient-to-tr from-[#003B71] to-[#0a5494] text-white shadow-2xl shadow-[#003B71]/35 pointer-events-auto border border-white/10"
          >
            <MessageCircle size={26} className="animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

