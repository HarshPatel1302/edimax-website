'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Compass, Zap, HeartHandshake } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    eyebrow: '01 — Strategy',
    title: 'We start with the why.',
    body: 'Before a single asset ships, we map the audience, the moment, and the message. Strategy isn’t a deck — it’s the spine of every campaign we run.',
    icon: Compass,
  },
  {
    eyebrow: '02 — Craft',
    title: 'Then we obsess over craft.',
    body: 'Every frame, headline, and crop is treated like it matters — because it does. Detail is the difference between content that scrolls past and work that stops a thumb.',
    icon: Sparkles,
  },
  {
    eyebrow: '03 — Speed',
    title: 'Speed is a feature.',
    body: 'Trends move fast. So do we. Reactive content, weekly experiments, monthly retros — momentum is built, not waited for.',
    icon: Zap,
  },
  {
    eyebrow: '04 — Partnership',
    title: 'And we stay long-term.',
    body: 'We’re not a one-and-done shop. The brands we work with stay with us for years — because compounding work compounds results.',
    icon: HeartHandshake,
  },
]

export function PinnedShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isMobile = window.matchMedia('(max-width: 768px)').matches
      if (reduced || isMobile) return

      const track = trackRef.current
      const section = sectionRef.current
      const header = headerRef.current
      if (!track || !section) return

      const total = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -total,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${total}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Fade the header out as the cards begin sliding into its space.
      // Uses a separate scrubbed trigger over the first ~15% of horizontal travel.
      if (header) {
        gsap.to(header, {
          opacity: 0,
          y: -20,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${total * 0.15}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden md:h-screen"
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="md:absolute md:top-10 md:left-10 z-20 px-4 pt-20 md:pt-0 md:px-0 max-w-md md:will-change-[opacity,transform] md:pointer-events-none"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-12 bg-[#b61d23]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#b61d23] font-semibold">
            How We Think
          </span>
        </div>
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground leading-tight">
          Four principles<br />we don't bend on.
        </h2>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="md:flex md:items-center md:h-full md:pt-0 pt-12 pb-16 px-4 md:pl-[max(40vw,500px)] md:pr-[20vw] md:gap-10 grid grid-cols-1 gap-6 md:will-change-transform"
      >
        {PILLARS.map((p, i) => {
          const Icon = p.icon
          return (
            <article
              key={i}
              className="md:flex-shrink-0 md:w-[min(70vw,560px)] md:h-[60vh] md:max-h-[560px] relative bg-foreground/[0.03] border border-foreground/10 rounded-3xl p-8 md:p-12 overflow-hidden group hover:border-foreground/30 transition-colors duration-500"
            >
              {/* Background number */}
              <div
                aria-hidden
                className="absolute -bottom-12 -right-6 font-display text-[16rem] md:text-[20rem] font-black leading-none text-foreground/[0.04] select-none pointer-events-none"
              >
                {i + 1}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-xl bg-[#b61d23]/10 border border-[#b61d23]/20 flex items-center justify-center mb-6 group-hover:bg-[#b61d23] transition-colors duration-500">
                  <Icon className="w-7 h-7 text-[#b61d23] group-hover:text-white transition-colors duration-500" />
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-[#b61d23] font-semibold mb-4">
                  {p.eyebrow}
                </span>
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-[1.1] mb-5">
                  {p.title}
                </h3>
                <p className="text-base md:text-lg text-foreground/60 leading-relaxed mt-auto">
                  {p.body}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
