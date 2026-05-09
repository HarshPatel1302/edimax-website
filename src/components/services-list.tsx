'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { SERVICES } from '@/content/services'

gsap.registerPlugin(ScrollTrigger)

const TAGS: Record<string, string[]> = {
  'social-media-management': ['Reels', 'Posts', 'Community', 'Strategy'],
  'brand-strategy-design': ['Identity', 'Voice', 'Position', 'Logo'],
  'gmb-management': ['Local SEO', 'Reviews', 'Visibility', 'Posts'],
  'production': ['Photo', 'Video', 'Edit', 'Direction'],
  'online-reputation-management': ['Monitor', 'Respond', 'Repair', 'Reports'],
  'personal-branding': ['Identity', 'Voice', 'Authority', 'Content'],
}

export function ServicesList() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const rows = listRef.current?.querySelectorAll('[data-service]') ?? []
      if (reduced) {
        gsap.set(rows, { opacity: 1, y: 0 })
        return
      }
      rows.forEach((row, i) => {
        gsap.set(row, { opacity: 0, y: 60 })
        gsap.to(row, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: i * 0.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 88%' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div ref={listRef}>
          {SERVICES.map((s, i) => {
            const num = String(i + 1).padStart(2, '0')
            const tags = TAGS[s.slug] ?? []
            return (
              <Link
                key={s.slug}
                data-service
                href={`/services/${s.slug}`}
                className="group relative grid grid-cols-12 items-center gap-4 md:gap-6 py-10 md:py-14 border-t border-white/10 hover:border-[#b61d23]/40 transition-colors duration-500"
              >
                {/* Hover red wash background */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 bg-gradient-to-r from-[#b61d23]/10 via-[#b61d23]/5 to-transparent transition-transform duration-700 ease-out -z-10"
                />

                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span className="font-mono text-xs md:text-sm text-white/40 group-hover:text-[#b61d23] transition-colors duration-500">
                    /{num}
                  </span>
                </div>

                {/* Title — slides right on hover */}
                <div className="col-span-10 md:col-span-7 overflow-hidden">
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-[1.1] transition-transform duration-500 ease-out group-hover:translate-x-3">
                    {s.title}
                  </h3>
                </div>

                {/* Tags */}
                <div className="col-span-12 md:col-span-3 flex flex-wrap gap-2 md:justify-end">
                  {tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-xs uppercase tracking-[0.15em] px-3 py-1 rounded-full border border-white/15 text-white/60 group-hover:border-[#b61d23]/60 group-hover:text-[#b61d23] transition-colors duration-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="col-span-12 md:col-span-1 flex md:justify-end">
                  <div className="w-12 h-12 rounded-full border border-white/15 group-hover:border-[#b61d23] group-hover:bg-[#b61d23] flex items-center justify-center transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
                  </div>
                </div>
              </Link>
            )
          })}
          {/* closing border */}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  )
}
