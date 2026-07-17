import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
        }}
      >
        <svg width="128" height="128" viewBox="0 0 100 100">
          <ellipse cx="50" cy="50" rx="34" ry="16" transform="rotate(-20 50 50)" fill="none" stroke="#ffffff" strokeWidth="8" />
          <circle cx="81.95" cy="38.37" r="13" fill="#ffffff" />
          <circle cx="18.05" cy="61.63" r="13" fill="#ffffff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
