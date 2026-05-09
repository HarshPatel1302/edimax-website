import { PageHero } from '@/components/page-hero'
import { ServicesList } from '@/components/services-list'
import { CtaMassive } from '@/components/cta-massive'
import { HowWeWork } from '@/components/how-we-work'

export const metadata = {
  title: 'Our Services',
  description:
    'Comprehensive digital marketing services including social media management, content creation, brand strategy, GMB management, production, and online reputation management.',
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Services that earn attention and keep it."
        description="Every service is built to compound. No fluff, no vanity metrics, just the work that moves the brand forward."
      />

      <ServicesList />

      <HowWeWork />

      <CtaMassive />
    </>
  )
}
