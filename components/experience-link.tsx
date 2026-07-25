"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

export const PORTFOLIO_NAVIGATE_EVENT = "portfolio:navigate";

export type PortfolioNavigateDetail = {
  path: string;
  history?: "push" | "replace" | "none";
};

export function ExperienceLink({
  href,
  onClick,
  target,
  children,
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      target === "_blank" ||
      !href.startsWith("/")
    ) {
      return;
    }

    event.preventDefault();
    document.dispatchEvent(
      new CustomEvent<PortfolioNavigateDetail>(PORTFOLIO_NAVIGATE_EVENT, {
        detail: { path: href, history: "push" }
      })
    );
  };

  return (
    <a href={href} target={target} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
