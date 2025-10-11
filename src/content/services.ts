export type Service = {
  slug: string;
  title: string;
  challenges: string[];
  solution: string;
};

export const SERVICES: Service[] = [
  {
    slug: "social-media-management",
    title: "Social Media Management",
    challenges: [
      "Inconsistent posting and engagement",
      "Difficulty understanding platform algorithms",
      "Lack of clear brand voice and audience connection",
    ],
    solution:
      "At Edimax Creations, we craft a content calendar driven by strategy and trends. Our team studies your audience behavior, uses analytics-backed insights, and ensures every post aligns with your brand identity — resulting in consistent engagement and steady growth.",
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    challenges: [
      "Brands struggle to produce fresh, high-quality, and relevant content regularly",
      "Lack of creativity and storytelling that emotionally connects with audiences",
    ],
    solution:
      "We merge cinematography, photography, and design to create content that tells stories, not just sells. Every frame, caption, and color choice is crafted to reflect your brand's personality and engage your audience deeply.",
  },
  {
    slug: "brand-strategy-design",
    title: "Brand Strategy & Design",
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
    title: "Production (Photo & Video Shoots)",
    challenges: [
      "Poor visual quality and lack of storytelling in shoots",
      "No alignment between content and marketing goals",
    ],
    solution:
      "With in-house cinematography expertise, we shoot with intention. Every project is directed to reflect your brand essence — whether it's a product ad, lifestyle shoot, or corporate film — ensuring cinematic storytelling meets marketing strategy.",
  },
  {
    slug: "orm",
    title: "Online Reputation Management (ORM)",
    challenges: [
      "Negative feedback damaging brand credibility",
      "Unmonitored brand mentions and misinformation",
      "Inconsistent response tone across platforms",
    ],
    solution:
      "We track and manage your digital footprint with precision — responding to reviews, managing crises, and building a strong positive sentiment online. Our focus is to transform customer opinions into trust-building opportunities.",
  },
];
