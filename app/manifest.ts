import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bilal Asif | Websites, SEO and Ads",
    short_name: "Bilal Asif",
    description:
      "Freelance website development, SEO and digital growth services for small businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f3ef",
    theme_color: "#f4f3ef",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
