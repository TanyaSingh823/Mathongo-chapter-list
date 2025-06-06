"use client"

import { useEffect } from "react"
import { Loader } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchChapters, selectFilteredChapters, selectStatus, selectError } from "@/lib/features/chapters/chaptersSlice"
import ChapterCard from "./ChapterCard"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ChapterList() {
  const dispatch = useAppDispatch()
  const filteredChapters = useAppSelector(selectFilteredChapters)
  const status = useAppSelector(selectStatus)
  const error = useAppSelector(selectError)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchChapters())
    }
  }, [dispatch, status])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="flex items-center gap-2">
          <Loader size={24} className="animate-spin text-mathongo-primary" />
          <span className="text-muted-foreground">Loading chapters...</span>
        </div>
      </div>
    )
  }

  if (status === "failed") {
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load chapters: {error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      {filteredChapters.length > 0 ? (
        filteredChapters.map((chapter, index) => (
          <ChapterCard key={`${chapter.subject}-${chapter.chapter}-${index}`} chapter={chapter} />
        ))
      ) : (
        <div className="text-center py-12 px-4 border border-border rounded-lg bg-card">
          <div className="text-muted-foreground mb-2">No chapters found</div>
          <div className="text-sm text-muted-foreground">Try adjusting your filters</div>
        </div>
      )}
    </div>
  )
}
