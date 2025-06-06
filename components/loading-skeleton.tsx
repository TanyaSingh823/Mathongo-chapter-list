import { Skeleton } from "@/components/ui/skeleton"

export function ChapterCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-start gap-3">
        <Skeleton className="w-12 h-12 rounded" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
        <Skeleton className="h-8 w-16" />
      </div>
      <Skeleton className="h-2 w-full" />
    </div>
  )
}

export function ChapterListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ChapterCardSkeleton key={i} />
      ))}
    </div>
  )
}
