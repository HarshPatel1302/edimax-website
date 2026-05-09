'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  {
    q: 'How quickly do you respond?',
    a: 'We respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.',
  },
  {
    q: 'Do you work with remote clients?',
    a: 'Absolutely. We work with clients across India and internationally. Our digital-first approach makes remote collaboration seamless.',
  },
  {
    q: "What's your typical project timeline?",
    a: 'Project timelines vary depending on scope and complexity. We provide a detailed timeline during the initial consultation.',
  },
  {
    q: 'Do you offer free consultations?',
    a: 'Yes — we offer a free initial consultation to discuss your project, understand your goals, and determine how we can help.',
  },
]

function FaqRow({
  q,
  a,
  index,
  open,
  onToggle,
}: {
  q: string
  a: string
  index: number
  open: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (open) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: reduced ? 0 : 0.5,
          ease: 'power3.out',
        }
      )
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: reduced ? 0 : 0.4,
        ease: 'power3.in',
      })
    }
  }, [open])

  return (
    <div data-faq className="border-t border-white/10 last:border-b">
      <button
        type="button"
        onClick={onToggle}
        className="group w-full flex items-start gap-6 py-6 md:py-8 text-left"
        aria-expanded={open}
      >
        <span className="font-mono text-xs md:text-sm text-white/40 shrink-0 mt-2 group-hover:text-[#b61d23] transition-colors duration-300">
          /0{index + 1}
        </span>
        <span className="flex-1 font-display text-lg md:text-xl lg:text-2xl font-semibold text-foreground leading-tight group-hover:text-[#b61d23] transition-colors duration-300">
          {q}
        </span>
        <span
          className={`shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 ${
            open ? 'bg-[#b61d23] border-[#b61d23] rotate-45' : 'group-hover:border-white/50'
          }`}
        >
          <Plus className="w-5 h-5 text-white" />
        </span>
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="pl-12 md:pl-16 pr-16 pb-8 text-base md:text-lg text-foreground/65 leading-relaxed max-w-3xl">
          {a}
        </div>
      </div>
    </div>
  )
}

export function FaqAccordion() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const els = headerRef.current?.querySelectorAll('[data-reveal]') ?? []
      const rows = sectionRef.current?.querySelectorAll('[data-faq]') ?? []
      if (reduced) {
        gsap.set([...els, ...rows], { opacity: 1, y: 0 })
        return
      }
      gsap.set(els, { opacity: 0, y: 30 })
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      })
      gsap.set(rows, { opacity: 0, y: 20 })
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 md:py-36 bg-background">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10">
        <div ref={headerRef} className="max-w-3xl mb-12 md:mb-16">
          <div data-reveal className="flex items-center gap-3 mb-5">
            <span className="h-px w-12 bg-[#b61d23]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#b61d23] font-semibold">
              FAQ
            </span>
          </div>
          <h2
            data-reveal
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.05]"
          >
            Frequently asked,<br />
            <span className="text-foreground/40">honestly answered.</span>
          </h2>
        </div>

        <div>
          {FAQS.map((f, i) => (
            <FaqRow
              key={i}
              q={f.q}
              a={f.a}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
