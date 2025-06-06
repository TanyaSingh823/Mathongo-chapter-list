"use client"

import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { toggleSortOrder, selectSortOrder } from "@/lib/features/chapters/chaptersSlice"

export default function SortControls() {
  const dispatch = useAppDispatch()
  const sortOrder = useAppSelector(selectSortOrder)

  return (
    <Button variant="outline" onClick={() => dispatch(toggleSortOrder())} size="sm" className="flex items-center gap-2">
      {sortOrder === "asc" ? (
        <>
          <ArrowUp size={16} />
          <span className="hidden sm:inline">A-Z</span>
        </>
      ) : (
        <>
          <ArrowDown size={16} />
          <span className="hidden sm:inline">Z-A</span>
        </>
      )}
      <span className="sm:hidden">Sort</span>
    </Button>
  )
}
