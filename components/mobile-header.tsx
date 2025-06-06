"use client"

import { ArrowLeft } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import MobileSubjectTabs from "./mobile-subject-tabs"

export default function MobileHeader() {
  return (
    <div className="lg:hidden bg-card border-b border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon">
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-lg font-semibold">JEE Main</h1>
        <div className="w-8" />
      </div>

      <MobileSubjectTabs />
    </div>
  )
}
