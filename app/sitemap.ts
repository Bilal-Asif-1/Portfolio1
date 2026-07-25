import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/growth", priority: 0.9 },
    { path: "/projects", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    { path: "/packages", priority: 0.8 },
    { path: "/process", priority: 0.8 },
    { path: "/faq", priority: 0.7 },
    { path: "/contact", priority: 0.9 }
  ];

  return routes.map((route) => ({
    url: `https://www.bilalasiftech.com${route.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route.priority
  }));
}
