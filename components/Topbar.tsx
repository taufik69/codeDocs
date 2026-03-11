import React from "react";

const Topbar = () => {
  return (
    <div>
      <div className="shrink-0 flex items-center justify-between px-10 py-3 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span>Docs</span>
          <span className="text-slate-300">/</span>
          <span>Projects</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 font-medium">{"Overview"}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-mono text-emerald-600">Live</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
