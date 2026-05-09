'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Word-by-word mask reveal — splits the element's text into words wrapped
 * in a clip-path mask and animates them up from below.
 */
export function useMaskReveal<T extends HTMLElement = HTMLElement>(opts: {
  delay?: number
  stagger?: number
  duration?: number
  trigger?: boolean
} = {}) {
  const ref = useRef<T>(null)
  const { delay = 0, stagger = 0.06, duration = 1, trigger = true } = opts

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Snapshot original markup so React's reconciliation stays valid on unmount.
    const originalHTML = el.innerHTML

    const text = el.textContent ?? ''
    const words = text.split(/\s+/).filter(Boolean)
    el.innerHTML = words
      .map(
        (w) =>
          `<span class="mask-reveal-word"><span class="mask-reveal-inner">${w}</span></span>`
      )
      .join(' ')

    const inners = el.querySelectorAll('.mask-reveal-inner')

    if (reduced()) {
      gsap.set(inners, { y: 0, opacity: 1 })
      return () => {
        el.innerHTML = originalHTML
      }
    }

    gsap.set(inners, { yPercent: 110, opacity: 1 })

    const anim = gsap.to(inners, {
      yPercent: 0,
      duration,
      stagger,
      delay,
      ease: 'power4.out',
      scrollTrigger: trigger
        ? { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        : undefined,
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
      el.innerHTML = originalHTML
    }
  }, [delay, stagger, duration, trigger])

  return ref
}

/**
 * Number count-up animation triggered when the element enters the viewport.
 * Reads `data-count-to` from the element (or pass `to` directly).
 */
export function useCountUp<T extends HTMLElement = HTMLElement>(
  to: number,
  opts: { duration?: number; suffix?: string; prefix?: string } = {}
) {
  const ref = useRef<T>(null)
  const { duration = 2, suffix = '', prefix = '' } = opts

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reduced()) {
      el.textContent = `${prefix}${to}${suffix}`
      return
    }

    const obj = { val: 0 }
    el.textContent = `${prefix}0${suffix}`

    const anim = gsap.to(obj, {
      val: to,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${prefix}${Math.floor(obj.val).toLocaleString()}${suffix}`
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [to, duration, prefix, suffix])

  return ref
}

/**
 * Parallax: translate Y based on scroll position. Negative `speed` moves up.
 */
export function useParallax<T extends HTMLElement = HTMLElement>(speed = -0.2) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return

    const anim = gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [speed])

  return ref
}

/**
 * Magnetic hover — element follows cursor within strength radius.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return
    if (reduced()) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      xTo((e.clientX - cx) * strength)
      yTo((e.clientY - cy) * strength)
    }
    const handleLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [strength])

  return ref
}

/**
 * 3D tilt on hover.
 */
export function useTilt<T extends HTMLElement = HTMLElement>(max = 8) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(hover: none)').matches) return
    if (reduced()) return

    el.style.transformStyle = 'preserve-3d'
    el.style.willChange = 'transform'

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(el, {
        rotationY: x * max,
        rotationX: -y * max,
        transformPerspective: 900,
        duration: 0.5,
        ease: 'power3.out',
      })
    }
    const handleLeave = () => {
      gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.7, ease: 'power3.out' })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [max])

  return ref
}
