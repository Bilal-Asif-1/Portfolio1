import { ImageResponse } from "next/og";

export const alt = "Bilal Asif business growth portfolio";
export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f4f3ef",
          color: "#111",
          padding: 72,
          fontFamily: "Inter, Arial, sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 28,
            fontWeight: 800,
            marginBottom: 56
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: "#8ad9c0"
            }}
          />
          Bilal Asif
        </div>
        <div
          style={{
            fontSize: 74,
            lineHeight: 0.98,
            letterSpacing: "-3px",
            fontWeight: 900,
            maxWidth: 930
          }}
        >
          Websites, SEO and Ads that help small businesses grow.
        </div>
        <div
          style={{
            marginTop: 38,
            fontSize: 28,
            color: "#454545"
          }}
        >
          USA and Europe | Restaurants | Local Business | Ecommerce
        </div>
      </div>
    ),
    size
  );
}
