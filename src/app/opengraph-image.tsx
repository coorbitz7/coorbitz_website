import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";
import { MARK_VIEWBOX, markColorsDark, markSegments } from "@/lib/brand-mark";

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
          justifyContent: "space-between",
          padding: 72,
          background: "#0b1e33",
          color: "#ffffff",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="96" height="96" viewBox={MARK_VIEWBOX}>
            {markSegments.map((segment, index) => (
              <g key={index}>
                <circle cx={segment.node.cx} cy={segment.node.cy} r={segment.node.r} fill={markColorsDark[index]} />
                <path d={segment.arm} fill="none" stroke={markColorsDark[index]} strokeWidth={segment.armWidth} strokeLinecap="round" />
              </g>
            ))}
          </svg>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, letterSpacing: -1.5 }}>
            {siteConfig.name}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 46, fontWeight: 600, lineHeight: 1.15, maxWidth: 980 }}>
            {siteConfig.tagline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#9fc4e0",
              fontFamily: "Menlo, Consolas, monospace",
              letterSpacing: 2,
            }}
          >
            SOFTWARE · AI · AUTOMATION · CHICAGO · MEHSANA
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
