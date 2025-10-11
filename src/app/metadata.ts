import { Metadata } from 'next'

export const siteConfig = {
  name: "Edimax Creations",
  description: "Lifestyle-Driven Digital Marketing Agency. We blend creativity, strategy, and storytelling to build lifestyle-driven brands that turn your business into a brand.",
  url: "https://edimaxcreations.com",
  ogImage: "https://edimaxcreations.com/api/og",
  links: {
    twitter: "https://twitter.com/edimaxcreations",
    github: "https://github.com/edimaxcreations",
  },
}

export const metadata: Metadata = {
  title: {
    default: "Edimax Creations - Digital Marketing Agency",
    template: "%s | Edimax Creations",
  },
  description: siteConfig.description,
  keywords: [
    "digital marketing",
    "social media management",
    "brand strategy",
    "content creation",
    "Google My Business",
    "production",
    "online reputation management",
    "lifestyle brands",
    "Navi Mumbai",
    "Maharashtra"
  ],
  authors: [
    {
      name: "Edimax Creations",
    },
  ],
  creator: "Edimax Creations",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@edimaxcreations",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

