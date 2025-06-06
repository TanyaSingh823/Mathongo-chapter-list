"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SidebarOpen, SidebarClose } from "lucide-react"
import { cn } from "@/lib/utils"
import FilterPanel from "./FilterPanel"
import MobileFilters from "./MobileFilters"
import SortControls from "./SortControls"
import ChapterStats from "./ChapterStats"

interface ResponsiveLayoutProps {
  children: React.ReactNode
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:block w-80 border-r border-border bg-card/50 transition-all duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="p-6 h-full overflow-y-auto">
          <FilterPanel />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="border-b border-border bg-card/50 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <SidebarClose size={20} /> : <SidebarOpen size={20} />}
              </Button>
              <MobileFilters />
            </div>
            <SortControls />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="p-4">
          <ChapterStats />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4">{children}</div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="w-80 h-full bg-card border-r border-border p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <FilterPanel />
          </div>
        </div>
      )}
    </div>
  )
}
