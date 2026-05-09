import { Hero } from '@/components/hero'
import { HowWeWork } from '@/components/how-we-work'
import { ServicesShowcase } from '@/components/services-showcase'
import { StatsSection } from '@/components/stats-section'
import { PinnedShowcase } from '@/components/pinned-showcase'
import { CtaMassive } from '@/components/cta-massive'
import { MarqueeStrip } from '@/components/marquee-strip'

export default function Home() {
  return (
    <>
      <Hero />

      {/* Marquee 1 — brand pillars */}
      <div className="py-10 md:py-16 border-y border-foreground/10 bg-background">
        <MarqueeStrip
          items={['Brand Strategy', 'Content', 'Production', 'Performance', 'Reputation']}
          speed={35}
        />
      </div>

      {/* Services */}
      <ServicesShowcase />

      {/* Pinned principles */}
      <PinnedShowcase />

      {/* Marquee 2 — counter direction */}
      <div className="py-10 md:py-16 border-y border-foreground/10 bg-background">
        <MarqueeStrip
          items={["Let's Build", 'Reels', 'Reach', 'Revenue', 'Reputation']}
          speed={30}
          reverse
          separator="✕"
        />
      </div>

      {/* Stats */}
      <StatsSection />

      {/* Process */}
      <HowWeWork />

      {/* Massive CTA */}
      <CtaMassive />
    </>
  )
}
