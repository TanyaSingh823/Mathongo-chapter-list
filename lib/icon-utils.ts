import * as PhosphorIcons from "@phosphor-icons/react"

// List of Phosphor icons that are suitable for chapter representation
const chapterIcons = [
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

// Generate a deterministic icon based on chapter name
export function getIconForChapter(chapterName: string) {
  // Create a simple hash from the chapter name
  const hash = chapterName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  // Use the hash to select an icon
  const iconIndex = hash % chapterIcons.length
  const iconName = chapterIcons[iconIndex]

  // Return the icon component (with fallback to Book)
  return (PhosphorIcons as any)[iconName] || PhosphorIcons.Book
}
