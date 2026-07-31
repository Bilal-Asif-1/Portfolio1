import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { X } from "lucide-react";
import { JsonLd } from "@/app/json-ld";
import { createSocialImageUrl, SITE_URL } from "@/app/seo";
import {
  CaseStudyCard,
  CaseStudyDismissArea
} from "@/features/portfolio/case-study-dismiss-area";
import {
  FEATURED_PROJECTS,
  getProjectBySlug,
  PROJECT_DETAILS
} from "@/features/portfolio/data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.title} Case Study`;
  const path = `/projects/${project.slug}`;
  const socialImage = createSocialImageUrl(title, project.description);
  return {
    title,
    description: project.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: `${title} | Bilal Asif`,
      description: project.description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `${project.title} case study`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Bilal Asif`,
      description: project.description,
      images: [socialImage]
    }
  };
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const details = PROJECT_DETAILS[project.title];
  if (!details) notFound();

  const path = `/projects/${project.slug}`;
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE_URL}${path}#case-study`,
    url: `${SITE_URL}${path}`,
    name: `${project.title} case study`,
    description: project.description,
    image: `${SITE_URL}${project.imageUrl}`,
    keywords: details.stack,
    author: {
      "@type": "Person",
      name: "Bilal Asif",
      url: SITE_URL
    },
    mainEntityOfPage: `${SITE_URL}${path}`
  };

  const sections = [
    ["Problem", details.problem],
    ["Requirements", details.requirements],
    ["Solution", details.solution],
    ["Result", details.result],
    ...(details.stack ? [["Technology", details.stack]] : [])
  ];

  return (
    <main className="h-[100dvh] overflow-hidden bg-paper p-3 text-ink sm:p-5 lg:p-6">
      <JsonLd data={caseStudySchema} />
      <CaseStudyDismissArea>
        <CaseStudyCard>
          <Link
            href="/projects"
            aria-label="Back to projects"
            title="Back to projects"
            className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white text-ink shadow-sm transition-colors duration-[240ms] hover:bg-ink hover:text-white sm:right-5 sm:top-5 sm:h-11 sm:w-11"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.25} />
          </Link>
          <div className="grid h-full min-h-0 grid-rows-[22svh_minmax(0,1fr)] lg:grid-cols-[0.82fr_1.18fr] lg:grid-rows-1">
            <div className="relative min-h-0 overflow-hidden bg-paper">
              <Image
                src={project.image}
                alt={`${project.title} project visual`}
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-white sm:bottom-6 sm:left-6 sm:text-[11px] sm:tracking-[0.2em]">
                {project.eyebrow}
              </p>
            </div>

            <div className="flex min-h-0 flex-col justify-center p-4 pt-5 sm:p-7 lg:p-10">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/60 sm:text-[11px] sm:tracking-[0.22em]">
                Project case study
              </p>
              <h1 className="mt-2 font-sans text-[clamp(2rem,9vw,3.25rem)] font-light not-italic leading-[0.92] tracking-normal text-ink sm:mt-3 sm:text-6xl">
                {project.title}
              </h1>
              <p className="mt-3 max-w-2xl text-xs leading-5 text-ink/60 sm:mt-4 sm:text-sm sm:leading-6 lg:text-base lg:leading-7">
                {project.description}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:mt-6 sm:gap-x-8 sm:gap-y-5">
                {sections.map(([title, copy]) => (
                  <section key={title} className="border-t border-ink/10 pt-2.5 sm:pt-4">
                    <h2 className="text-[8px] font-semibold uppercase tracking-[0.13em] text-ink sm:text-[10px] sm:tracking-[0.16em]">
                      {title}
                    </h2>
                    <p className="mt-1.5 text-[10px] leading-4 text-ink/60 sm:mt-2 sm:text-xs sm:leading-5 lg:text-sm lg:leading-6">
                      {copy}
                    </p>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </CaseStudyCard>
      </CaseStudyDismissArea>
    </main>
  );
}
