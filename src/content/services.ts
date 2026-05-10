export type Service = {
  slug: string;
  title: string;
  /** Short overview shown in list / home accordions */
  overview: string;
  challenges: string[];
  solution: string;
};

export const SERVICES: Service[] = [
  {
    slug: "social-media-management",
    title: "Social Media Management",
    overview:
      "Build an active, engaging, and premium online presence with tailored strategies, creative content, and community building.",
    challenges: [
      "Inconsistent posting and engagement",
      "Difficulty understanding platform algorithms",
      "Lack of clear brand voice and audience connection",
    ],
    solution:
      "At Edimax Creations, we craft a content calendar driven by strategy and trends. Our team studies your audience behavior, uses analytics-backed insights, and ensures every post aligns with your brand identity — resulting in consistent engagement and steady growth.",
  },
  {
    slug: "brand-strategy-design",
    title: "Brand Strategy & Design",
    overview:
      "From logos to campaigns, we design a digital identity that reflects your brand.",
    challenges: [
      "Undefined brand identity and poor positioning",
      "Inconsistent visual aesthetics across platforms",
      "Difficulty standing out in a competitive market",
    ],
    solution:
      "We build a lifestyle-driven brand narrative — not just logos or taglines. Our strategy connects your brand to the emotions and aspirations of your target audience, helping you stay memorable and distinctive.",
  },
  {
    slug: "gmb-management",
    title: "Google My Business (GMB) Management",
    overview:
      "Make your business visible where it matters most on Google. We optimize and manage your GMB profile with regular updates, posts, reviews, and local visibility strategies that bring customers to your doorstep.",
    challenges: [
      "Poor visibility in local search results",
      "Incomplete or outdated profiles",
      "Low review count and engagement",
    ],
    solution:
      "We optimize your GMB for maximum local visibility, manage customer reviews professionally, and ensure your listing stays active with updates, offers, and posts that attract real leads.",
  },
  {
    slug: "production",
    title: "Production",
    overview:
      "High-quality photoshoots and video production that give your brand the premium edge it deserves. From product shoots to promotional videos, we create content that speaks louder than words.",
    challenges: [
      "Poor visual quality and lack of storytelling in shoots",
      "No alignment between content and marketing goals",
    ],
    solution:
      "With in-house cinematography expertise, we shoot with intention. Every project is directed to reflect your brand essence — whether it's a product ad, lifestyle shoot, or corporate film — ensuring cinematic storytelling meets marketing strategy.",
  },
  {
    slug: "online-reputation-management",
    title: "Online Reputation Management (ORM)",
    overview:
      "Your brand's reputation is its strongest currency. We monitor, manage, and enhance your online presence by handling reviews, customer feedback, and public perception keeping your brand positive and trustworthy.",
    challenges: [
      "Negative feedback damaging brand credibility",
      "Unmonitored brand mentions and misinformation",
      "Inconsistent response tone across platforms",
    ],
    solution:
      "We track and manage your digital footprint with precision — responding to reviews, managing crises, and building a strong positive sentiment online. Our focus is to transform customer opinions into trust-building opportunities.",
  },
  {
    slug: "personal-branding",
    title: "Personal Branding",
    overview:
      "Personal branding is about becoming more than just a face on the internet. We help entrepreneurs, professionals and creators build a strong digital presence through strategic content, visual storytelling and positioning that establishes credibility, authority, and long-term audience trust.",
    challenges: [
      "Difficulty articulating a clear, recognizable personal identity",
      "Struggling to stand out in a crowded niche",
      "Translating real expertise into engaging, on-brand content",
    ],
    solution:
      "We help founders, creators, and experts build a magnetic personal brand — defining a clear voice, signature visuals, and a content rhythm that turns expertise into authority and authority into opportunity.",
  },
];
