import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { BeliefsSection } from '@/components/beliefs-section'
import { VisionSection } from '@/components/vision-section'
import { CtaMassive } from '@/components/cta-massive'
import { aboutContent } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'About Us',
  description:
    'Learn about Edimax Creations - a lifestyle-driven digital marketing agency that blends creativity, strategy, and storytelling to build impactful brands.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="A studio building brands that feel inevitable."
        description={aboutContent.description}
      >
        <div className="flex flex-wrap gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-[#b61d23] hover:bg-[#9a171c] text-white px-7 py-6 shadow-[0_10px_30px_-10px_rgba(182,29,35,0.6)]"
          >
            <Link href="/contact">
              Start a project <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-2 border-foreground/30 hover:border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background px-7 py-6"
          >
            <Link href="/services">See what we do</Link>
          </Button>
        </div>
      </PageHero>

      <BeliefsSection />

      <VisionSection />

      <CtaMassive />
    </>
  )
}
