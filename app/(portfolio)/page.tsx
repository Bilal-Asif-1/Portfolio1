import type { Metadata } from "next";
import { JsonLd } from "@/app/json-ld";
import { PROFESSIONAL_SERVICE_SCHEMA } from "@/features/portfolio/data";

export const metadata: Metadata = {
  title: {
    absolute: "Bilal Asif | Freelance Full-Stack Developer and SEO Specialist"
  },
  alternates: { canonical: "/" }
};

export default function HomePage() {
  return <JsonLd data={PROFESSIONAL_SERVICE_SCHEMA} />;
}
