'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Lightbulb, Heart, Target, type LucideIcon } from 'lucide-react'
import { aboutContent } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

const ICONS: LucideIcon[] = [Lightbulb, Heart, Target]

export function BeliefsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const headerEls = headerRef.current?.querySelectorAll('[data-reveal]') ?? []
      if (reduced) {
        gsap.set(headerEls, { opacity: 1, y: 0 })
      } else {
        gsap.set(headerEls, { opacity: 0, y: 30 })
        gsap.to(headerEls, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        })
      }

      const items = listRef.current?.querySelectorAll('[data-belief]') ?? []
      items.forEach((item, i) => {
        if (reduced) {
          gsap.set(item, { opacity: 1, x: 0 })
          return
        }
        gsap.set(item, { opacity: 0, x: i % 2 === 0 ? -50 : 50 })
        gsap.to(item, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 85%' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-background overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div ref={headerRef} className="max-w-3xl mb-16 md:mb-24">
          <div data-reveal className="flex items-center gap-3 mb-5">
            <span className="h-px w-12 bg-[#b61d23]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#b61d23] font-semibold">
              What We Believe
            </span>
          </div>
          <h2
            data-reveal
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.05]"
          >
            Three principles<br />
            <span className="text-foreground/40">we don't compromise on.</span>
          </h2>
        </div>

        <div ref={listRef} className="space-y-6 md:space-y-8">
          {aboutContent.beliefs.map((b, i) => {
            const Icon = ICONS[i] ?? Lightbulb
            return (
              <article
                key={i}
                data-belief
                className="group relative grid grid-cols-12 gap-4 md:gap-8 items-start py-8 md:py-12 border-t border-white/10 hover:border-[#b61d23]/40 transition-colors duration-500"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="font-mono text-xs md:text-sm text-white/40 group-hover:text-[#b61d23] transition-colors duration-500">
                    /0{i + 1}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#b61d23]/10 group-hover:border-[#b61d23]/40 flex items-center justify-center transition-all duration-500">
                      <Icon className="w-5 h-5 text-white/70 group-hover:text-[#b61d23] transition-colors duration-500" />
                    </div>
                    <h3 className="font-display text-xl md:text-3xl font-bold text-foreground leading-tight">
                      {b.title}
                    </h3>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-7">
                  <p className="text-base md:text-lg text-foreground/60 leading-relaxed max-w-2xl">
                    {b.description}
                  </p>
                </div>

                {/* Animated underline on hover */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#b61d23] group-hover:w-full transition-[width] duration-700 ease-out" />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
