import { JsonLd } from "@/app/json-ld";
import { createPageMetadata } from "@/app/seo";
import { PROJECT_PORTFOLIO_SCHEMA } from "@/features/portfolio/data";

export const metadata = createPageMetadata({
  title: "Full-Stack Developer Portfolio",
  description:
    "Selected full-stack website, ecommerce, hospitality, fitness and local business projects by Bilal Asif.",
  path: "/projects"
});

export default function ProjectsPage() {
  return <JsonLd data={PROJECT_PORTFOLIO_SCHEMA} />;
}
