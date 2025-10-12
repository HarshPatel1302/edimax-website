import { Section } from '@/components/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { aboutContent } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Target, Users, Lightbulb, Heart } from 'lucide-react'

export const metadata = {
  title: 'About Us',
  description: 'Learn about Edimax Creations - a lifestyle-driven digital marketing agency that blends creativity, strategy, and storytelling to build impactful brands.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-muted">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            About Edimax Creations
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {aboutContent.description}
          </p>
        </div>
      </Section>

      {/* What We Believe In */}
      <Section
        subtitle="What We Believe In"
        title="Our Core Values"
        description="These principles guide everything we do and shape how we approach every project."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutContent.beliefs.map((belief, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-muted/50 to-background group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-accent-start to-accent-end rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {index === 0 && <Lightbulb className="w-8 h-8 text-off-white" />}
                  {index === 1 && <Heart className="w-8 h-8 text-off-white" />}
                  {index === 2 && <Target className="w-8 h-8 text-off-white" />}
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {belief.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-center">
                  {belief.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Our Vision */}
      <Section
        subtitle="Our Vision"
        title="Where We're Headed"
        description="Our vision drives us forward and shapes our long-term goals."
        className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-muted"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-muted/50 to-background">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-accent-start to-accent-end rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Users className="w-10 h-10 text-off-white" />
              </div>
              <blockquote className="text-2xl font-medium text-white leading-relaxed italic">
                "{aboutContent.vision}"
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Team Section Placeholder */}
      <Section
        subtitle="Our Team"
        title="Meet the Creators"
        description="The passionate individuals behind Edimax Creations."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              id: 1,
              name: "Mr. Harsh Jagtap",
              role: "Founder",
              image: "/team/team-member-1.JPG",
            },
            {
              id: 2,
              name: "Ms. Jikcy Joji",
              role: "Co-Founder",
              image: "/team/team-member-2.JPG",
            }
          ].map((member) => (
            <Card key={member.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative aspect-square">
              <div className="absolute inset-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-center object-[center_30%]"
                  priority
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-all duration-300" />
              </div>
              <CardContent className="relative z-10 h-full flex flex-col justify-end p-8">
                <div className="text-center text-white">
                  <h3 className="font-semibold text-2xl mb-2 drop-shadow-lg">
                    {member.name}
                  </h3>
                  <p className="text-lg font-medium drop-shadow-lg">
                    {member.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-charcoal to-charcoal/90 text-off-white">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-off-white/90 mb-8 leading-relaxed">
            Let's discuss how we can help transform your business into a lifestyle-driven brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#b61d23] hover:bg-[#9a171c] text-white">
              <Link href="/contact">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-off-white text-off-white hover:bg-off-white hover:text-charcoal">
              <Link href="/services">
                View Our Services
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
