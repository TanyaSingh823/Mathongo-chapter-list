import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./index"
import type { Chapter, ChaptersState } from "../types"
import chaptersData from "../data/chapters.json"

export const fetchChapters = createAsyncThunk("chapters/fetchChapters", async () => {
  return new Promise<Chapter[]>((resolve) => {
    setTimeout(() => resolve(chaptersData as Chapter[]), 300)
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
