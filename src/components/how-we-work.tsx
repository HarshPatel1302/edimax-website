'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { User, Palette, Play, Camera, BarChart3, type LucideIcon } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const timelineSteps: { icon: LucideIcon; title: string; description: string; number: string }[] = [
  {
    number: '01',
    icon: User,
    title: 'Account Optimisation',
    description: 'We analyze your current digital presence and optimize your accounts for maximum impact.',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Brand Designing',
    description: 'Creating a cohesive visual identity that resonates with your target audience.',
  },
  {
    number: '03',
    icon: Play,
    title: 'Implementation',
    description: 'Rolling out strategies across all platforms with precision and consistency.',
  },
  {
    number: '04',
    icon: Camera,
    title: 'Production',
    description: 'Creating high-quality content that tells your brand story effectively.',
  },
  {
    number: '05',
    icon: BarChart3,
    title: 'Analytics',
    description: 'Tracking performance and optimizing campaigns for continuous improvement.',
  },
]

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const header = headerRef.current
      if (header) {
        const els = header.querySelectorAll('[data-reveal]')
        if (reduced) {
          gsap.set(els, { opacity: 1, y: 0 })
        } else {
          gsap.set(els, { opacity: 0, y: 40 })
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: header, start: 'top 80%' },
          })
        }
      }

      const items = timelineRef.current?.querySelectorAll('[data-step]') ?? []
      if (reduced) {
        gsap.set(items, { opacity: 1, x: 0 })
      } else {
        items.forEach((item, i) => {
          gsap.set(item, { opacity: 0, x: i % 2 === 0 ? -60 : 60 })
          gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%' },
          })
        })
      }

      // Scroll-driven progress line
      if (progressRef.current && timelineRef.current && !reduced) {
        gsap.to(progressRef.current, {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: true,
          },
        })
      } else if (progressRef.current) {
        gsap.set(progressRef.current, { scaleY: 1 })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-background overflow-hidden"
    >
      {/* Decorative side type */}
      <div
        aria-hidden
        className="hidden lg:block absolute top-1/2 -right-12 -translate-y-1/2 -rotate-90 origin-center text-[10rem] font-display font-black text-foreground/[0.025] select-none whitespace-nowrap"
      >
        Process
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 md:mb-24">
          <div data-reveal className="flex items-center gap-3 mb-5">
            <span className="h-px w-12 bg-[#b61d23]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#b61d23] font-semibold">
              Our Process
            </span>
          </div>
          <h2
            data-reveal
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.05] mb-6"
          >
            A proven 5-step path<br />
            <span className="text-foreground/40">from idea to impact.</span>
          </h2>
          <p data-reveal className="text-lg text-foreground/60 max-w-2xl leading-relaxed">
            Every brand we build follows the same disciplined rhythm i.e research, design, ship,
            measure, refine. No improvising. No guesswork.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical track */}
          <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2">
            <div className="absolute inset-0 bg-foreground/10" />
            <div
              ref={progressRef}
              className="absolute inset-0 bg-gradient-to-b from-[#b61d23] via-[#ff3a44] to-[#b61d23] origin-top scale-y-0"
              style={{ willChange: 'transform' }}
            />
          </div>

          {timelineSteps.map((step, i) => {
            const Icon = step.icon
            const isLeft = i % 2 === 0
            return (
              <div
                key={i}
                data-step
                className={`relative pl-16 sm:pl-24 md:pl-0 mb-12 md:mb-20 last:mb-0 md:grid md:grid-cols-2 md:gap-16 ${
                  isLeft ? '' : 'md:[&>*:first-child]:col-start-2'
                }`}
              >
                {/* Node dot */}
                <div className="absolute left-6 sm:left-8 md:left-1/2 top-2 -translate-x-1/2 z-10">
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-[#b61d23] ring-4 ring-background" />
                    <div className="absolute inset-0 rounded-full bg-[#b61d23] animate-ping opacity-30" />
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`group relative ${
                    isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'
                  }`}
                >
                  <div
                    className={`flex items-center gap-3 mb-4 ${
                      isLeft ? 'md:flex-row-reverse md:justify-start' : ''
                    }`}
                  >
                    <span className="font-display text-4xl md:text-5xl font-black text-[#b61d23]/30 group-hover:text-[#b61d23] transition-colors duration-500">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#b61d23]/10 border border-[#b61d23]/20 flex items-center justify-center group-hover:bg-[#b61d23] group-hover:border-[#b61d23] transition-all duration-500">
                      <Icon className="w-6 h-6 text-[#b61d23] group-hover:text-white transition-colors duration-500" />
                    </div>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed max-w-md md:max-w-none md:inline-block">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
