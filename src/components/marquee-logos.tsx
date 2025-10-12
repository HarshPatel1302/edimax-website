'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { CLIENT_LOGOS } from '@/lib/client-logos'

export function MarqueeLogos() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Check if device is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    const marquee = marqueeRef.current
    if (!marquee) return

    // Wait for images to load before calculating
    const images = marquee.querySelectorAll('img')
    let loadedImages = 0
    
    const checkIfAllLoaded = () => {
      loadedImages++
      if (loadedImages === images.length) {
        startAnimation()
      }
    }

    images.forEach(img => {
      if (img.complete) {
        checkIfAllLoaded()
      } else {
        img.onload = checkIfAllLoaded
        img.onerror = checkIfAllLoaded
      }
    })

    const startAnimation = () => {
      // Calculate total width of one complete set of logos (first 4 logos)
      const logos = marquee.children
      let totalWidth = 0
      
      // Measure actual width of each logo container in the first set only
      for (let i = 0; i < CLIENT_LOGOS.length; i++) {
        const logoElement = logos[i] as HTMLElement
        if (logoElement) {
          totalWidth += logoElement.getBoundingClientRect().width
        }
      }

      // Adjust speed based on device type
      const baseSpeed = isMobile ? 25 : 35 // Slower on mobile for better visibility
      const duration = totalWidth / baseSpeed
      
      marquee.style.setProperty('--marquee-width', `${totalWidth}px`)
      marquee.style.setProperty('--marquee-duration', `${duration}s`)
      marquee.style.animation = `marquee-seamless var(--marquee-duration) linear infinite`
    }

    return () => {
      window.removeEventListener('resize', checkIsMobile)
      if (marquee) {
        marquee.style.animation = 'none'
      }
    }
  }, [isMobile])

  return (
    <div className="relative overflow-hidden bg-muted/50 py-8">
      <div className="absolute inset-0 bg-gradient-to-r from-muted/50 via-transparent to-muted/50" />
      
      <div className="relative">
        <div className="flex items-center justify-center mb-6">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Trusted by brands across platforms
          </p>
        </div>
        
        <div className="overflow-hidden">
          <div 
            ref={marqueeRef}
            className="marquee-container flex items-center whitespace-nowrap"
          >
            {/* Duplicate the logos array multiple times for seamless loop */}
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
              <div
                key={`logo-${index}`}
                className={`flex-shrink-0 flex items-center justify-center ${isMobile ? 'px-1' : 'px-2'}`}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={180}
                  height={90}
                  className={`${isMobile ? 'h-12 sm:h-16' : 'h-16 sm:h-20'} w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300`}
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