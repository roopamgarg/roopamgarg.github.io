const COLS = 60;
const ROWS = 24;
const DOT_R = 1;
const CELL = 8;

function shouldRender(col: number, row: number): boolean {
  // Rough continent mask approximated with ellipses so we avoid shipping real geo data.
  const x = col / COLS;
  const y = row / ROWS;
  const regions: Array<[number, number, number, number]> = [
    [0.22, 0.38, 0.1, 0.18],   // N America
    [0.3, 0.75, 0.07, 0.12],   // S America
    [0.48, 0.42, 0.09, 0.17],  // Europe
    [0.55, 0.72, 0.11, 0.2],   // Africa
    [0.72, 0.48, 0.17, 0.23],  // Asia
    [0.83, 0.82, 0.07, 0.1],   // Oceania
  ];
  for (const [cx, cy, rx, ry] of regions) {
    const dx = (x - cx) / rx;
    const dy = (y - cy) / ry;
    if (dx * dx + dy * dy <= 1) return true;
  }
  return false;
}

interface WorldMapProps {
  highlights?: Array<{ x: number; y: number; label?: string }>;
}

export function WorldMap({ highlights = [] }: WorldMapProps) {
  const width = COLS * CELL;
  const height = ROWS * CELL;

  const dots: Array<{ cx: number; cy: number }> = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (shouldRender(c, r)) {
        dots.push({ cx: c * CELL + CELL / 2, cy: r * CELL + CELL / 2 });
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      aria-hidden="true"
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r={DOT_R}
          fill="rgb(var(--color-border) / 0.25)"
        />
      ))}
      {highlights.map((h, i) => (
        <g key={`h-${i}`}>
          <circle
            cx={h.x * width}
            cy={h.y * height}
            r={4}
            fill="rgb(var(--color-accent) / 0.8)"
          />
          <circle
            cx={h.x * width}
            cy={h.y * height}
            r={10}
            fill="rgb(var(--color-accent) / 0.2)"
          />
        </g>
      ))}
    </svg>
  );
}
