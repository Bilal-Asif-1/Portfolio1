"use client";

import { sendGAEvent } from "@next/third-parties/google";
import type { AnchorHTMLAttributes, MouseEvent } from "react";

export type LeadSource = "whatsapp" | "email" | "project_cta";

export function trackLead(source: LeadSource) {
  sendGAEvent("event", "generate_lead", {
    lead_source: source,
    lead_page: window.location.pathname
  });
}

export function LeadLink({
  leadSource,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { leadSource: LeadSource }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) trackLead(leadSource);
  };

  return <a {...props} onClick={handleClick} />;
}
