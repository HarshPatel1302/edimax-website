'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Aurora-style animated background — three slow drifting blobs with a grid
 * overlay and noise. Pure CSS + GSAP, GPU-friendly.
 */
export function AuroraBackground({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const blobs = containerRef.current?.querySelectorAll('[data-blob]') ?? []
      blobs.forEach((b, i) => {
        gsap.to(b, {
          x: `+=${i % 2 === 0 ? 80 : -100}`,
          y: `+=${i % 2 === 0 ? -60 : 80}`,
          scale: 1.15,
          duration: 8 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`absolute inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
    >
      <div
        data-blob
        className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-[#b61d23]/25 blur-[140px]"
      />
      <div
        data-blob
        className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-[#ff3a44]/15 blur-[140px]"
      />
      <div
        data-blob
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full bg-[#7a0e14]/25 blur-[100px]"
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
    </div>
  )
}
