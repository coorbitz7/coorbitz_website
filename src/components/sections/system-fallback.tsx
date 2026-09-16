import { cn } from "@/lib/utils";

// Static counterpart of the 3D hero scene: the same six-hub network, projected flat.
// Used on touch devices, under reduced-motion, without WebGL, and while the 3D bundle loads.
const HUBS = [
  { label: "data", angle: -90 },
  { label: "systems", angle: -30 },
  { label: "models", angle: 30 },
  { label: "agents", angle: 90 },
  { label: "automation", angle: 150 },
  { label: "action", angle: 210 },
] as const;

const CENTER = 300;
const RING = 178;
const SATELLITES = [
  [46, -48],
  [-58, -22],
  [38, 52],
  [-30, 60],
  [66, 8],
] as const;

const toRad = (deg: number) => (deg * Math.PI) / 180;
const round = (n: number) => Math.round(n * 10) / 10;

export function SystemFallback({ className }: { className?: string }) {
  const hubs = HUBS.map((hub, index) => ({
    ...hub,
    x: round(CENTER + RING * Math.cos(toRad(hub.angle))),
    y: round(CENTER + RING * 0.82 * Math.sin(toRad(hub.angle))),
    color: `var(--mark-${(index % 5) + 1})`,
  }));

  return (
    <svg
      viewBox="0 0 600 600"
      className={cn("h-full w-full", className)}
      aria-hidden
      focusable="false"
    >
      <ellipse
        cx={CENTER}
        cy={CENTER}
        rx={RING + 70}
        ry={(RING + 70) * 0.82}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeDasharray="2 6"
      />
      <ellipse
        cx={CENTER}
        cy={CENTER}
        rx={RING}
        ry={RING * 0.82}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.18"
      />
      {hubs.map((hub, index) => {
        const next = hubs[(index + 1) % hubs.length];
        return (
          <g key={hub.label}>
            <line x1={hub.x} y1={hub.y} x2={next.x} y2={next.y} stroke="currentColor" strokeOpacity="0.22" />
            {SATELLITES.map(([dx, dy], satIndex) => {
              const scale = 0.55 + (satIndex % 3) * 0.12;
              const sx = round(hub.x + dx * scale);
              const sy = round(hub.y + dy * scale);
              return (
                <g key={satIndex}>
                  <line x1={hub.x} y1={hub.y} x2={sx} y2={sy} stroke="currentColor" strokeOpacity="0.2" />
                  <circle cx={sx} cy={sy} r={satIndex % 2 === 0 ? 3.2 : 2.4} fill={hub.color} fillOpacity="0.85" />
                </g>
              );
            })}
          </g>
        );
      })}
      {hubs.map((hub) => (
        <g key={`hub-${hub.label}`}>
          <circle cx={hub.x} cy={hub.y} r="14" fill={hub.color} fillOpacity="0.14" />
          <circle cx={hub.x} cy={hub.y} r="7" fill={hub.color} />
          <text
            x={hub.x}
            y={hub.y + (hub.angle > 0 && hub.angle < 180 ? 34 : -24)}
            textAnchor="middle"
            fontSize="12"
            fontFamily="var(--font-plex-mono), monospace"
            fill="currentColor"
            fillOpacity="0.7"
          >
            {hub.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
