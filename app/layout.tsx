import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  JetBrains_Mono
} from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { IntroSplash } from "@/features/intro/intro-splash";
import { WebVitals } from "@/components/web-vitals";
import { createSocialImageUrl, SITE_URL } from "@/app/seo";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken-grotesk",
  weight: "variable"
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage-grotesque",
  weight: "variable"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: "variable"
});

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bilal Asif | Full-Stack Development, SEO and Digital Growth",
    template: "%s | Bilal Asif"
  },
  description:
    "Bilal Asif helps businesses plan, brand, build and grow with full-stack web development, applications, SEO, digital marketing, paid advertising, performance optimization and ongoing support.",
  keywords: [
    "freelance full stack developer",
    "MERN stack developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "TypeScript developer",
    "AI full stack developer",
    "technical SEO specialist",
    "web performance optimization",
    "freelance web developer"
  ],
  authors: [{ name: "Bilal Asif", url: SITE_URL }],
  creator: "Bilal Asif",
  publisher: "Bilal Asif",
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Bilal Asif",
    title: "Bilal Asif | Complete Digital Solutions for Business Growth",
    description:
      "A full digital partner for strategy, branding, full-stack development, SEO, paid advertising, optimization and ongoing support.",
    images: [
      {
        url: createSocialImageUrl(
          "Complete Digital Solutions for Business Growth",
          "Strategy, branding, full-stack development, SEO, paid advertising and ongoing support."
        ),
        width: 1200,
        height: 630,
        alt: "Bilal Asif digital solutions portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bilal Asif | Full-Stack Development, SEO and Digital Growth",
    description:
      "From website development and applications to SEO, paid advertising, optimization and long-term digital growth support.",
    images: [
      createSocialImageUrl(
        "Full-Stack Development, SEO and Digital Growth",
        "From website development and applications to SEO, paid advertising, optimization and long-term digital growth support."
      )
    ]
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

export const viewport = {
  themeColor: "#f4f3ef",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${bricolageGrotesque.variable} ${jetBrainsMono.variable}`}
    >
      <body className="bg-white font-sans text-ink antialiased">
        <IntroSplash />
        <WebVitals />
        {children}
      </body>
      <GoogleAnalytics gaId="G-EFJST279S8" />
    </html>
  );
}
