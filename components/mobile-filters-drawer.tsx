"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {
  selectChapters,
  selectActiveSubject,
  selectFilters,
  updateFilters,
} from "@/lib/features/chapters/chaptersSlice"
import MultiSelectDropdown from "./multi-select-dropdown"

export default function MobileFiltersDrawer() {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const chapters = useAppSelector(selectChapters)
  const activeSubject = useAppSelector(selectActiveSubject)
  const filters = useAppSelector(selectFilters)

  const subjectChapters = chapters.filter((chapter) => chapter.subject === activeSubject)
  const uniqueClasses = [...new Set(subjectChapters.map((chapter) => chapter.class))].sort()
  const uniqueUnits = [...new Set(subjectChapters.map((chapter) => chapter.unit))].sort()

  const activeFilterCount =
    (filters.classes?.length || 0) +
    (filters.units?.length || 0) +
    (filters.notStartedOnly ? 1 : 0) +
    (filters.weakChaptersOnly ? 1 : 0)

  const clearAllFilters = () => {
    dispatch(
      updateFilters({
        classes: [],
        units: [],
        notStartedOnly: false,
        weakChaptersOnly: false,
      }),
    )
  }

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter size={16} className="mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader className="flex flex-row items-center justify-between">
            <SheetTitle>Filter Chapters</SheetTitle>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              <X size={16} />
            </Button>
          </SheetHeader>
          <div className="space-y-6 mt-6 overflow-y-auto max-h-[calc(80vh-8rem)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">FILTERS</h3>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-auto p-1 text-xs">
                    Clear All
                  </Button>
                )}
              </div>

              <MultiSelectDropdown
                options={uniqueClasses}
                selected={filters.classes}
                onChange={(classes) => dispatch(updateFilters({ classes }))}
                placeholder="Class"
                className="w-full"
              />

              <MultiSelectDropdown
                options={uniqueUnits}
                selected={filters.units}
                onChange={(units) => dispatch(updateFilters({ units }))}
                placeholder="Units"
                className="w-full"
              />

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">STATUS</h4>
                <Button
                  variant={filters.notStartedOnly ? "default" : "outline"}
                  onClick={() => dispatch(updateFilters({ notStartedOnly: !filters.notStartedOnly }))}
                  className="w-full justify-start"
                >
                  Not Started
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">SPECIAL FILTERS</h4>
                <Button
                  variant={filters.weakChaptersOnly ? "destructive" : "outline"}
                  onClick={() => dispatch(updateFilters({ weakChaptersOnly: !filters.weakChaptersOnly }))}
                  className="w-full justify-start"
                >
                  Weak Chapters Only
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
