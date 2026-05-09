'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isTouch = window.matchMedia('(hover: none)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReducedMotion) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3' })
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3' })
    const rxTo = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' })
    const ryTo = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' })

    let lastX = 0
    let lastY = 0
    const handleMove = (e: MouseEvent) => {
      lastX = e.clientX
      lastY = e.clientY
      xTo(lastX)
      yTo(lastY)
      rxTo(lastX)
      ryTo(lastY)
    }

    const handleEnter = () => {
      gsap.to(ring, { scale: 2.4, opacity: 0.4, duration: 0.3, ease: 'power3.out' })
      gsap.to(dot, { scale: 0, duration: 0.2, ease: 'power3.out' })
    }
    const handleLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' })
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power3.out' })
    }

    document.addEventListener('mousemove', handleMove)
    document.body.classList.add('cursor-none')

    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
    const interactiveEls = Array.from(document.querySelectorAll<HTMLElement>(interactiveSelector))
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    const observer = new MutationObserver(() => {
      const newEls = Array.from(document.querySelectorAll<HTMLElement>(interactiveSelector))
      newEls.forEach((el) => {
        if (!(el as HTMLElement & { __cursorBound?: boolean }).__cursorBound) {
          el.addEventListener('mouseenter', handleEnter)
          el.addEventListener('mouseleave', handleLeave)
          ;(el as HTMLElement & { __cursorBound?: boolean }).__cursorBound = true
        }
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 1 })

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.body.classList.remove('cursor-none')
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-9 w-9 rounded-full border border-white/60 opacity-0 mix-blend-difference md:block"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 rounded-full bg-white opacity-0 mix-blend-difference md:block"
      />
    </>
  )
}
