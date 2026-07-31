"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    const value =
      metric.name === "CLS"
        ? Math.round(metric.value * 1000) / 1000
        : Math.round(metric.value);

    sendGAEvent("event", "web_vital", {
      metric_name: metric.name,
      metric_value: value,
      metric_rating: metric.rating ?? "unknown",
      metric_id: metric.id,
      navigation_type: metric.navigationType,
      page_path: window.location.pathname
    });
  });

  return null;
}
