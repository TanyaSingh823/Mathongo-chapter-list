"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import {
  selectChapters,
  selectActiveSubject,
  selectFilters,
  selectFilteredChapters,
  selectSortOrder,
  updateFilters,
  toggleSortOrder,
} from "@/src/store/chaptersSlice"
import { cn } from "@/lib/utils"

export default function FiltersSection() {
  const dispatch = useAppDispatch()
  const chapters = useAppSelector(selectChapters)
  const activeSubject = useAppSelector(selectActiveSubject)
  const filters = useAppSelector(selectFilters)
  const filteredChapters = useAppSelector(selectFilteredChapters)
  const sortOrder = useAppSelector(selectSortOrder)

  const subjectChapters = chapters.filter((chapter) => chapter.subject === activeSubject)

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
            className={cn(filters.weakChaptersOnly && "bg-mathongo-weak hover:bg-mathongo-weak/90 text-white")}
            size="sm"
          >
            Weak Chapters
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={() => dispatch(toggleSortOrder())}
          size="sm"
          className="flex items-center gap-2"
        >
          <ArrowUpDown size={16} />
          Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredChapters.length} of {subjectChapters.length} chapters
        </div>

        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-auto py-1 px-2 text-xs">
            Clear All ({activeFilterCount})
          </Button>
        )}
      </div>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
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
