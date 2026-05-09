'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AuroraBackground } from './aurora-background'

gsap.registerPlugin(ScrollTrigger)

interface PageHeroProps {
  eyebrow: string
  title: ReactNode | string
  /** Optional second line shown below `title` in muted color */
  subtitle?: ReactNode | string
  description?: string
  children?: ReactNode
  align?: 'left' | 'center'
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  description,
  children,
  align = 'left',
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const childrenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Snapshot original markup so we can restore on unmount; React doesn't track
    // GSAP's innerHTML rewrite below, and bare unmount throws removeChild errors.
    const headline = headlineRef.current
    const originalHeadlineHTML = headline?.innerHTML ?? null

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Wrap each word in a mask so we can animate them up
      if (headline) {
        const html = headline.innerHTML
        // Split by HTML entities and text — we recurse over text nodes only.
        const wrap = (node: ChildNode): string => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent ?? ''
            return text
              .split(/(\s+)/)
              .map((part) =>
                /^\s+$/.test(part) || part === ''
                  ? part
                  : `<span class="inline-block overflow-hidden align-bottom pb-[0.12em]"><span class="inline-block hero-word">${part}</span></span>`
              )
              .join('')
          }
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement
            const inner = Array.from(el.childNodes).map(wrap).join('')
            return el.outerHTML.replace(el.innerHTML, inner)
          }
          return ''
        }

        // Quick simple version: only operate on plain text + <br/>
        // (matches our usage in this app)
        if (!html.includes('<')) {
          const wrapped = (headline.textContent ?? '')
            .split(/(\s+)/)
            .map((part) =>
              /^\s+$/.test(part) || part === ''
                ? part
                : `<span class="inline-block overflow-hidden align-bottom pb-[0.12em]"><span class="inline-block hero-word">${part}</span></span>`
            )
            .join('')
          headline.innerHTML = wrapped
        } else {
          // mixed: split each text node
          headline.innerHTML = Array.from(headline.childNodes).map(wrap).join('')
        }
      }

      const words = headlineRef.current?.querySelectorAll('.hero-word') ?? []

      if (reduced) {
        gsap.set([eyebrowRef.current, words, subRef.current, childrenRef.current], {
          opacity: 1,
          y: 0,
          yPercent: 0,
        })
        return
      }

      gsap.set(words, { yPercent: 110 })
      gsap.set([eyebrowRef.current, subRef.current, childrenRef.current], {
        opacity: 0,
        y: 30,
      })

      const tl = gsap.timeline({ delay: 0.15 })
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
            stagger: 0.05,
            ease: 'expo.out',
          },
          '-=0.4'
        )
        .to(
          subRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .to(
          childrenRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
    }, sectionRef)

    return () => {
      ctx.revert()
      if (headline && originalHeadlineHTML !== null) {
        headline.innerHTML = originalHeadlineHTML
      }
    }
  }, [])

  const alignCls =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'

  return (
    <section
      ref={sectionRef}
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-background"
    >
      <AuroraBackground />

      <div className={`relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col ${alignCls}`}>
        <div ref={eyebrowRef} className={`flex items-center gap-3 mb-6 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-px w-12 bg-[#b61d23]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#b61d23] font-semibold">
            {eyebrow}
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black text-foreground leading-[0.95] tracking-tight max-w-[18ch]"
        >
          {title}
        </h1>

        {subtitle && (
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-foreground/40 leading-[1.05] mt-2 max-w-[20ch]">
            {subtitle}
          </h2>
        )}

        {description && (
          <p
            ref={subRef}
            className={`text-base sm:text-lg md:text-xl text-foreground/65 max-w-2xl leading-relaxed mt-8 ${align === 'center' ? 'mx-auto' : ''}`}
          >
            {description}
          </p>
        )}

        {children && (
          <div ref={childrenRef} className="mt-10">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
