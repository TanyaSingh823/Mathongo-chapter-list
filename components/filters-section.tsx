"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {
  selectChapters,
  selectActiveSubject,
  selectFilters,
  selectFilteredChapters,
  updateFilters,
} from "@/lib/features/chapters/chaptersSlice"
import MultiSelectDropdown from "./multi-select-dropdown"
import SortDropdown from "./sort-dropdown"
import MobileFiltersDrawer from "./mobile-filters-drawer"
import { cn } from "@/lib/utils"

export default function FiltersSection() {
  const dispatch = useAppDispatch()
  const chapters = useAppSelector(selectChapters)
  const activeSubject = useAppSelector(selectActiveSubject)
  const filters = useAppSelector(selectFilters)
  const filteredChapters = useAppSelector(selectFilteredChapters)

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
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2 md:gap-3">
          <MobileFiltersDrawer />

          <div className="hidden md:flex md:gap-2">
            <MultiSelectDropdown
              options={uniqueClasses}
              selected={filters.classes}
              onChange={(classes) => dispatch(updateFilters({ classes }))}
              placeholder="Class"
              className="min-w-[100px]"
            />

            <MultiSelectDropdown
              options={uniqueUnits}
              selected={filters.units}
              onChange={(units) => dispatch(updateFilters({ units }))}
              placeholder="Units"
              className="min-w-[100px]"
            />

            <Button
              variant={filters.notStartedOnly ? "default" : "outline"}
              onClick={() => dispatch(updateFilters({ notStartedOnly: !filters.notStartedOnly }))}
            >
              Not Started
            </Button>

            <Button
              variant={filters.weakChaptersOnly ? "destructive" : "outline"}
              onClick={() => dispatch(updateFilters({ weakChaptersOnly: !filters.weakChaptersOnly }))}
              className={cn(filters.weakChaptersOnly && "bg-mathongo-weak hover:bg-mathongo-weak/90 text-white")}
            >
              Weak Chapters
            </Button>
          </div>
        </div>

        <SortDropdown />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredChapters.length} of {subjectChapters.length} chapters
        </div>

        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-auto py-1 px-2 text-xs">
            Clear All
          </Button>
        )}
      </div>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {filters.classes?.map((classItem) => (
            <Badge key={classItem} variant="secondary" className="text-xs px-2 py-1 gap-1">
              {classItem}
              <X
                size={12}
                className="cursor-pointer hover:text-destructive"
                onClick={() => {
                  dispatch(
                    updateFilters({
                      classes: filters.classes?.filter((c) => c !== classItem),
                    }),
                  )
                }}
              />
            </Badge>
          ))}

          {filters.units?.map((unit) => (
            <Badge key={unit} variant="secondary" className="text-xs px-2 py-1 gap-1">
              {unit}
              <X
                size={12}
                className="cursor-pointer hover:text-destructive"
                onClick={() => {
                  dispatch(
                    updateFilters({
                      units: filters.units?.filter((u) => u !== unit),
                    }),
                  )
                }}
              />
            </Badge>
          ))}

          {filters.notStartedOnly && (
            <Badge variant="secondary" className="text-xs px-2 py-1 gap-1">
              Not Started
              <X
                size={12}
                className="cursor-pointer hover:text-destructive"
                onClick={() => {
                  dispatch(updateFilters({ notStartedOnly: false }))
                }}
              />
            </Badge>
          )}

          {filters.weakChaptersOnly && (
            <Badge variant="destructive" className="text-xs px-2 py-1 gap-1">
              Weak Chapters
              <X
                size={12}
                className="cursor-pointer"
                onClick={() => {
                  dispatch(updateFilters({ weakChaptersOnly: false }))
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
