'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Share2, PenTool, Target, MapPin, Camera, MessageSquare, Users, TrendingUp, Award, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  href: string
  index: number
  className?: string
}

const iconMap = {
  Share2,
  PenTool,
  Target,
  MapPin,
  Camera,
  MessageSquare,
  Users,
  TrendingUp,
  Award,
  Heart
}

export function ServiceCard({ 
  title, 
  description, 
  icon, 
  href, 
  index,
  className 
}: ServiceCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap]
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        // Simple fade in for reduced motion
        gsap.fromTo(cardRef.current, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        )
        return
      }

      // Stagger animation for service cards
      gsap.fromTo(cardRef.current, 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.9,
          rotationY: 15
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Hover animation
      const card = cardRef.current
      if (card) {
        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          })
        }

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          })
        }

        card.addEventListener('mouseenter', handleMouseEnter)
        card.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter)
          card.removeEventListener('mouseleave', handleMouseLeave)
        }
      }

    }, cardRef)

    return () => ctx.revert()
  }, [index])

  return (
    <Card 
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-off-white to-muted",
        className
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-start/5 to-accent-end/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="relative z-10 pb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-accent-start to-accent-end rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          {IconComponent && <IconComponent className="w-6 h-6 text-off-white" />}
        </div>
        <CardTitle className="text-xl font-semibold text-charcoal group-hover:text-accent-start transition-colors duration-300">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>
        
        <Button 
          asChild 
          variant="ghost" 
          className="group/btn p-0 h-auto font-semibold text-accent-start hover:text-accent-end transition-colors duration-300"
        >
          <Link href={href} className="flex items-center gap-2">
            Learn more
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
