"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {
  selectFilteredChapters,
  selectChapters,
  selectActiveSubject,
  updateFilters,
} from "@/lib/features/chapters/chaptersSlice"
import { X } from "@phosphor-icons/react"

export default function FilterChipDisplay() {
  const dispatch = useAppDispatch()
  const filteredChapters = useAppSelector(selectFilteredChapters)
  const chapters = useAppSelector(selectChapters)
  const activeSubject = useAppSelector(selectActiveSubject)
  const filters = useAppSelector((state) => state.chapters.filters)

  const subjectChapters = chapters.filter((chapter) => chapter.subject === activeSubject)

  const hasActiveFilters =
    (filters.classes && filters.classes.length > 0) ||
    (filters.units && filters.units.length > 0) ||
    (filters.statuses && filters.statuses.length > 0) ||
    filters.weakChaptersOnly

  const clearAllFilters = () => {
    dispatch(
      updateFilters({
        classes: [],
        units: [],
        statuses: [],
        weakChaptersOnly: false,
      }),
    )
  }

  if (!hasActiveFilters) {
    return <div className="text-sm text-muted-foreground">Showing all {subjectChapters.length} chapters</div>
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredChapters.length} of {subjectChapters.length} chapters
        </div>
        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-auto py-1 px-2 text-xs">
          Clear All
        </Button>
      </div>

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

        {filters.statuses?.map((status) => (
          <Badge key={status} variant="secondary" className="text-xs px-2 py-1 gap-1">
            {status}
            <X
              size={12}
              className="cursor-pointer hover:text-destructive"
              onClick={() => {
                dispatch(
                  updateFilters({
                    statuses: filters.statuses?.filter((s) => s !== status),
                  }),
                )
              }}
            />
          </Badge>
        ))}

        {filters.weakChaptersOnly && (
          <Badge variant="destructive" className="text-xs px-2 py-1 gap-1">
            Weak Chapters
            <X
              size={12}
              className="cursor-pointer"
              onClick={() => {
                dispatch(
                  updateFilters({
                    weakChaptersOnly: false,
                  }),
                )
              }}
            />
          </Badge>
        )}
      </div>
    </div>
  )
}
