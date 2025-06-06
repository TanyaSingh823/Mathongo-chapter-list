"use client"

import { ArrowUp, ArrowDown, Atom } from "@phosphor-icons/react"
import * as PhosphorIcons from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import type { Chapter } from "@/lib/types"
import { usePhosphorIcons } from "@/hooks/use-phosphor-icons"
import { cn } from "@/lib/utils"

interface ChapterCardProps {
  chapter: Chapter
}

export default function ChapterCard({ chapter }: ChapterCardProps) {
  const { getRandomIcon } = usePhosphorIcons()

  // Calculate total questions and trend
  const totalQuestions = Object.values(chapter.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0)
  const questions2025 = chapter.yearWiseQuestionCount["2025"] || 0
  const questions2024 = chapter.yearWiseQuestionCount["2024"] || 0
  const trend = questions2025 > questions2024 ? "up" : questions2025 < questions2024 ? "down" : "neutral"

  // Get random icon with fallback
  const iconName = getRandomIcon(chapter.chapter)
  const IconComponent = (PhosphorIcons as any)[iconName] || Atom

  // Get subject color
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "Physics":
        return "text-orange-500"
      case "Chemistry":
        return "text-green-500"
      case "Mathematics":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="border-b border-border last:border-b-0 bg-card hover:bg-muted/30 transition-colors">
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Left: Icon and Content */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={cn("flex-shrink-0", getSubjectColor(chapter.subject))}>
              <IconComponent size={20} weight="regular" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-sm md:text-base truncate" title={chapter.chapter}>
                  {chapter.chapter}
                </h3>
                {chapter.isWeakChapter && (
                  <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                    Weak
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  2025: <span className="font-medium">{questions2025}Qs</span>
                  {trend === "up" && <ArrowUp size={12} className="text-green-500" weight="bold" />}
                  {trend === "down" && <ArrowDown size={12} className="text-red-500" weight="bold" />}
                </span>
                <span>|</span>
                <span>
                  2024: <span className="font-medium">{questions2024}Qs</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Question Count */}
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">
              {chapter.questionSolved}/{totalQuestions} Qs
            </div>
            <div className="text-xs text-muted-foreground">{chapter.status}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
