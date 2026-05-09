'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { useMagnetic, useMaskReveal } from '@/hooks/useAnimations'

gsap.registerPlugin(ScrollTrigger)

export function CtaMassive() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useMaskReveal<HTMLHeadingElement>({ stagger: 0.05, duration: 1.1 })
  const linkRef = useMagnetic<HTMLAnchorElement>(0.3)
  const subRef = useRef<HTMLParagraphElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const ctaWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const els = [eyebrowRef.current, subRef.current, ctaWrapRef.current].filter(Boolean)
      if (reduced) {
        gsap.set(els, { opacity: 1, y: 0 })
        return
      }
      gsap.set(els, { opacity: 0, y: 30 })
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 bg-background overflow-hidden"
    >
      {/* Background blob */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-[#b61d23]/15 blur-[150px] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
        <div ref={eyebrowRef} className="flex items-center justify-center gap-3 mb-8">
          <span className="h-px w-12 bg-[#b61d23]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#b61d23] font-semibold">
            Let's Build
          </span>
          <span className="h-px w-12 bg-[#b61d23]" />
        </div>

        <h2
          ref={headlineRef}
          className="font-display text-[clamp(2.25rem,7vw,5.5rem)] font-black leading-[0.95] tracking-tight text-foreground mb-10"
        >
          Ready to become a brand?
        </h2>

        <p
          ref={subRef}
          className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Tell us where you want your brand to be in 12 months. We'll show you how to
          get there and then we'll get you there.
        </p>

        <div ref={ctaWrapRef} className="flex justify-center">
          <Link
            ref={linkRef}
            href="/contact"
            className="group relative inline-flex items-center gap-4 px-10 py-6 bg-[#b61d23] hover:bg-[#9a171c] text-white text-lg font-semibold rounded-full overflow-hidden shadow-[0_20px_60px_-15px_rgba(182,29,35,0.7)] transition-shadow"
          >
            <span className="relative z-10">Start Your Project</span>
            <span className="relative z-10 w-10 h-10 rounded-full bg-white text-[#b61d23] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="w-5 h-5" />
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>
      </div>
    </section>
  )
}
