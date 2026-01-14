import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#EF4444",
  "#3B82F6",
  "#EC4899",
  "#10B981",
  "#F59E0B",
];

function CategoryChart({ categoryTotal = {} }) {
  const data = Object.entries(categoryTotal).map(
    ([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length],
    })
  );

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Category Distribution
      </h3>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip formatter={(value) => `$${value}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-gray-700 font-medium">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryChart;
