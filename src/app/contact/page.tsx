import { PageHero } from '@/components/page-hero'
import { ContactForm } from '@/components/contact-form'
import { ContactInfoGrid } from '@/components/contact-info-grid'
import { FaqAccordion } from '@/components/faq-accordion'

export const metadata = {
  title: 'Contact Us',
  description:
    "Get in touch with Edimax Creations. We're here to help transform your business into a lifestyle-driven brand. Contact us today!",
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Let's build something worth scrolling for."
        description="Tell us about your brand, your goals, and where you want to be in twelve months. We'll come back to you within a day."
      />

      <section className="relative py-16 md:py-24 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left: contact info */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
              <div className="mb-8">
                <span className="text-xs uppercase tracking-[0.3em] text-[#b61d23] font-semibold">
                  Or reach us directly
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 leading-tight">
                  Four ways to start a conversation.
                </h3>
              </div>
              <ContactInfoGrid />
            </aside>

            {/* Right: form */}
            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion />
    </>
  )
}
