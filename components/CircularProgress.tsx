"use client"

import { cn } from "@/lib/utils"

interface CircularProgressProps {
  value: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function CircularProgress({ value, size = "md", className }: CircularProgressProps) {
  const progressValue = Math.min(Math.max(value, 0), 100)
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progressValue / 100) * circumference

  const getProgressColor = () => {
    if (progressValue < 30) return "stroke-mathongo-weak"
    if (progressValue > 70) return "stroke-mathongo-strong"
    return "stroke-mathongo-primary"
  }

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" className="stroke-muted" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          className={getProgressColor()}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-medium">{progressValue}%</div>
    </div>
  )
}
