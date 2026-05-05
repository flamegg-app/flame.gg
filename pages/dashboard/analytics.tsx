import DashboardLayout from '@/components/DashboardLayout';
import { Eye, MousePointer2, TrendingUp, Calendar } from 'lucide-react';

export default function Analytics() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-8">Analytics</h1>
      
      {/* Overview Grid from your screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatBox icon={<Eye size={16}/>} label="Total Views" value="12" />
        <StatBox icon={<MousePointer2 size={16}/>} label="Link Clicks" value="0" />
        <StatBox icon={<TrendingUp size={16}/>} label="This Week" value="12" />
        <StatBox icon={<Calendar size={16}/>} label="Today" value="10" />
      </div>

      {/* The Chart Area (Simplified for now) */}
      <div className="bg-[#161616] border border-neutral-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-neutral-400 mb-6 uppercase tracking-wider">Views — Last 7 Days</h3>
        <div className="flex items-end justify-between h-32 gap-2">
          {[0, 0, 0, 0, 1, 1, 10].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-purple-600 rounded-t-sm transition-all duration-500" 
                style={{ height: `${(val / 10) * 100}%`, minHeight: '4px' }}
              />
              <span className="text-[10px] text-neutral-600 font-bold uppercase">
                {['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatBox({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="bg-[#161616] border border-neutral-800 p-5 rounded-2xl">
      <div className="flex items-center gap-2 text-neutral-500 mb-2">
        {icon} <span className="text-xs font-bold uppercase tracking-tight">{label}</span>
      </div>
      <p className="text-2xl font-black">{value}</p>
    </div>
  );
}