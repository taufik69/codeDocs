import React from "react";

const Content = ({ htmlContent }: { htmlContent: string }) => {
  return (
    <>
      <style>{`
        

        .doc-body {
          --ink:        #1a1a2e;
          --ink-muted:  #4a5068;
          --ink-faint:  #8b90a7;
          --accent:     #3d5aed;
          --accent-bg:  #eef1fd;
          --surface:    #f8f8fc;
          --border:     #e4e6f0;
          --code-bg:    #1e2035;
          --code-fg:    #cdd6f4;
          --red:        #e64553;
          --green:      #40a02b;
          --yellow:     #df8e1d;

          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.85;
          color: var(--ink);
          font-weight: 300;
          max-width: 720px;
          width: 100%;
        }

        /* Keep content from causing horizontal scroll */
        .doc-body * {
          max-width: 100%;
        }

        /* Better mobile typography */
        @media (max-width: 640px) {
          .doc-body {
            font-size: 14px;
            line-height: 1.8;
          }
          .doc-body h1 {
            font-size: 2rem;
            margin-bottom: 1.5rem;
          }
        }

        /* ── Headings ── */
        .doc-body h1 {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 2.4rem;
          font-weight: 400;
          color: var(--ink);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: 0 0 2rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border);
        }
        .doc-body h2 {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--ink);
          margin: 3rem 0 0.75rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid var(--border);
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 10px;
          scroll-margin-top: 24px;
        }
        .doc-body h2::before {
          content: '';
          display: inline-block;
          width: 3px;
          height: 16px;
          background: var(--accent);
          border-radius: 2px;
          flex-shrink: 0;
        }
        .doc-body h3 {
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 2rem 0 0.6rem;
          scroll-margin-top: 24px;
        }
        .doc-body h4 {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--ink);
          margin: 1.5rem 0 0.5rem;
          scroll-margin-top: 24px;
        }

        /* ── Paragraphs ── */
        .doc-body p {
          margin: 0 0 1rem;
          color: var(--ink-muted);
          font-weight: 300;
        }

        /* ── Inline code ── */
        .doc-body :not(pre) > code {
          font-family: 'DM Mono', monospace;
          font-size: 0.82em;
          background: var(--accent-bg);
          color: var(--accent);
          padding: 2px 7px;
          border-radius: 4px;
          border: 1px solid #c8d0f8;
          font-weight: 500;
        }

        /* ── Code blocks ── */
        .doc-body pre {
          background: var(--code-bg);
          border-radius: 10px;
          padding: 20px 22px;
          margin: 1.5rem 0;
          overflow-x: auto;
          border: 1px solid #2e3052;
          position: relative;
        }
        .doc-body pre::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, var(--accent) 0%, transparent 60%);
          border-radius: 10px 10px 0 0;
        }
        .doc-body pre code {
          font-family: 'DM Mono', monospace;
          font-size: 0.83rem;
          color: var(--code-fg);
          background: none;
          border: none;
          padding: 0;
          line-height: 1.8;
          font-weight: 400;
        }

        /* ── Lists ── */
        .doc-body ul {
          padding: 0;
          margin: 0.75rem 0 1.25rem;
          list-style: none;
        }
        .doc-body ul li {
          color: var(--ink-muted);
          padding: 3px 0 3px 20px;
          position: relative;
          font-weight: 300;
        }
        .doc-body ul li::before {
          content: '–';
          position: absolute;
          left: 0;
          color: var(--accent);
          font-family: 'DM Mono', monospace;
          font-size: 0.85em;
          font-weight: 500;
        }
        .doc-body ol {
          padding-left: 1.4rem;
          margin: 0.75rem 0 1.25rem;
          counter-reset: ol-counter;
          list-style: none;
        }
        .doc-body ol li {
          color: var(--ink-muted);
          padding: 3px 0;
          counter-increment: ol-counter;
          position: relative;
          padding-left: 8px;
          font-weight: 300;
        }
        .doc-body ol li::before {
          content: counter(ol-counter) ".";
          position: absolute;
          left: -1.4rem;
          color: var(--accent);
          font-family: 'DM Mono', monospace;
          font-size: 0.8em;
          font-weight: 500;
          top: 5px;
        }

        /* ── Strong / em ── */
        .doc-body strong {
          font-weight: 600;
          color: var(--ink);
        }
        .doc-body em {
          font-style: italic;
          color: var(--ink-muted);
        }

        /* ── Links ── */
        .doc-body a {
          color: var(--accent);
          text-decoration: none;
          border-bottom: 1px solid #c8d0f8;
          transition: border-color 0.15s, color 0.15s;
        }
        .doc-body a:hover {
          color: #2541cc;
          border-color: var(--accent);
        }

        /* ── Blockquote ── */
        .doc-body blockquote {
          margin: 1.5rem 0;
          padding: 14px 18px;
          border-left: 3px solid var(--accent);
          background: var(--accent-bg);
          border-radius: 0 8px 8px 0;
          color: var(--ink-muted);
          font-style: italic;
        }
        .doc-body blockquote p { margin: 0; }

        /* ── HR ── */
        .doc-body hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 2.5rem 0;
        }

        /* ── Table ── */
        .doc-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.88rem;
          display: block;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .doc-body table::-webkit-scrollbar { height: 6px; }
        .doc-body table::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 999px;
        }
        .doc-body th {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--ink-faint);
          border-bottom: 2px solid var(--border);
          padding: 8px 12px;
          text-align: left;
          font-weight: 500;
        }
        .doc-body td {
          padding: 9px 12px;
          border-bottom: 1px solid var(--border);
          color: var(--ink-muted);
          font-weight: 300;
        }
        .doc-body tr:last-child td { border-bottom: none; }

        /* Long URLs / tokens */
        .doc-body p, .doc-body li {
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        /* ── Checkbox lists (your checklist) ── */
        .doc-body li:has(input[type="checkbox"]) {
          padding-left: 0;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .doc-body li:has(input[type="checkbox"])::before {
          display: none;
        }
        .doc-body input[type="checkbox"] {
          margin-top: 4px;
          accent-color: var(--accent);
        }
      `}</style>

      <div
        className="doc-body"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </>
  );
};

export default Content;
