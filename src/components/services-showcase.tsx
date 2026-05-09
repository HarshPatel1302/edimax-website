'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Share2, Target, MapPin, Camera, MessageSquare, Sparkles, UserCircle2, type LucideIcon } from 'lucide-react'
import { useTilt } from '@/hooks/useAnimations'
import { SERVICES } from '@/content/services'

gsap.registerPlugin(ScrollTrigger)

const ICONS: Record<string, LucideIcon> = {
  'social-media-management': Share2,
  'brand-strategy-design': Target,
  'gmb-management': MapPin,
  'production': Camera,
  'online-reputation-management': MessageSquare,
  'personal-branding': UserCircle2,
}

const TAGLINES: Record<string, string> = {
  'social-media-management': 'Reels · Posts · Community',
  'brand-strategy-design': 'Identity · Voice · Position',
  'gmb-management': 'Local · Reviews · Visibility',
  'production': 'Shoot · Edit · Deliver',
  'online-reputation-management': 'Monitor · Respond · Repair',
  'personal-branding': 'Voice · Image · Authority',
}

function ServiceCard({
  service,
  index,
}: {
  service: { slug: string; title: string }
  index: number
}) {
  const ref = useTilt<HTMLAnchorElement>(4)
  const Icon = ICONS[service.slug] ?? Sparkles
  const tag = TAGLINES[service.slug] ?? '—'
  const num = String(index + 1).padStart(2, '0')

  return (
    <Link
      ref={ref}
      data-card
      href={`/services/${service.slug}`}
      className="group relative block aspect-[5/6] sm:aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-[#b61d23]/60 transition-colors duration-500"
    >
      {/* Animated gradient glow on hover */}
      <div
        aria-hidden
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(182,29,35,0.3),transparent_50%)] pointer-events-none"
      />

      {/* Background giant numeral */}
      <div
        aria-hidden
        className="absolute -bottom-10 -right-4 font-display text-[14rem] sm:text-[18rem] font-black leading-none text-white/[0.03] group-hover:text-[#b61d23]/20 transition-colors duration-700 select-none pointer-events-none"
      >
        {num}
      </div>

      {/* Decorative grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-700"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(ellipse at top right, black, transparent 70%)',
        }}
      />

      <div className="relative z-10 h-full flex flex-col p-7 sm:p-8">
        {/* Top row: index + arrow */}
        <div className="flex items-center justify-between mb-auto">
          <span className="font-mono text-[11px] tracking-widest text-white/40 group-hover:text-[#b61d23] transition-colors duration-500">
            SERVICE / {num}
          </span>
          <div className="w-11 h-11 rounded-full border border-white/15 group-hover:border-[#b61d23] group-hover:bg-[#b61d23] flex items-center justify-center transition-all duration-500">
            <ArrowUpRight className="w-5 h-5 text-white/60 group-hover:text-white transition-all duration-500 group-hover:rotate-45" />
          </div>
        </div>

        {/* Icon */}
        <div className="mt-12 mb-6">
          <div className="inline-flex w-14 h-14 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#b61d23]/40 group-hover:bg-[#b61d23]/10 items-center justify-center transition-all duration-500">
            <Icon className="w-6 h-6 text-white/70 group-hover:text-[#b61d23] transition-colors duration-500" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-[1.15] mb-3">
          {service.title}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-white/55 font-medium tracking-wide">
          {tag}
        </p>

        {/* Bottom hover bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between overflow-hidden">
          <span className="text-xs uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors duration-500">
            Explore service
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-[#b61d23] translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
            →
          </span>
        </div>
      </div>
    </Link>
  )
}

// Wrap with mouse-tracked CSS vars for the glow
function MouseGlowWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(hover: none)').matches) return
    const onMove = (e: MouseEvent) => {
      const cards = el.querySelectorAll<HTMLElement>('[data-card]')
      cards.forEach((card) => {
        const r = card.getBoundingClientRect()
        const mx = ((e.clientX - r.left) / r.width) * 100
        const my = ((e.clientY - r.top) / r.height) * 100
        card.style.setProperty('--mx', `${mx}%`)
        card.style.setProperty('--my', `${my}%`)
      })
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])
  return <div ref={ref}>{children}</div>
}

export function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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

      const cards = gridRef.current?.querySelectorAll('[data-card]') ?? []
      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0 })
      } else {
        gsap.set(cards, { opacity: 0, y: 60 })
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-background"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-20"
        >
          <div className="max-w-2xl">
            <div data-reveal className="flex items-center gap-3 mb-5">
              <span className="h-px w-12 bg-[#b61d23]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#b61d23] font-semibold">
                What We Do
              </span>
            </div>
            <h2
              data-reveal
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.05]"
            >
              Services that move<br />
              <span className="text-foreground/40">the needle.</span>
            </h2>
          </div>
          <p
            data-reveal
            className="text-base md:text-lg text-foreground/60 max-w-md leading-relaxed"
          >
            From strategy to story to ship, every service is built to compound, not to
            just look pretty in a deck.
          </p>
        </div>

        <MouseGlowWrapper>
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {SERVICES.slice(0, 6).map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </MouseGlowWrapper>
      </div>
    </section>
  )
}
