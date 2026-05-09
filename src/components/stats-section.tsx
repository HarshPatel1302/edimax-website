'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Stat {
  value: number
  suffix: string
  label: string
  sub: string
}

const STATS: Stat[] = [
  { value: 100, suffix: '+', label: 'Reels Crafted', sub: 'High-impact visual stories that pull audiences in.' },
  { value: 500, suffix: '+', label: 'Leads Generated', sub: 'Measurable pipeline driven through targeted campaigns.' },
  { value: 100, suffix: '%', label: 'Trial → Annual', sub: 'Every short-term trial converts to a long-term partner.' },
  { value: 24, suffix: '/7', label: 'Brand Watch', sub: 'Reputation, response, refinement — round the clock.' },
]

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = itemRef.current
    const num = numRef.current
    const line = lineRef.current
    if (!el || !num || !line) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 })
      gsap.set(line, { scaleX: 1 })
      num.textContent = String(stat.value)
      return
    }

    gsap.set(el, { opacity: 0, y: 40 })
    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })
    num.textContent = '0'

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 85%' },
      delay: index * 0.08,
    })

    tl.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(
        { v: 0 },
        {
          v: stat.value,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: function () {
            const v = (this.targets()[0] as { v: number }).v
            num.textContent = Math.floor(v).toString()
          },
        },
        '-=0.6'
      )
      .to(
        line,
        { scaleX: 1, duration: 1.2, ease: 'power3.inOut' },
        '-=1.4'
      )
  }, [stat.value, index])

  return (
    <div
      ref={itemRef}
      className="group relative flex flex-col py-10 md:py-12 px-1 will-change-transform"
    >
      {/* Animated top line */}
      <span
        ref={lineRef}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#b61d23] via-[#ff3a44] to-transparent"
        style={{ willChange: 'transform' }}
      />

      {/* Number block */}
      <div className="flex items-start gap-1 mb-6">
        <span
          ref={numRef}
          className="font-display text-[clamp(2.75rem,6vw,5.5rem)] font-black leading-[0.85] tracking-tight text-foreground tabular-nums"
        >
          0
        </span>
        <span className="font-display text-[clamp(1.5rem,3vw,2.75rem)] font-black leading-[0.85] text-[#b61d23] mt-2">
          {stat.suffix}
        </span>
      </div>

      <h3 className="text-base md:text-lg font-semibold uppercase tracking-[0.15em] text-foreground/90 mb-2">
        {stat.label}
      </h3>
      <p className="text-sm text-foreground/55 leading-relaxed max-w-[28ch]">
        {stat.sub}
      </p>

      {/* Bottom hover bar */}
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b61d23] group-hover:w-full transition-[width] duration-700 ease-out" />
    </div>
  )
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const els = headerRef.current?.querySelectorAll('[data-reveal]') ?? []
      if (reduced) {
        gsap.set(els, { opacity: 1, y: 0 })
      } else {
        gsap.set(els, { opacity: 0, y: 30 })
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-background overflow-hidden"
    >
      {/* Subtle bg glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-[#b61d23]/10 blur-[140px] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div ref={headerRef} className="max-w-3xl mb-16 md:mb-24">
          <div data-reveal className="flex items-center gap-3 mb-5">
            <span className="h-px w-12 bg-[#b61d23]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#b61d23] font-semibold">
              By the Numbers
            </span>
          </div>
          <h2
            data-reveal
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.05]"
          >
            Results, not<br />
            <span className="text-foreground/40">opinions.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {STATS.map((s, i) => (
            <StatItem key={i} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
