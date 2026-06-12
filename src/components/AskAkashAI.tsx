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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hi! I'm Akash's AI Assistant. Ask me anything about his projects, experience, skills, or blog articles!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Tell me about C-DAC experience",
    "What AI projects has Akash built?",
    "What technologies does Akash work with?",
    "Show Akash's latest blog posts",
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
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
        id: Math.random().toString(),
        sender: 'bot',
        text: response.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setSuggestions(response.suggestions);
    } catch (error) {
      const errorMsg: Message = {
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
    // Basic helper to render bold text, links, and bullet points
    const lines = text.split('\n');
    return lines.map((line, index) => {
      let content = line;
      
      // Handle list bullets
      const isBullet = content.startsWith('• ') || content.startsWith('- ');
      if (isBullet) {
        content = content.substring(2);
      }

      // Parse markdown bold (**text**)
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          parts.push(content.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="text-white font-semibold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < content.length) {
        parts.push(content.substring(lastIndex));
      }

      // Parse markdown links [text](url)
      const formattedContent = parts.map((part, pIdx) => {
        if (typeof part !== 'string') return part;
        const linkRegex = /\[(.*?)\]\((.*?)\)/g;
        const subParts = [];
        let subLastIndex = 0;
        let subMatch;

        while ((subMatch = linkRegex.exec(part)) !== null) {
          if (subMatch.index > subLastIndex) {
            subParts.push(part.substring(subLastIndex, subMatch.index));
          }
          subParts.push(
            <a
              key={subMatch.index}
              href={subMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium break-all"
            >
              {subMatch[1]}
            </a>
          );
          subLastIndex = linkRegex.lastIndex;
        }
        if (subLastIndex < part.length) {
          subParts.push(part.substring(subLastIndex));
        }
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-[90vw] sm:w-[400px] h-[550px] rounded-2xl glass border border-border shadow-2xl flex flex-col mb-4 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/80 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-white flex items-center gap-1.5">
                    Ask Akash AI
                    <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
                  </h3>
                  <span className="text-[10px] text-green-400 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                    Online & Active
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === 'user'
                        ? 'bg-secondary/25 text-secondary border border-secondary/20'
                        : 'bg-primary/25 text-primary border border-primary/20'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2.5 ${
                      msg.sender === 'user'
                        ? 'bg-secondary/15 border border-secondary/10 rounded-tr-none text-white'
                        : 'bg-white/5 border border-white/5 rounded-tl-none text-muted'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <p className="text-sm">{msg.text}</p>
                    ) : (
                      <ul className="space-y-1">{renderMessageText(msg.text)}</ul>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-primary/25 text-primary border border-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-muted/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-muted/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-muted/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions Chips */}
            {suggestions.length > 0 && (
              <div className="px-4 py-2 border-t border-border/40 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(sug)}
                    className="inline-block px-3 py-1 rounded-full text-xs bg-white/5 hover:bg-primary/10 border border-white/5 hover:border-primary/20 text-muted hover:text-white transition-all cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-border/80 bg-black/40 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about Akash..."
                className="flex-1 bg-white/5 border border-border/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-primary hover:bg-primary/95 text-white disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                aria-label="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary/95 text-white shadow-xl shadow-primary/20 border border-primary/20 flex items-center justify-center cursor-pointer relative group"
        aria-label="Open Ask Akash AI chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-primary animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover Tooltip */}
        {!isOpen && (
          <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 px-3 py-1.5 rounded-lg glass text-xs text-white font-medium whitespace-nowrap shadow-xl">
            Ask Akash AI
          </span>
        )}
      </motion.button>
    </div>
  );
}
