'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { heroContent } from '@/lib/constants'
import { useMagnetic } from '@/hooks/useAnimations'
import Link from 'next/link'
import { ArrowRight, ArrowDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const sublineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const primaryButtonRef = useMagnetic<HTMLButtonElement>(0.4)

  useEffect(() => {
    // Snapshot original markup so we can restore on unmount — keeps React's
    // reconciliation in sync after GSAP rewrites innerHTML below.
    const headline = headlineRef.current
    const originalHeadlineHTML = headline?.innerHTML ?? null

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Split each headline line into words with mask wrappers
      if (headline) {
        headline.querySelectorAll('.hero-headline-line').forEach((line) => {
          const text = line.textContent ?? ''
          line.innerHTML = text
            .split(/\s+/)
            .filter(Boolean)
            .map(
              (w) =>
                `<span class="inline-block overflow-hidden align-bottom pb-[0.12em]"><span class="inline-block hero-word">${w}</span></span>`
            )
            .join(' ')
        })
      }

      const words = headlineRef.current?.querySelectorAll('.hero-word') ?? []

      if (reduced) {
        gsap.set(
          [words, sublineRef.current, ctaRef.current].filter(Boolean),
          {
            opacity: 1,
            y: 0,
            yPercent: 0,
          }
        )
        return
      }

      // Initial state
      gsap.set(words, { yPercent: 110 })
      gsap.set([ctaRef.current], {
        opacity: 0,
        y: 30,
      })
      if (sublineRef.current) {
        gsap.set(sublineRef.current, { opacity: 0, y: 30 })
      }

      const tl = gsap.timeline({ delay: 0.15 })
      tl.to(
          words,
          {
            yPercent: 0,
            duration: 1.15,
            stagger: 0.07,
            ease: 'expo.out',
          },
          0
        )
      if (sublineRef.current) {
        tl.to(
          sublineRef.current,
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
          '-=0.5'
        )
      }
      tl.to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.45'
        )
        .from(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )

      // Scroll-out: hero content fades + lifts as user scrolls past
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        animation: gsap
          .timeline()
          .to(contentRef.current, { y: -120, opacity: 0.2, ease: 'none' }, 0)
          .to(scrollIndicatorRef.current, { opacity: 0, ease: 'none' }, 0),
      })
    }, heroRef)

    return () => {
      ctx.revert()
      if (headline && originalHeadlineHTML !== null) {
        headline.innerHTML = originalHeadlineHTML
      }
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#0B0D12] pt-[max(4rem,env(safe-area-inset-top))] sm:pt-20"
    >
      {/* Full-bleed photo — z-0 (not negative) so it paints above section fallback bg */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home-hero-bg.png"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[28%_52%] sm:object-[32%_50%] lg:object-[36%_48%] xl:object-[38%_48%]"
        />
        {/* ~10% global dim so the scene recedes slightly */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" aria-hidden />
        {/* Typographic column sits in open left; keep mid/right image bright */}
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,13,18,0.84)_0%,rgba(11,13,18,0.45)_34%,rgba(11,13,18,0.12)_52%,transparent_72%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/45 via-transparent to-[#0B0D12]/25"
          aria-hidden
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:pl-12 lg:pr-10 xl:pl-16 py-14 sm:py-16 md:py-20"
      >
        <div className="max-w-[min(34rem,92vw)] sm:max-w-[min(38rem,55vw)] lg:max-w-[min(40rem,48%)]">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display flex flex-col gap-2 sm:gap-3 text-[clamp(2.35rem,6.8vw,5.85rem)] font-bold text-foreground leading-[0.98] tracking-[-0.02em] mb-5 sm:mb-7 [text-shadow:0_4px_40px_rgba(0,0,0,0.55)]"
          >
            <span className="block hero-headline-line text-balance">{heroContent.headlineLine1}</span>
            <span className="block hero-headline-line text-balance text-foreground/95">{heroContent.headlineLine2}</span>
          </h1>

          {heroContent.subline.trim() ? (
            <p
              ref={sublineRef}
              className="font-display text-[clamp(1.15rem,2.75vw,2.2rem)] font-medium text-foreground/88 leading-[1.25] tracking-[-0.01em] text-balance max-w-[36ch] mb-8 sm:mb-10 [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]"
            >
              {heroContent.subline.trim()}
            </p>
          ) : null}

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <Button
            ref={primaryButtonRef}
            asChild
            size="lg"
            className="group relative bg-[#b61d23] hover:bg-[#9a171c] text-white px-8 py-6 text-base sm:text-lg font-semibold rounded-full overflow-hidden shadow-[0_10px_30px_-10px_rgba(182,29,35,0.6)] hover:shadow-[0_15px_40px_-10px_rgba(182,29,35,0.8)] transition-shadow"
          >
            <Link href="/contact">
              <span className="relative z-10 flex items-center gap-2">
                {heroContent.primaryCTA}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="group border-2 border-foreground/30 hover:border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background px-8 py-6 text-base sm:text-lg font-semibold rounded-full transition-all"
          >
            <Link href="/services">
              <span className="flex items-center gap-2">
                {heroContent.secondaryCTA}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Button>
        </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-foreground/50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-foreground/50 to-transparent overflow-hidden">
          <div className="w-full h-1/2 bg-foreground animate-[scrollLine_2s_ease-in-out_infinite]" />
        </div>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  )
}
