import { ImageResponse } from "next/og";
import { MARK_VIEWBOX, markColorsLight, markSegments } from "@/lib/brand-mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 6,
        }}
      >
        <svg width="28" height="28" viewBox={MARK_VIEWBOX}>
          {markSegments.map((segment, index) => (
            <g key={index}>
              <circle cx={segment.node.cx} cy={segment.node.cy} r={segment.node.r} fill={markColorsLight[index]} />
              <path d={segment.arm} fill="none" stroke={markColorsLight[index]} strokeWidth={segment.armWidth} strokeLinecap="round" />
            </g>
          ))}
        </svg>
      </div>
    ),
    { ...size }
  );
}
