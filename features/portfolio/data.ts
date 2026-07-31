import type {
  ApproachStep,
  ContactDetails,
  Faq,
  Package,
  Project,
  ProjectDetail,
  ProjectMetric,
  Service
} from "./types";
import agroAiImage from "@/public/portfolio-cards/technical/agroai.webp";
import kickSpotImage from "@/public/portfolio-cards/technical/kickspot.webp";
import aquaGalleryImage from "@/public/portfolio-cards/light/aqua-gallery-v2.webp";
import nestRealtyImage from "@/public/portfolio-cards/light/nest-realty-mixed.webp";
import pawPalaceImage from "@/public/portfolio-cards/light/paw-palace-mixed.webp";
import pulseFitImage from "@/public/portfolio-cards/light/pulse-fit-mixed.webp";
import spiceTableImage from "@/public/portfolio-cards/light/spice-table-mixed.webp";

export const CONTACT: ContactDetails = {
  email: "bilalasif1024@gmail.com",
  whatsapp:
    "https://wa.me/923207998854?text=Hi%20Bilal%2C%20I%20want%20to%20grow%20my%20business%20online.",
  instagram: "https://www.instagram.com/bilal.asif__/",
  linkedin: "https://www.linkedin.com/in/bilal-asif-034272320/",
  github: "https://github.com/Bilal-Asif-1"
};

export const SITE_NAV_ITEMS = [
  { label: "Packages", href: "/packages" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
] as const;

export const SERVICES: readonly Service[] = [
  {
    title: "Full-Stack Web Development",
    description:
      "Fast, responsive web applications built with React, Next.js, Node.js and TypeScript.",
    details: [
      "I build conversion-focused websites and full-stack applications with clear user journeys, responsive interfaces and reliable front-end and back-end foundations.",
      "React, Next.js, Node.js and TypeScript support maintainable interfaces, API integrations and the practical features a growing business needs.",
      "Responsive layouts, strong performance and a clean SEO foundation make it easier to reach and convert customers across every device."
    ],
    relatedCaseStudies: [
      { title: "PetConnect", slug: "pet-connect" },
      { title: "KickSpot", slug: "kickspot" }
    ]
  },
  {
    title: "AI-Powered Web Applications",
    description:
      "Full-stack web applications that connect AI/ML capabilities, APIs and real business workflows.",
    details: [
      "I design practical web applications that connect intelligent features, third-party APIs and responsive interfaces around a clear business use case.",
      "Experience with MERN applications, REST APIs, real-time data and role-based workflows supports products that need more than a marketing website.",
      "The right solution starts with the workflow: AI should solve a useful problem, not become an unnecessary layer of complexity."
    ],
    relatedCaseStudies: [{ title: "AgroAI", slug: "agro-ai" }]
  },
  {
    title: "SEO Services",
    description:
      "Improve search rankings, increase visibility and generate qualified leads.",
    details: [
      "SEO connects your pages with the searches potential customers already make, bringing in traffic with stronger intent.",
      "Technical improvements, useful content and local optimization can compound into a dependable source of leads over time.",
      "Results are rarely instant and sustainable growth needs consistent work rather than shortcuts that risk future rankings."
    ],
    relatedCaseStudies: [
      { title: "Spice Table", slug: "spice-table" },
      { title: "Nest Realty", slug: "nest-realty" }
    ]
  },
  {
    title: "Digital Marketing",
    description:
      "Data-driven campaigns across Google, Facebook, Instagram, LinkedIn and YouTube.",
    details: [
      "A coordinated strategy keeps your message consistent while reaching customers across the channels they actually use.",
      "Content, audience data and campaign insights work together to improve awareness, enquiries and repeat business.",
      "Spreading effort across too many platforms can dilute results, so the strongest channels should be prioritized first."
    ]
  },
  {
    title: "Paid Advertising",
    description:
      "Google Ads and Meta Ads management focused relentlessly on return on investment.",
    details: [
      "Paid campaigns can place a relevant offer in front of high-intent customers quickly and generate measurable feedback from day one.",
      "Clear targeting, persuasive creative and conversion tracking help direct budget toward the audiences and messages that perform.",
      "Traffic slows when spending stops, so ads work best alongside a strong website, organic visibility and careful budget control."
    ]
  },
  {
    title: "Email Marketing and Automation",
    description:
      "Email automation, customer journeys, lead nurturing and CRM integration.",
    details: [
      "Automated email journeys follow up with leads, welcome customers and encourage repeat purchases without adding repetitive manual work.",
      "Because the audience is owned by your business, communication is less dependent on changing social algorithms.",
      "Good results still depend on permission, clean customer data and messages useful enough to avoid fatigue or unsubscribes."
    ]
  },
  {
    title: "Branding and Strategy",
    description:
      "Brand identity, positioning, digital strategy and practical growth planning.",
    details: [
      "Clear positioning helps customers understand who you serve, what makes the business different and why they should trust it.",
      "A consistent visual and verbal system makes websites, campaigns and sales material feel connected and more memorable.",
      "The strategy creates value only when the whole business applies it consistently instead of treating branding as a one-time logo exercise."
    ]
  },
  {
    title: "UI/UX Design",
    description:
      "Clear, intuitive interfaces that make websites and digital products easier to use and convert.",
    details: [
      "Thoughtful interface design reduces confusion and helps people complete important actions with fewer steps and less effort.",
      "Clear hierarchy, accessible interactions and responsive behavior improve trust, usability and conversion across devices.",
      "Visual polish alone is not enough; the strongest experience comes from understanding real users and validating important decisions."
    ]
  }
];

export const PROJECT_METRICS: readonly ProjectMetric[] = [
  { value: "10+", label: "Projects delivered" },
  { value: "95+", label: "Avg. Lighthouse score" },
  { value: "4.9/5", label: "Client satisfaction" },
  { value: "3+", label: "Years of hands-on experience" }
];

export const FEATURED_PROJECTS: readonly Project[] = [
  {
    slug: "pulse-fit",
    title: "Pulse Fit",
    eyebrow: "Fitness Landing",
    metric: "New members",
    description:
      "A conversion-focused fitness website designed to turn program discovery into membership enquiries across mobile and desktop.",
    image: pulseFitImage,
    imageUrl: "/portfolio-cards/light/pulse-fit-mixed.webp"
  },
  {
    slug: "pet-connect",
    title: "PetConnect",
    eyebrow: "Pet Adoption and Care Platform",
    metric: "Care journeys",
    description:
      "A responsive full-stack platform for pet listings, adoption requests, image uploads and secure user accounts.",
    image: pawPalaceImage,
    imageUrl: "/portfolio-cards/light/paw-palace-mixed.webp"
  },
  {
    slug: "agro-ai",
    title: "AgroAI",
    eyebrow: "AI-Powered Smart Farming",
    metric: "AI workflows",
    description:
      "A full-stack MERN application for AI-driven pest detection, crop recommendations and data-informed farm decisions.",
    image: agroAiImage,
    imageUrl: "/portfolio-cards/technical/agroai.webp"
  },
  {
    slug: "aqua-gallery",
    title: "Aqua Gallery",
    eyebrow: "Aquarium Website",
    metric: "Visitor journeys",
    description:
      "An accessible aquarium website that helps visitors discover exhibits, plan their visit and find ticket information with ease.",
    image: aquaGalleryImage,
    imageUrl: "/portfolio-cards/light/aqua-gallery-v2.webp"
  },
  {
    slug: "spice-table",
    title: "Spice Table",
    eyebrow: "Restaurant Site",
    metric: "Table orders",
    description:
      "A restaurant website designed for menu discovery, online ordering, table bookings and stronger local search visibility.",
    image: spiceTableImage,
    imageUrl: "/portfolio-cards/light/spice-table-mixed.webp"
  },
  {
    slug: "nest-realty",
    title: "Nest Realty",
    eyebrow: "Real Estate Leads",
    metric: "Buyer leads",
    description:
      "A real-estate lead-generation website that helps buyers explore listings, understand locations and contact the right agent.",
    image: nestRealtyImage,
    imageUrl: "/portfolio-cards/light/nest-realty-mixed.webp"
  },
  {
    slug: "kickspot",
    title: "KickSpot",
    eyebrow: "Multi-Vendor Sports Marketplace",
    metric: "Real-time commerce",
    description:
      "A TypeScript-based MERN marketplace with secure multi-role workflows, real-time notifications and optimized data access.",
    image: kickSpotImage,
    imageUrl: "/portfolio-cards/technical/kickspot.webp"
  }
];

export const PROJECT_DETAILS: Readonly<Record<string, ProjectDetail>> = {
  AgroAI: {
    problem:
      "Farmers need timely, practical guidance when pests, crop conditions and changing weather affect day-to-day decisions.",
    requirements:
      "AI-powered pest detection, crop recommendations, real-time weather data, inventory support and secure workflows for different user roles.",
    solution:
      "A full-stack MERN application that combines AI/ML integration, REST APIs, responsive React interfaces and role-based access for farmers, agronomists and administrators.",
    result:
      "A single workflow for turning field observations and real-time data into more informed farm-management decisions.",
    stack:
      "MongoDB, Express.js, React, Node.js, REST APIs, AI/ML integration and Weather API"
  },
  KickSpot: {
    problem:
      "A multi-vendor sports marketplace needs separate buyer, seller and administrator workflows without compromising speed, access control or real-time visibility.",
    requirements:
      "Secure authentication, role-based access control, REST APIs, real-time order and inventory notifications, and efficient database access.",
    solution:
      "A TypeScript-based MERN application with JWT authentication, Redux Toolkit state management, Socket.IO notifications and MySQL indexing and query optimization.",
    result:
      "A production-grade marketplace workflow with real-time updates and an approximately 35% reduction in average API response time.",
    stack:
      "MongoDB, Express.js, React, Node.js, TypeScript, Redux Toolkit, Socket.IO, MySQL and JWT"
  },
  PetConnect: {
    problem:
      "Pet adoption needs a clear, trustworthy path from discovering a pet to securely submitting an adoption request.",
    requirements:
      "Responsive pet listings, image uploads, adoption-request workflows and secure user accounts.",
    solution:
      "A full-stack web application with a responsive React interface, Node.js and Express APIs, MongoDB data storage and JWT authentication.",
    result:
      "A focused platform that brings discovery, requests and care-related interactions into one responsive experience.",
    stack:
      "React, Node.js, Express.js, MongoDB, Tailwind CSS and JWT authentication"
  },
  "Aqua Gallery": {
    problem:
      "Aquarium visitors needed an easier way to explore exhibits, understand the experience and plan a visit before arriving.",
    requirements:
      "A mobile-friendly aquarium website with exhibit highlights, ticket prompts, practical visit information and clear navigation.",
    solution:
      "A bright, accessible content experience that prioritizes attractions, visit planning and conversion-focused ticket journeys across devices.",
    result:
      "A clearer visitor journey, faster access to essential information and a smoother path to ticket booking."
  },
  "Spice Table": {
    problem:
      "The restaurant needed its food quality and atmosphere to translate online while keeping ordering and reservations friction-free.",
    requirements:
      "A visually led restaurant website with menu discovery, location details, online ordering, table booking and local SEO-ready pages.",
    solution:
      "A vibrant, mobile-first restaurant experience that uses dish-led storytelling and direct paths to orders and reservations.",
    result:
      "More engaging menu discovery, fewer steps to order and a stronger foundation for restaurant local search visibility."
  },
  "Pulse Fit": {
    problem:
      "Potential members needed a clearer reason to join and a simpler next step from fitness-program interest to enquiry.",
    requirements:
      "A high-converting fitness landing page with membership value, class information, trainer trust signals and a simple mobile enquiry flow.",
    solution:
      "A responsive fitness website experience that connects goals with programs, proof points and high-intent membership calls to action.",
    result:
      "A more persuasive membership journey with clearer choices and stronger potential for qualified fitness enquiries."
  },
  "Nest Realty": {
    problem:
      "Property buyers needed a polished way to explore listings, understand location context and contact the right agent without friction.",
    requirements:
      "A responsive real-estate website with searchable properties, clear location context, agent credibility and fast mobile lead capture.",
    solution:
      "A clean property-search experience with focused listing content, lifestyle imagery and strategically placed enquiry actions.",
    result:
      "A stronger buyer journey, clearer agent trust signals and an easier route from browsing property listings to enquiry."
  }
};

export function getProjectBySlug(slug: string) {
  return FEATURED_PROJECTS.find((project) => project.slug === slug);
}

export const PACKAGES: readonly Package[] = [
  {
    title: "Starter Website",
    bestFor: "For a new business that needs to look professional online.",
    includes: [
      "Responsive website",
      "Contact buttons",
      "Basic on-page SEO",
      "Vercel deploy support"
    ]
  },
  {
    title: "Business Growth",
    bestFor: "For local businesses that want more calls, bookings and leads.",
    includes: [
      "Website or landing page",
      "Keyword research",
      "Local SEO structure",
      "Google and Meta ad plan"
    ]
  },
  {
    title: "Ecommerce Launch",
    bestFor: "For shops, food brands and product businesses ready to sell online.",
    includes: [
      "Storefront design",
      "Product page copy",
      "Conversion sections",
      "SEO-ready collections"
    ]
  }
];

export const APPROACH_STEPS: readonly ApproachStep[] = [
  {
    title: "Strategy first",
    description:
      "I start with your business goals, not a template. Every decision traces back to a number that matters."
  },
  {
    title: "Designed to convert",
    description:
      "Beautiful is table stakes. I engineer experiences that turn attention into action and visitors into customers."
  },
  {
    title: "Built to last",
    description:
      "Fast, accessible, maintainable code on modern frameworks, so your investment keeps performing for years."
  },
  {
    title: "Optimised forever",
    description:
      "Launch is the starting line. I test, measure and refine so your results compound month over month."
  }
];

export const FAQS: readonly Faq[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most business websites take around 2–6 weeks, while ecommerce stores and larger digital products may take longer. You will receive a clear timeline once the scope, content and required features are confirmed."
  },
  {
    question: "Can you help my business rank on Google?",
    answer:
      "I can build the SEO foundation with keyword research, page structure, headings, metadata, local content and technical improvements that make your site easier for Google and customers to understand."
  },
  {
    question: "Can I mix services across plans?",
    answer:
      "Yes. Packages are flexible, so I can combine the website, SEO, advertising, ecommerce or automation work that best matches your goals and current stage."
  },
  {
    question: "Who owns the work you produce?",
    answer:
      "You own the approved final website, design assets and project files after the agreed payment is complete. Third-party tools, fonts and licensed assets remain subject to their own terms."
  }
];

const SITE_URL = "https://www.bilalasiftech.com";
const PERSON_ID = `${SITE_URL}/#bilal-asif`;
const PORTRAIT_URL = `${SITE_URL}/bilal-asif-portrait-2026-v5.webp`;

export const PROFESSIONAL_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Bilal Asif",
      description:
        "Portfolio of Bilal Asif, a freelance full-stack developer and SEO specialist for growing businesses.",
      publisher: { "@id": PERSON_ID },
      inLanguage: "en"
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile-page`,
      url: SITE_URL,
      name: "Bilal Asif, Full-Stack Developer and Digital Growth Specialist",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      primaryImageOfPage: { "@id": `${SITE_URL}/#portrait` },
      mainEntity: { "@id": PERSON_ID },
      inLanguage: "en"
    },
    {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#portrait`,
      url: PORTRAIT_URL,
      contentUrl: PORTRAIT_URL,
      caption:
        "Bilal Asif, freelance full-stack developer and SEO specialist",
      creditText: "Bilal Asif",
      creator: { "@id": PERSON_ID }
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Bilal Asif",
      url: SITE_URL,
      image: { "@id": `${SITE_URL}/#portrait` },
      jobTitle: "Freelance Full-Stack Developer and Digital Growth Specialist",
      description:
        "Bilal Asif helps businesses plan, build, launch and grow through full-stack development, SEO, digital marketing, paid advertising and ongoing optimization.",
      sameAs: [CONTACT.github, CONTACT.linkedin, CONTACT.instagram],
      knowsAbout: [
        "Full-stack web development",
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "MERN stack",
        "REST API development",
        "Web performance optimization",
        "Search engine optimization",
        "Ecommerce development",
        "Google Ads",
        "Meta Ads",
        "Digital marketing",
        "UI and UX design"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#professional-service`,
      name: "Bilal Asif Digital Growth Services",
      url: SITE_URL,
      image: { "@id": `${SITE_URL}/#portrait` },
      email: CONTACT.email,
      founder: { "@id": PERSON_ID },
      areaServed: ["United States", "Europe"],
      sameAs: [CONTACT.github, CONTACT.linkedin, CONTACT.instagram],
      serviceType: [
        "Full-stack web development",
        "React and Next.js development",
        "Node.js web application development",
        "AI-powered web applications",
        "Technical SEO and web performance optimization",
        "SEO services for small businesses",
        "Google Ads landing pages",
        "Ecommerce website development",
        "Digital marketing for restaurants"
      ]
    }
  ]
} as const;

export const FAQ_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/faq#faq`,
  url: `${SITE_URL}/faq`,
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
} as const;

export const SERVICE_CATALOG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/services#service-catalog`,
  url: `${SITE_URL}/services`,
  name: "Bilal Asif Digital Services",
  description:
    "Full-stack development, SEO, digital marketing, paid advertising, branding and ongoing digital support services.",
  itemListElement: SERVICES.map((service, position) => ({
    "@type": "ListItem",
    position: position + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      provider: { "@id": `${SITE_URL}/#professional-service` },
      areaServed: ["United States", "Europe"]
    }
  }))
} as const;

export const PROJECT_PORTFOLIO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/projects#portfolio`,
  name: "Bilal Asif Full-Stack Development Portfolio",
  description:
    "Selected full-stack, AI-powered and ecommerce web application projects by Bilal Asif.",
  itemListElement: FEATURED_PROJECTS.map((project, position) => ({
    "@type": "ListItem",
    position: position + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      url: `${SITE_URL}/projects/${project.slug}`,
      description: project.description,
      image: `${SITE_URL}${project.imageUrl}`,
      keywords: PROJECT_DETAILS[project.title]?.stack
    }
  }))
} as const;
