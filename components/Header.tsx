"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function Header() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-between mb-8">
        <div className="text-center flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">JEE Main</h1>
          <p className="text-sm md:text-base text-muted-foreground">2025 - 2009 | 173 Papers | 15825 Qs</p>
        </div>
        <Button variant="outline" size="icon">
          <Sun size={20} />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="text-center flex-1">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">JEE Main</h1>
        <p className="text-sm md:text-base text-muted-foreground">2025 - 2009 | 173 Papers | 15825 Qs</p>
      </div>
      <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </Button>
    </div>
  )
}
