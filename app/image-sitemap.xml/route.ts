const SITE_URL = "https://www.bilalasiftech.com";

const projectImages = [
  "/portfolio-cards/light/pulse-fit-mixed.webp",
  "/portfolio-cards/light/paw-palace-mixed.webp",
  "/portfolio-cards/light/cocoa-crafted-mixed.webp",
  "/portfolio-cards/light/aqua-gallery-v2.webp",
  "/portfolio-cards/light/spice-table-mixed.webp",
  "/portfolio-cards/light/nest-realty-mixed.webp",
  "/portfolio-cards/light/azure-coast-v2.webp"
] as const;

export const dynamic = "force-static";

export function GET() {
  const portrait = `
  <url>
    <loc>${SITE_URL}/</loc>
    <image:image>
      <image:loc>${SITE_URL}/bilal-asif-portrait-2026-v4.webp</image:loc>
    </image:image>
  </url>`;

  const projects = `
  <url>
    <loc>${SITE_URL}/projects</loc>
    ${projectImages
      .map(
        (image) => `<image:image>
      <image:loc>${SITE_URL}${image}</image:loc>
    </image:image>`
      )
      .join("\n    ")}
  </url>`;

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${portrait}${projects}
</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400"
      }
    }
  );
}
