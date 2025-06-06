import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/src/app/store"
import type { Chapter, ChaptersState } from "./types"

// Define sample chapter data
const chaptersData: Chapter[] = [
  {
    subject: "Physics",
    chapter: "Mathematics in Physics",
    class: "Class 11",
    unit: "Mechanics 1",
    yearWiseQuestionCount: {
      "2019": 0,
      "2020": 2,
      "2021": 5,
      "2022": 5,
      "2023": 3,
      "2024": 7,
      "2025": 6,
    },
    questionSolved: 0,
    status: "Not Started",
    isWeakChapter: false,
  },
  {
    subject: "Physics",
    chapter: "Units and Dimensions",
    class: "Class 11",
    unit: "Mechanics 1",
    yearWiseQuestionCount: {
      "2019": 2,
      "2020": 6,
      "2021": 8,
      "2022": 4,
      "2023": 6,
      "2024": 3,
      "2025": 10,
    },
    questionSolved: 39,
    status: "Completed",
    isWeakChapter: true,
  },
  {
    subject: "Physics",
    chapter: "Motion In One Dimension",
    class: "Class 11",
    unit: "Mechanics 1",
    yearWiseQuestionCount: {
      "2019": 2,
      "2020": 10,
      "2021": 6,
      "2022": 7,
      "2023": 0,
      "2024": 2,
      "2025": 6,
    },
    questionSolved: 33,
    status: "Completed",
    isWeakChapter: true,
  },
  {
    subject: "Chemistry",
    chapter: "Some Basic Concepts of Chemistry",
    class: "Class 11",
    unit: "Physical Chemistry",
    yearWiseQuestionCount: {
      "2019": 8,
      "2020": 2,
      "2021": 8,
      "2022": 2,
      "2023": 7,
      "2024": 8,
      "2025": 4,
    },
    questionSolved: 28,
    status: "In Progress",
    isWeakChapter: false,
  },
  {
    subject: "Mathematics",
    chapter: "Complex Numbers",
    class: "Class 11",
    unit: "Algebra",
    yearWiseQuestionCount: {
      "2019": 3,
      "2020": 4,
      "2021": 7,
      "2022": 6,
      "2023": 5,
      "2024": 8,
      "2025": 12,
    },
    questionSolved: 25,
    status: "Completed",
    isWeakChapter: false,
  },
]

export const fetchChapters = createAsyncThunk("chapters/fetchChapters", async () => {
  return new Promise<Chapter[]>((resolve) => {
    setTimeout(() => resolve(chaptersData), 300)
  })
})

const initialState: ChaptersState = {
  chapters: [],
  activeSubject: "Physics",
  status: "idle",
  error: null,
  filters: {
    classes: [],
    units: [],
    notStartedOnly: false,
    weakChaptersOnly: false,
  },
  sortOrder: "asc",
}

const chaptersSlice = createSlice({
  name: "chapters",
  initialState,
  reducers: {
    setActiveSubject: (state, action: PayloadAction<string>) => {
      state.activeSubject = action.payload
      state.filters = {
        classes: [],
        units: [],
        notStartedOnly: false,
        weakChaptersOnly: false,
      }
    },
    updateFilters: (state, action: PayloadAction<Partial<ChaptersState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc"
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChapters.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchChapters.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.chapters = action.payload
      })
      .addCase(fetchChapters.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch chapters"
      })
  },
})

export const { setActiveSubject, updateFilters, toggleSortOrder } = chaptersSlice.actions

export const selectChapters = (state: RootState) => state.chapters.chapters
export const selectActiveSubject = (state: RootState) => state.chapters.activeSubject
export const selectFilters = (state: RootState) => state.chapters.filters
export const selectSortOrder = (state: RootState) => state.chapters.sortOrder

export const selectFilteredChapters = (state: RootState) => {
  const { chapters, activeSubject, filters, sortOrder } = state.chapters

  let filtered = chapters.filter((chapter) => chapter.subject === activeSubject)

  if (filters.classes && filters.classes.length > 0) {
    filtered = filtered.filter((chapter) => filters.classes.includes(chapter.class))
  }

  if (filters.units && filters.units.length > 0) {
    filtered = filtered.filter((chapter) => filters.units.includes(chapter.unit))
  }

  if (filters.notStartedOnly) {
    filtered = filtered.filter((chapter) => chapter.status === "Not Started")
  }

  if (filters.weakChaptersOnly) {
    filtered = filtered.filter((chapter) => chapter.isWeakChapter)
  }

  filtered = [...filtered].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.chapter.localeCompare(b.chapter)
    } else {
      return b.chapter.localeCompare(a.chapter)
    }
  })

  return filtered
}

export default chaptersSlice.reducer
