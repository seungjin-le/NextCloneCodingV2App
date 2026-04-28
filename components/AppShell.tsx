"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { type CustomSidebarCategory } from "@/lib/adminCategories";

export function AppShell({
  children,
  initialCustomSidebarCategories,
}: {
  children: React.ReactNode;
  initialCustomSidebarCategories: CustomSidebarCategory[];
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        initialCustomCategories={initialCustomSidebarCategories}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <SiteHeader onMenuClick={() => setMobileSidebarOpen(true)} />
        <div>{children}</div>
      </div>
    </div>
  );
}
