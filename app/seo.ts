import type { Metadata } from "next";

export const SITE_URL = "https://www.bilalasiftech.com";
export const SITE_NAME = "Bilal Asif";
export const DEFAULT_OG_IMAGE = "/opengraph-image";

export function createSocialImageUrl(title: string, description: string) {
  const query = new URLSearchParams({ title, description });
  return `/og?${query.toString()}`;
}

export function createPageMetadata({
  title,
  description,
  path
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const socialImage = createSocialImageUrl(title, description);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: socialImage, width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [socialImage]
    }
  };
}
