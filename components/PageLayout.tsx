"use client";

import { useState } from "react";
import type { MarkdownData, FrontMatter } from "@/utils/markdown";
import LeftSidebar from "./LeftSidebar";
import DocSelector from "./DocSelector";

interface PageLayoutProps {
  allMarkdownData: MarkdownData[];
  allFrontMatter: FrontMatter[];
}

export default function PageLayout({
  allMarkdownData,
  allFrontMatter,
}: PageLayoutProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <>
      {/* ── LEFT SIDEBAR ── */}
      <LeftSidebar
        allFrontMatter={allFrontMatter}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* ── MAIN CONTENT + RIGHT TOC ── */}
      <DocSelector
        allMarkdownData={allMarkdownData}
        selectedIndex={selectedIndex}
        onOpenSidebar={() => setMobileSidebarOpen(true)}
      />
    </>
  );
}
