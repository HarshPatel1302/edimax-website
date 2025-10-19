import { Hero } from '@/components/hero'
import { HowWeWork } from '@/components/how-we-work'
import { SERVICES } from '@/content/services'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Value Proposition Section */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-background via-background to-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Turning Your Ideas Into Impactful Digital Experiences
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We help businesses grow with social media management, performance campaigns, content creation, brand design, and Google My Business optimization. Our goal is simple—turning your ideas into impactful digital experiences.
          </p>
        </div>
      </section>

      {/* Services Preview Section */}
      <section id="services" className="py-8 md:py-12 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              We offer comprehensive digital marketing solutions to help your business grow and thrive in the digital landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 6).map((service) => (
              <Card 
                key={service.slug}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/50 group overflow-hidden"
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold text-2xl text-foreground mb-6 group-hover:text-accent-start transition-colors duration-300">
                    {service.title}
                  </h3>
                  <Button asChild variant="link" className="text-accent-start hover:text-accent-end p-0 h-auto font-medium">
                    <Link href={`/services/${service.slug}`}>
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-[#b61d23] hover:bg-[#9a171c] text-white">
              <Link href="/services">
                View All Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How We Work Timeline */}
      <HowWeWork />

      {/* Why Choose Us Section */}
      <section className="py-8 md:py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why Choose Edimax Creations
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              We combine creativity, strategy, and technology to deliver exceptional results for your brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "100 + Reels Crafted",
                description: "Creating engaging visual stories that boost visibility and connect with audiences."
              },
              {
                title: "500+ Leads Generated", 
                description: "Driving measurable business growth through strategic campaigns."
              },
              {
                title: "100% Trial- to- Annual Conversion",
                description: "Turning short-term trust into long-term partnerships, every time."
              },
              {
                title: "Brand- Themed Content",
                description: "Building consistent, premium Identities that stand out in the market."
              }
            ].map((item, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/50 group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-accent-start to-accent-end rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-8 h-8 bg-primary-foreground rounded-lg" />
                  </div>
                  <h3 className="font-semibold text-xl text-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 bg-gradient-to-r from-charcoal to-charcoal/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-foreground/90 mb-8 leading-relaxed">
            Let's work together to build a lifestyle-driven brand that resonates with your audience and drives real results.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-[#b61d23] hover:bg-[#9a171c] text-white">
              <Link href="/contact">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}