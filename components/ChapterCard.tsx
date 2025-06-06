"use client"

import { ArrowUp, ArrowDown, Minus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Chapter } from "@/lib/types"
import { getIconForChapter } from "@/lib/icon-utils"

interface ChapterCardProps {
  chapter: Chapter
  className?: string
}

export default function ChapterCard({ chapter, className }: ChapterCardProps) {
  // Calculate total questions and progress
  const totalQuestions = Object.values(chapter.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0)
  const questions2025 = chapter.yearWiseQuestionCount["2025"] || 0
  const questions2024 = chapter.yearWiseQuestionCount["2024"] || 0
  const progress = totalQuestions > 0 ? Math.round((chapter.questionSolved / totalQuestions) * 100) : 0

  // Determine trend
  const trend = questions2025 > questions2024 ? "up" : questions2025 < questions2024 ? "down" : "neutral"

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-mathongo-strong/10 text-mathongo-strong border-mathongo-strong/20"
      case "In Progress":
        return "bg-mathongo-primary/10 text-mathongo-primary border-mathongo-primary/20"
      case "Not Started":
        return "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  // Get subject color
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "Physics":
        return "border-l-mathongo-physics"
      case "Chemistry":
        return "border-l-mathongo-chemistry"
      case "Mathematics":
        return "border-l-mathongo-math"
      default:
        return "border-l-mathongo-primary"
    }
  }

  // Get icon for chapter
  const ChapterIcon = getIconForChapter(chapter.chapter)

  return (
    <div
      className={cn(
        "border border-border overflow-hidden hover:shadow-md transition-all duration-300 border-l-4 rounded-lg bg-card",
        getSubjectColor(chapter.subject),
        "group",
        className,
      )}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-mathongo-primary/10 to-mathongo-primary/5 flex items-center justify-center">
            <ChapterIcon size={20} className="text-mathongo-primary" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base leading-tight mb-1 group-hover:text-mathongo-primary transition-colors">
              {chapter.chapter}
            </h3>

            {/* Year-wise data */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
              <span className="flex items-center gap-1">
                <span className="font-medium text-foreground">2025:</span>
                <span className="font-semibold">{questions2025}Qs</span>
                {trend === "up" && <ArrowUp size={14} className="text-mathongo-strong" />}
                {trend === "down" && <ArrowDown size={14} className="text-mathongo-weak" />}
                {trend === "neutral" && <Minus size={14} className="text-gray-400" />}
              </span>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <span>
                <span className="font-medium text-foreground">2024:</span>{" "}
                <span className="font-semibold">{questions2024}Qs</span>
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-muted h-1.5 rounded-full mb-3">
              <div
                className={cn("h-full rounded-full", {
                  "bg-mathongo-weak": progress < 30,
                  "bg-mathongo-primary": progress >= 30 && progress <= 70,
                  "bg-mathongo-strong": progress > 70,
                })}
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={`text-xs ${getStatusColor(chapter.status)}`}>
                {chapter.status}
              </Badge>
              {chapter.isWeakChapter && (
                <Badge className="text-xs bg-mathongo-weak/10 text-mathongo-weak border-mathongo-weak/20 hover:bg-mathongo-weak/20">
                  Weak Chapter
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs">
                {chapter.unit}
              </Badge>
            </div>
          </div>

          {/* Stats */}
          <div className="text-right ml-2">
            <div className="text-lg font-bold text-mathongo-primary">{totalQuestions}</div>
            <div className="text-xs text-muted-foreground">Total Qs</div>
            <div className="text-sm font-medium text-mathongo-strong mt-1">{chapter.questionSolved}</div>
            <div className="text-xs text-muted-foreground">Solved</div>
          </div>
        </div>
      </div>
    </div>
  )
}
