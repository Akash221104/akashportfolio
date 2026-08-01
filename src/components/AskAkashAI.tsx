'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Bot, User } from 'lucide-react';
import { askAkashAgent } from '@/lib/ai-knowledge';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export default function AskAkashAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [bubbleText, setBubbleText] = useState('Ask about Akash!');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hi! I'm Akash's AI Assistant. Ask me anything about his projects, experience, skills, or blog articles!",
      timestamp: new Date('2026-07-07T00:00:00Z'),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    'Tell me about C-DAC experience',
    'What AI projects has Akash built?',
    'What technologies does Akash work with?',
    'Show Akash\'s latest blog posts',
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Section observer for contextual greetings
  useEffect(() => {
    const handleScroll = () => {
      const projectsEl = document.getElementById('projects');
      const expEl = document.getElementById('experience');
      const contactEl = document.getElementById('contact');

      const scrollY = window.scrollY;

      if (contactEl && scrollY + 400 >= contactEl.offsetTop) {
        setBubbleText("Need Akash's contact details?");
      } else if (projectsEl && scrollY + 400 >= projectsEl.offsetTop) {
        setBubbleText('Want to know how these AI projects were built?');
      } else if (expEl && scrollY + 400 >= expEl.offsetTop) {
        setBubbleText("I can tell you more about Akash's roles!");
      } else {
        setBubbleText('Ask about Akash!');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setShowBubble(false);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      // eslint-disable-next-line react-hooks/purity
      id: Math.random().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await askAkashAgent(text);
      const botMsg: Message = {
        // eslint-disable-next-line react-hooks/purity
        id: Math.random().toString(),
        sender: 'bot',
        text: response.answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setSuggestions(response.suggestions);
    } catch {
      const errorMsg: Message = {
        // eslint-disable-next-line react-hooks/purity
        id: Math.random().toString(),
        sender: 'bot',
        text: "I'm sorry, I encountered an error processing your query. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderMessageText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      let content = line;
      const isBullet = content.startsWith('• ') || content.startsWith('- ');
      if (isBullet) content = content.substring(2);

      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(content)) !== null) {
        if (match.index > lastIndex) parts.push(content.substring(lastIndex, match.index));
        parts.push(<strong key={match.index} className="text-white font-semibold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < content.length) parts.push(content.substring(lastIndex));

      const formattedContent = parts.map((part, pIdx) => {
        if (typeof part !== 'string') return part;
        const linkRegex = /\[(.*?)\]\((.*?)\)/g;
        const subParts: React.ReactNode[] = [];
        let subLastIndex = 0;
        let subMatch;

        while ((subMatch = linkRegex.exec(part)) !== null) {
          if (subMatch.index > subLastIndex) subParts.push(part.substring(subLastIndex, subMatch.index));
          subParts.push(
            <a key={subMatch.index} href={subMatch[2]} target="_blank" rel="noopener noreferrer"
              className="text-primary hover:underline font-medium break-all">
              {subMatch[1]}
            </a>
          );
          subLastIndex = linkRegex.lastIndex;
        }
        if (subLastIndex < part.length) subParts.push(part.substring(subLastIndex));
        return subParts.length > 0 ? <React.Fragment key={pIdx}>{subParts}</React.Fragment> : part;
      });

      if (isBullet) {
        return (
          <li key={index} className="ml-4 list-disc text-sm my-1 text-muted">
            <span className="text-muted">{formattedContent}</span>
          </li>
        );
      }
      return (
        <p key={index} className="text-sm my-1 text-muted leading-relaxed">
          {formattedContent}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="w-[92vw] sm:w-[400px] h-[560px] rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-2xl shadow-[0_0_60px_rgba(59,130,246,0.15)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/8 flex items-center justify-between bg-gradient-to-r from-blue-950/60 to-purple-950/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                    Ask Akash AI
                    <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                  </h3>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Online &amp; Active
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[88%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20'
                      : 'bg-sky-500/20 text-sky-400 border border-sky-500/20'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-2.5 ${
                    msg.sender === 'user'
                      ? 'bg-purple-500/15 border border-purple-500/10 rounded-tr-none text-white'
                      : 'bg-white/5 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.sender === 'user'
                      ? <p className="text-sm">{msg.text}</p>
                      : <ul className="space-y-1">{renderMessageText(msg.text)}</ul>
                    }
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 max-w-[88%]">
                  <div className="w-7 h-7 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestion Chips */}
            {suggestions.length > 0 && (
              <div className="px-4 py-2 border-t border-white/5 overflow-x-auto flex gap-2 scrollbar-none">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(sug)}
                    className="shrink-0 px-3 py-1 rounded-full text-xs bg-white/5 hover:bg-sky-500/10 border border-white/5 hover:border-sky-500/20 text-white/50 hover:text-white transition-all cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
              className="p-3 border-t border-white/8 bg-black/30 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about Akash..."
                className="flex-1 bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-sky-500/50 transition-colors"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white disabled:opacity-35 disabled:pointer-events-none transition-all cursor-pointer shadow-lg shadow-blue-500/20"
                aria-label="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Contextual Speech Bubble ── */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 10 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.5 }}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-2xl rounded-br-sm bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold shadow-xl shadow-blue-500/25 cursor-pointer select-none"
            onClick={handleOpen}
          >
            <Sparkles className="w-4 h-4 shrink-0 animate-pulse" />
            <span>{bubbleText}</span>
            {/* Triangle pointer */}
            <span className="absolute -bottom-2 right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-blue-600" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Action Button ── */}
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-2xl shadow-blue-500/30 flex items-center justify-center cursor-pointer border border-white/10 transition-all duration-300"
        aria-label="Open Ask Akash AI chatbot"
      >
        {/* Animated ping ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-sky-500/30 animate-ping" />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-blue-600 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

    </div>
  );
}
