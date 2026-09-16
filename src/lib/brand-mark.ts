// Geometry for the Coorbitz network mark: five nodes on a ring, each with an arm that
// sweeps clockwise toward the next node and stops just short of it. Shared by the React
// <NetworkMark> component, the favicon/apple-icon/Open Graph image routes (rendered by
// Satori, which needs literal hex colors), and public/logo.svg — so every surface draws
// exactly the same mark.

const CX = 50;
const CY = 50;
const RING_RADIUS = 34;
const NODE_RADIUS = 7.5;
const ARM_WIDTH = 8;
const ARM_START_DEG = 16;
const ARM_END_DEG = 48;

// Light-background palette, clockwise from the top node. The bottom-left node is the deep
// navy anchor; the right-hand side runs to sky blue, matching the supplied logo artwork.
export const markColorsLight = ["#1F7DC2", "#3AAEE3", "#53C6F2", "#0B3F75", "#1567A8"] as const;
// Lifted equivalents for dark surfaces (the navy node would otherwise vanish).
export const markColorsDark = ["#4FB3E8", "#7FD6F7", "#A9E4FA", "#2A85CF", "#3AA0DE"] as const;

const toRad = (deg: number) => (deg * Math.PI) / 180;
const round = (n: number) => Math.round(n * 100) / 100;
const pointAt = (deg: number, radius = RING_RADIUS) => ({
  x: round(CX + radius * Math.cos(toRad(deg))),
  y: round(CY + radius * Math.sin(toRad(deg))),
});

export type MarkSegment = {
  node: { cx: number; cy: number; r: number };
  arm: string;
  armWidth: number;
};

export const markSegments: MarkSegment[] = markColorsLight.map((_, index) => {
  const base = -90 + 72 * index;
  const node = pointAt(base);
  const start = pointAt(base + ARM_START_DEG);
  const end = pointAt(base + ARM_END_DEG);
  return {
    node: { cx: node.x, cy: node.y, r: NODE_RADIUS },
    arm: `M ${start.x} ${start.y} A ${RING_RADIUS} ${RING_RADIUS} 0 0 1 ${end.x} ${end.y}`,
    armWidth: ARM_WIDTH,
  };
});

export const MARK_VIEWBOX = "0 0 100 100";
