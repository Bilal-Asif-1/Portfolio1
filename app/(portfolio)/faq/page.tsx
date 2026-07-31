import { JsonLd } from "@/app/json-ld";
import { createPageMetadata } from "@/app/seo";
import { FAQ_PAGE_SCHEMA } from "@/features/portfolio/data";

export const metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about project timelines, SEO, flexible service packages and ownership of completed work.",
  path: "/faq"
});

export default function FaqPage() {
  return <JsonLd data={FAQ_PAGE_SCHEMA} />;
}
