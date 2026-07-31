"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export function CaseStudyDismissArea({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div
      className="h-full"
      onClick={() => router.push("/projects")}
    >
      {children}
    </div>
  );
}

export function CaseStudyCard({ children }: { children: ReactNode }) {
  return (
    <article
      className="relative mx-auto h-full max-w-7xl overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-lift sm:rounded-panel"
      onClick={(event) => event.stopPropagation()}
    >
      {children}
    </article>
  );
}
