"use client"

import { useState } from "react"
import { Funnel, X } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import MultiSelectFilter from "./multi-select-filter"
import StatusFilterPanel from "./status-filter-panel"

interface MobileFilterPanelProps {
  classes: string[]
  units: string[]
  selectedClasses: string[]
  selectedUnits: string[]
  selectedStatuses: string[]
  weakChaptersOnly: boolean
  onClassChange: (classes: string[]) => void
  onUnitChange: (units: string[]) => void
  onStatusChange: (statuses: string[]) => void
  onWeakChaptersToggle: (enabled: boolean) => void
  activeFilterCount: number
}

export default function MobileFilterPanel({
  classes,
  units,
  selectedClasses,
  selectedUnits,
  selectedStatuses,
  weakChaptersOnly,
  onClassChange,
  onUnitChange,
  onStatusChange,
  onWeakChaptersToggle,
  activeFilterCount,
}: MobileFilterPanelProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative">
            <Funnel size={16} className="mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              Filter Chapters
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                <X size={16} />
              </Button>
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-6 mt-6 overflow-y-auto max-h-[calc(80vh-8rem)]">
            <MultiSelectFilter
              title="Class"
              options={classes}
              selected={selectedClasses}
              onChange={onClassChange}
              placeholder="Select classes"
            />

            <MultiSelectFilter
              title="Units"
              options={units}
              selected={selectedUnits}
              onChange={onUnitChange}
              placeholder="Select units"
            />

            <StatusFilterPanel
              selectedStatuses={selectedStatuses}
              onStatusChange={onStatusChange}
              weakChaptersOnly={weakChaptersOnly}
              onWeakChaptersToggle={onWeakChaptersToggle}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
