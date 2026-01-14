import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const SpendingCharts = ({ expenses = [] }) => {
  // Generate last 7 dates (yyyy-mm-dd)
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    last7Days.push(date.toISOString().split("T")[0]);
  }

  // Calculate total expense per day
  const chartData = last7Days.map((date) => {
    const total = expenses
      .filter((e) => e.date === date) // compare strings directly
      .reduce((sum, e) => sum + Number(e.amount || 0), 0);

    return { date, total };
  });

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-gray-900">
        Weekly Spending
      </h3>
      <p className="text-xs text-gray-500 mb-4">Last 7 days trend</p>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tickFormatter={(d) => {
                const parts = d.split('-');
                return `${parts[2]}/${parts[1]}`; // show day/month
              }}
              tickLine={false}
              axisLine={false}
              fontSize={11}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={11}
            />

            <Tooltip
              formatter={(value) => [`$${value}`, "Spent"]}
              labelFormatter={(label) => `Date: ${label}`}
            />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#6366F1"
              strokeWidth={3}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingCharts;
