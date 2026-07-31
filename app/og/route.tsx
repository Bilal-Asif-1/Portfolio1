import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = { width: 1200, height: 630 };

function safeText(value: string | null, fallback: string, limit: number) {
  const text = value?.trim() || fallback;
  return text.length > limit ? `${text.slice(0, limit - 1)}…` : text;
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = safeText(
    searchParams.get("title"),
    "Full-Stack Development, SEO and Digital Growth",
    90
  );
  const description = safeText(
    searchParams.get("description"),
    "Digital solutions for businesses that need to plan, launch and grow online.",
    180
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f3ef",
          color: "#111111",
          padding: "66px 72px",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#3d3d3d",
            fontSize: 25,
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase"
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              background: "#111111"
            }}
          />
          Bilal Asif
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              maxWidth: 990,
              fontSize: 72,
              lineHeight: 1,
              letterSpacing: "-3px",
              fontWeight: 800
            }}
          >
            {title}
          </div>
          <div
            style={{
              maxWidth: 900,
              color: "#5a5a5a",
              fontSize: 29,
              lineHeight: 1.35
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            color: "#5a5a5a",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase"
          }}
        >
          Full-Stack Development, SEO and Digital Growth
        </div>
      </div>
    ),
    size
  );
}
