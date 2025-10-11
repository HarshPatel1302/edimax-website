import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Users, TrendingUp, Award, Heart } from 'lucide-react'

export const metadata = {
  title: 'Our Portfolio',
  description: 'Explore our successful digital marketing campaigns and brand transformations. See how we turn businesses into lifestyle-driven brands.',
}

const portfolioProjects = [
  {
    id: 1,
    title: "Edimax Creations Website",
    category: "Brand Strategy & Web Development",
    description: "Complete digital transformation of our own brand identity, showcasing our lifestyle-driven approach to digital marketing.",
    image: "/brand/edimax-white.png",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    results: [
      "Modern, responsive design",
      "Seamless user experience",
      "SEO optimized structure",
      "Mobile-first approach"
    ],
    link: "/",
    featured: true
  },
  {
    id: 2,
    title: "Social Media Management Suite",
    category: "Social Media Strategy",
    description: "Comprehensive social media management system for lifestyle brands, featuring content planning, scheduling, and analytics.",
    image: "/clients/connect-roots.png",
    technologies: ["Content Strategy", "Community Management", "Analytics", "Brand Guidelines"],
    results: [
      "25% increase in engagement",
      "40% growth in followers",
      "60% improvement in reach",
      "Consistent brand voice"
    ],
    link: "/services/social-media-management",
    featured: true
  },
  {
    id: 3,
    title: "Brand Identity Design System",
    category: "Brand Strategy & Design",
    description: "Complete brand identity development including logo design, visual guidelines, and brand positioning strategy.",
    image: "/clients/navicom.png",
    technologies: ["Brand Strategy", "Logo Design", "Visual Identity", "Brand Guidelines"],
    results: [
      "90% brand recognition improvement",
      "45% increase in consistency",
      "60% improvement in perception",
      "Clear brand positioning"
    ],
    link: "/services/brand-strategy-design",
    featured: false
  },
  {
    id: 4,
    title: "Content Creation Framework",
    category: "Content Strategy",
    description: "Strategic content creation system that tells compelling brand stories and drives audience engagement.",
    image: "/clients/om-sai-enterprises.png",
    technologies: ["Content Strategy", "Visual Design", "Copywriting", "Video Production"],
    results: [
      "50% increase in engagement",
      "35% improvement in CTR",
      "80% above industry benchmarks",
      "Compelling storytelling"
    ],
    link: "/services/content-creation",
    featured: false
  },
  {
    id: 5,
    title: "Local SEO Optimization",
    category: "Google My Business Management",
    description: "Comprehensive local SEO strategy and Google My Business optimization for maximum local visibility.",
    image: "/clients/trendset.png",
    technologies: ["GMB Optimization", "Local SEO", "Review Management", "Local Citations"],
    results: [
      "70% increase in local visibility",
      "50% improvement in GMB engagement",
      "35% growth in foot traffic",
      "Enhanced local presence"
    ],
    link: "/services/gmb-management",
    featured: false
  },
  {
    id: 6,
    title: "Production Excellence",
    category: "Visual Production",
    description: "Professional photography and video production services that elevate brand presence and drive engagement.",
    image: "/clients/connect-roots.png",
    technologies: ["Photography", "Videography", "Post-Production", "Asset Management"],
    results: [
      "95% client satisfaction",
      "40% increase in performance",
      "60% improvement in perception",
      "Professional quality content"
    ],
    link: "/services/production",
    featured: false
  }
]

const stats = [
  { icon: Users, label: "Happy Clients", value: "50+" },
  { icon: TrendingUp, label: "Projects Completed", value: "100+" },
  { icon: Award, label: "Success Rate", value: "95%" },
  { icon: Heart, label: "Client Retention", value: "90%" }
]

export default function PortfolioPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Discover our successful digital marketing campaigns and brand transformations. 
            See how we turn businesses into lifestyle-driven brands that resonate with their audience.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-accent-start to-accent-end rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our most successful campaigns that showcase our expertise in digital marketing and brand building.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {portfolioProjects.filter(project => project.featured).map((project) => (
              <Card key={project.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/50 group overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-semibold text-foreground group-hover:text-accent-start transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                      <p className="text-sm text-accent-start font-medium mt-1">{project.category}</p>
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={project.link}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-muted text-sm rounded-full text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Key Results:</h4>
                    <ul className="space-y-2">
                      {project.results.map((result, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-accent-start rounded-full mt-2 mr-3 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild variant="link" className="text-accent-start hover:text-accent-end p-0 h-auto font-medium">
                    <Link href={project.link}>
                      View Project <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              All Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A comprehensive view of our work across different industries and service categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project) => (
              <Card key={project.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/50 group overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-accent-start transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <p className="text-sm text-accent-start font-medium">{project.category}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2 text-sm">Key Results:</h4>
                    <ul className="space-y-1">
                      {project.results.slice(0, 2).map((result, index) => (
                        <li key={index} className="flex items-start text-xs text-muted-foreground">
                          <span className="w-1 h-1 bg-accent-start rounded-full mt-1.5 mr-2 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild variant="link" className="text-accent-start hover:text-accent-end p-0 h-auto font-medium text-sm">
                    <Link href={project.link}>
                      Learn More <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-charcoal to-charcoal/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-foreground/90 mb-8 leading-relaxed">
            Let's work together to create a digital marketing strategy that transforms your business into a lifestyle-driven brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#b61d23] hover:bg-[#9a171c] text-white">
              <Link href="/contact">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal">
              <Link href="/services">
                View Our Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
