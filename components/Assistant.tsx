
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getConciergeResponse } from '../services/geminiService';
import { NOTIFICATION_EMAIL } from '../constants';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Shalom! I am your WIZO MOR 2026 AI Concierge. How can I help you with the conference in Tel Aviv? For direct assistance during this test phase, you can reach out to helio@wizo.org.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getConciergeResponse(messages, input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen ? (
        <div className="bg-white w-[350px] md:w-[400px] h-[550px] rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-[#1a2433] p-5 text-white flex justify-between items-center border-b border-[#c5a059]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#c5a059] rounded-full flex items-center justify-center font-serif text-[#c5a059] text-xs font-bold bg-[#1a2433]">Mor</div>
              <div>
                 <span className="block font-black text-sm uppercase tracking-widest text-[#c5a059]">AI Concierge</span>
                 <span className="block text-[8px] text-white/50 uppercase tracking-widest">WIZO MOR 2026</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#1a2433] text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none font-medium'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-5 bg-white border-t border-slate-100 flex gap-3">
            <input
              type="text"
              className="flex-1 bg-slate-100 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-[#c5a059] focus:bg-white outline-none transition-all"
              placeholder="Ask about MOR 2026..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="bg-[#1a2433] text-[#c5a059] p-3 rounded-2xl hover:scale-110 transition-transform active:scale-95 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#1a2433] text-[#c5a059] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all active:scale-95 group border-2 border-[#c5a059]/50"
        >
          <div className="font-serif text-lg font-bold">Mor</div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#c5a059] text-[#1a2433] rounded-full text-[10px] font-black flex items-center justify-center shadow-lg">?</div>
        </button>
      )}
    </div>
  );
};

export default Assistant;
