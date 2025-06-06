"use client"

import type React from "react"
import { useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MultiSelectDropdownProps {
  title: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
}

export default function MultiSelectDropdown({
  title,
  options,
  selected,
  onChange,
  placeholder,
  className,
}: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option))
    } else {
      onChange([...selected, option])
    }
  }

  const handleRemove = (option: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(selected.filter((item) => item !== option))
  }

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange([])
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-[2.5rem] px-3 py-2"
          >
            <div className="flex items-center gap-2 flex-wrap flex-1">
              {selected.length === 0 ? (
                <span className="text-muted-foreground">{placeholder || `Select ${title}`}</span>
              ) : (
                <>
                  {selected.slice(0, 2).map((option) => (
                    <Badge key={option} variant="secondary" className="text-xs px-2 py-1 gap-1 hover:bg-secondary/80">
                      {option}
                      <X
                        size={12}
                        className="cursor-pointer hover:text-destructive"
                        onClick={(e) => handleRemove(option, e)}
                      />
                    </Badge>
                  ))}
                  {selected.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{selected.length - 2} more
                    </Badge>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-1 ml-2">
              {selected.length > 0 && (
                <Button variant="ghost" size="sm" className="h-auto p-1 hover:bg-destructive/10" onClick={clearAll}>
                  <X size={14} className="text-muted-foreground hover:text-destructive" />
                </Button>
              )}
              <ChevronDown size={16} className="text-muted-foreground" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder={`Search ${title.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No {title.toLowerCase()} found.</CommandEmpty>
              <CommandGroup className="max-h-60 overflow-y-auto">
                {options.map((option) => (
                  <CommandItem key={option} value={option} onSelect={() => handleSelect(option)}>
                    <Check size={16} className={cn("mr-2", selected.includes(option) ? "opacity-100" : "opacity-0")} />
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected items display for mobile */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1 md:hidden">
          {selected.map((option) => (
            <Badge key={option} variant="secondary" className="text-xs px-2 py-1 gap-1">
              {option}
              <X size={12} className="cursor-pointer hover:text-destructive" onClick={(e) => handleRemove(option, e)} />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
