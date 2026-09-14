import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';

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

  {/* Auto-scroll to latest message */}
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

    {/* Append User Message locally */}
    const updatedMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      {/* API call to Express backend */}
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
    /* Floating container: positioned cleanly on both mobile and desktop without screen overflow */
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans">
      
      {/* Eye-Catching Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full shadow-[0_10px_25px_-5px_rgba(217,119,6,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95 border border-amber-400/40 cursor-pointer"
          aria-label="Open AI Assistant"
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-400"></span>
            </span>
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-wide pr-0.5 sm:pr-1 drop-shadow">
            Chat with AI
          </span>
        </button>
      )}

      {/* Chatbot Window: Responsive dimensions preventing mobile screen overflow */}
      {isOpen && (
        <div className="w-[calc(100vw-32px)] max-w-[360px] sm:max-w-none sm:w-[390px] h-[min(520px,calc(100dvh-96px))] sm:h-[530px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col border border-amber-300/60 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 text-white p-3 sm:p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-amber-600/60 rounded-xl sm:rounded-2xl backdrop-blur-md border border-amber-400/30 shadow-inner shrink-0">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base flex items-center gap-1.5 text-amber-50 leading-tight">
                  Quetta Dry Fruits AI <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 fill-amber-300 animate-pulse shrink-0" />
                </h3>
                <p className="text-[10px] sm:text-xs text-amber-200 flex items-center gap-1.5 font-medium mt-0.5">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span> Online | Instant Sales Helper
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 sm:p-2 hover:bg-amber-600/40 rounded-xl transition-colors text-amber-100 hover:text-white cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 sm:space-y-3.5 bg-amber-50/40">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 sm:gap-2.5 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'model' && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 text-amber-100 flex items-center justify-center shrink-0 text-[10px] sm:text-xs font-bold shadow-md mt-0.5 border border-amber-500/30">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm break-words ${
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
              <div className="flex gap-2 sm:gap-2.5 justify-start">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-800 text-white flex items-center justify-center shrink-0 text-[10px] sm:text-xs font-bold shadow-md">
                  AI
                </div>
                <div className="bg-white border border-amber-200 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl rounded-bl-none text-xs text-amber-900 font-medium flex items-center gap-2 shadow-sm">
                  <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin text-amber-700" />
                  Generating response...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-2.5 sm:p-3 bg-white border-t border-amber-100 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Ask about prices, stock..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-amber-50/50 hover:bg-amber-50 focus:bg-white text-stone-800 placeholder-stone-400 px-3.5 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm border border-amber-200/70 focus:border-amber-600 focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 sm:p-3 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 disabled:from-stone-300 disabled:to-stone-400 text-white rounded-xl sm:rounded-2xl transition-all duration-200 shrink-0 shadow-md cursor-pointer disabled:cursor-not-allowed"
              aria-label="Send Message"
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBotWidget;