import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function SpendingCharts({ expenses = [] }) {
  
  // 1. Safe Data Parsing: Process last 7 days of spending safely
  const getChartData = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      last7Days.push({
        dateStr: d.toISOString().split('T')[0],
        displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        amount: 0,
      });
    }

    // Accumulate your real backend values into the date slots
    expenses.forEach((exp) => {
      if (!exp || !exp.date) return;
      const expDateStr = String(exp.date).split('T')[0];
      const match = last7Days.find((day) => day.dateStr === expDateStr);
      if (match) {
        match.amount += Number(exp.amount || 0);
      }
    });

    return last7Days;
  };

  const chartData = getChartData();

  return (
    /* Changed bg-white to glass-panel to completely match your dark mode toggle variables */
    <div className="glass-panel rounded-[28px] p-6 shadow-xl w-full">
      <div className="mb-4">
        <h3 className="text-lg font-black tracking-tight">Weekly Spending</h3>
        <p className="text-xs font-medium opacity-50">Last 7 days trend</p>
      </div>

      <div className="w-full h-64">
        {/* ResponsiveContainer needs a valid width/height to properly render inside CSS grids */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {/* Premium Gen-Z Glowing Accent Drop */}
              <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.08} stroke="currentColor" />
            <XAxis 
              dataKey="displayDate" 
              stroke="currentColor" 
              opacity={0.5} 
              fontSize={11} 
              tickLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="currentColor" 
              opacity={0.5} 
              fontSize={11} 
              tickLine={false} 
              dx={5}
            />
            {/* The Tooltip background now updates dynamically via the app.css variable maps */}
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--brand-card)', 
                borderColor: 'var(--brand-border)', 
                borderRadius: '16px',
                color: 'var(--brand-text)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#8B5CF6" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorSpend)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SpendingCharts;