'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { CLIENT_LOGOS } from '@/lib/client-logos'

export function MarqueeLogos() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const marquee = marqueeRef.current
    if (!marquee) return

    // Calculate total width of one set of logos
    const logos = marquee.children
    let totalWidth = 0
    
    // Add padding between logos (2rem = 32px)
    for (let i = 0; i < CLIENT_LOGOS.length; i++) {
      totalWidth += logos[i].getBoundingClientRect().width + 32
    }

    // Create seamless infinite scroll
    gsap.to(marquee, {
      x: -totalWidth,
      duration: totalWidth / 50, // Adjust speed: pixels per second
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    })

    return () => {
      gsap.killTweensOf(marquee)
    }
  }, [])

  return (
    <div className="relative overflow-hidden bg-muted/50 py-6">
      <div className="absolute inset-0 bg-gradient-to-r from-muted/50 via-transparent to-muted/50" />
      
      <div className="relative">
        <div className="flex items-center justify-center mb-4">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Trusted by brands across platforms
          </p>
        </div>
        
        <div className="overflow-hidden">
          <div 
            ref={marqueeRef}
            className="flex items-center whitespace-nowrap"
          >
            {/* Duplicate the logos array multiple times for seamless loop */}
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
              <div
                key={`logo-${index}`}
                className="flex-shrink-0 flex items-center justify-center px-8"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                  priority={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}