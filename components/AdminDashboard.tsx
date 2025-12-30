
import React, { useMemo } from 'react';
import { Delegate } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AdminDashboardProps {
  delegates: Delegate[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ delegates }) => {
  const pickupStats = useMemo(() => {
    const days = [
      { key: 'monday_jan19', label: 'Mon (North)' },
      { key: 'tuesday_jan20', label: 'Tue (JLM)' },
      { key: 'wednesday_jan21', label: 'Wed (North)' }
    ];

    return days.map(day => {
      const counts = {
        name: day.label,
        'Hilton': delegates.filter(d => (d[day.key as keyof Delegate] as any).pickupPoint === 'Hilton-Pickup').length,
        'Carlton': delegates.filter(d => (d[day.key as keyof Delegate] as any).pickupPoint === 'Carlton-Pickup').length,
        'WIZO HQ': delegates.filter(d => (d[day.key as keyof Delegate] as any).pickupPoint === 'WIZO-HQ-Pickup').length,
        'Independent': delegates.filter(d => (d[day.key as keyof Delegate] as any).pickupPoint === 'Independent').length,
        'Not Attending': delegates.filter(d => (d[day.key as keyof Delegate] as any).pickupPoint === 'Not-Attending').length
      };
      return counts;
    });
  }, [delegates]);

  return (
    <div className="space-y-10" dir="ltr">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-[#1a2433] uppercase">Producer Dashboard</h2>
          <p className="text-slate-500 text-sm">Real-time logistics and bus requirement tracking.</p>
        </div>
        <div className="bg-[#1a2433] text-[#c5a059] px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">
          {delegates.length} Total Registered
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Hilton Total (Mon)', val: delegates.filter(d => d.monday_jan19.pickupPoint === 'Hilton-Pickup').length, color: 'border-[#1a2433]' },
          { label: 'Carlton Total (Mon)', val: delegates.filter(d => d.monday_jan19.pickupPoint === 'Carlton-Pickup').length, color: 'border-[#c5a059]' },
          { label: 'WIZO HQ Total (Mon)', val: delegates.filter(d => d.monday_jan19.pickupPoint === 'WIZO-HQ-Pickup').length, color: 'border-[#e5c07b]' }
        ].map((card, i) => (
          <div key={i} className={`bg-white p-8 rounded-[2rem] shadow-sm border-b-4 ${card.color}`}>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">{card.label}</span>
            <div className="text-4xl font-black text-[#1a2433]">{card.val} <span className="text-sm font-medium text-slate-400">seats</span></div>
          </div>
        ))}
      </div>

      {/* Logistics Chart */}
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#1a2433] mb-10 text-center">Bus Manifest Visualization (Required Seats)</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pickupStats}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} fontStyle="bold" />
              <YAxis axisLine={false} tickLine={false} fontSize={10} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
              <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
              <Bar dataKey="Hilton" fill="#1a2433" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Carlton" fill="#c5a059" radius={[6, 6, 0, 0]} />
              <Bar dataKey="WIZO HQ" fill="#e5c07b" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Independent" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Delegate Table */}
      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
        <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
           <h3 className="text-xs font-black uppercase tracking-widest text-[#1a2433]">Delegate Logistics Manifest</h3>
           <button className="text-[10px] font-black uppercase tracking-widest text-[#c5a059] border-b border-[#c5a059] pb-0.5">Export to Excel</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="px-10 py-6">Delegate</th>
                <th className="px-10 py-6">Federation</th>
                <th className="px-10 py-6">Mon Pickup</th>
                <th className="px-10 py-6">Tue Pickup</th>
                <th className="px-10 py-6">Wed Pickup</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {delegates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center text-slate-400 font-medium">No delegates registered yet.</td>
                </tr>
              ) : delegates.map(d => (
                <tr key={d.id} className="hover:bg-slate-50 transition-all group">
                  <td className="px-10 py-5">
                    <span className="block font-black text-[#1a2433]">{d.firstName} {d.lastName}</span>
                    <span className="text-[10px] text-slate-400">{d.email}</span>
                  </td>
                  <td className="px-10 py-5 font-bold text-slate-600 uppercase text-xs">{d.federation}</td>
                  <td className="px-10 py-5">
                    <span className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-full ${d.monday_jan19.pickupPoint === 'Not-Attending' ? 'bg-red-50 text-red-400' : 'bg-[#1a2433]/5 text-[#1a2433]'}`}>
                      {d.monday_jan19.pickupPoint.replace('-Pickup', '').replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-10 py-5">
                    <span className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-full ${d.tuesday_jan20.pickupPoint === 'Not-Attending' ? 'bg-red-50 text-red-400' : 'bg-[#1a2433]/5 text-[#1a2433]'}`}>
                      {d.tuesday_jan20.pickupPoint.replace('-Pickup', '').replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-10 py-5">
                    <span className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-full ${d.wednesday_jan21.pickupPoint === 'Not-Attending' ? 'bg-red-50 text-red-400' : 'bg-[#1a2433]/5 text-[#1a2433]'}`}>
                      {d.wednesday_jan21.pickupPoint.replace('-Pickup', '').replace('-', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
