import { Header } from "@/components/layout/header"
import { HomeHero } from "@/components/pages/home-hero"
import { LearningGrid } from "@/components/pages/learning-grid"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HomeHero />
        <LearningGrid />
      </main>
      <Footer />
    </>
  )
}
