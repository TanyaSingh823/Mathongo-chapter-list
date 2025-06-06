"use client"

import { ArrowRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setActiveSubject, selectActiveSubject, selectChapters } from "@/lib/features/chapters/chaptersSlice"
import { cn } from "@/lib/utils"

const subjects = [
  { id: "Physics", label: "Physics PYQs", icon: "🧪", color: "bg-orange-500" },
  { id: "Chemistry", label: "Chemistry PYQs", icon: "⚗️", color: "bg-green-500" },
  { id: "Mathematics", label: "Mathematics PYQs", icon: "📐", color: "bg-blue-500" },
]

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const activeSubject = useAppSelector(selectActiveSubject)
  const chapters = useAppSelector(selectChapters)

  // Calculate total chapters for each subject
  const getSubjectStats = (subjectId: string) => {
    const subjectChapters = chapters.filter((chapter) => chapter.subject === subjectId)
    return subjectChapters.length
  }

  return (
    <div className="hidden lg:block w-80 bg-card border-r border-border">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">✓</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold">JEE Main</h1>
            <p className="text-xs text-muted-foreground">2025 - 2009 | 173 Papers | 15825 Qs</p>
          </div>
        </div>

        {/* Subject Navigation */}
        <div className="space-y-2">
          {subjects.map((subject) => {
            const chapterCount = getSubjectStats(subject.id)
            return (
              <Button
                key={subject.id}
                variant="ghost"
                onClick={() => dispatch(setActiveSubject(subject.id))}
                className={cn(
                  "w-full justify-between h-auto p-3 text-left transition-all duration-200",
                  activeSubject === subject.id
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                    : "hover:bg-muted/50",
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white", subject.color)}>
                    {subject.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{subject.label}</div>
                    {chapterCount > 0 && <div className="text-xs text-muted-foreground">{chapterCount} chapters</div>}
                  </div>
                </div>
                <ArrowRight size={16} className="text-muted-foreground" />
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
