"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {
  selectUniqueClasses,
  selectUniqueUnits,
  selectFilters,
  selectActiveFilterCount,
  updateFilters,
  clearAllFilters,
} from "@/lib/features/chapters/chaptersSlice"
import MultiSelectDropdown from "./MultiSelectDropdown"

export default function FilterPanel() {
  const dispatch = useAppDispatch()
  const uniqueClasses = useAppSelector(selectUniqueClasses)
  const uniqueUnits = useAppSelector(selectUniqueUnits)
  const filters = useAppSelector(selectFilters)
  const activeFilterCount = useAppSelector(selectActiveFilterCount)

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted-foreground" />
          <h3 className="font-semibold text-sm">FILTERS</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(clearAllFilters())}
            className="text-xs h-auto py-1 px-2"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Class Filter */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">CLASS</h4>
        <MultiSelectDropdown
          title="Class"
          options={uniqueClasses}
          selected={filters.classes}
          onChange={(classes) => dispatch(updateFilters({ classes }))}
          placeholder="Select classes"
        />
      </div>

      {/* Unit Filter */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">UNITS</h4>
        <MultiSelectDropdown
          title="Unit"
          options={uniqueUnits}
          selected={filters.units}
          onChange={(units) => dispatch(updateFilters({ units }))}
          placeholder="Select units"
        />
      </div>

      {/* Status Filters */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">STATUS</h4>
        <div className="space-y-2">
          <Button
            variant={filters.notStartedOnly ? "default" : "outline"}
            onClick={() => dispatch(updateFilters({ notStartedOnly: !filters.notStartedOnly }))}
            className="w-full justify-start"
          >
            Not Started Only
          </Button>
          <Button
            variant={filters.weakChaptersOnly ? "destructive" : "outline"}
            onClick={() => dispatch(updateFilters({ weakChaptersOnly: !filters.weakChaptersOnly }))}
            className={`w-full justify-start ${
              filters.weakChaptersOnly ? "bg-mathongo-weak hover:bg-mathongo-weak/90" : ""
            }`}
          >
            Weak Chapters Only
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="space-y-2 pt-4 border-t">
          <h4 className="text-xs font-medium text-muted-foreground">ACTIVE FILTERS</h4>
          <div className="flex flex-wrap gap-1">
            {filters.classes.map((className) => (
              <Badge key={className} variant="secondary" className="text-xs px-2 py-1 gap-1">
                {className}
                <X
                  size={12}
                  className="cursor-pointer hover:text-destructive"
                  onClick={() => dispatch(updateFilters({ classes: filters.classes.filter((c) => c !== className) }))}
                />
              </Badge>
            ))}
            {filters.units.map((unitName) => (
              <Badge key={unitName} variant="secondary" className="text-xs px-2 py-1 gap-1">
                {unitName}
                <X
                  size={12}
                  className="cursor-pointer hover:text-destructive"
                  onClick={() => dispatch(updateFilters({ units: filters.units.filter((u) => u !== unitName) }))}
                />
              </Badge>
            ))}
            {filters.notStartedOnly && (
              <Badge variant="outline" className="text-xs px-2 py-1 gap-1">
                Not Started
                <X
                  size={12}
                  className="cursor-pointer hover:text-destructive"
                  onClick={() => dispatch(updateFilters({ notStartedOnly: false }))}
                />
              </Badge>
            )}
            {filters.weakChaptersOnly && (
              <Badge variant="destructive" className="text-xs px-2 py-1 gap-1">
                Weak Chapters
                <X
                  size={12}
                  className="cursor-pointer"
                  onClick={() => dispatch(updateFilters({ weakChaptersOnly: false }))}
                />
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
