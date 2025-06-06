"use client"

import { useState } from "react"
import { Check, CaretDown, X } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {
  selectChapters,
  selectActiveSubject,
  updateFilters,
  selectFilters,
} from "@/lib/features/chapters/chaptersSlice"
import MultiSelect from "./multi-select"

interface ChapterFiltersProps {
  subject: string
}

export default function ChapterFilters({ subject }: ChapterFiltersProps) {
  const dispatch = useAppDispatch()
  const chapters = useAppSelector(selectChapters)
  const activeSubject = useAppSelector(selectActiveSubject)
  const filters = useAppSelector(selectFilters)

  const [classOpen, setClassOpen] = useState(false)
  const [unitOpen, setUnitOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)

  // Extract unique classes and units for the current subject
  const subjectChapters = chapters.filter((chapter) => chapter.subject === activeSubject)
  const uniqueClasses = [...new Set(subjectChapters.map((chapter) => chapter.class))].sort()
  const uniqueUnits = [...new Set(subjectChapters.map((chapter) => chapter.unit))].sort()

  const statusOptions = [
    { value: "Completed", label: "Completed" },
    { value: "In Progress", label: "In Progress" },
    { value: "Not Started", label: "Not Started" },
  ]

  const handleClassSelect = (value: string) => {
    const currentClasses = [...(filters.classes || [])]

    if (currentClasses.includes(value)) {
      dispatch(
        updateFilters({
          classes: currentClasses.filter((c) => c !== value),
        }),
      )
    } else {
      dispatch(
        updateFilters({
          classes: [...currentClasses, value],
        }),
      )
    }
  }

  const handleUnitSelect = (value: string) => {
    const currentUnits = [...(filters.units || [])]

    if (currentUnits.includes(value)) {
      dispatch(
        updateFilters({
          units: currentUnits.filter((u) => u !== value),
        }),
      )
    } else {
      dispatch(
        updateFilters({
          units: [...currentUnits, value],
        }),
      )
    }
  }

  const handleStatusSelect = (value: string) => {
    const currentStatuses = [...(filters.statuses || [])]

    if (currentStatuses.includes(value)) {
      dispatch(
        updateFilters({
          statuses: currentStatuses.filter((s) => s !== value),
        }),
      )
    } else {
      dispatch(
        updateFilters({
          statuses: [...currentStatuses, value],
        }),
      )
    }
  }

  const handleWeakChaptersToggle = (checked: boolean) => {
    dispatch(updateFilters({ weakChaptersOnly: checked }))
  }

  const clearAllFilters = () => {
    dispatch(
      updateFilters({
        classes: [],
        units: [],
        statuses: [],
        weakChaptersOnly: false,
        notStartedOnly: false,
      }),
    )
  }

  const hasActiveFilters =
    (filters.classes && filters.classes.length > 0) ||
    (filters.units && filters.units.length > 0) ||
    (filters.statuses && filters.statuses.length > 0) ||
    filters.weakChaptersOnly ||
    filters.notStartedOnly

  return (
    <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 mb-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">FILTERS</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-auto p-1 text-xs">
            Clear All
          </Button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2">
        {/* Class Filter */}
        <MultiSelect
          options={uniqueClasses}
          selected={filters.classes}
          onChange={(classes) => dispatch(updateFilters({ classes }))}
          placeholder="Select Class"
        />

        {/* Unit Filter */}
        <MultiSelect
          options={uniqueUnits}
          selected={filters.units}
          onChange={(units) => dispatch(updateFilters({ units }))}
          placeholder="Select Units"
        />

        {/* Status Filter */}
        <Popover open={statusOpen} onOpenChange={setStatusOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-between h-9">
              Status
              {filters.statuses && filters.statuses.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {filters.statuses.length}
                </Badge>
              )}
              <CaretDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {statusOptions.map((status) => (
                    <CommandItem key={status.value} value={status.value} onSelect={handleStatusSelect}>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          filters.statuses?.includes(status.value) ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {status.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Not Started Quick Filter */}
        <Button
          variant={filters.notStartedOnly ? "default" : "outline"}
          onClick={() => dispatch(updateFilters({ notStartedOnly: !filters.notStartedOnly }))}
          className="w-full"
        >
          Not Started
        </Button>

        {/* Weak Chapters Toggle */}
        <Button
          variant={filters.weakChaptersOnly ? "destructive" : "outline"}
          onClick={() => handleWeakChaptersToggle(!filters.weakChaptersOnly)}
          className={cn(
            "w-full h-9",
            filters.weakChaptersOnly && "bg-mathongo-weak hover:bg-mathongo-weak/90 text-white",
          )}
        >
          Weak Chapters
        </Button>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Active Filters:</div>
          <div className="flex flex-wrap gap-1">
            {filters.classes?.map((classItem) => (
              <Badge key={classItem} variant="secondary" className="text-xs">
                {classItem}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleClassSelect(classItem)} />
              </Badge>
            ))}
            {filters.units?.map((unit) => (
              <Badge key={unit} variant="secondary" className="text-xs">
                {unit}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleUnitSelect(unit)} />
              </Badge>
            ))}
            {filters.statuses?.map((status) => (
              <Badge key={status} variant="secondary" className="text-xs">
                {status}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleStatusSelect(status)} />
              </Badge>
            ))}
            {filters.weakChaptersOnly && (
              <Badge variant="destructive" className="text-xs">
                Weak Chapters
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleWeakChaptersToggle(false)} />
              </Badge>
            )}
            {filters.notStartedOnly && (
              <Badge variant="secondary" className="text-xs">
                Not Started
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => dispatch(updateFilters({ notStartedOnly: false }))}
                />
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
