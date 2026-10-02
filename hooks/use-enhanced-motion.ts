"use client";

import { useSyncExternalStore } from "react";

// Keep touch scrolling native, including large phones and tablets. CSS uses
// the inverse of this query so the initial HTML has the same mobile layout.
export const ENHANCED_MOTION_QUERY =
  "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(callback: () => void) {
  const media = window.matchMedia(ENHANCED_MOTION_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(ENHANCED_MOTION_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useEnhancedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
