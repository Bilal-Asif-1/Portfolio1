export type ContactDetails = {
  email: string;
  whatsapp: string;
  instagram: string;
  linkedin: string;
};

export type Service = {
  title: string;
  description: string;
  details: readonly string[];
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  title: string;
  eyebrow: string;
  metric: string;
  description: string;
  image: StaticImageData;
};

export type ProjectDetail = {
  problem: string;
  requirements: string;
  solution: string;
  result: string;
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
