import type { ServiceSchematic as SchematicKind } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Small line-art schematics, one per service. Drawn in `currentColor` with the brand sky
 * as the single accent so they read as diagrams, not illustrations.
 */
export function ServiceSchematic({ kind, className }: { kind: SchematicKind; className?: string }) {
  const common = {
    viewBox: "0 0 240 160",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cn("overflow-visible", className),
    "aria-hidden": true,
    focusable: "false" as const,
  };
  const accent = "var(--brand-sky)";
  const faint = { opacity: 0.35 };

  switch (kind) {
    case "model":
      return (
        <svg {...common}>
          {[40, 70, 100].map((y) => (
            <g key={y}>
              <circle cx="28" cy={y} r="5" />
              <path d={`M33 ${y} C 60 ${y}, 60 70, 86 70`} style={faint} />
            </g>
          ))}
          <rect x="86" y="42" width="68" height="56" rx="4" />
          <rect x="94" y="50" width="52" height="8" rx="2" style={faint} />
          <rect x="94" y="64" width="52" height="8" rx="2" style={faint} />
          <rect x="94" y="78" width="36" height="8" rx="2" stroke={accent} />
          <path d="M154 60 C 180 60, 180 50, 206 50" style={faint} />
          <path d="M154 80 C 180 80, 180 90, 206 90" style={faint} />
          <circle cx="212" cy="50" r="5" fill={accent} stroke="none" />
          <circle cx="212" cy="90" r="5" />
          <rect x="86" y="112" width="68" height="22" rx="4" strokeDasharray="4 4" style={faint} />
          <text x="120" y="127" textAnchor="middle" fontSize="9" fontFamily="var(--font-plex-mono), monospace" fill="currentColor" stroke="none" opacity="0.7">
            eval · monitor
          </text>
        </svg>
      );
    case "agent":
      return (
        <svg {...common}>
          <path d="M120 44 L154 62 L154 98 L120 116 L86 98 L86 62 Z" />
          <text x="120" y="84" textAnchor="middle" fontSize="10" fontFamily="var(--font-plex-mono), monospace" fill="currentColor" stroke="none">
            agent
          </text>
          <rect x="18" y="28" width="46" height="24" rx="4" />
          <text x="41" y="44" textAnchor="middle" fontSize="9" fontFamily="var(--font-plex-mono), monospace" fill="currentColor" stroke="none" opacity="0.8">tools</text>
          <rect x="18" y="108" width="46" height="24" rx="4" />
          <text x="41" y="124" textAnchor="middle" fontSize="9" fontFamily="var(--font-plex-mono), monospace" fill="currentColor" stroke="none" opacity="0.8">memory</text>
          <rect x="176" y="68" width="50" height="24" rx="4" stroke={accent} />
          <text x="201" y="84" textAnchor="middle" fontSize="9" fontFamily="var(--font-plex-mono), monospace" fill={accent} stroke="none">human ✓</text>
          <path d="M64 40 C 80 40, 80 58, 88 62" style={faint} />
          <path d="M64 120 C 80 120, 80 102, 88 98" style={faint} />
          <path d="M154 80 L176 80" stroke={accent} strokeDasharray="3 3" />
          <path d="M120 116 C 120 140, 60 140, 41 132" style={faint} strokeDasharray="3 3" />
        </svg>
      );
    case "modules":
      return (
        <svg {...common}>
          {[
            [24, 24],
            [96, 24],
            [168, 24],
            [24, 76],
            [96, 76],
            [168, 76],
          ].map(([x, y], index) => (
            <rect key={index} x={x} y={y} width="48" height="36" rx="4" stroke={index === 4 ? accent : "currentColor"} />
          ))}
          <path d="M72 42 L96 42 M144 42 L168 42 M72 94 L96 94 M144 94 L168 94" style={faint} />
          <path d="M48 60 L48 76 M120 60 L120 76 M192 60 L192 76" style={faint} />
          <path d="M60 126 C 60 118, 180 118, 180 126" style={faint} />
          <ellipse cx="120" cy="132" rx="30" ry="6" />
          <path d="M90 132 V146 A30 6 0 0 0 150 146 V132" />
          <path d="M120 112 L120 126" stroke={accent} />
        </svg>
      );
    case "web":
      return (
        <svg {...common}>
          <rect x="18" y="22" width="150" height="112" rx="5" />
          <path d="M18 40 H168" />
          <circle cx="30" cy="31" r="2" fill="currentColor" stroke="none" />
          <circle cx="38" cy="31" r="2" fill="currentColor" stroke="none" />
          <rect x="30" y="52" width="70" height="10" rx="2" stroke={accent} />
          <rect x="30" y="68" width="100" height="6" rx="2" style={faint} />
          <rect x="30" y="80" width="80" height="6" rx="2" style={faint} />
          <rect x="30" y="98" width="38" height="24" rx="3" />
          <rect x="76" y="98" width="38" height="24" rx="3" />
          <rect x="122" y="98" width="34" height="24" rx="3" style={faint} />
          <rect x="182" y="46" width="42" height="80" rx="7" />
          <path d="M196 53 H210" style={faint} />
          <rect x="190" y="64" width="26" height="8" rx="2" stroke={accent} />
          <rect x="190" y="78" width="26" height="5" rx="2" style={faint} />
          <rect x="190" y="88" width="20" height="5" rx="2" style={faint} />
          <path d="M197 118 H209" />
        </svg>
      );
    case "pipeline":
      return (
        <svg {...common}>
          {[36, 72, 108].map((y) => (
            <g key={y}>
              <rect x="18" y={y - 10} width="30" height="20" rx="3" />
              <path d={`M48 ${y} C 66 ${y}, 66 72, 84 72`} style={faint} />
            </g>
          ))}
          <path d="M84 52 H120 L112 92 H92 Z" />
          <path d="M120 72 H140" style={faint} />
          <ellipse cx="158" cy="56" rx="18" ry="5" />
          <path d="M140 56 V92 A18 5 0 0 0 176 92 V56" />
          <path d="M176 74 H190" style={faint} />
          <rect x="194" y="82" width="8" height="24" fill="currentColor" stroke="none" opacity="0.4" />
          <rect x="206" y="66" width="8" height="40" fill={accent} stroke="none" />
          <rect x="218" y="74" width="8" height="32" fill="currentColor" stroke="none" opacity="0.4" />
          <path d="M190 110 H230" />
        </svg>
      );
    case "compass":
    default:
      return (
        <svg {...common}>
          <rect x="18" y="26" width="140" height="22" rx="11" />
          <circle cx="32" cy="37" r="5" />
          <path d="M36 41 L40 45" />
          <rect x="50" y="34" width="70" height="6" rx="2" style={faint} />
          <path d="M18 128 L60 104 L96 114 L136 82 L170 92 L220 56" stroke={accent} />
          <path d="M18 128 H220" style={faint} />
          <circle cx="220" cy="56" r="4" fill={accent} stroke="none" />
          <rect x="172" y="26" width="52" height="34" rx="4" />
          <path d="M180 36 L184 40 L192 32" stroke={accent} />
          <path d="M198 36 H216" style={faint} />
          <path d="M180 50 L184 54 L192 46" stroke={accent} />
          <path d="M198 50 H216" style={faint} />
        </svg>
      );
  }
}
