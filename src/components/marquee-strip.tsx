'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface MarqueeStripProps {
  items: string[]
  speed?: number
  className?: string
  separator?: string
  reverse?: boolean
  scrollVelocity?: boolean
}

export function MarqueeStrip({
  items,
  speed = 30,
  className = '',
  separator = '✦',
  reverse = false,
  scrollVelocity = true,
}: MarqueeStripProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const baseSpeed = (reverse ? -1 : 1) * (1 / speed)
    let velocity = baseSpeed
    let position = 0
    let rafId = 0
    let trackWidth = 0

    const measure = () => {
      trackWidth = track.scrollWidth / 2
    }
    measure()

    const tick = () => {
      const dx = velocity * 16
      position -= dx
      if (trackWidth > 0) {
        if (position <= -trackWidth) position += trackWidth
        if (position >= 0) position -= trackWidth
      }
      track.style.transform = `translate3d(${position}px, 0, 0)`
      // ease velocity back to base
      velocity += (baseSpeed - velocity) * 0.05
      rafId = requestAnimationFrame(tick)
    }

    if (!reduced) {
      rafId = requestAnimationFrame(tick)
    }

    let st: ScrollTrigger | null = null
    if (scrollVelocity && !reduced) {
      st = ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = self.getVelocity() / 800
          velocity = baseSpeed + v * (reverse ? -1 : 1)
        },
      })
    }

    const onResize = () => measure()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      st?.kill()
    }
  }, [speed, reverse, scrollVelocity])

  // duplicate the items so we have a seamless loop
  const doubled = [...items, ...items]

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden whitespace-nowrap ${className}`}
    >
      <div ref={trackRef} className="inline-flex w-max will-change-transform">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center px-5 sm:px-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tight"
          >
            {item}
            <span className="mx-5 sm:mx-8 text-[#b61d23] text-xl sm:text-2xl md:text-3xl">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
