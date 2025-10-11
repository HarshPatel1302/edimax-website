import { SERVICES } from '@/content/services'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Our Services',
  description: 'Comprehensive digital marketing services including social media management, content creation, brand strategy, GMB management, production, and online reputation management.',
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            We offer comprehensive digital marketing solutions to help your business grow and thrive in the digital landscape.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              What We Do Best
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From strategy to execution, our services are tailored to help you succeed in the digital landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <Card 
                key={service.slug}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/50 group overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-accent-start transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Show up to 2 challenges */}
                  <ul className="space-y-2 mb-6">
                    {service.challenges.slice(0, 2).map((challenge, idx) => (
                      <li key={idx} className="flex items-start text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 mr-3 flex-shrink-0" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="link" className="text-accent-start hover:text-accent-end p-0 h-auto font-medium">
                    <Link href={`/services/${service.slug}`}>
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Elevate Your Brand?
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Contact us today to discuss your digital marketing needs and get a custom strategy tailored for your success.
          </p>
          <Button asChild size="lg" className="bg-[#b61d23] hover:bg-[#9a171c] text-white shadow-lg">
            <Link href="/contact">
              Get a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}