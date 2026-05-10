import { Hero } from '@/components/hero'
import { HowWeWork } from '@/components/how-we-work'
import { StatsSection } from '@/components/stats-section'
import { CtaMassive } from '@/components/cta-massive'

export default function Home() {
  return (
    <>
      <Hero />

      {/* Stats */}
      <StatsSection />

      {/* Process */}
      <HowWeWork />

      {/* Massive CTA */}
      <CtaMassive />
    </>
  )
}
