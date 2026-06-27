import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://bilalasif.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bilal Asif | Websites, SEO and Ads for Small Business Growth",
    template: "%s | Bilal Asif"
  },
  description:
    "Friendly freelance website designer and digital growth partner helping USA and European restaurants, food brands, local businesses and ecommerce stores get more customers with websites, SEO, Google Ads and Meta Ads.",
  keywords: [
    "freelance website designer for small business",
    "restaurant website designer",
    "food business website design",
    "ecommerce website developer",
    "SEO services for small business",
    "Google Ads for restaurants",
    "local business digital marketing",
    "Meta Ads freelancer",
    "keyword research for small businesses",
    "website and SEO freelancer"
  ],
  authors: [{ name: "Bilal Asif", url: siteUrl }],
  creator: "Bilal Asif",
  publisher: "Bilal Asif",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Bilal Asif",
    title: "Bilal Asif | Scale Your Business With Websites, SEO and Ads",
    description:
      "Conversion-focused websites, local SEO, ecommerce launch support and ad campaigns for small businesses in the USA and Europe.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Bilal Asif business growth portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bilal Asif | Websites, SEO and Ads for Business Growth",
    description:
      "Helping small businesses get more orders, calls and customers with better websites, SEO and ads."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
