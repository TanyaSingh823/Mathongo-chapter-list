import Header from "@/components/Header"
import SubjectTabs from "@/components/SubjectTabs"
import ChapterList from "@/components/ChapterList"
import FilterControls from "@/components/FilterControls"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header />
        <SubjectTabs />

        <div className="mt-6">
          <FilterControls />
        </div>

        <div className="mt-6">
          <ChapterList />
        </div>
      </div>
    </main>
  )
}
