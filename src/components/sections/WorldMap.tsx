// Stylized outline of India rendered with a dotted interior. Coordinates use
// a 290x300 viewBox where longitude 68E..97E maps to x 0..290 and latitude
// 37N..7N maps to y 0..300, so relative highlight coords can be passed as
// fractions of width/height.
const INDIA_PATH =
  "M 60,25 L 95,10 L 125,28 L 135,55 L 165,95 L 215,100 L 245,95 L 275,78 L 290,92 L 262,128 L 245,152 L 213,160 L 185,172 L 165,193 L 128,215 L 120,243 L 108,268 L 92,290 L 80,263 L 65,238 L 58,212 L 48,185 L 45,160 L 27,165 L 12,148 L 3,135 L 18,127 L 32,120 L 26,97 L 56,68 L 68,48 L 68,35 Z";

const MAP_WIDTH = 290;
const MAP_HEIGHT = 300;
const DOT_SPACING = 8;
const DOT_R = 1;

interface WorldMapProps {
  highlights?: Array<{ x: number; y: number; label?: string }>;
}

export function WorldMap({ highlights = [] }: WorldMapProps) {
  const dots: Array<{ cx: number; cy: number }> = [];
  for (let y = DOT_SPACING / 2; y < MAP_HEIGHT; y += DOT_SPACING) {
    for (let x = DOT_SPACING / 2; x < MAP_WIDTH; x += DOT_SPACING) {
      dots.push({ cx: x, cy: y });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      className="mx-auto h-auto w-full max-w-[110px]"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="india-clip">
          <path d={INDIA_PATH} />
        </clipPath>
      </defs>

      <g clipPath="url(#india-clip)">
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r={DOT_R}
            fill="rgb(var(--color-border) / 0.45)"
          />
        ))}
      </g>

      {highlights.map((h, i) => {
        const cx = h.x * MAP_WIDTH;
        const cy = h.y * MAP_HEIGHT;
        return (
          <g key={`h-${i}`}>
            <circle
              cx={cx}
              cy={cy}
              r={10}
              fill="rgb(var(--color-accent) / 0.25)"
            >
              <animate
                attributeName="r"
                values="6;16;6"
                dur="2.4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;0;0.6"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={cx} cy={cy} r={4} fill="rgb(var(--color-accent))" />
          </g>
        );
      })}
    </svg>
  );
}
