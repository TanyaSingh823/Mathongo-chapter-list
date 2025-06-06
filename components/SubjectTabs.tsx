"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setActiveSubject, selectActiveSubject, selectSubjectStats } from "@/lib/features/chapters/chaptersSlice"
import { cn } from "@/lib/utils"

const subjects = [
  {
    id: "Physics",
    label: "Physics",
    shortLabel: "Phy",
    color: "bg-mathongo-physics text-white",
    icon: "⚛️",
  },
  {
    id: "Chemistry",
    label: "Chemistry",
    shortLabel: "Chem",
    color: "bg-mathongo-chemistry text-white",
    icon: "🧪",
  },
  {
    id: "Mathematics",
    label: "Mathematics",
    shortLabel: "Math",
    color: "bg-mathongo-math text-white",
    icon: "📐",
  },
]

export default function SubjectTabs() {
  const dispatch = useAppDispatch()
  const activeSubject = useAppSelector(selectActiveSubject)
  const subjectStats = useAppSelector(selectSubjectStats)

  const getSubjectStats = (subjectId: string) => {
    return subjectStats.find((stat) => stat.subject === subjectId)
  }

  return (
    <>
      {/* Desktop Tabs */}
      <div className="hidden md:flex justify-center gap-6 mb-8">
        {subjects.map((subject) => {
          const stats = getSubjectStats(subject.id)
          return (
            <button
              key={subject.id}
              onClick={() => dispatch(setActiveSubject(subject.id))}
              className={cn(
                "flex flex-col items-center p-4 rounded-xl transition-all duration-300 min-w-[140px]",
                activeSubject === subject.id
                  ? subject.color + " shadow-lg scale-105"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 dark:bg-muted/30 hover:scale-102",
              )}
            >
              <div className="text-2xl mb-2">{subject.icon}</div>
              <div className="font-semibold text-sm mb-1">{subject.label}</div>
              {stats && <div className="text-xs opacity-90">{stats.total} chapters</div>}
            </button>
          )
        })}
      </div>

      {/* Mobile Tabs */}
      <div className="flex md:hidden justify-center gap-4 mb-6">
        {subjects.map((subject) => {
          const stats = getSubjectStats(subject.id)
          return (
            <button
              key={subject.id}
              onClick={() => dispatch(setActiveSubject(subject.id))}
              className={cn(
                "flex flex-col items-center p-3 rounded-lg transition-all duration-300",
                activeSubject === subject.id
                  ? subject.color + " shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              <div className="text-lg mb-1">{subject.icon}</div>
              <div className="font-medium text-xs">{subject.shortLabel}</div>
              {stats && <div className="text-xs opacity-75 mt-1">{stats.total}</div>}
            </button>
          )
        })}
      </div>
    </>
  )
}
