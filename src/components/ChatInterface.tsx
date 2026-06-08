import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, MessageCircle, X, RotateCcw, ChevronLeft, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Message } from '../types';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { getGeminiResponse } from '../services/geminiService';
import { cn } from '../lib/utils';

// ─── Navigation Chips ──────────────────────────────────────────────────────────
const NAV_CHIPS = [
  {
    label: "🏭 Businesses",
    emoji: "🏭",
    category: "Businesses",
    query: "Give me an overview of all of Cadila's business divisions — APIs, CDMO, formulations, international, herbal, and more.",
  },
  {
    label: "💊 Therapies",
    emoji: "💊",
    category: "Therapies",
    query: "What therapy areas does Cadila cover? I'd like an overview of all therapeutic specialities.",
  },
  {
    label: "🔬 R&D & Innovation",
    emoji: "🔬",
    category: "Research",
    query: "Tell me about Cadila's research and development capabilities, and their world-first innovations.",
  },
  {
    label: "🌍 Global Reach",
    emoji: "🌍",
    category: "International",
    query: "Tell me about Cadila's international business — how many countries, global accreditations, and the ISBU division.",
  },
  {
    label: "🌿 Herbal & Chezgreen",
    emoji: "🌿",
    category: "Herbal",
    query: "What is Chezgreen? Tell me about Cadila's Herbal and Ayurvedic consumer healthcare range.",
  },
  {
    label: "🎓 Careers",
    emoji: "🎓",
    category: "Careers",
    query: "I'm interested in career opportunities at Cadila. What are my options — jobs, campus programs, how to apply?",
  },
  {
    label: "📰 Media & Stories",
    emoji: "📰",
    category: "Media",
    query: "Where can I find Cadila's news, press releases, events, and commitment stories?",
  },
  {
    label: "📞 Contact & Support",
    emoji: "📞",
    category: "Contact",
    query: "How can I get in touch with Cadila Pharmaceuticals — general enquiries, ADR reporting, partnerships, or support?",
  },
];

// ─── Chat flow states ──────────────────────────────────────────────────────────
type ChatPhase = "welcome" | "chips" | "conversation";

const WELCOME_MSG: Message = {
  id: "welcome-1",
  role: "model",
  content:
    "Hello! 👋 Welcome to **Cadila Support** — your guide to everything at Cadila Pharmaceuticals.\n\nI can help you navigate our **Therapies**, **Businesses**, **Careers**, **R&D**, and much more on [cadilapharma.com](https://cadilapharma.com).\n\nHow would you like to begin?",
  timestamp: Date.now(),
};

const CHIPS_MSG: Message = {
  id: "welcome-2",
  role: "model",
  content:
    "Here are the key areas I can guide you through. **Tap any topic below** to explore — or simply type your question directly. 👇",
  timestamp: Date.now() + 100,
};

export const ChatInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<ChatPhase>("welcome");
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBackToNav, setShowBackToNav] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 80);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, phase]);

  // When chat opens, advance from welcome → chips after a brief delay
  useEffect(() => {
    if (isOpen && phase === "welcome") {
      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, CHIPS_MSG]);
        setPhase("chips");
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [isOpen, phase]);

  // Show "back to navigation" button once user has had 2+ bot replies in conversation
  useEffect(() => {
    if (phase === "conversation") {
      const botMessages = messages.filter((m) => m.role === "model" && m.id !== "welcome-1" && m.id !== "welcome-2");
      if (botMessages.length >= 1) setShowBackToNav(true);
    }
  }, [messages, phase]);

  const handleReset = () => {
    setMessages([WELCOME_MSG]);
    setPhase("welcome");
    setShowBackToNav(false);
    setInput("");
  };

  const handleBackToNav = () => {
    const backMsg: Message = {
      id: Date.now().toString(),
      role: "model",
      content: "No problem! Here are the main areas I can help you with. **Choose a topic below** or type a new question anytime. 👇",
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, backMsg]);
    setPhase("chips");
    setShowBackToNav(false);
    scrollToBottom();
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    // Move to conversation phase
    setPhase("conversation");
    setShowBackToNav(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: Date.now(),
    };

    const conversationHistory = messages.filter(
      (m) => m.id !== "welcome-1" && m.id !== "welcome-2"
    );

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await getGeminiResponse([...conversationHistory, userMessage]);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: response.text || "I'm sorry, I couldn't process that. How else may I help?",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content:
          "I apologise — something went wrong on my end. Please try again in a moment.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // After bot replies, surface the "back to nav" option
      setTimeout(() => setShowBackToNav(true), 500);
    }
  };

  const handleChipClick = async (chip: (typeof NAV_CHIPS)[0]) => {
    await handleSendMessage(chip.query);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput("");
    await handleSendMessage(text);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 400);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[200] flex flex-col items-end w-[calc(100%-2.5rem)] sm:w-[390px] pointer-events-none font-sans">
      {/* ── Chat Window ─────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="w-full flex flex-col overflow-hidden mb-4 pointer-events-auto"
            style={{
              height: "clamp(480px, 75vh, 620px)",
              borderRadius: "1.75rem",
              background: "#fdfdfd",
              boxShadow: "0 24px 64px -12px rgba(0,39,113,0.22), 0 4px 16px -4px rgba(0,39,113,0.10)",
              border: "1px solid #e8edf5",
            }}
          >
            {/* ── Header ── */}
            <div
              className="px-5 py-4 flex items-center justify-between text-white shrink-0 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #002d5a 0%, #003B71 50%, #0a5494 100%)" }}
            >
              {/* Decorative glow */}
              <div className="absolute right-0 top-0 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(237,129,30,0.15) 0%, transparent 70%)" }} />
              <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />

              <div className="flex items-center gap-3 relative z-10">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ background: "linear-gradient(135deg, #ed811e, #f59e0b)" }}>
                    <Sparkles size={17} className="text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 rounded-full animate-pulse"
                    style={{ borderColor: "#003B71" }} />
                </div>
                {/* Title */}
                <div>
                  <p className="text-[13px] font-extrabold tracking-tight leading-none">Cadila Support</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 relative z-10">
                {phase === "conversation" && (
                  <button
                    onClick={handleBackToNav}
                    title="Back to Navigation"
                    className="flex items-center gap-1 text-blue-100 hover:text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <LayoutGrid size={12} />
                    <span className="hidden sm:inline">Topics</span>
                  </button>
                )}
                {messages.length > 2 && (
                  <button
                    onClick={handleReset}
                    title="Start Over"
                    className="text-blue-100 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <RotateCcw size={14} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-blue-100 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* ── Messages ── */}
            <div
              className="flex-1 overflow-y-auto px-4 pt-5 pb-3 space-y-4 relative"
              style={{ background: "#F6F8FF", scrollbarWidth: "none" }}
            >
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {/* ── Navigation Chips (shown in chips & conversation phase) ── */}
              <AnimatePresence>
                {phase === "chips" && !isLoading && (
                  <motion.div
                    key="chips-grid"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 gap-2 pt-1 pb-2"
                  >
                    {NAV_CHIPS.map((chip, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={isLoading}
                        onClick={() => handleChipClick(chip)}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-[11px] font-bold border transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
                        style={{
                          background: "white",
                          borderColor: "#dce6f5",
                          color: "#003B71",
                          boxShadow: "0 1px 4px rgba(0,59,113,0.06)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "#003B71";
                          (e.currentTarget as HTMLButtonElement).style.color = "white";
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "#003B71";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "white";
                          (e.currentTarget as HTMLButtonElement).style.color = "#003B71";
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "#dce6f5";
                        }}
                      >
                        <span className="text-base leading-none">{chip.emoji}</span>
                        <span className="leading-tight">{chip.category}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* ── "Back to Navigation" floating pill (during conversation) ── */}
            <AnimatePresence>
              {phase === "conversation" && showBackToNav && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="px-4 py-2 flex justify-center shrink-0"
                  style={{ background: "#F6F8FF", borderTop: "1px solid #e8edf5" }}
                >
                  <button
                    onClick={handleBackToNav}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all hover:shadow-md"
                    style={{
                      color: "#003B71",
                      borderColor: "#c8d8ee",
                      background: "white",
                    }}
                  >
                    <ChevronLeft size={11} />
                    Explore Other Topics
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input Form ── */}
            <div className="px-4 pb-4 pt-3 shrink-0 bg-white" style={{ borderTop: "1px solid #eef1f8" }}>
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 rounded-2xl px-4 py-2 transition-all duration-300"
                style={{
                  background: "#F1F5FB",
                  border: "1.5px solid #dce6f5",
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLFormElement).style.borderColor = "#003B71";
                  (e.currentTarget as HTMLFormElement).style.boxShadow = "0 0 0 3px rgba(0,59,113,0.07)";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLFormElement).style.borderColor = "#dce6f5";
                  (e.currentTarget as HTMLFormElement).style.boxShadow = "none";
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Cadila's therapies, businesses..."
                  className="flex-1 bg-transparent text-[12px] outline-none text-slate-700 placeholder-slate-400 font-medium py-1.5"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  whileHover={input.trim() && !isLoading ? { scale: 1.08 } : {}}
                  whileTap={input.trim() && !isLoading ? { scale: 0.93 } : {}}
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0",
                    input.trim() && !isLoading
                      ? "text-white cursor-pointer shadow-md"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  )}
                  style={
                    input.trim() && !isLoading
                      ? { background: "linear-gradient(135deg, #ed811e, #f97316)", boxShadow: "0 4px 12px rgba(237,129,30,0.3)" }
                      : {}
                  }
                >
                  {isLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                </motion.button>
              </form>

              {/* Footer */}
              <div className="mt-2.5 text-center">
                <p className="text-[8px] font-black uppercase tracking-[0.25em] text-slate-300">
                  The Care Continues...
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Action Button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleOpen}
            className="pointer-events-auto w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl border border-white/10"
            style={{
              background: "linear-gradient(135deg, #002d5a 0%, #003B71 60%, #0a5494 100%)",
              boxShadow: "0 8px 32px -4px rgba(0,39,113,0.40), 0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <div className="relative">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #ed811e, #f59e0b)" }}
              >
                <MessageCircle size={20} className="text-white" />
              </div>
              <span
                className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 animate-pulse"
                style={{ borderColor: "#003B71" }}
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
