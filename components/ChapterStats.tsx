"use client"

import { Badge } from "@/components/ui/badge"
import { useAppSelector } from "@/src/hooks/redux"
import { selectFilteredChapters, selectSubjectChapters, selectActiveFilterCount } from "@/src/store/chaptersSlice"

export default function ChapterStats() {
  const filteredChapters = useAppSelector(selectFilteredChapters)
  const subjectChapters = useAppSelector(selectSubjectChapters)
  const activeFilterCount = useAppSelector(selectActiveFilterCount)

  const stats = {
    total: subjectChapters.length,
    filtered: filteredChapters.length,
    completed: filteredChapters.filter((ch) => ch.status === "Completed").length,
    inProgress: filteredChapters.filter((ch) => ch.status === "In Progress").length,
    notStarted: filteredChapters.filter((ch) => ch.status === "Not Started").length,
    weak: filteredChapters.filter((ch) => ch.isWeakChapter).length,
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg">
      <div className="flex items-center gap-4 text-sm">
        <span className="font-medium">
          Showing {stats.filtered} of {stats.total} chapters
        </span>
        {activeFilterCount > 0 && (
          <Badge variant="outline" className="text-xs">
            {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-mathongo-strong"></div>
          <span>{stats.completed} Completed</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-mathongo-primary"></div>
          <span>{stats.inProgress} In Progress</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <span>{stats.notStarted} Not Started</span>
        </div>
        {stats.weak > 0 && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-mathongo-weak"></div>
            <span>{stats.weak} Weak</span>
          </div>
        )}
      </div>
    </div>
  )
}
