/**
 * Vijfhart Website Configuration
 */

export const siteConfig = {
  name: 'Vijfhart',
  tagline: 'Dé specialist in IT trainingen',
  description: 'Vijfhart is dé specialist in IT trainingen. Ontdek ons uitgebreide aanbod aan cursussen voor developers, IT professionals en teams.',
  
  // URLs
  url: 'https://vijfhart.nl',
  
  // Contact
  contact: {
    email: 'info@vijfhart.nl',
    phone: '+31 (0)30 123 4567',
    address: {
      street: 'Kanaalweg 1',
      city: 'Utrecht',
      postalCode: '3526 KL',
      country: 'Nederland',
    },
  },
  
  // Social
  social: {
    linkedin: 'https://linkedin.com/company/vijfhart',
    twitter: 'https://twitter.com/vijfhart',
    youtube: 'https://youtube.com/@vijfhart',
  },
  
  // SEO
  seo: {
    titleTemplate: '%s | Vijfhart IT Opleidingen',
    defaultTitle: 'Vijfhart - IT Trainingen & Cursussen',
    defaultDescription: 'Vijfhart is dé specialist in IT trainingen. Ontdek ons uitgebreide aanbod aan cursussen voor developers, IT professionals en teams.',
    ogImage: '/og-image.jpg',
    twitterHandle: '@vijfhart',
  },
} as const;

export type SiteConfig = typeof siteConfig;
