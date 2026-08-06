import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { createPageMetadata } from "@/app/seo";
import { CONTACT } from "@/features/portfolio/data";
import portrait from "@/public/bilal-asif-portrait-2026-v5.webp";

export const metadata = createPageMetadata({
  title: "Image Licensing",
  description:
    "Copyright, credit and permission information for images published on Bilal Asif's portfolio.",
  path: "/image-licensing"
});

export default function ImageLicensingPage() {
  return (
    <main className="min-h-screen bg-[#f4f3ef] px-5 py-10 text-ink sm:px-8 sm:py-14 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/60 transition-colors hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <header className="mt-16 border-b border-black/15 pb-10 sm:mt-24 sm:pb-14">
          <p className="font-jetbrains text-[10px] font-semibold uppercase tracking-[0.3em] text-black/50 sm:text-xs">
            Usage and permissions
          </p>
          <h1 className="mt-5 font-sans text-5xl font-extrabold tracking-tight sm:text-7xl">
            Image licensing
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-black/65 sm:text-lg sm:leading-8">
            Copyright, attribution and permission details for original images
            published on bilalasiftech.com.
          </p>
        </header>

        <div className="grid gap-12 py-12 sm:py-16 md:grid-cols-[220px_1fr] md:gap-16">
          <figure>
            <Image
              src={portrait}
              alt="Bilal Asif, freelance full-stack developer and SEO specialist"
              className="aspect-[4/5] w-full rounded-2xl object-cover object-top grayscale"
              priority
            />
            <figcaption className="mt-3 text-xs leading-5 text-black/50">
              Portrait of Bilal Asif
            </figcaption>
          </figure>

          <div className="space-y-12">
            <section id="license" className="scroll-mt-8">
              <h2 className="text-2xl font-bold">Copyright and license</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-black/65 sm:text-base">
                <p>
                  Copyright © 2026 Bilal Asif. All rights reserved. The portrait
                  shown on this page and its corresponding image file are not
                  licensed for reuse, republication, modification or commercial
                  use without prior written permission.
                </p>
                <p>
                  Viewing or indexing the image does not grant a license or
                  transfer any ownership rights.
                </p>
              </div>
            </section>

            <section id="credit" className="scroll-mt-8">
              <h2 className="text-2xl font-bold">Required credit</h2>
              <p className="mt-4 text-sm leading-7 text-black/65 sm:text-base">
                If permission is granted, use the credit “Bilal Asif” and link
                to https://www.bilalasiftech.com unless the written permission
                specifies different terms.
              </p>
            </section>

            <section id="request-permission" className="scroll-mt-8">
              <h2 className="text-2xl font-bold">Request permission</h2>
              <p className="mt-4 text-sm leading-7 text-black/65 sm:text-base">
                To request a license, describe where the image will appear, how
                it will be used and the expected publication period. Permission
                is valid only when confirmed in writing.
              </p>
              <a
                href={`mailto:${CONTACT.email}?subject=Image%20licensing%20request`}
                className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full bg-black px-6 text-xs font-bold uppercase tracking-[0.16em] text-white transition-transform hover:scale-[1.015]"
              >
                <Mail className="h-4 w-4" />
                Request permission
              </a>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
