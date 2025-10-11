'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface SectionProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  description?: string
  className?: string
  id?: string
  headingClassName?: string
}

export function Section({ 
  children, 
  title, 
  subtitle, 
  description, 
  className,
  id,
  headingClassName 
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        // Simple fade in for reduced motion
        gsap.fromTo([titleRef.current, subtitleRef.current, descriptionRef.current, contentRef.current].filter(Boolean), 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
        )
        return
      }

      // Create scroll trigger for the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      // Animate title
      if (titleRef.current) {
        tl.fromTo(titleRef.current, 
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
        )
      }

      // Animate subtitle
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
      }

      // Animate description
      if (descriptionRef.current) {
        tl.fromTo(descriptionRef.current, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        )
      }

      // Animate content
      if (contentRef.current) {
        tl.fromTo(contentRef.current, 
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.2"
        )
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id={id}
      className={cn("py-16 lg:py-24", className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle || description) && (
          <div className="text-center mb-12 lg:mb-16">
            {subtitle && (
              <p 
                ref={subtitleRef}
                className="text-sm font-semibold text-accent-start uppercase tracking-wider mb-4"
              >
                {subtitle}
              </p>
            )}
            
            {title && (
              <h2 
                ref={titleRef}
                className={cn(
                  "font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6",
                  headingClassName
                )}
              >
                {title}
              </h2>
            )}
            
            {description && (
              <p 
                ref={descriptionRef}
                className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              >
                {description}
              </p>
            )}
          </div>
        )}
        
        <div ref={contentRef}>
          {children}
        </div>
      </div>
    </section>
  )
}
