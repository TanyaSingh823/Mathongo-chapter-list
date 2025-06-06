"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import { useAppSelector } from "@/lib/hooks"
import { selectActiveFilterCount } from "@/lib/features/chapters/chaptersSlice"
import FilterPanel from "./FilterPanel"

export default function MobileFilters() {
  const [open, setOpen] = useState(false)
  const activeFilterCount = useAppSelector(selectActiveFilterCount)

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter size={16} className="mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>Filter Chapters</SheetTitle>
          </SheetHeader>
          <div className="mt-6 overflow-y-auto max-h-[calc(80vh-8rem)]">
            <FilterPanel />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
