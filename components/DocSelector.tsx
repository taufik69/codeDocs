"use client";

import type { MarkdownData } from "@/utils/markdown";
import Content from "./Content";
import TableOfContents from "./Tableofcontent";

interface DocContentProps {
  allMarkdownData: MarkdownData[];
  selectedIndex?: number;
  onOpenSidebar?: () => void;
}

export default function DocContent({
  allMarkdownData,
  selectedIndex = 0,
  onOpenSidebar,
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
      <main className="flex-1 flex flex-col overflow-hidden min-h-0 bg-white">
        {/* Top bar */}
        <div className="shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-10 py-3 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={onOpenSidebar}
              className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200 bg-white/70 text-slate-700 hover:bg-white"
              aria-label="Open sidebar"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 min-w-0">
            <span>Docs</span>
            <span className="text-slate-300">/</span>
            <span>Projects</span>
            <span className="text-slate-300">/</span>
              <span className="text-slate-600 font-medium truncate">
                {selectedDoc.frontMatter.Project}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-mono text-emerald-600">Live</span>
          </div>
        </div>

        {/* Content + TOC Grid */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] w-full overflow-hidden">
          {/* Content Area */}
          <div className="min-h-0 overflow-y-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-8 scrollbar-slim">
            <Content htmlContent={selectedDoc.htmlContent} />
          </div>

          {/* ── RIGHT TOC ── */}
          <aside className="hidden lg:flex lg:flex-col min-h-0 bg-white border-l border-slate-200 py-8 px-4 overflow-hidden shadow-sm scrollbar-slim">
            <div className="shrink-0">
              <p className="px-3 text-[9px] font-mono tracking-widest uppercase text-slate-400 mb-2">
                On this page
              </p>
              <div className="flex items-center gap-2 ml-3 mb-5">
                <div className="w-5 h-0.5 bg-slate-800 rounded" />
                <div className="w-2 h-0.5 bg-slate-300 rounded" />
              </div>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
              <TableOfContents headings={selectedDoc.headings} />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
