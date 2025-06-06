export interface Chapter {
  subject: string
  chapter: string
  class: string
  unit: string
  yearWiseQuestionCount: {
    [year: string]: number
  }
  questionSolved: number
  status: string
  isWeakChapter: boolean
}

export interface ChaptersState {
  chapters: Chapter[]
  activeSubject: string
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  filters: {
    classes: string[]
    units: string[]
    notStartedOnly: boolean
    weakChaptersOnly: boolean
  }
  sortOrder: "asc" | "desc"
}
