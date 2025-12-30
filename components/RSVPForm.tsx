
import React, { useState } from 'react';
import { Delegate, DailyAttendance, TransportOption } from '../types';
import { FEDERATIONS, PROGRAM } from '../constants';

interface RSVPFormProps {
  onSuccess: (delegate: Delegate) => void;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ onSuccess }) => {
  const initialDayState: DailyAttendance = { status: 'Attending', pickupPoint: 'WIZO-HQ-Pickup' };
  
  const [formData, setFormData] = useState<Partial<Delegate>>({
    firstName: '',
    lastName: '',
    email: '',
    federation: FEDERATIONS[0],
    phone: '',
    sunday_jan18: { ...initialDayState },
    monday_jan19: { ...initialDayState, pickupPoint: 'Hilton-Pickup' },
    tuesday_jan20: { ...initialDayState, pickupPoint: 'Hilton-Pickup' },
    wednesday_jan21: { ...initialDayState, pickupPoint: 'Hilton-Pickup' },
    thursday_jan22: { ...initialDayState }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDelegate: Delegate = {
      ...formData as Delegate,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    onSuccess(newDelegate);
  };

  const updateLogistics = (dayKey: string, pickup: TransportOption) => {
    const isNotAttending = pickup === 'Not-Attending';
    setFormData(prev => ({
      ...prev,
      [dayKey]: { 
        status: isNotAttending ? 'Not-Attending' : 'Attending', 
        pickupPoint: pickup 
      }
    }));
  };

  const days = [
    { key: 'sunday_jan18', label: 'Sunday Jan 18', dayIndex: 0 },
    { key: 'monday_jan19', label: 'Monday Jan 19', dayIndex: 1 },
    { key: 'tuesday_jan20', label: 'Tuesday Jan 20', dayIndex: 2 },
    { key: 'wednesday_jan21', label: 'Wednesday Jan 21', dayIndex: 3 },
    { key: 'thursday_jan22', label: 'Thursday Jan 22', dayIndex: 4 }
  ];

  const transportOptions: { val: TransportOption; label: string; desc: string }[] = [
    { val: 'Hilton-Pickup', label: 'Hilton', desc: 'Hotel Pickup' },
    { val: 'Carlton-Pickup', label: 'Carlton', desc: 'Hotel Pickup' },
    { val: 'WIZO-HQ-Pickup', label: 'WIZO HQ', desc: '38 David Hamelech' },
    { val: 'Independent', label: 'Independent', desc: 'Direct Arrival' },
    { val: 'Not-Attending', label: 'Not Coming', desc: 'Unable to join' }
  ];

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl p-6 md:p-12 max-w-5xl mx-auto border border-[#c5a059]/10 relative overflow-hidden" dir="ltr">
      {/* Decorative floral element */}
      <div className="absolute -top-20 -right-20 opacity-5 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 100 100"><path d="M50 0 C60 30 90 40 100 50 C90 60 60 70 50 100 C40 70 10 60 0 50 C10 40 40 30 50 0" fill="#c5a059" /></svg>
      </div>

      <div className="mb-12 text-center relative z-10">
        <h2 className="text-4xl font-black text-[#1a2433] uppercase tracking-tighter">Logistics & Daily Program</h2>
        <div className="w-20 h-1 bg-[#c5a059] mx-auto my-4"></div>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">Confirm your attendance and select a pickup point for each day. Buses will depart from the designated locations.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
        {/* Personal Details Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
             <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">First Name</label>
                <input required className="w-full p-4 bg-white rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#c5a059]" 
                  value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
             </div>
             <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Last Name</label>
                <input required className="w-full p-4 bg-white rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#c5a059]" 
                  value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
             </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Federation</label>
            <select className="w-full p-4 bg-white rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#c5a059] font-bold"
              value={formData.federation} onChange={e => setFormData({...formData, federation: e.target.value})}>
              {FEDERATIONS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>

        {/* Daily Schedule Cards */}
        <div className="space-y-6">
          <h3 className="text-xs font-black text-[#1a2433] uppercase tracking-[0.3em] border-l-4 border-[#c5a059] pl-4">Daily Attendance Selection</h3>
          
          <div className="grid gap-6">
            {days.map((day) => {
              const programDay = PROGRAM[day.dayIndex];
              const currentVal = (formData[day.key as keyof Delegate] as DailyAttendance).pickupPoint;
              
              return (
                <div key={day.key} className={`group rounded-[2rem] border transition-all overflow-hidden ${currentVal === 'Not-Attending' ? 'bg-slate-50 grayscale opacity-60' : 'bg-white border-slate-100 shadow-xl hover:shadow-2xl'}`}>
                  <div className="flex flex-col xl:flex-row">
                    {/* Day Content Summary */}
                    <div className="xl:w-1/3 bg-[#1a2433] p-8 text-white relative">
                      <span className="text-[#c5a059] text-[10px] font-black uppercase tracking-widest block mb-1">{day.label}</span>
                      <h4 className="text-xl font-black uppercase tracking-tight mb-2 leading-none">{programDay.title}</h4>
                      <p className="text-[#c5a059]/80 text-[10px] font-bold tracking-widest mb-6">{programDay.subtitle}</p>
                      
                      <div className="space-y-3">
                         {programDay.activities.map((a, i) => (
                           <div key={i} className="flex gap-3 items-start opacity-70 border-l border-[#c5a059]/30 pl-3">
                              <span className="text-[9px] font-black text-[#c5a059] min-w-[35px]">{a.time}</span>
                              <span className="text-[10px] leading-tight font-medium">{a.activity}</span>
                           </div>
                         ))}
                      </div>
                    </div>

                    {/* Logistics Selection */}
                    <div className="xl:w-2/3 p-8 flex flex-col justify-center bg-white">
                      <div className="flex justify-between items-end mb-6">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Your Pickup Point:</p>
                        {currentVal !== 'Not-Attending' && (
                          <span className="text-[9px] font-bold text-green-500 uppercase flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></span>
                            Participation Confirmed
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {transportOptions.map((opt) => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => updateLogistics(day.key, opt.val)}
                            className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all border-2 text-center group/btn ${
                              currentVal === opt.val 
                                ? 'bg-[#1a2433] text-[#c5a059] border-[#c5a059] shadow-lg scale-105' 
                                : 'bg-slate-50 text-slate-400 border-transparent hover:border-slate-200'
                            }`}
                          >
                            <span className="text-[10px] font-black uppercase tracking-tight mb-0.5">{opt.label}</span>
                            <span className="text-[8px] opacity-60 font-medium uppercase tracking-tighter leading-none">{opt.desc}</span>
                          </button>
                        ))}
                      </div>

                      {currentVal === 'Independent' && (
                        <p className="mt-4 text-[9px] italic text-slate-400">
                          Note: Please ensure you arrive at the daily venue on time if traveling independently.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-8">
          <button type="submit" className="w-full py-6 bg-[#1a2433] text-[#c5a059] font-black rounded-[2.5rem] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-[0.3em] text-sm border-2 border-[#c5a059]/30">
            Secure My Conference Logistics
          </button>
        </div>
      </form>
    </div>
  );
};

export default RSVPForm;
