'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'
import { navigation } from '@/lib/constants'
import Image from 'next/image'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const nav = navRef.current
    if (!nav) return

    const update = () => {
      const y = window.scrollY
      setScrolled(y > 20)

      // Hide on scroll down past 100px, show on scroll up
      if (Math.abs(y - lastY) < 4) {
        ticking = false
        return
      }
      const goingDown = y > lastY && y > 100
      gsap.to(nav, {
        y: goingDown ? -120 : 0,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: true,
      })

      lastY = y
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500',
        scrolled
          ? 'bg-charcoal/85 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
          : 'bg-charcoal/40 backdrop-blur-md border-b border-white/5'
      )}
      style={{ willChange: 'transform' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center group">
            <Image
              src="/brand/edimax-white.png"
              alt="Edimax Creations Logo"
              width={120}
              height={40}
              className="h-8 sm:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group relative px-4 py-2 text-sm font-medium transition-colors',
                    active ? 'text-white' : 'text-white/70 hover:text-white'
                  )}
                >
                  <span className="relative">
                    {item.name}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 h-px bg-[#b61d23] transition-all duration-500',
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      )}
                    />
                  </span>
                </Link>
              )
            })}
            <Link
              href="/contact"
              className="ml-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#b61d23] hover:bg-[#9a171c] text-white text-sm font-semibold transition-colors"
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-charcoal/95 backdrop-blur-md border border-white/10 rounded-2xl mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block px-4 py-3 text-base font-medium rounded-xl transition-colors',
                    pathname === item.href
                      ? 'text-[#b61d23] bg-[#b61d23]/10'
                      : 'text-white hover:bg-white/10'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block mx-2 mt-2 px-4 py-3 text-center bg-[#b61d23] text-white rounded-xl font-semibold"
              >
                Let's Talk
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
