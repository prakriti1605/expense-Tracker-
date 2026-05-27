import React from "react";

function StatCard({ icon: Icon, title, value, subtitle, bgColor, iconColor }) {
  return (
    // Added explicit spacing between custom variable insertions and static Tailwind classes
    <div
      className={`${bgColor} rounded-[24px] p-6 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[102%] hover:shadow-xl`}
    >
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-current opacity-[0.02] rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />

      <div className="relative z-10">
        {/* Added space before rounded-xl */}
        <div className={`inline-flex p-3 ${iconColor} rounded-[16px] mb-4 group-hover:rotate-6 transition-transform duration-300`}>
          <Icon className="w-5 h-5" strokeWidth={2.5} />
        </div>
        
        <h3 className="text-3xl lg:text-4xl font-black tracking-tight mb-1">
          {value}
        </h3>
        <p className="text-xs font-bold opacity-60 tracking-wide uppercase">
          {title}
        </p>
        
        {subtitle && (
          <p className="text-xs opacity-40 mt-1.5 font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default StatCard;