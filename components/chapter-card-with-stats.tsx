"use client"

import type React from "react"

import { Book, ArrowUp, ArrowDown, Minus } from "@phosphor-icons/react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Chapter } from "@/lib/types"

interface ChapterCardWithStatsProps {
  chapter: Chapter
}

export default function ChapterCardWithStats({ chapter }: ChapterCardWithStatsProps) {
  // Calculate total questions and recent performance
  const totalQuestions = Object.values(chapter.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0)
  const questions2025 = chapter.yearWiseQuestionCount["2025"] || 0
  const questions2024 = chapter.yearWiseQuestionCount["2024"] || 0

  // Determine trend
  const trend = questions2025 > questions2024 ? "up" : questions2025 < questions2024 ? "down" : "neutral"

  // Calculate progress percentage
  const progress = totalQuestions > 0 ? Math.round((chapter.questionSolved / totalQuestions) * 100) : 0

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

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-mathongo-primary group">
      <CardContent className="p-0">
        <div className="flex items-center">
          {/* Icon Section */}
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-mathongo-primary/10 to-mathongo-primary/5 group-hover:from-mathongo-primary/20 group-hover:to-mathongo-primary/10 transition-all duration-300">
            <Book size={24} className="text-mathongo-primary" weight="duotone" />
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-base leading-tight mb-2 group-hover:text-mathongo-primary transition-colors">
                  {chapter.chapter}
                </h3>

                {/* Year-wise data display */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <span className="font-medium text-foreground">2025:</span>
                    <span className="font-semibold">{questions2025}Qs</span>
                    {trend === "up" && <ArrowUp size={14} className="text-mathongo-strong" weight="bold" />}
                    {trend === "down" && <ArrowDown size={14} className="text-mathongo-weak" weight="bold" />}
                    {trend === "neutral" && <Minus size={14} className="text-gray-400" weight="bold" />}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span>
                    <span className="font-medium text-foreground">2024:</span>{" "}
                    <span className="font-semibold">{questions2024}Qs</span>
                  </span>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-3 mb-3">
                  <Progress
                    value={progress}
                    className="flex-1 h-2"
                    style={
                      {
                        "--progress-background": progress < 30 ? "#ff3d00" : progress > 70 ? "#00c853" : "#6366f1",
                      } as React.CSSProperties
                    }
                  />
                  <span className="text-sm font-medium text-muted-foreground min-w-[3rem]">{progress}%</span>
                </div>

                {/* Status and badges */}
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

              {/* Right side stats */}
              <div className="text-right ml-4 space-y-1">
                <div className="text-lg font-bold text-mathongo-primary">{totalQuestions}</div>
                <div className="text-xs text-muted-foreground">Total Qs</div>
                <div className="text-sm font-medium text-mathongo-strong">{chapter.questionSolved}</div>
                <div className="text-xs text-muted-foreground">Solved</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
