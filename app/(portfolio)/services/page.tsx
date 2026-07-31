import { createPageMetadata } from "@/app/seo";
import { JsonLd } from "@/app/json-ld";
import { SERVICE_CATALOG_SCHEMA } from "@/features/portfolio/data";

export const metadata = createPageMetadata({
  title: "Full-Stack Development, AI and SEO Services",
  description:
    "Freelance full-stack web development, AI-powered web applications, technical SEO, web performance, paid ads and digital growth services.",
  path: "/services"
});

export default function ServicesPage() {
  return <JsonLd data={SERVICE_CATALOG_SCHEMA} />;
}
