"use client"

import { useMemo } from "react"

const phosphorIcons = [
  "Atom",
  "Lightning",
  "Gear",
  "Rocket",
  "Flask",
  "Calculator",
  "Function",
  "Graph",
  "Compass",
  "Ruler",
  "Triangle",
  "Circle",
  "Square",
  "Polygon",
  "Equals",
  "Plus",
  "Minus",
  "X",
  "Divide",
  "Percent",
  "Infinity",
  "Pi",
  "Sigma",
  "Vector",
  "Matrix",
  "Cube",
  "ArrowLeft",
  "ArrowUp",
  "ArrowRight",
  "ArrowDown",
  "Target",
  "Crosshair",
  "Eye",
  "Brain",
  "Heart",
  "Star",
  "Sun",
  "Moon",
  "Cloud",
  "Fire",
  "Drop",
  "Leaf",
  "Flower",
  "Tree",
  "Mountain",
  "Wave",
  "Spiral",
  "Diamond",
  "Crown",
  "Shield",
  "Beaker",
  "TestTube",
  "MagnifyingGlass",
  "Lightbulb",
  "Battery",
  "Cpu",
  "Database",
  "Globe",
  "House",
  "Book",
  "Pencil",
  "PaintBrush",
  "Camera",
  "Music",
  "Play",
  "Pause",
  "Stop",
]

export const usePhosphorIcons = () => {
  const getRandomIcon = useMemo(() => {
    return (chapter: string) => {
      const hash = chapter.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      const iconIndex = hash % phosphorIcons.length
      return phosphorIcons[iconIndex]
    }
  }, [])

  return { getRandomIcon }
}
