'use client'

import { useStaggerReveal } from '@/hooks/useReveal'
import { Card, CardContent } from '@/components/ui/card'
import { 
  User, 
  Palette, 
  Play, 
  Camera, 
  BarChart3 
} from 'lucide-react'

const timelineSteps = [
  {
    icon: User,
    title: "Account Optimisation",
    description: "We analyze your current digital presence and optimize your accounts for maximum impact."
  },
  {
    icon: Palette,
    title: "Brand Designing",
    description: "Creating a cohesive visual identity that resonates with your target audience."
  },
  {
    icon: Play,
    title: "Implementation",
    description: "Rolling out strategies across all platforms with precision and consistency."
  },
  {
    icon: Camera,
    title: "Production",
    description: "Creating high-quality content that tells your brand story effectively."
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Tracking performance and optimizing campaigns for continuous improvement."
  }
]

export function HowWeWork() {
  const containerRef = useStaggerReveal({
    delay: 0.2,
    duration: 0.8,
    stagger: 0.15
  })

  return (
      <section className="py-8 md:py-12 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How We Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our proven 5-step process ensures your brand gets the attention it deserves, 
            from strategy to execution and beyond.
          </p>
        </div>

        {/* Timeline */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-4"
        >
          {timelineSteps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <Card 
                key={index}
                className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-background group overflow-hidden"
              >
                {/* Connection line for desktop */}
                {index < timelineSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-accent-start to-accent-end z-0" />
                )}
                
                <CardContent className="p-6 text-center relative z-10">
                  {/* Step Number */}
                  <div className="w-8 h-8 bg-[#b61d23] rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-4">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-[#b61d23]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-[#b61d23]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-[#b61d23] transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-[#b61d23]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            )
          })}
        </div>

      </div>
    </section>
  )
}
