import { ImageResponse } from "next/og";
import { companyName, serviceAreasSummary } from "@/lib/constants";

export const alt = `${companyName} — House Painters in Dublin, Wicklow & Wexford`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111111",
          color: "#ffffff",
          padding: "72px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#c9c9c9",
          }}
        >
          Superior Painting &amp; Decorating
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 92, lineHeight: 1.05, fontWeight: 700 }}>{companyName}</div>
          <div style={{ fontSize: 40, color: "#e6e6e6" }}>
            House Painters in Dublin, Wicklow &amp; Wexford
          </div>
        </div>
        <div
          style={{
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#9b9b9b",
            borderTop: "2px solid #3a3a3a",
            paddingTop: 28,
          }}
        >
          {serviceAreasSummary}
        </div>
      </div>
    ),
    { ...size },
  );
}
