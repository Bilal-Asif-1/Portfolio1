import type { MetadataRoute } from "next";
import { FEATURED_PROJECTS } from "@/features/portfolio/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/growth", priority: 0.9 },
    { path: "/projects", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    { path: "/packages", priority: 0.8 },
    { path: "/process", priority: 0.8 },
    { path: "/faq", priority: 0.7 },
    { path: "/contact", priority: 0.9 },
    { path: "/image-licensing", priority: 0.3 }
  ];

  return [
    ...routes.map((route) => ({
      url: `https://www.bilalasiftech.com${route.path}`,
      changeFrequency: "weekly" as const,
      priority: route.priority
    })),
    ...FEATURED_PROJECTS.map((project) => ({
      url: `https://www.bilalasiftech.com/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
