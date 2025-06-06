"use client"

import { ArrowUp, ArrowDown, Minus, CheckCircle, Clock, XCircle, Book } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import CircularProgress from "./circular-progress"
import type { Chapter } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ChapterCardEnhancedProps {
  chapter: Chapter
  className?: string
}

export default function ChapterCardEnhanced({ chapter, className }: ChapterCardEnhancedProps) {
  const totalQuestions = Object.values(chapter.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0)
  const questions2025 = chapter.yearWiseQuestionCount["2025"] || 0
  const questions2024 = chapter.yearWiseQuestionCount["2024"] || 0

  const trend = questions2025 > questions2024 ? "up" : questions2025 < questions2024 ? "down" : "neutral"
  const progress = totalQuestions > 0 ? Math.round((chapter.questionSolved / totalQuestions) * 100) : 0

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Completed":
        return {
          icon: <CheckCircle size={16} className="text-mathongo-strong" />,
          color: "bg-mathongo-strong/10 text-mathongo-strong border-mathongo-strong/20",
        }
      case "In Progress":
        return {
          icon: <Clock size={16} className="text-mathongo-primary" />,
          color: "bg-mathongo-primary/10 text-mathongo-primary border-mathongo-primary/20",
        }
      case "Not Started":
        return {
          icon: <XCircle size={16} className="text-gray-500" />,
          color: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
        }
      default:
        return {
          icon: <XCircle size={16} className="text-gray-500" />,
          color: "bg-gray-100 text-gray-600 border-gray-200",
        }
    }
  }

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

  const statusInfo = getStatusInfo(chapter.status)

  return (
    <div
      className={cn(
        "border border-border overflow-hidden hover:shadow-md transition-all duration-300 border-l-4 rounded-lg",
        getSubjectColor(chapter.subject),
        "group",
        className,
      )}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-mathongo-primary/10 to-mathongo-primary/5 flex items-center justify-center">
              <Book size={20} className="text-mathongo-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-base leading-tight truncate group-hover:text-mathongo-primary transition-colors">
                  {chapter.chapter}
                </h3>
                {statusInfo.icon}
              </div>

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

              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={`text-xs ${statusInfo.color}`}>
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

            <div className="text-right flex flex-col items-end gap-1">
              <CircularProgress value={progress} size="md" />
              <div className="text-sm font-bold text-mathongo-primary">
                {chapter.questionSolved}/{totalQuestions}
              </div>
              <div className="text-xs text-muted-foreground">Questions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
