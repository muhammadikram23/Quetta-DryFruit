import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, Loader2, MessageSquareText } from 'lucide-react';
import axios from 'axios';

// Vite environment variable syntax
// Updated to match VITE_API_BASE_URL from your .env file
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api`;

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: 'Assalam-o-Alaikum! 👋 Welcome to Quetta Dry Fruits. How can I help you choose the finest dry fruits today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // Append User Message locally
    const updatedMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // API call to Express backend
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message: userMessage,
        conversationHistory: updatedMessages.slice(0, -1)
      });

      if (response.data && response.data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: 'model', text: response.data.reply }
        ]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: 'Maazrat! Server connection issue. Please try again in a moment.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* Shifted from bottom-left to bottom-right corner */
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Eye-Catching Floating Toggle Button (Bottom Right) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white px-5 py-3.5 rounded-full shadow-[0_10px_25px_-5px_rgba(217,119,6,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95 border border-amber-400/40"
          aria-label="Open AI Assistant"
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-amber-200 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
            </span>
          </div>
          <span className="font-bold text-sm tracking-wide pr-1 drop-shadow">
            Chat with AI
          </span>
        </button>
      )}

      {/*Chatbot Window (Anchored Bottom Right) */}
      {isOpen && (
        <div className="w-[350px] sm:w-[390px] h-[530px] bg-white rounded-3xl shadow-2xl flex flex-col border border-amber-300/60 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 text-white p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-600/60 rounded-2xl backdrop-blur-md border border-amber-400/30 shadow-inner">
                <Bot className="w-6 h-6 text-amber-200" />
              </div>
              <div>
                <h3 className="font-bold text-base flex items-center gap-1.5 text-amber-50">
                  Quetta Dry Fruits AI <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
                </h3>
                <p className="text-xs text-amber-200 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online | Instant Sales Helper
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-amber-600/40 rounded-xl transition-colors text-amber-100 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-amber-50/40">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 text-amber-100 flex items-center justify-center shrink-0 text-xs font-bold shadow-md mt-1 border border-amber-500/30">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-br-none font-medium'
                      : 'bg-white text-stone-800 border border-amber-200/80 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-8 h-8 rounded-full bg-amber-800 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-md">
                  AI
                </div>
                <div className="bg-white border border-amber-200 px-4 py-3 rounded-2xl rounded-bl-none text-xs text-amber-900 font-medium flex items-center gap-2 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-700" />
                  Generating response...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-amber-100 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Ask about prices, stock, delivery..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-amber-50/50 hover:bg-amber-50 focus:bg-white text-stone-800 placeholder-stone-400 px-4 py-3 rounded-2xl text-sm border border-amber-200/70 focus:border-amber-600 focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 disabled:from-stone-300 disabled:to-stone-400 text-white rounded-2xl transition-all duration-200 shrink-0 shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBotWidget;