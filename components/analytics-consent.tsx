"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useSyncExternalStore } from "react";
import { WebVitals } from "@/components/web-vitals";

const CONSENT_KEY = "bilal-asif-analytics-consent";
const CONSENT_EVENT = "bilal-asif-analytics-consent-change";

type Consent = "granted" | "denied" | null;

function readConsent(): Consent {
  const savedConsent = window.localStorage.getItem(CONSENT_KEY);
  return savedConsent === "granted" || savedConsent === "denied"
    ? savedConsent
    : null;
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

export function hasAnalyticsConsent() {
  return (
    typeof window !== "undefined" &&
    window.localStorage.getItem(CONSENT_KEY) === "granted"
  );
}

export function AnalyticsConsent() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    readConsent,
    () => undefined
  );

  const setAnalyticsConsent = (nextConsent: Exclude<Consent, null>) => {
    window.localStorage.setItem(CONSENT_KEY, nextConsent);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  return (
    <>
      {consent === "granted" ? (
        <>
          <GoogleAnalytics gaId="G-EFJST279S8" />
          <WebVitals />
        </>
      ) : null}

      {consent === null ? (
        <aside
          className="fixed inset-x-4 bottom-4 z-[200] mx-auto flex w-auto max-w-md flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-4 text-ink shadow-lift sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[25rem]"
          aria-label="Analytics preference"
        >
          <p className="text-sm leading-5 text-ink/70">
            I use optional analytics to understand how visitors use this portfolio and improve it.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setAnalyticsConsent("granted")}
              className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition-opacity duration-[240ms] hover:opacity-75"
            >
              Accept analytics
            </button>
            <button
              type="button"
              onClick={() => setAnalyticsConsent("denied")}
              className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink/70 transition-colors duration-[240ms] hover:border-ink hover:text-ink"
            >
              Reject
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
