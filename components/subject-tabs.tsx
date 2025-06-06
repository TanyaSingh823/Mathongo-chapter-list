"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setActiveSubject, selectActiveSubject } from "@/lib/features/chapters/chaptersSlice"
import { cn } from "@/lib/utils"

const subjects = [
  { id: "Physics", label: "Phy", color: "bg-mathongo-physics text-white" },
  { id: "Chemistry", label: "Chem", color: "bg-mathongo-chemistry text-white" },
  { id: "Mathematics", label: "Math", color: "bg-mathongo-math text-white" },
]

export default function SubjectTabs() {
  const dispatch = useAppDispatch()
  const activeSubject = useAppSelector(selectActiveSubject)

  return (
    <div className="flex justify-center gap-4 mb-6">
      {subjects.map((subject) => (
        <button
          key={subject.id}
          onClick={() => dispatch(setActiveSubject(subject.id))}
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-all",
            activeSubject === subject.id
              ? subject.color
              : "bg-muted text-muted-foreground hover:bg-muted/80 dark:bg-muted/30",
          )}
        >
          <span className="font-medium">{subject.label}</span>
        </button>
      ))}
    </div>
  )
}
