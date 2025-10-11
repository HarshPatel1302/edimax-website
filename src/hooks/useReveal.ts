'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseRevealOptions {
  delay?: number
  duration?: number
  y?: number
  opacity?: number
  stagger?: number
  ease?: string
}

export function useReveal(options: UseRevealOptions = {}) {
  const elementRef = useRef<HTMLElement>(null)
  
  const {
    delay = 0,
    duration = 0.8,
    y = 30,
    opacity = 0,
    stagger = 0,
    ease = "power2.out"
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      // Simple fade in for reduced motion
      gsap.set(element, { opacity: 1, y: 0 })
      return
    }

    // Set initial state
    gsap.set(element, { 
      opacity, 
      y,
      visibility: 'hidden'
    })

    // Create reveal animation
    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease,
      visibility: 'visible',
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    })

    return () => {
      animation.kill()
    }
  }, [delay, duration, y, opacity, stagger, ease])

  return elementRef
}

export function useStaggerReveal(options: UseRevealOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const {
    delay = 0,
    duration = 0.6,
    y = 20,
    opacity = 0,
    stagger = 0.1,
    ease = "power2.out"
  } = options

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      // Simple fade in for reduced motion
      const children = container.children
      gsap.set(children, { opacity: 1, y: 0 })
      return
    }

    const children = container.children
    
    // Set initial state
    gsap.set(children, { 
      opacity, 
      y,
      visibility: 'hidden'
    })

    // Create stagger animation
    const animation = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease,
      visibility: 'visible',
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    })

    return () => {
      animation.kill()
    }
  }, [delay, duration, y, opacity, stagger, ease])

  return containerRef
}
