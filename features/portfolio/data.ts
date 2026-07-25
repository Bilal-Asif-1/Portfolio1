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

export const CONTACT: ContactDetails = {
  email: "bilalasif1024@gmail.com",
  whatsapp:
    "https://wa.me/923207998854?text=Hi%20Bilal%2C%20I%20want%20to%20grow%20my%20business%20online.",
  instagram: "https://www.instagram.com/bilal.asif__/",
  linkedin: "https://www.linkedin.com/in/bilal-asif-034272320/"
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
    title: "Website Development",
    description:
      "Fast, responsive, SEO-friendly websites engineered to turn visitors into customers.",
    details: [
      "A focused website gives your business a credible home, explains the offer clearly and guides visitors toward calling, booking or buying.",
      "Responsive layouts, strong performance and a clean SEO foundation make it easier to reach and convert customers across every device.",
      "It delivers the best long-term value when content, security and key pages are kept current after launch."
    ]
  },
  {
    title: "Mobile App Development",
    description:
      "FlutterFlow-powered Android and iOS applications designed to scale with your business.",
    details: [
      "An app keeps your service close to customers through faster repeat actions, personalized experiences and useful notifications.",
      "One thoughtfully planned product can serve both Android and iOS while remaining easier to improve as the business grows.",
      "For simple information or occasional visits, a responsive website can be more efficient than asking customers to install an app."
    ]
  },
  {
    title: "SEO Services",
    description:
      "Improve search rankings, increase visibility and generate qualified leads.",
    details: [
      "SEO connects your pages with the searches potential customers already make, bringing in traffic with stronger intent.",
      "Technical improvements, useful content and local optimization can compound into a dependable source of leads over time.",
      "Results are rarely instant and sustainable growth needs consistent work rather than shortcuts that risk future rankings."
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
    title: "Email Marketing & Automation",
    description:
      "Email automation, customer journeys, lead nurturing and CRM integration.",
    details: [
      "Automated email journeys follow up with leads, welcome customers and encourage repeat purchases without adding repetitive manual work.",
      "Because the audience is owned by your business, communication is less dependent on changing social algorithms.",
      "Good results still depend on permission, clean customer data and messages useful enough to avoid fatigue or unsubscribes."
    ]
  },
  {
    title: "Branding & Strategy",
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
  { value: "3yrs", label: "Digital growth experience" }
];

// This is the exact visible carousel order from the original indexed list.
export const FEATURED_PROJECTS: readonly Project[] = [
  {
    title: "Pulse Fit",
    eyebrow: "Fitness Landing",
    metric: "New members",
    description:
      "A focused fitness landing page that turns motivation into memberships and enquiries.",
    image: "/portfolio-cards/light/pulse-fit-mixed.jpg"
  },
  {
    title: "Paw Palace",
    eyebrow: "Pet Care Booking",
    metric: "New clients",
    description:
      "A friendly pet care experience that makes trusted grooming simple to discover and book.",
    image: "/portfolio-cards/light/paw-palace-mixed.jpg"
  },
  {
    title: "Cocoa Crafted",
    eyebrow: "Chocolate Website",
    metric: "Online sweets",
    description:
      "A warm ecommerce experience crafted to turn chocolate lovers into loyal customers.",
    image: "/portfolio-cards/light/cocoa-crafted-mixed.jpg"
  },
  {
    title: "Aqua Gallery",
    eyebrow: "Aquarium Website",
    metric: "Visitor journeys",
    description:
      "A bright aquarium experience designed around discovery, calm and effortless visits.",
    image: "/portfolio-cards/light/aqua-gallery-v2.jpg"
  },
  {
    title: "Spice Table",
    eyebrow: "Restaurant Site",
    metric: "Table orders",
    description:
      "A vibrant restaurant website built to make every dish irresistible and easy to order.",
    image: "/portfolio-cards/light/spice-table-mixed.jpg"
  },
  {
    title: "Nest Realty",
    eyebrow: "Real Estate Leads",
    metric: "Buyer leads",
    description:
      "A polished property experience that helps serious buyers find their perfect home.",
    image: "/portfolio-cards/light/nest-realty-mixed.jpg"
  },
  {
    title: "Azure Coast",
    eyebrow: "Ocean Retreat",
    metric: "Luxury stays",
    description:
      "An airy coastal experience created to turn peaceful escapes into premium bookings.",
    image: "/portfolio-cards/light/azure-coast-v2.jpg"
  }
];

export const PROJECT_DETAILS: Readonly<Record<string, ProjectDetail>> = {
  "Cocoa Crafted": {
    problem:
      "The chocolate brand needed to feel premium online while making gifting and product discovery simple.",
    requirements:
      "A mobile-first store, clear gift categories, delivery information and product pages that build trust.",
    solution:
      "An editorial ecommerce experience with collection-led navigation, product storytelling and strong purchase calls to action.",
    result:
      "A clearer path from discovery to checkout, stronger premium positioning and better repeat-order potential."
  },
  "Aqua Gallery": {
    problem:
      "Visitors needed an easier way to discover exhibits, plan a visit and understand the aquarium experience.",
    requirements:
      "Simple visit planning, exhibit highlights, ticket calls to action and a calm visual experience across devices.",
    solution:
      "A bright content system that prioritizes key attractions, visit information and conversion-focused ticket journeys.",
    result:
      "Faster access to essential information, stronger visitor confidence and a smoother route to ticket booking."
  },
  "Spice Table": {
    problem:
      "The restaurant needed its food quality and atmosphere to translate online without slowing down ordering.",
    requirements:
      "A visual menu, location details, mobile ordering, reservations and search-friendly restaurant pages.",
    solution:
      "A vibrant restaurant experience with dish-led storytelling and direct paths to orders and table bookings.",
    result:
      "More appetizing product discovery, fewer steps to order and stronger local search visibility."
  },
  "Pulse Fit": {
    problem:
      "Potential members were interested but lacked a clear reason and simple next step to join the fitness program.",
    requirements:
      "Clear membership value, class information, trainer trust signals and an easy mobile enquiry flow.",
    solution:
      "A focused landing experience that connects fitness goals with programs, proof and high-intent membership calls to action.",
    result:
      "A more persuasive membership journey with clearer choices and stronger enquiry potential."
  },
  "Nest Realty": {
    problem:
      "Property buyers needed a polished way to explore listings and contact the right agent without friction.",
    requirements:
      "Searchable properties, clear location context, agent credibility and fast lead capture on mobile.",
    solution:
      "A clean property experience with focused listing content, lifestyle imagery and strategically placed enquiry actions.",
    result:
      "Higher-quality buyer journeys, stronger agent trust and easier conversion from browsing to enquiry."
  },
  "Azure Coast": {
    problem:
      "The retreat needed to communicate its premium atmosphere while making availability and booking feel effortless.",
    requirements:
      "Immersive accommodation pages, amenities, location context, availability prompts and mobile-first booking.",
    solution:
      "An airy hospitality experience combining editorial imagery with concise information and clear booking pathways.",
    result:
      "Stronger luxury positioning, better-informed guests and a shorter path from inspiration to reservation."
  },
  "Paw Palace": {
    problem:
      "Pet owners needed reassurance, transparent service choices and a convenient way to request grooming appointments.",
    requirements:
      "Service details, trust signals, pet-friendly branding, location information and quick appointment requests.",
    solution:
      "A warm booking experience that presents services clearly and keeps the appointment action visible throughout.",
    result:
      "Greater customer confidence, easier service selection and more direct booking opportunities."
  }
};

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

export const PROFESSIONAL_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Bilal Asif",
  url: "https://bilalasif.com",
  email: CONTACT.email,
  areaServed: ["United States", "Europe"],
  sameAs: [CONTACT.instagram, CONTACT.linkedin],
  serviceType: [
    "Website design for small businesses",
    "SEO services for small businesses",
    "Google Ads landing pages",
    "Ecommerce website development",
    "Digital marketing for restaurants"
  ]
} as const;
