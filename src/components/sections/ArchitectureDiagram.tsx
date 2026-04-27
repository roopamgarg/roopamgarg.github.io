import type { CSSProperties } from "react";
import type { ArchitectureSpec } from "@/types/portfolio";

interface ArchitectureDiagramProps {
  spec: ArchitectureSpec;
}

const V_W = 640;
const V_H = 300;
const NODE_H = 28;
const R = 6;

const CLIENTS_X = 10;
const CLIENTS_W = 112;
const GATEWAY_X = 160;
const GATEWAY_W = 100;
const SERVICES_X = 300;
const SERVICES_W = 140;
const STORES_X = 480;
const STORES_W = 140;

const CLIENTS_RIGHT = CLIENTS_X + CLIENTS_W;
const GATEWAY_LEFT = GATEWAY_X;
const GATEWAY_RIGHT = GATEWAY_X + GATEWAY_W;
const SERVICES_LEFT = SERVICES_X;
const SERVICES_RIGHT = SERVICES_X + SERVICES_W;
const STORES_LEFT = STORES_X;

const BUS_L = (CLIENTS_RIGHT + GATEWAY_LEFT) / 2;
const BUS_R = (GATEWAY_RIGHT + SERVICES_LEFT) / 2;

const CLIENT_YS = [45, 85, 125];
const GATEWAY_Y = 85;
const SERVICE_YS = [28, 68, 108, 148];
const STORE_YS = SERVICE_YS;

const GROUPS = [
  { x: 2, y: 22, w: 128, h: 125 },
  { x: 152, y: 66, w: 116, h: 38 },
  { x: 290, y: 10, w: 160, h: 160 },
  { x: 470, y: 10, w: 160, h: 160 },
];

const RAIL_Y = 215;
const MONITOR = { x: 180, y: 240, w: 280, h: 32 };

function Node({
  x,
  y,
  w,
  label,
  accent = false,
  delay = 0,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  accent?: boolean;
  delay?: number;
}) {
  return (
    <g
      className="architecture-build-item architecture-build-node"
      style={{ "--build-delay": `${delay}s` } as CSSProperties}
    >
      <rect
        x={x}
        y={y - NODE_H / 2}
        width={w}
        height={NODE_H}
        rx={R}
        className={
          accent
            ? "fill-accent/10 stroke-accent/50"
            : "fill-surface-2 stroke-border/15"
        }
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={y + 3.5}
        textAnchor="middle"
        className={
          accent
            ? "fill-accent text-[11px] font-semibold"
            : "fill-text text-[11px]"
        }
        style={{ fontFamily: "inherit" }}
      >
        {label}
      </text>
    </g>
  );
}

function Dot({ x, y }: { x: number; y: number }) {
  return (
    <g className="architecture-build-item architecture-build-dot">
      <circle cx={x} cy={y} r={5} className="fill-accent/15" />
      <circle cx={x} cy={y} r={2.5} className="fill-accent" />
    </g>
  );
}

function FlowPath({
  d,
  delay = 0,
  overlayDelay = 0,
}: {
  d: string;
  delay?: number;
  overlayDelay?: number;
}) {
  return (
    <>
      <path
        d={d}
        pathLength={1}
        className="flow-line architecture-build-line"
        style={{ "--build-delay": `${delay}s` } as CSSProperties}
      />
      <path
        d={d}
        className="flow-overlay"
        style={{ "--flow-delay": `${overlayDelay}s` } as CSSProperties}
      />
    </>
  );
}

function clientPath(y: number) {
  return `M ${CLIENTS_RIGHT} ${y} L ${BUS_L} ${y} L ${BUS_L} ${GATEWAY_Y} L ${GATEWAY_LEFT} ${GATEWAY_Y}`;
}

function servicePath(y: number) {
  return `M ${GATEWAY_RIGHT} ${GATEWAY_Y} L ${BUS_R} ${GATEWAY_Y} L ${BUS_R} ${y} L ${SERVICES_LEFT} ${y}`;
}

function storePath(y: number) {
  return `M ${SERVICES_RIGHT} ${y} L ${STORES_LEFT} ${y}`;
}

export function ArchitectureDiagram({ spec }: ArchitectureDiagramProps) {
  const clients = spec.clients.slice(0, CLIENT_YS.length);
  const services = spec.services.slice(0, SERVICE_YS.length);
  const stores = spec.stores.slice(0, STORE_YS.length);

  const monitorCenterX = MONITOR.x + MONITOR.w / 2;
  const monitorTopY = MONITOR.y;

  const groupBottoms = GROUPS.map((g) => ({
    x: g.x + g.w / 2,
    y: g.y + g.h + 2,
  }));

  return (
    <svg
      viewBox={`0 0 ${V_W} ${V_H}`}
      className="architecture-diagram h-auto w-full"
      role="img"
      aria-label="System architecture diagram"
    >
        {GROUPS.map((g, i) => (
          <rect
            key={`group-${i}`}
            x={g.x}
            y={g.y}
            width={g.w}
            height={g.h}
            rx={10}
            fill="transparent"
            className="architecture-build-item architecture-build-group stroke-border/15"
            strokeWidth={1}
            strokeDasharray="3 4"
            style={{ "--build-delay": `${i * 0.14}s` } as CSSProperties}
          />
        ))}

        {CLIENT_YS.map((y, i) => (
          <FlowPath
            key={`cp-${i}`}
            d={clientPath(y)}
            delay={0.2 + i * 0.12}
            overlayDelay={1.2 + i * 0.3}
          />
        ))}

        {SERVICE_YS.map((y, i) => (
          <FlowPath
            key={`sp-${i}`}
            d={servicePath(y)}
            delay={0.5 + i * 0.1}
            overlayDelay={1.7 + i * 0.25}
          />
        ))}

        {STORE_YS.map((y, i) => (
          <FlowPath
            key={`dp-${i}`}
            d={storePath(y)}
            delay={0.9 + i * 0.08}
            overlayDelay={2 + i * 0.2}
          />
        ))}

        {groupBottoms.map((g, i) => (
          <FlowPath
            key={`mvp-${i}`}
            d={`M ${g.x} ${g.y} L ${g.x} ${RAIL_Y} L ${monitorCenterX} ${RAIL_Y} L ${monitorCenterX} ${monitorTopY}`}
            delay={1.05 + i * 0.12}
            overlayDelay={2.2 + i * 0.3}
          />
        ))}

        {CLIENT_YS.map((y, i) => (
          <Dot key={`cd-${i}`} x={BUS_L} y={y} />
        ))}
        <Dot x={GATEWAY_LEFT} y={GATEWAY_Y} />
        <Dot x={GATEWAY_RIGHT} y={GATEWAY_Y} />
        {SERVICE_YS.map((y, i) => (
          <Dot key={`sd-${i}`} x={BUS_R} y={y} />
        ))}
        {SERVICE_YS.map((y, i) => (
          <Dot key={`sd2-${i}`} x={SERVICES_LEFT} y={y} />
        ))}
        {STORE_YS.map((y, i) => (
          <Dot key={`std-${i}`} x={SERVICES_RIGHT} y={y} />
        ))}
        {STORE_YS.map((y, i) => (
          <Dot key={`std2-${i}`} x={STORES_LEFT} y={y} />
        ))}

        {clients.map((label, i) => (
          <Node
            key={`cn-${i}`}
            x={CLIENTS_X}
            y={CLIENT_YS[i]}
            w={CLIENTS_W}
            label={label}
            delay={0.2 + i * 0.1}
          />
        ))}

        <Node
          x={GATEWAY_X}
          y={GATEWAY_Y}
          w={GATEWAY_W}
          label={spec.gateway}
          accent
          delay={0.6}
        />

        {services.map((label, i) => (
          <Node
            key={`sn-${i}`}
            x={SERVICES_X}
            y={SERVICE_YS[i]}
            w={SERVICES_W}
            label={label}
            delay={0.8 + i * 0.08}
          />
        ))}

        {stores.map((label, i) => (
          <Node
            key={`stn-${i}`}
            x={STORES_X}
            y={STORE_YS[i]}
            w={STORES_W}
            label={label}
            delay={1 + i * 0.08}
          />
        ))}

        <rect
          x={MONITOR.x}
          y={MONITOR.y}
          width={MONITOR.w}
          height={MONITOR.h}
          rx={R}
          className="architecture-build-item architecture-build-node fill-surface-2 stroke-border/15"
          strokeWidth={1}
          style={{ "--build-delay": "1.3s" } as CSSProperties}
        />
        <text
          x={MONITOR.x + MONITOR.w / 2}
          y={MONITOR.y + MONITOR.h / 2 + 4}
          textAnchor="middle"
          className="architecture-build-item architecture-build-node fill-text text-[11px]"
          // Slightly later than the monitor container for a typed-in feel.
          style={{ "--build-delay": "1.4s", fontFamily: "inherit" } as CSSProperties}
        >
          {spec.footer}
        </text>
    </svg>
  );
}
