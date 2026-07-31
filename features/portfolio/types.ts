export type ContactDetails = {
  email: string;
  whatsapp: string;
  instagram: string;
  linkedin: string;
  github: string;
};

export type Service = {
  title: string;
  description: string;
  details: readonly string[];
  relatedCaseStudies?: readonly {
    title: string;
    slug: string;
  }[];
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  metric: string;
  description: string;
  image: StaticImageData;
  imageUrl: string;
};

export type ProjectDetail = {
  problem: string;
  requirements: string;
  solution: string;
  result: string;
  stack?: string;
};

export type Package = {
  title: string;
  bestFor: string;
  includes: readonly string[];
};

export type ApproachStep = {
  title: string;
  description: string;
};

export type Faq = {
  question: string;
  answer: string;
};
import type { StaticImageData } from "next/image";
