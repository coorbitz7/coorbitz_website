import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)",
          color: "#ffffff",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
            marginBottom: 32,
          }}
        >
          <svg width="64" height="64" viewBox="0 0 100 100">
            <ellipse cx="50" cy="50" rx="34" ry="16" transform="rotate(-20 50 50)" fill="none" stroke="#ffffff" strokeWidth="8" />
            <circle cx="81.95" cy="38.37" r="13" fill="#ffffff" />
            <circle cx="18.05" cy="61.63" r="13" fill="#ffffff" />
          </svg>
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, letterSpacing: -1 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 20, color: "#94A3B8" }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
