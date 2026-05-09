'use client'

import { useEffect, useRef } from 'react'
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
  const summaryRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)
  const blob3Ref = useRef<HTMLDivElement>(null)
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

      // Split headline into words with mask wrappers
      if (headline) {
        const text = headline.textContent ?? ''
        headline.innerHTML = text
          .split(/\s+/)
          .filter(Boolean)
          .map(
            (w) =>
              `<span class="inline-block overflow-hidden align-bottom pb-[0.12em]"><span class="inline-block hero-word">${w}</span></span>`
          )
          .join(' ')
      }

      const words = headlineRef.current?.querySelectorAll('.hero-word') ?? []

      if (reduced) {
        gsap.set([eyebrowRef.current, words, summaryRef.current, ctaRef.current], {
          opacity: 1,
          y: 0,
          yPercent: 0,
        })
        return
      }

      // Initial state
      gsap.set(words, { yPercent: 110 })
      gsap.set([eyebrowRef.current, summaryRef.current, ctaRef.current], {
        opacity: 0,
        y: 30,
      })

      const tl = gsap.timeline({ delay: 0.2 })
      tl.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .to(
          words,
          {
            yPercent: 0,
            duration: 1.1,
            stagger: 0.06,
            ease: 'expo.out',
          },
          '-=0.4'
        )
        .to(
          summaryRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .from(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )

      // Blob parallax & idle drift
      const blobs = [blob1Ref.current, blob2Ref.current, blob3Ref.current].filter(
        Boolean
      ) as HTMLElement[]

      blobs.forEach((b, i) => {
        gsap.to(b, {
          x: `+=${i % 2 === 0 ? 30 : -40}`,
          y: `+=${i % 2 === 0 ? -20 : 30}`,
          duration: 6 + i * 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      // Scroll-out: hero content fades + lifts as user scrolls past
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        animation: gsap
          .timeline()
          .to(contentRef.current, { y: -120, opacity: 0.2, ease: 'none' }, 0)
          .to(blob1Ref.current, { y: 200, ease: 'none' }, 0)
          .to(blob2Ref.current, { y: -150, ease: 'none' }, 0)
          .to(blob3Ref.current, { y: 100, ease: 'none' }, 0)
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
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-background"
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 -z-10">
        <div
          ref={blob1Ref}
          className="absolute top-[10%] left-[5%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full bg-[#b61d23]/30 blur-[120px]"
        />
        <div
          ref={blob2Ref}
          className="absolute bottom-[5%] right-[5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-[#ff3a44]/20 blur-[100px]"
        />
        <div
          ref={blob3Ref}
          className="absolute top-[40%] right-[20%] w-[25vw] h-[25vw] max-w-[400px] max-h-[400px] rounded-full bg-[#7a0e14]/30 blur-[80px]"
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }}
        />
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full py-12 sm:py-16"
      >
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="flex items-center gap-3 mb-6 sm:mb-8"
        >
          <span className="h-px w-10 sm:w-16 bg-[#b61d23]" />
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#b61d23] font-semibold">
            Lifestyle-Driven Brand Building
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(2rem,6vw,5.5rem)] font-black text-foreground leading-[0.95] tracking-tight max-w-[18ch] mb-6 sm:mb-8"
        >
          {heroContent.headline}
        </h1>

        {/* Summary */}
        <p
          ref={summaryRef}
          className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed mb-8 sm:mb-10"
        >
          {heroContent.quickSummary}
        </p>

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
