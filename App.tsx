
import React, { useState, useEffect } from 'react';
import { Delegate } from './types';
import RSVPForm from './components/RSVPForm';
import AdminDashboard from './components/AdminDashboard';
import Assistant from './components/Assistant';
import { PROGRAM, COLORS, NOTIFICATION_EMAIL } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'rsvp' | 'admin' | 'program'>('rsvp');
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('wizo_delegates_mor_2026');
    if (saved) setDelegates(JSON.parse(saved));
  }, []);

  const handleRSVPSuccess = (delegate: Delegate) => {
    const updated = [delegate, ...delegates];
    setDelegates(updated);
    localStorage.setItem('wizo_delegates_mor_2026', JSON.stringify(updated));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-sans overflow-x-hidden">
      {/* Premium Navbar */}
      <nav className="bg-[#1a2433] text-white px-8 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-[#c5a059]/30">
        <div className="flex items-center gap-4">
           <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tighter">WIZO</span>
              <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-[#c5a059]">Doing What Matters</span>
           </div>
           <div className="h-8 w-px bg-white/20"></div>
           <div className="text-xs font-bold uppercase tracking-widest text-[#c5a059]">MOR 2026</div>
        </div>
        
        <div className="flex gap-4">
           <button onClick={() => setView('rsvp')} className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-all ${view === 'rsvp' ? 'bg-[#c5a059] text-[#1a2433]' : 'text-white/60 hover:text-white'}`}>RSVP</button>
           <button onClick={() => setView('program')} className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-all ${view === 'program' ? 'bg-[#c5a059] text-[#1a2433]' : 'text-white/60 hover:text-white'}`}>Itinerary</button>
           <button onClick={() => setView('admin')} className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-all ${view === 'admin' ? 'bg-[#c5a059] text-[#1a2433]' : 'text-white/60 hover:text-white'}`}>Admin</button>
        </div>
      </nav>

      {/* Hero Header based on PDF Page 1 */}
      {view !== 'admin' && (
        <header className="relative bg-[#1a2433] py-24 px-8 overflow-hidden text-center flex flex-col items-center justify-center min-h-[60vh]">
           {/* Abstract background shapes */}
           <div className="absolute top-0 right-0 w-[40vw] h-[40vw] border border-[#c5a059]/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] border border-[#c5a059]/10 rounded-full -translate-x-1/2 translate-y-1/2"></div>
           
           <div className="relative z-10 max-w-4xl animate-in fade-in zoom-in-95 duration-1000">
              <div className="mb-6 inline-block bg-[#c5a059]/10 px-6 py-2 rounded-full border border-[#c5a059]/30">
                 <span className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.5em]">January 18-22, 2026</span>
              </div>
              
              <div className="text-[#c5a059] text-9xl font-serif mb-4 tracking-tighter opacity-90">Mor</div>
              <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
                Meeting of <br/><span className="text-[#c5a059]">Representatives</span>
              </h1>
              
              <div className="h-px w-32 bg-[#c5a059]/50 mx-auto my-8"></div>
              
              <p className="text-[#c5a059] font-serif italic text-2xl mb-8 opacity-80">
                "We Are Here: Zionism 2026"
              </p>
              
              <p className="text-white/70 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed uppercase tracking-widest">
                WIZO leaders taking responsibility in rebuilding and strengthening Israel and the Jewish people
              </p>
           </div>
        </header>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-16 px-6">
        {view === 'rsvp' && (
          submitted ? (
            <div className="max-w-xl mx-auto text-center py-20 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
               <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-bold">✓</div>
               <h2 className="text-3xl font-black text-[#1a2433] mb-4">LOGISTICS RECORDED</h2>
               <p className="text-slate-500 mb-10 px-10">Thank you. Your daily attendance and transportation preferences have been secured for MOR 2026.</p>
               <button onClick={() => setSubmitted(false)} className="px-10 py-4 border border-[#1a2433] text-[#1a2433] font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">Update Entry</button>
            </div>
          ) : (
            <RSVPForm onSuccess={handleRSVPSuccess} />
          )
        )}

        {view === 'program' && (
          <div className="space-y-12">
             <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-[#1a2433] uppercase">Detailed Itinerary</h2>
                <div className="w-24 h-1 bg-[#c5a059] mx-auto mt-4"></div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROGRAM.map(day => (
                  <div key={day.day} className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden group hover:shadow-2xl transition-all">
                    <div className="bg-[#1a2433] p-6 text-white border-b border-[#c5a059]/20">
                      <span className="text-[#c5a059] text-[10px] font-black uppercase tracking-widest block mb-2">{day.date}</span>
                      <h3 className="text-2xl font-black uppercase leading-tight">{day.title}</h3>
                      <p className="text-white/50 text-xs italic mt-2 font-serif">{day.subtitle}</p>
                    </div>
                    <div className="p-8 space-y-6">
                       {day.activities.map((act, i) => (
                         <div key={i} className="flex gap-4 items-start border-l-2 border-slate-100 pl-4 hover:border-[#c5a059] transition-all">
                           <span className="text-[10px] font-black text-[#c5a059] uppercase min-w-[50px]">{act.time}</span>
                           <div>
                              <p className="text-sm font-black text-[#1a2433] leading-tight">{act.activity}</p>
                              {act.description && <p className="text-[11px] text-slate-400 mt-1">{act.description}</p>}
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {view === 'admin' && <AdminDashboard delegates={delegates} />}
      </main>

      <footer className="bg-[#1a2433] text-white/40 py-16 px-8 text-center border-t border-[#c5a059]/20">
         <div className="max-w-4xl mx-auto">
            <div className="text-2xl font-black tracking-tighter text-white mb-2">WIZO</div>
            <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#c5a059] mb-8">World Meeting of Representatives 2026</div>
            <p className="text-xs uppercase tracking-widest mb-4">"We are the builders of Israel\'s future"</p>
            <div className="text-[10px] mt-8 opacity-50">&copy; 2026 World WIZO Executive • Tel Aviv, Israel</div>
         </div>
      </footer>

      <Assistant />
    </div>
  );
};

export default App;
