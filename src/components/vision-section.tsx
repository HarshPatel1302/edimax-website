'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutContent } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

const TEAM = [
  { id: 1, name: 'Mr. Harsh Jagtap', role: 'Founder', image: '/team/team-member-1.JPG' },
  { id: 2, name: 'Ms. Jikcy Joji', role: 'Co-Founder', image: '/team/team-member-2.JPG' },
]

export function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Snapshot original markup so we can restore on unmount.
    const quote = quoteRef.current
    const originalQuoteHTML = quote?.innerHTML ?? null

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const eyebrow = sectionRef.current?.querySelectorAll('[data-reveal]') ?? []
      if (reduced) {
        gsap.set(eyebrow, { opacity: 1, y: 0 })
      } else {
        gsap.set(eyebrow, { opacity: 0, y: 30 })
        gsap.to(eyebrow, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        })
      }

      // Quote: split into words and mask-reveal (uses outer-scope `quote`).
      if (quote && !reduced) {
        const text = quote.textContent ?? ''
        quote.innerHTML = text
          .split(/\s+/)
          .filter(Boolean)
          .map(
            (w) =>
              `<span class="inline-block overflow-hidden align-bottom pb-[0.12em] mr-[0.25em]"><span class="inline-block vision-word">${w}</span></span>`
          )
          .join('')
        const words = quote.querySelectorAll('.vision-word')
        gsap.set(words, { yPercent: 110 })
        gsap.to(words, {
          yPercent: 0,
          duration: 1,
          stagger: 0.025,
          ease: 'expo.out',
          scrollTrigger: { trigger: quote, start: 'top 80%' },
        })
      }

      // Team cards
      const cards = teamRef.current?.querySelectorAll('[data-team]') ?? []
      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0 })
      } else {
        gsap.set(cards, { opacity: 0, y: 60 })
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: teamRef.current, start: 'top 80%' },
        })
      }
    }, sectionRef)
    return () => {
      ctx.revert()
      if (quote && originalQuoteHTML !== null) {
        quote.innerHTML = originalQuoteHTML
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-background overflow-hidden"
    >
      {/* Side decorative type */}
      <div
        aria-hidden
        className="hidden lg:block absolute top-1/2 -left-12 -translate-y-1/2 -rotate-90 origin-center text-[10rem] font-display font-black text-foreground/[0.025] select-none whitespace-nowrap"
      >
        Vision
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-4xl mx-auto text-center mb-24 md:mb-32">
          <div data-reveal className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-[#b61d23]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#b61d23] font-semibold">
              Our Vision
            </span>
            <span className="h-px w-12 bg-[#b61d23]" />
          </div>
          <blockquote
            ref={quoteRef}
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-[1.2]"
          >
            {aboutContent.vision}
          </blockquote>
        </div>

        {/* Team */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div data-reveal className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-12 bg-[#b61d23]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#b61d23] font-semibold">
              The Team
            </span>
          </div>
          <h2
            data-reveal
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.05]"
          >
            The faces<br />
            <span className="text-foreground/40">behind the brand.</span>
          </h2>
        </div>

        <div
          ref={teamRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {TEAM.map((m) => (
            <div
              key={m.id}
              data-team
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 hover:border-[#b61d23]/40 transition-all duration-500"
            >
              <Image
                src={m.image}
                alt={m.name}
                fill
                className="object-cover object-[center_30%] transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#b61d23] font-semibold mb-2">
                  {m.role}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                  {m.name}
                </h3>
                <span className="block mt-3 h-px w-0 bg-[#b61d23] group-hover:w-16 transition-[width] duration-700 ease-out" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
