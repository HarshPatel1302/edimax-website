'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { contactInfo } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  {
    icon: MapPin,
    label: 'Studio',
    value: contactInfo.address,
  },
  {
    icon: Phone,
    label: 'Direct',
    value: contactInfo.phone,
  },
  {
    icon: Mail,
    label: 'Email',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: Clock,
    label: 'Response time',
    value: 'Within 24 hours',
  },
]

export function ContactInfoGrid() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const items = ref.current?.querySelectorAll('[data-info]') ?? []
      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 })
        return
      }
      gsap.set(items, { opacity: 0, y: 30 })
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="space-y-3">
      {ITEMS.map((item, i) => {
        const Icon = item.icon
        const Wrapper = item.href ? 'a' : 'div'
        return (
          <Wrapper
            key={i}
            data-info
            href={item.href}
            className="group relative flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#b61d23]/40 hover:bg-white/[0.05] transition-all duration-500"
          >
            <div className="w-11 h-11 shrink-0 rounded-lg bg-[#b61d23]/10 border border-[#b61d23]/20 flex items-center justify-center group-hover:bg-[#b61d23] transition-colors duration-500">
              <Icon className="w-5 h-5 text-[#b61d23] group-hover:text-white transition-colors duration-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">
                {item.label}
              </p>
              <p className="text-sm md:text-base text-foreground font-medium break-words">
                {item.value}
              </p>
            </div>
            <span className="absolute bottom-0 left-5 right-5 h-px w-0 bg-[#b61d23] group-hover:w-[calc(100%-2.5rem)] transition-[width] duration-700 ease-out" />
          </Wrapper>
        )
      })}
    </div>
  )
}
