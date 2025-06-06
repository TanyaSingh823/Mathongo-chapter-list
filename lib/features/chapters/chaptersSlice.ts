import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/store"
import type { Chapter, ChaptersState } from "@/lib/types"

// Sample chapter data
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
    subject: "Physics",
    chapter: "Motion In Two Dimensions",
    class: "Class 11",
    unit: "Mechanics 1",
    yearWiseQuestionCount: {
      "2019": 3,
      "2020": 8,
      "2021": 4,
      "2022": 6,
      "2023": 2,
      "2024": 5,
      "2025": 8,
    },
    questionSolved: 18,
    status: "In Progress",
    isWeakChapter: false,
  },
  {
    subject: "Physics",
    chapter: "Laws of Motion",
    class: "Class 11",
    unit: "Mechanics 2",
    yearWiseQuestionCount: {
      "2019": 4,
      "2020": 7,
      "2021": 9,
      "2022": 8,
      "2023": 6,
      "2024": 10,
      "2025": 12,
    },
    questionSolved: 0,
    status: "Not Started",
    isWeakChapter: false,
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
    subject: "Chemistry",
    chapter: "Atomic Structure",
    class: "Class 11",
    unit: "Physical Chemistry",
    yearWiseQuestionCount: {
      "2019": 6,
      "2020": 4,
      "2021": 7,
      "2022": 5,
      "2023": 8,
      "2024": 9,
      "2025": 7,
    },
    questionSolved: 0,
    status: "Not Started",
    isWeakChapter: false,
  },
  {
    subject: "Chemistry",
    chapter: "Chemical Bonding",
    class: "Class 11",
    unit: "Physical Chemistry",
    yearWiseQuestionCount: {
      "2019": 5,
      "2020": 8,
      "2021": 6,
      "2022": 9,
      "2023": 4,
      "2024": 7,
      "2025": 11,
    },
    questionSolved: 35,
    status: "Completed",
    isWeakChapter: true,
  },
  {
    subject: "Chemistry",
    chapter: "Thermodynamics",
    class: "Class 12",
    unit: "Physical Chemistry",
    yearWiseQuestionCount: {
      "2019": 7,
      "2020": 5,
      "2021": 9,
      "2022": 6,
      "2023": 8,
      "2024": 4,
      "2025": 10,
    },
    questionSolved: 22,
    status: "In Progress",
    isWeakChapter: true,
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
  {
    subject: "Mathematics",
    chapter: "Quadratic Equations",
    class: "Class 11",
    unit: "Algebra",
    yearWiseQuestionCount: {
      "2019": 4,
      "2020": 6,
      "2021": 5,
      "2022": 8,
      "2023": 7,
      "2024": 6,
      "2025": 9,
    },
    questionSolved: 15,
    status: "In Progress",
    isWeakChapter: true,
  },
  {
    subject: "Mathematics",
    chapter: "Sequences and Series",
    class: "Class 11",
    unit: "Algebra",
    yearWiseQuestionCount: {
      "2019": 2,
      "2020": 5,
      "2021": 4,
      "2022": 7,
      "2023": 6,
      "2024": 9,
      "2025": 8,
    },
    questionSolved: 0,
    status: "Not Started",
    isWeakChapter: false,
  },
  {
    subject: "Mathematics",
    chapter: "Trigonometry",
    class: "Class 11",
    unit: "Trigonometry",
    yearWiseQuestionCount: {
      "2019": 6,
      "2020": 8,
      "2021": 9,
      "2022": 5,
      "2023": 7,
      "2024": 11,
      "2025": 14,
    },
    questionSolved: 42,
    status: "Completed",
    isWeakChapter: false,
  },
  {
    subject: "Mathematics",
    chapter: "Coordinate Geometry",
    class: "Class 11",
    unit: "Coordinate Geometry",
    yearWiseQuestionCount: {
      "2019": 5,
      "2020": 7,
      "2021": 6,
      "2022": 9,
      "2023": 8,
      "2024": 10,
      "2025": 12,
    },
    questionSolved: 28,
    status: "In Progress",
    isWeakChapter: true,
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
      // Reset filters when changing subjects
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
    clearAllFilters: (state) => {
      state.filters = {
        classes: [],
        units: [],
        notStartedOnly: false,
        weakChaptersOnly: false,
      }
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

export const { setActiveSubject, updateFilters, toggleSortOrder, clearAllFilters } = chaptersSlice.actions

// Selectors
export const selectChapters = (state: RootState) => state.chapters.chapters
export const selectActiveSubject = (state: RootState) => state.chapters.activeSubject
export const selectFilters = (state: RootState) => state.chapters.filters
export const selectSortOrder = (state: RootState) => state.chapters.sortOrder
export const selectStatus = (state: RootState) => state.chapters.status
export const selectError = (state: RootState) => state.chapters.error

// Complex selectors
export const selectFilteredChapters = (state: RootState) => {
  const { chapters, activeSubject, filters, sortOrder } = state.chapters

  let filtered = chapters.filter((chapter) => chapter.subject === activeSubject)

  // Apply class filter
  if (filters.classes && filters.classes.length > 0) {
    filtered = filtered.filter((chapter) => filters.classes.includes(chapter.class))
  }

  // Apply unit filter
  if (filters.units && filters.units.length > 0) {
    filtered = filtered.filter((chapter) => filters.units.includes(chapter.unit))
  }

  // Apply status filters
  if (filters.notStartedOnly) {
    filtered = filtered.filter((chapter) => chapter.status === "Not Started")
  }

  if (filters.weakChaptersOnly) {
    filtered = filtered.filter((chapter) => chapter.isWeakChapter)
  }

  // Apply sorting
  filtered = [...filtered].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.chapter.localeCompare(b.chapter)
    } else {
      return b.chapter.localeCompare(a.chapter)
    }
  })

  return filtered
}

export const selectSubjectChapters = (state: RootState) => {
  const { chapters, activeSubject } = state.chapters
  return chapters.filter((chapter) => chapter.subject === activeSubject)
}

export const selectUniqueClasses = (state: RootState) => {
  const subjectChapters = selectSubjectChapters(state)
  return [...new Set(subjectChapters.map((chapter) => chapter.class))].sort()
}

export const selectUniqueUnits = (state: RootState) => {
  const subjectChapters = selectSubjectChapters(state)
  return [...new Set(subjectChapters.map((chapter) => chapter.unit))].sort()
}

export const selectActiveFilterCount = (state: RootState) => {
  const { filters } = state.chapters
  return (
    (filters.classes?.length || 0) +
    (filters.units?.length || 0) +
    (filters.notStartedOnly ? 1 : 0) +
    (filters.weakChaptersOnly ? 1 : 0)
  )
}

export const selectSubjectStats = (state: RootState) => {
  const { chapters } = state.chapters
  const subjects = ["Physics", "Chemistry", "Mathematics"]

  return subjects.map((subject) => {
    const subjectChapters = chapters.filter((chapter) => chapter.subject === subject)
    const completed = subjectChapters.filter((chapter) => chapter.status === "Completed").length
    const inProgress = subjectChapters.filter((chapter) => chapter.status === "In Progress").length
    const notStarted = subjectChapters.filter((chapter) => chapter.status === "Not Started").length
    const weakChapters = subjectChapters.filter((chapter) => chapter.isWeakChapter).length

    return {
      subject,
      total: subjectChapters.length,
      completed,
      inProgress,
      notStarted,
      weakChapters,
    }
  })
}

export default chaptersSlice.reducer
