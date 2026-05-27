import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
// PieChart → overall chart container
// Pie → actual pie/donut chart
// Cell → har slice ka color/style
// ResponsiveContainer → chart responsive banata hai
// Legend → neeche labels dikhata hai
// Tooltip → hover pe info popup

function CategoryChart({ categoryTotal = {} }) {
  
  // 1. Safe Data Parsing: Transform the category totals object into an array for Recharts
  const getData = () => {
    const keys = Object.keys(categoryTotal || {});
    if (keys.length === 0) {
      // Fallback dummy data so the chart doesn't crash or look empty on initial load
      return [{ name: "No Expenses", value: 1 }];
    }
    
    return keys.map((key) => ({
      name: key,
      value: Number(categoryTotal[key] || 0),
    }));
  };

  const data = getData();

  // Vibrant, Gen-Z friendly neon color spectrum for the chart slices
  const COLORS = ['#10B981', '#EC4899', '#8B5CF6', '#F59E0B', '#EF4444', '#6B7280'];

  return (
    /* CHANGE: Removed 'bg-white shadow' and replaced with our dynamic 'glass-panel' */
    <div className="glass-panel rounded-[28px] p-6 shadow-xl w-full h-full min-h-[380px] flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-black tracking-tight">Category Distribution</h3>
        <p className="text-xs font-medium opacity-50 mt-0.5">Where your money goes</p>
      </div>

      {/* Pie Chart Container */}
      <div className="w-full h-56 relative my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* The Tooltip adapts beautifully to dark/light variants via CSS variables */}
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--brand-card)', 
                borderColor: 'var(--brand-border)', 
                borderRadius: '16px',
                color: 'var(--brand-text)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                fontSize: '12px',
                fontWeight: 'bold'
              }} 
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.name === "No Expenses" ? "#374151" : COLORS[index % COLORS.length]} 
                  stroke="transparent" 
                />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom" 
              iconType="circle" 
              iconSize={8} 
              wrapperStyle={{ 
                fontSize: '12px', 
                fontWeight: 'bold', 
                opacity: 0.8,
                paddingTop: '10px'
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CategoryChart;