'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  Share2,
  Target,
  MapPin,
  Camera,
  MessageSquare,
  Sparkles,
  UserCircle2,
  type LucideIcon,
} from 'lucide-react'
import { SERVICES } from '@/content/services'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const TAGS: Record<string, string[]> = {
  'social-media-management': ['Reels', 'Posts', 'Community', 'Strategy'],
  'brand-strategy-design': ['Identity', 'Voice', 'Position', 'Logo'],
  'gmb-management': ['Local SEO', 'Reviews', 'Visibility', 'Posts'],
  production: ['Photo', 'Video', 'Edit', 'Direction'],
  'online-reputation-management': ['Monitor', 'Respond', 'Repair', 'Reports'],
  'personal-branding': ['Identity', 'Voice', 'Authority', 'Content'],
}

const ICONS: Record<string, LucideIcon> = {
  'social-media-management': Share2,
  'brand-strategy-design': Target,
  'gmb-management': MapPin,
  production: Camera,
  'online-reputation-management': MessageSquare,
  'personal-branding': UserCircle2,
}

const TAGLINES: Record<string, string> = {
  'social-media-management': 'Reels · Posts · Community',
  'brand-strategy-design': 'Identity · Voice · Position',
  'gmb-management': 'Local · Reviews · Visibility',
  production: 'Shoot · Edit · Deliver',
  'online-reputation-management': 'Monitor · Respond · Repair',
  'personal-branding': 'Voice · Image · Authority',
}

export function ServicesList() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [openSlug, setOpenSlug] = useState<string | null>(null)

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
    <section
      ref={sectionRef}
      id="services"
      className="relative py-16 md:py-24 lg:py-32 bg-background"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div ref={listRef} className="flex flex-col gap-4 md:gap-5">
          {SERVICES.map((s, i) => {
            const num = String(i + 1).padStart(2, '0')
            const tags = TAGS[s.slug] ?? []
            const isOpen = openSlug === s.slug
            const Icon = ICONS[s.slug] ?? Sparkles
            const tagline = TAGLINES[s.slug] ?? '—'

            return (
              <div
                key={s.slug}
                data-service
                className={cn(
                  'group relative overflow-hidden rounded-2xl border transition-colors duration-500',
                  'border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01]',
                  'md:rounded-3xl',
                  isOpen && 'border-[#b61d23]/40 shadow-[0_0_0_1px_rgba(182,29,35,0.15)]'
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-0 origin-bottom -z-10 bg-gradient-to-r from-[#b61d23]/12 via-[#b61d23]/5 to-transparent transition-transform duration-700 ease-out',
                    'scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100',
                    isOpen && 'scale-y-100 opacity-100'
                  )}
                />

                <div
                  aria-hidden
                  className="absolute -bottom-6 -right-2 sm:-bottom-10 sm:-right-4 font-display text-[7rem] sm:text-[10rem] lg:text-[12rem] font-black leading-none text-white/[0.04] group-hover:text-[#b61d23]/15 transition-colors duration-700 select-none pointer-events-none"
                >
                  {num}
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none rounded-2xl md:rounded-3xl"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage:
                      'radial-gradient(ellipse at 100% 100%, black 20%, transparent 75%)',
                  }}
                />

                <div className="relative z-10 grid grid-cols-12 items-start gap-y-6 md:gap-y-0 md:items-center gap-x-4 md:gap-6 px-5 py-8 sm:px-7 sm:py-10 md:px-8 md:py-12">
                  <div className="col-span-6 sm:col-span-2 md:col-span-1">
                    <span
                      className={cn(
                        'font-mono text-xs md:text-sm text-white/40 transition-colors duration-500',
                        'group-hover:text-[#b61d23]',
                        isOpen && 'text-[#b61d23]'
                      )}
                    >
                      /{num}
                    </span>
                  </div>

                  <div className="col-span-6 sm:col-span-2 md:col-span-1 flex justify-end sm:justify-start md:justify-start">
                    <div
                      className={cn(
                        'inline-flex w-12 h-12 sm:w-14 sm:h-14 rounded-xl border items-center justify-center transition-all duration-500',
                        'border-white/10 bg-white/[0.03] text-white/70',
                        'group-hover:border-[#b61d23]/45 group-hover:bg-[#b61d23]/10 group-hover:text-[#b61d23]',
                        isOpen && 'border-[#b61d23]/50 bg-[#b61d23]/15 text-[#b61d23]'
                      )}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-6 overflow-hidden">
                    <h3
                      className={cn(
                        'font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-[1.1]',
                        'transition-transform duration-500 ease-out md:group-hover:translate-x-2'
                      )}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-white/55 font-medium tracking-wide">
                      {tagline}
                    </p>
                    <p className="mt-3 md:hidden text-[11px] uppercase tracking-[0.25em] text-white/35">
                      Tap arrow to expand
                    </p>
                  </div>

                  <div className="col-span-12 md:col-span-3 flex flex-wrap gap-2 md:justify-end">
                    {tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className={cn(
                          'text-xs uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border transition-colors duration-500',
                          'border-white/15 text-white/60 group-hover:border-[#b61d23]/55 group-hover:text-[#b61d23]',
                          isOpen && 'border-[#b61d23]/50 text-[#b61d23]'
                        )}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="col-span-12 md:col-span-1 flex justify-end md:justify-end">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`service-panel-${s.slug}`}
                      id={`service-trigger-${s.slug}`}
                      onClick={() => setOpenSlug((prev) => (prev === s.slug ? null : s.slug))}
                      aria-label={isOpen ? `Collapse ${s.title}` : `Expand ${s.title}`}
                      className={cn(
                        'w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 outline-none shrink-0',
                        'focus-visible:ring-2 focus-visible:ring-[#b61d23] focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                        'border-white/15 text-white/60 hover:border-[#b61d23] hover:bg-[#b61d23] hover:text-white',
                        isOpen && 'border-[#b61d23] bg-[#b61d23] text-white rotate-45'
                      )}
                    >
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-500" />
                    </button>
                  </div>
                </div>

                <div
                  className={cn(
                    'relative z-10 grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <div className="overflow-hidden min-h-0">
                    <div
                      id={`service-panel-${s.slug}`}
                      role="region"
                      aria-labelledby={`service-trigger-${s.slug}`}
                      className="border-t border-white/10 mx-5 sm:mx-7 md:mx-8 pb-8 sm:pb-10"
                    >
                      <p className="text-base md:text-lg text-foreground/80 font-medium leading-relaxed max-w-3xl pt-6 md:pt-8 select-text">
                        {s.overview}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
