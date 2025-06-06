"use client"

import { ArrowUp, ArrowDown } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { toggleSortOrder, selectSortOrder } from "@/lib/features/chapters/chaptersSlice"

export default function SortToggle() {
  const dispatch = useAppDispatch()
  const sortOrder = useAppSelector(selectSortOrder)

  return (
    <Button variant="outline" onClick={() => dispatch(toggleSortOrder())} className="flex items-center gap-2">
      {sortOrder === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
      {sortOrder === "asc" ? "A-Z" : "Z-A"}
    </Button>
  )
}
