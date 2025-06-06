"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {
  selectFilteredChapters,
  selectSubjectChapters,
  selectFilters,
  selectActiveFilterCount,
  updateFilters,
  clearAllFilters,
} from "@/lib/features/chapters/chaptersSlice"
import MobileFilters from "./MobileFilters"
import SortControls from "./SortControls"

export default function FilterControls() {
  const dispatch = useAppDispatch()
  const filteredChapters = useAppSelector(selectFilteredChapters)
  const subjectChapters = useAppSelector(selectSubjectChapters)
  const filters = useAppSelector(selectFilters)
  const activeFilterCount = useAppSelector(selectActiveFilterCount)

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <MobileFilters />

          {/* Quick Filters - Desktop */}
          <div className="hidden md:flex gap-2">
            <Button
              variant={filters.notStartedOnly ? "default" : "outline"}
              onClick={() => dispatch(updateFilters({ notStartedOnly: !filters.notStartedOnly }))}
              size="sm"
            >
              Not Started
            </Button>

            <Button
              variant={filters.weakChaptersOnly ? "destructive" : "outline"}
              onClick={() => dispatch(updateFilters({ weakChaptersOnly: !filters.weakChaptersOnly }))}
              size="sm"
              className={filters.weakChaptersOnly ? "bg-mathongo-weak hover:bg-mathongo-weak/90" : ""}
            >
              Weak Chapters
            </Button>
          </div>
        </div>

        <SortControls />
      </div>

      {/* Filter Stats */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredChapters.length} of {subjectChapters.length} chapters
        </div>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(clearAllFilters())}
            className="h-auto py-1 px-2 text-xs"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
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
