'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { heroContent } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const sublineRef = useRef<HTMLParagraphElement>(null)
  const summaryRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const primaryButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        // Simple fade in for reduced motion
        gsap.fromTo([headlineRef.current, sublineRef.current, summaryRef.current, ctaRef.current], 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
        )
        return
      }

      // Split headline text for animation
      const headlineText = headlineRef.current?.textContent || ''
      if (headlineRef.current) {
        headlineRef.current.innerHTML = headlineText
          .split(' ')
          .map(word => `<span class="inline-block">${word}</span>`)
          .join(' ')
      }

      // Animate headline words
      const headlineWords = headlineRef.current?.querySelectorAll('span')
      if (headlineWords) {
        gsap.fromTo(headlineWords, 
          { 
            opacity: 0, 
            y: 30
          },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            delay: 0.5
          }
        )
      }

      // Animate other elements
      gsap.fromTo([sublineRef.current, summaryRef.current, ctaRef.current], 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          delay: 1.2
        }
      )

      // Add gradient shimmer to primary CTA
      if (primaryButtonRef.current) {
        gsap.fromTo(primaryButtonRef.current, 
          { 
            backgroundPosition: "200% center"
          },
          { 
            backgroundPosition: "-200% center",
            duration: 2,
            ease: "none",
            repeat: -1,
            delay: 2
          }
        )
      }

    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleScrollToServices = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScrollToContact = () => {
    window.location.href = '/contact'
  }

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content - 9/12 width */}
          <div className="lg:col-span-9">
            <div className="max-w-4xl">
              {/* Headline */}
              <h1 
                ref={headlineRef}
                className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground mb-4 sm:mb-6 leading-tight tracking-wide"
              >
                {heroContent.headline}
              </h1>

              {/* Subline */}
              <p 
                ref={sublineRef}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-4 sm:mb-6 max-w-3xl"
              >
                {heroContent.subline}
              </p>

              {/* Quick Summary */}
              <p 
                ref={summaryRef}
                className="text-sm sm:text-base md:text-lg text-foreground/80 mb-6 sm:mb-8 max-w-2xl leading-relaxed"
              >
                {heroContent.quickSummary}
              </p>

              {/* CTAs */}
              <div 
                ref={ctaRef}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Button
                  ref={primaryButtonRef}
                  onClick={handleScrollToServices}
                  size="lg"
                  className="bg-[#b61d23] hover:bg-[#9a171c] text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  <span className="relative z-10">{heroContent.primaryCTA}</span>
                </Button>
                
                <Button
                  onClick={handleScrollToContact}
                  variant="outline"
                  size="lg"
                  className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300 w-full sm:w-auto"
                >
                  {heroContent.secondaryCTA}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Content - 3/12 width for decoration */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="relative">
              {/* Decorative elements */}
              <div className="w-48 xl:w-64 h-48 xl:h-64 bg-[#b61d23]/20 rounded-full blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              <div className="w-24 xl:w-32 h-24 xl:h-32 bg-[#b61d23]/30 rounded-full blur-2xl absolute top-1/3 right-0" />
              <div className="w-16 xl:w-24 h-16 xl:h-24 bg-[#b61d23]/40 rounded-full blur-xl absolute bottom-1/4 left-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}