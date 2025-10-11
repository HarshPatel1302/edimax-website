import { notFound } from 'next/navigation'
import { SERVICES } from '@/content/services'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react'

interface ServicePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps) {
  const service = SERVICES.find((s) => s.slug === params.slug)

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    }
  }

  return {
    title: service.title,
    description: `Professional ${service.title} services by Edimax Creations. ${service.solution.substring(0, 150)}...`,
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = SERVICES.find((s) => s.slug === params.slug)

  if (!service) {
    notFound()
  }

  const faqs = [
    {
      question: `How long does ${service.title} take to show results?`,
      answer: "Results vary depending on your specific goals and current digital presence. Typically, you'll see initial improvements within 2-4 weeks, with significant results within 2-3 months of consistent implementation."
    },
    {
      question: `Is ${service.title} suitable for small businesses?`,
      answer: "Absolutely! Our services are scalable and tailored to meet the unique needs and budgets of businesses of all sizes, from startups to large enterprises."
    },
    {
      question: `Can I combine ${service.title} with other services?`,
      answer: "Yes, we encourage a holistic approach. Many clients combine services like Social Media Management with Content Creation or Brand Strategy & Design for maximum impact and synergy."
    },
    {
      question: `What makes Edimax Creations different for ${service.title}?`,
      answer: "Our lifestyle-driven approach means we don't just market products; we build brands that resonate with your audience's aspirations and values, creating deeper, more authentic connections."
    }
  ]

  const kpis = [
    "25% average increase in engagement rate",
    "40% growth in follower count", 
    "60% improvement in reach and impressions",
    "35% boost in brand awareness",
    "50% increase in qualified leads"
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Professional {service.title.toLowerCase()} services that drive real results for your business.
          </p>
          <Button asChild size="lg" className="bg-[#b61d23] hover:bg-[#9a171c] text-white">
            <Link href="/contact">
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Common Challenges
            </h2>
            <p className="text-lg text-muted-foreground">
              These are the typical problems businesses face that our {service.title} service addresses.
            </p>
          </div>

          <Card className="border-0 shadow-lg p-8 bg-gradient-to-br from-background to-muted/50">
            <CardContent className="p-0">
              <ul className="space-y-4">
                {service.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-accent-start mr-4 mt-0.5 flex-shrink-0" />
                    <span className="text-lg text-foreground leading-relaxed">{challenge}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How Edimax Creations Solves It
            </h2>
            <p className="text-lg text-muted-foreground">
              Our proven approach delivers measurable results for your business.
            </p>
          </div>

          <Card className="border-0 shadow-lg p-8 bg-gradient-to-br from-background to-muted/50">
            <CardContent className="p-0">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-white mr-4 mt-0.5 flex-shrink-0" />
                <p className="text-lg text-foreground leading-relaxed">
                  {service.solution}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* KPIs Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Expected Results
            </h2>
            <p className="text-lg text-muted-foreground">
              Here's what you can expect when working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kpis.map((kpi, index) => (
              <Card key={index} className="border-0 shadow-lg p-6 bg-gradient-to-br from-background to-muted/50">
                <CardContent className="p-0">
                  <div className="flex items-start">
                    <ArrowRight className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <span className="text-foreground font-medium">{kpi}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our {service.title} service.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-0 mb-4">
                <Card className="border-0 shadow-lg">
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:text-accent-start hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Related Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our other services that work perfectly with {service.title}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES
              .filter((s) => s.slug !== service.slug)
              .slice(0, 2)
              .map((relatedService) => (
                <Card key={relatedService.slug} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/50 group">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl text-foreground mb-3 group-hover:text-accent-start transition-colors duration-300">
                      {relatedService.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {relatedService.challenges[0]}
                    </p>
                    <Button asChild variant="link" className="text-accent-start hover:text-accent-end p-0 h-auto">
                      <Link href={`/services/${relatedService.slug}`}>
                        Learn More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-charcoal to-charcoal/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Let's discuss how we can bring your vision to life with our {service.title} service.
          </p>
          <Button asChild size="lg" className="bg-[#b61d23] hover:bg-[#9a171c] text-white">
            <Link href="/contact">
              Contact Us Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}