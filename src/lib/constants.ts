import { SERVICES } from "@/content/services"

export const heroContent = {
  headline: "LET'S TURN YOUR BUSINESS INTO A BRAND !",
  subline: "",
  quickSummary:
    "Edimax Creations is a lifestyle-driven digital marketing agency that help businesses grow with social media management, performance campaigns, content creation, brand design, and Google My Business optimization. Our goal is simple: turning your ideas into impactful digital experiences.",
  primaryCTA: "Get Started Today",
  secondaryCTA: "Learn More",
}

export const aboutContent = {
  title: "Who We Are",
  description:
    "At Edimax Creations, we believe in the power of authentic storytelling and strategic creativity. We're not just another digital marketing agency, we're your partners in building a lifestyle-driven brand that resonates with your audience.",

  beliefs: [
    {
      title: "Creativity with purpose",
      description:
        "Every piece of content we create serves a strategic purpose in building your brand narrative.",
    },
    {
      title: "Authentic connections",
      description:
        "We focus on building genuine relationships between your brand and your audience.",
    },
    {
      title: "Long-term brand building",
      description:
        "Our strategies are designed for sustainable growth and lasting brand impact.",
    },
  ],

  vision:
    "To be the leading lifestyle-driven digital marketing agency that transforms businesses into iconic brands through creative excellence and strategic innovation.",
}

export const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
]

export const contactInfo = {
  address: "Navi Mumbai, Maharashtra",
  phone: "+91 83690 92499 / +91 75062 26350",
  email: "edimaxcreations@gmail.com",
}

export const footerLinks = {
  services: SERVICES.map((service) => ({
    name: service.title,
    href: `/services/${service.slug}`,
  })),
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}
