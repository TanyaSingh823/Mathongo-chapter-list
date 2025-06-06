"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { toggleSortOrder, selectSortOrder } from "@/lib/features/chapters/chaptersSlice"

export function ChapterSortToggle() {
  const dispatch = useAppDispatch()
  const sortOrder = useAppSelector(selectSortOrder)

  return (
    <Button variant="ghost" onClick={() => dispatch(toggleSortOrder())} className="text-blue-600 hover:text-blue-700">
      <ArrowUpDown className="mr-2 h-4 w-4" />
      Sort
    </Button>
  )
}
