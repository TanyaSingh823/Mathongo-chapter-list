"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { selectActiveSubject, setActiveSubject } from "@/lib/features/chapters/chaptersSlice"
import { cn } from "@/lib/utils"

const subjects = [
  { id: "Physics", label: "Phy", icon: "🧪", color: "bg-orange-500" },
  { id: "Chemistry", label: "Chem", icon: "⚗️", color: "bg-green-500" },
  { id: "Mathematics", label: "Math", icon: "📐", color: "bg-blue-500" },
]

export default function MobileSubjectTabs() {
  const dispatch = useAppDispatch()
  const activeSubject = useAppSelector(selectActiveSubject)

  return (
    <div className="flex gap-4 justify-center lg:hidden">
      {subjects.map((subject) => (
        <button key={subject.id} onClick={() => dispatch(setActiveSubject(subject.id))} className="text-center">
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-200",
              activeSubject === subject.id
                ? `${subject.color} text-white shadow-lg scale-110`
                : "bg-muted hover:bg-muted/80",
            )}
          >
            {subject.icon}
          </div>
          <span
            className={cn(
              "text-xs mt-1 block transition-colors font-medium",
              activeSubject === subject.id ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {subject.label}
          </span>
        </button>
      ))}
    </div>
  )
}
