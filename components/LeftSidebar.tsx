"use client";

import { FrontMatter } from "@/utils/markdown";
import React, { useState } from "react";

const LeftSidebar = ({
  allFrontMatter,
  selectedIndex = 0,
  onSelect,
}: {
  allFrontMatter: FrontMatter[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}) => {
  const [query, setQuery] = useState("");

  const filtered = allFrontMatter
    .map((fm, idx) => ({ fm, idx }))
    .filter(({ fm }) =>
      fm.Project?.toLowerCase().includes(query.toLowerCase()),
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

        .sidebar {
          width: 256px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #ffffff;
          border-right: 1px solid #ebebf0;
          font-family: 'DM Sans', sans-serif;
          position: sticky;
          top: 0;
          overflow: hidden;
        }

        /* ── Brand ── */
        .sidebar-brand {
          padding: 22px 20px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid #f0f0f5;
        }
        .sidebar-logo {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: #1a1a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sidebar-title-sub {
          font-family: 'DM Mono', monospace;
          font-size: 8.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #b0b0c8;
          margin-bottom: 2px;
        }
        .sidebar-title-main {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a2e;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        /* ── Search ── */
        .sidebar-search {
          padding: 14px 16px;
          border-bottom: 1px solid #f0f0f5;
        }
        .sidebar-search-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .sidebar-search-icon {
          position: absolute;
          left: 10px;
          color: #b0b0c8;
          pointer-events: none;
          flex-shrink: 0;
        }
        .sidebar-search-input {
          width: 100%;
          background: #f7f7fb;
          border: 1px solid #ebebf0;
          border-radius: 8px;
          padding: 7px 10px 7px 32px;
          font-size: 12px;
          font-family: 'DM Sans', sans-serif;
          color: #3a3a5c;
          outline: none;
          transition: border-color 0.15s, background 0.15s;
          caret-color: #3d5aed;
        }
        .sidebar-search-input::placeholder { color: #c0c0d8; }
        .sidebar-search-input:focus {
          border-color: #c8d0f8;
          background: #fff;
          box-shadow: 0 0 0 3px #eef1fd;
        }

        /* ── Nav ── */
        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          padding: 16px 12px;
          scrollbar-width: thin;
          scrollbar-color: #e8e8f0 transparent;
        }
        .sidebar-nav::-webkit-scrollbar { width: 4px; }
        .sidebar-nav::-webkit-scrollbar-thumb {
          background: #e4e4ef;
          border-radius: 4px;
        }

        .sidebar-section-label {
          font-family: 'DM Mono', monospace;
          font-size: 8.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #c0c0d8;
          padding: 0 10px;
          margin-bottom: 8px;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 8px 10px;
          border-radius: 8px;
          border: none;
          background: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.13s, color 0.13s;
          margin-bottom: 2px;
          position: relative;
          overflow: hidden;
        }

        /* Inactive */
        .sidebar-item:not(.active) {
          color: #7878a0;
        }
        .sidebar-item:not(.active):hover {
          background: #f4f4fb;
          color: #3a3a5c;
        }
        .sidebar-item:not(.active):hover .sidebar-item-dot {
          background: #a0a0c8;
        }

        /* Active */
        .sidebar-item.active {
          background: #f0f2fd;
          color: #3d5aed;
        }
        .sidebar-item.active::before {
          content: '';
          position: absolute;
          left: 0; top: 6px; bottom: 6px;
          width: 3px;
          background: #3d5aed;
          border-radius: 0 3px 3px 0;
        }
        .sidebar-item.active .sidebar-item-dot {
          background: #3d5aed;
        }
        .sidebar-item.active .sidebar-item-text {
          font-weight: 500;
          color: #3d5aed;
        }

        .sidebar-item-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #d8d8ec;
          flex-shrink: 0;
          transition: background 0.13s;
        }

        .sidebar-item-text {
          font-size: 12.5px;
          font-weight: 400;
          color: inherit;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.4;
        }

        /* Status badge */
        .sidebar-item-badge {
          margin-left: auto;
          flex-shrink: 0;
          font-size: 9px;
          font-family: 'DM Mono', monospace;
          padding: 1px 6px;
          border-radius: 20px;
          background: #f0f0f8;
          color: #a0a0c0;
          border: 1px solid #e8e8f4;
          display: none;
        }
        .sidebar-item.active .sidebar-item-badge {
          display: block;
          background: #eef1fd;
          color: #3d5aed;
          border-color: #c8d0f8;
        }

        /* Empty state */
        .sidebar-empty {
          padding: 20px 10px;
          text-align: center;
          color: #c0c0d8;
          font-size: 12px;
          font-family: 'DM Mono', monospace;
        }

        /* ── Footer ── */
        .sidebar-footer {
          padding: 12px 20px;
          border-top: 1px solid #f0f0f5;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sidebar-footer-count {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: #c0c0d8;
        }
        .sidebar-footer-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #a8e6cf;
          box-shadow: 0 0 0 2px #d4f5e7;
        }
      `}</style>

      <aside className="sidebar">
        {/* ── Brand ── */}
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <div>
            <p className="sidebar-title-sub">Knowledge Base</p>
            <h1 className="sidebar-title-main">Docs</h1>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="sidebar-search">
          <div className="sidebar-search-wrap">
            <svg
              className="sidebar-search-icon"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              className="sidebar-search-input"
            />
          </div>
        </div>

        {/* ── Nav ── */}
        <nav className="sidebar-nav">
          <p className="sidebar-section-label">Projects</p>

          {filtered.length === 0 ? (
            <div className="sidebar-empty">No results</div>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {filtered.map(({ fm, idx }) => {
                const isActive = idx === selectedIndex;
                // Status short label
                const status = fm.Status?.includes("✅")
                  ? "done"
                  : fm.Status?.includes("🛠")
                    ? "wip"
                    : fm.Status?.includes("🔥")
                      ? "crit"
                      : null;

                return (
                  <li key={idx}>
                    <button
                      onClick={() => onSelect?.(idx)}
                      className={`sidebar-item ${isActive ? "active" : ""}`}
                    >
                      <span className="sidebar-item-dot" />
                      <span className="sidebar-item-text">
                        {fm.Project?.replace(/-/g, " ")}
                      </span>
                      {status && (
                        <span className="sidebar-item-badge">{status}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>

        {/* ── Footer ── */}
        <div className="sidebar-footer">
          <span className="sidebar-footer-count">
            {allFrontMatter.length} docs
          </span>
          <span className="sidebar-footer-dot" title="Live" />
        </div>
      </aside>
    </>
  );
};

export default LeftSidebar;
