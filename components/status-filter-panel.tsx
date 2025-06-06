"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "@phosphor-icons/react"

interface StatusFilterPanelProps {
  selectedStatuses: string[]
  onStatusChange: (statuses: string[]) => void
  weakChaptersOnly: boolean
  onWeakChaptersToggle: (enabled: boolean) => void
}

const statusOptions = [
  { value: "Not Started", label: "Not Started", color: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
  { value: "In Progress", label: "In Progress", color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
  { value: "Completed", label: "Completed", color: "bg-green-100 text-green-700 hover:bg-green-200" },
]

export default function StatusFilterPanel({
  selectedStatuses,
  onStatusChange,
  weakChaptersOnly,
  onWeakChaptersToggle,
}: StatusFilterPanelProps) {
  const handleStatusToggle = (status: string) => {
    if (selectedStatuses.includes(status)) {
      onStatusChange(selectedStatuses.filter((s) => s !== status))
    } else {
      onStatusChange([...selectedStatuses, status])
    }
  }

  const clearAllStatuses = () => {
    onStatusChange([])
    onWeakChaptersToggle(false)
  }

  const hasActiveFilters = selectedStatuses.length > 0 || weakChaptersOnly

  return (
    <div className="space-y-4">
      {/* Status Filter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-muted-foreground">STATUS</h4>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllStatuses} className="h-auto p-1 text-xs">
              Clear
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {statusOptions.map((status) => (
            <Button
              key={status.value}
              variant={selectedStatuses.includes(status.value) ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusToggle(status.value)}
              className={cn(
                "justify-start h-9 text-xs",
                selectedStatuses.includes(status.value) ? status.color : "hover:bg-muted",
              )}
            >
              {status.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Weak Chapters Toggle */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">SPECIAL FILTERS</h4>
        <Button
          variant={weakChaptersOnly ? "default" : "outline"}
          size="sm"
          onClick={() => onWeakChaptersToggle(!weakChaptersOnly)}
          className={cn(
            "w-full justify-start h-9 text-xs",
            weakChaptersOnly
              ? "bg-mathongo-weak hover:bg-mathongo-weak/90 text-white border-mathongo-weak"
              : "hover:bg-muted",
          )}
        >
          Weak Chapters Only
        </Button>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="space-y-2 pt-2 border-t">
          <h4 className="text-xs font-medium text-muted-foreground">ACTIVE FILTERS</h4>
          <div className="flex flex-wrap gap-1">
            {selectedStatuses.map((status) => (
              <Badge key={status} variant="secondary" className="text-xs px-2 py-1 gap-1">
                {status}
                <X
                  size={12}
                  className="cursor-pointer hover:text-destructive"
                  onClick={() => handleStatusToggle(status)}
                />
              </Badge>
            ))}
            {weakChaptersOnly && (
              <Badge variant="destructive" className="text-xs px-2 py-1 gap-1">
                Weak Chapters
                <X size={12} className="cursor-pointer" onClick={() => onWeakChaptersToggle(false)} />
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
