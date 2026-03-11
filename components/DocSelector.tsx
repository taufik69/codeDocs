"use client";

import type { MarkdownData } from "@/utils/markdown";
import Content from "./Content";
import TableOfContents from "./Tableofcontent";

interface DocContentProps {
  allMarkdownData: MarkdownData[];
  selectedIndex?: number;
}

export default function DocContent({
  allMarkdownData,
  selectedIndex = 0,
}: DocContentProps) {
  const selectedDoc = allMarkdownData[selectedIndex];

  if (!selectedDoc) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No documents found</p>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');
          
        /* Custom Scrollbar Styling */
        .scrollbar-slim::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .scrollbar-slim::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-slim::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
          transition: background 0.2s;
        }
        .scrollbar-slim::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .scrollbar-slim {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
      `}
      </style>

      {/* ── MAIN CONTENT + RIGHT TOC ── */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Top bar */}
        <div className="shrink-0 flex items-center justify-between px-10 py-3 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span>Docs</span>
            <span className="text-slate-300">/</span>
            <span>Projects</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600 font-medium">
              {selectedDoc.frontMatter.Project}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-mono text-emerald-600">Live</span>
          </div>
        </div>

        {/* Content + TOC Grid */}
        <div className="flex-1 grid grid-cols-[70%_30%] w-full overflow-hidden">
          {/* Content Area */}
          <div className="overflow-y-auto px-10 py-8 scrollbar-slim">
            <Content htmlContent={selectedDoc.htmlContent} />
          </div>

          {/* ── RIGHT TOC ── */}
          <aside className="bg-white border-l border-slate-200 py-8 px-4 overflow-y-auto shadow-sm scrollbar-slim">
            <p className="px-3 text-[9px] font-mono tracking-widest uppercase text-slate-400 mb-2">
              On this page
            </p>
            <div className="flex items-center gap-2 ml-3 mb-5">
              <div className="w-5 h-0.5 bg-slate-800 rounded" />
              <div className="w-2 h-0.5 bg-slate-300 rounded" />
            </div>
            <TableOfContents headings={selectedDoc.headings} />
          </aside>
        </div>
      </main>
    </>
  );
}
