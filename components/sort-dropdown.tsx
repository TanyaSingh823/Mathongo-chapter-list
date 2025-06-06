"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { toggleSortOrder, selectSortOrder } from "@/lib/features/chapters/chaptersSlice"

export default function SortDropdown() {
  const dispatch = useAppDispatch()
  const sortOrder = useAppSelector(selectSortOrder)
  const [open, setOpen] = useState(false)

  const handleToggleSort = () => {
    dispatch(toggleSortOrder())
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          {sortOrder === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          Sort
          <ChevronDown size={12} className="ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleToggleSort} className="flex items-center gap-2">
          <ArrowUp size={14} />
          <span>Sort A to Z</span>
          {sortOrder === "asc" && <span className="ml-auto text-xs text-mathongo-primary">Active</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleToggleSort} className="flex items-center gap-2">
          <ArrowDown size={14} />
          <span>Sort Z to A</span>
          {sortOrder === "desc" && <span className="ml-auto text-xs text-mathongo-primary">Active</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
