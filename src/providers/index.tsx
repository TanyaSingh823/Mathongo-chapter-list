"use client"

import type React from "react"

import { Provider } from "react-redux"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { store } from "../store"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <Provider store={store}>{children}</Provider>
    </NextThemesProvider>
  )
}
