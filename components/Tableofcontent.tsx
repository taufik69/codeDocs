"use client";

import { useState, useEffect } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = ({ headings }: { headings: Heading[] }) => {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");
  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -40% 0px", threshold: 0 },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
    
      @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');
      
        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .toc-btn {
          display: block;
          width: 100%;
          text-align: left;
          border: none;
          background: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.4;
          position: relative;
          transition: all 0.18s ease;
          margin-left: 10px;
          margin-bottom: 10px;
        }

        /* H2 level */
        .toc-btn.level-2 {
          font-size: 15px;
          font-weight: 500;
          padding: 6px 18px;
          color: #5a5a78;
        }

        /* H3 level */
        .toc-btn.level-3 {
          font-size: 13.5px;
          font-weight: 400;
          padding: 5px 18px 5px 30px;
          color: #8888a8;
        }

        /* H4 level */
        .toc-btn.level-4 {
          font-size: 10px;
          font-weight: 400;
          padding: 4px 18px 4px 42px;
          color: #a0a0b8;
        }

        /* Hover */
        .toc-btn:not(.active):hover {
          color: #3d5aed;
          background: #f0f2fd;
         
        }

        /* ── ACTIVE STATE ── */
        .toc-btn.active {
          color: #3d5aed;
          margin-left: 10px;
          margin-bottom: 10px;
          font-weight: 600;
          background: linear-gradient(90deg, #eef1fd 0%, #f4f6fe 100%);
        }
        .toc-btn.active::before {
          content: '';
          position: absolute;
          left: -10px;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #3d5aed;
          border-radius: 0 2px 2px 0;
        }

        /* Active dot for h2 */
        .toc-btn.active.level-2::after {
          content: '';
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #3d5aed;
          opacity: 0.5;
        }
      `}</style>

      <ul className="toc-list">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => handleClick(heading.id)}
              className={[
                "toc-btn",
                `level-${Math.min(heading.level, 4)}`,
                activeId === heading.id ? "active" : "",
              ]
                .join(" ")
                .trim()}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TableOfContents;
