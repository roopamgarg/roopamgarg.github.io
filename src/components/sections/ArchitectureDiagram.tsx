import { useState, type CSSProperties } from "react";
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
  active = false,
  dimmed = false,
  onMouseEnter,
  onMouseLeave,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  accent?: boolean;
  delay?: number;
  active?: boolean;
  dimmed?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <g
      className={`architecture-build-item architecture-build-node cursor-pointer transition-all duration-500 ease-out ${
        active ? "scale-[1.03]" : dimmed ? "opacity-35" : ""
      }`}
      style={{
        "--build-delay": `${delay}s`,
        transformOrigin: `${x + w / 2}px ${y}px`,
      } as CSSProperties}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Dynamic Glow Filter/Shadow behind node when active */}
      {active && (
        <rect
          x={x - 4}
          y={y - NODE_H / 2 - 4}
          width={w + 8}
          height={NODE_H + 8}
          rx={R + 2}
          fill="rgb(var(--color-accent) / 0.15)"
          className="blur-[6px] transition-all duration-500 ease-out"
        />
      )}
      <rect
        x={x}
        y={y - NODE_H / 2}
        width={w}
        height={NODE_H}
        rx={R}
        className={
          active
            ? "fill-accent/20 stroke-accent"
            : accent
            ? "fill-accent/10 stroke-accent/40"
            : "fill-surface-2 stroke-border/15"
        }
        strokeWidth={active ? 1.5 : 1}
      />
      {active && (
        <rect
          x={x}
          y={y - NODE_H / 2}
          width={w}
          height={NODE_H}
          rx={R}
          fill="transparent"
          stroke="rgb(var(--color-accent))"
          strokeWidth={2.5}
          pathLength="100"
          strokeDasharray="40 60"
          className="border-trace"
        />
      )}
      <text
        x={x + w / 2}
        y={y + 3.5}
        textAnchor="middle"
        className={
          active || accent
            ? "fill-accent text-[11px] font-semibold transition-colors duration-500 ease-out"
            : "fill-text text-[11px] transition-colors duration-500 ease-out"
        }
        style={{ fontFamily: "inherit" }}
      >
        {label}
      </text>
    </g>
  );
}

function Dot({ x, y, active = false, dimmed = false }: { x: number; y: number; active?: boolean; dimmed?: boolean }) {
  return (
    <g className={`architecture-build-item architecture-build-dot transition-all duration-500 ease-out ${dimmed ? "opacity-20" : ""}`}>
      <circle cx={x} cy={y} r={active ? 7 : 5} className={active ? "fill-accent/30" : "fill-accent/15"} />
      <circle cx={x} cy={y} r={active ? 3.5 : 2.5} className="fill-accent" />
    </g>
  );
}

function FlowPath({
  d,
  delay = 0,
  overlayDelay = 0,
  active = false,
  dimmed = false,
}: {
  d: string;
  delay?: number;
  overlayDelay?: number;
  active?: boolean;
  dimmed?: boolean;
}) {
  return (
    <>
      <path
        d={d}
        pathLength={1}
        className={`flow-line architecture-build-line transition-all duration-500 ease-out ${
          active ? "stroke-accent/70 stroke-[1.75px]" : dimmed ? "stroke-border/5" : ""
        }`}
        style={{ "--build-delay": `${delay}s` } as CSSProperties}
      />
      <path
        d={d}
        className={`flow-overlay transition-all duration-500 ease-out ${
          active ? "stroke-[2.5px] opacity-100" : dimmed ? "opacity-10" : ""
        }`}
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

function storePath(fromY: number, toY: number) {
  if (fromY === toY) {
    return `M ${SERVICES_RIGHT} ${fromY} L ${STORES_LEFT} ${toY}`;
  }

  const midX = (SERVICES_RIGHT + STORES_LEFT) / 2;
  return `M ${SERVICES_RIGHT} ${fromY} L ${midX} ${fromY} L ${midX} ${toY} L ${STORES_LEFT} ${toY}`;
}

export function ArchitectureDiagram({ spec }: ArchitectureDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const clients = spec.clients.slice(0, CLIENT_YS.length);
  const services = spec.services.slice(0, SERVICE_YS.length);
  const stores = spec.stores.slice(0, STORE_YS.length);
  const serviceYByLabel = new Map(services.map((label, i) => [label, SERVICE_YS[i]]));
  const storeYByLabel = new Map(stores.map((label, i) => [label, STORE_YS[i]]));

  const serviceStorePaths =
    spec.connections && spec.connections.length > 0
      ? spec.connections.flatMap((connection) => {
          const fromY = serviceYByLabel.get(connection.service);
          if (fromY === undefined) {
            return [];
          }

          return connection.stores.flatMap((storeLabel) => {
            const toY = storeYByLabel.get(storeLabel);
            if (toY === undefined) {
              return [];
            }

            return [
              {
                key: `${connection.service}->${storeLabel}`,
                service: connection.service,
                store: storeLabel,
                d: storePath(fromY, toY),
              },
            ];
          });
        })
      : STORE_YS.map((toY, i) => ({
          key: `default-store-path-${i}`,
          service: services[i] ?? "",
          store: stores[i] ?? "",
          d: storePath(SERVICE_YS[i], toY),
        }));

  const monitorCenterX = MONITOR.x + MONITOR.w / 2;
  const monitorTopY = MONITOR.y;

  const groupBottoms = GROUPS.map((g) => ({
    x: g.x + g.w / 2,
    y: g.y + g.h + 2,
  }));

  const hasHover = hoveredNode !== null;

  return (
    <svg
      viewBox={`0 0 ${V_W} ${V_H}`}
      className="architecture-diagram block h-auto w-full max-w-full"
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
          className="architecture-build-item architecture-build-group stroke-border/15 transition-all duration-500 ease-out"
          strokeWidth={1}
          strokeDasharray="3 4"
          style={{ "--build-delay": `${i * 0.14}s` } as CSSProperties}
        />
      ))}

      {/* Connection Paths: Client to Gateway */}
      {CLIENT_YS.map((y, i) => {
        const clientLabel = clients[i] ?? "";
        const isActive = hoveredNode === clientLabel || hoveredNode === spec.gateway;
        const isDimmed = hasHover && !isActive;
        return (
          <FlowPath
            key={`cp-${i}`}
            d={clientPath(y)}
            delay={0.2 + i * 0.12}
            overlayDelay={1.2 + i * 0.3}
            active={isActive}
            dimmed={isDimmed}
          />
        );
      })}

      {/* Connection Paths: Gateway to Services */}
      {SERVICE_YS.map((y, i) => {
        const serviceLabel = services[i] ?? "";
        const isActive = hoveredNode === serviceLabel || hoveredNode === spec.gateway;
        const isDimmed = hasHover && !isActive;
        return (
          <FlowPath
            key={`sp-${i}`}
            d={servicePath(y)}
            delay={0.5 + i * 0.1}
            overlayDelay={1.7 + i * 0.25}
            active={isActive}
            dimmed={isDimmed}
          />
        );
      })}

      {/* Connection Paths: Services to Stores */}
      {serviceStorePaths.map((path, i) => {
        const isActive = hoveredNode === path.service || hoveredNode === path.store;
        const isDimmed = hasHover && !isActive;
        return (
          <FlowPath
            key={path.key}
            d={path.d}
            delay={0.9 + i * 0.08}
            overlayDelay={2 + i * 0.2}
            active={isActive}
            dimmed={isDimmed}
          />
        );
      })}

      {/* Monitoring/Logging paths */}
      {groupBottoms.map((g, i) => {
        const isActive = hoveredNode === spec.footer;
        const isDimmed = hasHover && !isActive;
        return (
          <FlowPath
            key={`mvp-${i}`}
            d={`M ${g.x} ${g.y} L ${g.x} ${RAIL_Y} L ${monitorCenterX} ${RAIL_Y} L ${monitorCenterX} ${monitorTopY}`}
            delay={1.05 + i * 0.12}
            overlayDelay={2.2 + i * 0.3}
            active={isActive}
            dimmed={isDimmed}
          />
        );
      })}

      {/* Interactive Flow Dots */}
      {CLIENT_YS.map((y, i) => {
        const clientLabel = clients[i] ?? "";
        const active = hoveredNode === clientLabel || hoveredNode === spec.gateway;
        return <Dot key={`cd-${i}`} x={BUS_L} y={y} active={active} dimmed={hasHover && !active} />;
      })}
      <Dot x={GATEWAY_LEFT} y={GATEWAY_Y} active={hoveredNode === spec.gateway} dimmed={hasHover && hoveredNode !== spec.gateway} />
      <Dot x={GATEWAY_RIGHT} y={GATEWAY_Y} active={hoveredNode === spec.gateway} dimmed={hasHover && hoveredNode !== spec.gateway} />
      {SERVICE_YS.map((y, i) => {
        const serviceLabel = services[i] ?? "";
        const active = hoveredNode === serviceLabel || hoveredNode === spec.gateway;
        return <Dot key={`sd-${i}`} x={BUS_R} y={y} active={active} dimmed={hasHover && !active} />;
      })}
      {SERVICE_YS.map((y, i) => {
        const serviceLabel = services[i] ?? "";
        const active = hoveredNode === serviceLabel;
        return <Dot key={`sd2-${i}`} x={SERVICES_LEFT} y={y} active={active} dimmed={hasHover && !active} />;
      })}
      {STORE_YS.map((y, i) => {
        const serviceLabel = services[i] ?? "";
        const active = hoveredNode === serviceLabel;
        return <Dot key={`std-${i}`} x={SERVICES_RIGHT} y={y} active={active} dimmed={hasHover && !active} />;
      })}
      {STORE_YS.map((y, i) => {
        const storeLabel = stores[i] ?? "";
        const active = hoveredNode === storeLabel;
        return <Dot key={`std2-${i}`} x={STORES_LEFT} y={y} active={active} dimmed={hasHover && !active} />;
      })}

      {/* Nodes: Clients */}
      {clients.map((label, i) => {
        const active = hoveredNode === label;
        const dimmed = hasHover && !active;
        return (
          <Node
            key={`cn-${i}`}
            x={CLIENTS_X}
            y={CLIENT_YS[i]}
            w={CLIENTS_W}
            label={label}
            delay={0.2 + i * 0.1}
            active={active}
            dimmed={dimmed}
            onMouseEnter={() => setHoveredNode(label)}
            onMouseLeave={() => setHoveredNode(null)}
          />
        );
      })}

      {/* Node: Gateway */}
      <Node
        x={GATEWAY_X}
        y={GATEWAY_Y}
        w={GATEWAY_W}
        label={spec.gateway}
        accent
        delay={0.6}
        active={hoveredNode === spec.gateway}
        dimmed={hasHover && hoveredNode !== spec.gateway}
        onMouseEnter={() => setHoveredNode(spec.gateway)}
        onMouseLeave={() => setHoveredNode(null)}
      />

      {/* Nodes: Services */}
      {services.map((label, i) => {
        const active = hoveredNode === label;
        const dimmed = hasHover && !active;
        return (
          <Node
            key={`sn-${i}`}
            x={SERVICES_X}
            y={SERVICE_YS[i]}
            w={SERVICES_W}
            label={label}
            delay={0.8 + i * 0.08}
            active={active}
            dimmed={dimmed}
            onMouseEnter={() => setHoveredNode(label)}
            onMouseLeave={() => setHoveredNode(null)}
          />
        );
      })}

      {/* Nodes: Stores */}
      {stores.map((label, i) => {
        const active = hoveredNode === label;
        const dimmed = hasHover && !active;
        return (
          <Node
            key={`stn-${i}`}
            x={STORES_X}
            y={STORE_YS[i]}
            w={STORES_W}
            label={label}
            delay={1 + i * 0.08}
            active={active}
            dimmed={dimmed}
            onMouseEnter={() => setHoveredNode(label)}
            onMouseLeave={() => setHoveredNode(null)}
          />
        );
      })}

      {/* Node: Monitoring Footer */}
      <g
        className={`architecture-build-item architecture-build-node cursor-pointer transition-all duration-500 ease-out ${
          hoveredNode === spec.footer ? "scale-[1.01]" : hasHover && hoveredNode !== spec.footer ? "opacity-35" : ""
        }`}
        style={{
          "--build-delay": "1.3s",
          transformOrigin: `${MONITOR.x + MONITOR.w / 2}px ${MONITOR.y + MONITOR.h / 2}px`,
        } as CSSProperties}
        onMouseEnter={() => setHoveredNode(spec.footer)}
        onMouseLeave={() => setHoveredNode(null)}
      >
        {hoveredNode === spec.footer && (
          <rect
            x={MONITOR.x - 4}
            y={MONITOR.y - 4}
            width={MONITOR.w + 8}
            height={MONITOR.h + 8}
            rx={R + 2}
            fill="rgb(var(--color-accent) / 0.15)"
            className="blur-[6px] transition-all duration-500 ease-out"
          />
        )}
        <rect
          x={MONITOR.x}
          y={MONITOR.y}
          width={MONITOR.w}
          height={MONITOR.h}
          rx={R}
          className={
            hoveredNode === spec.footer
              ? "fill-accent/20 stroke-accent"
              : "fill-surface-2 stroke-border/15"
          }
          strokeWidth={hoveredNode === spec.footer ? 1.5 : 1}
        />
        {hoveredNode === spec.footer && (
          <rect
            x={MONITOR.x}
            y={MONITOR.y}
            width={MONITOR.w}
            height={MONITOR.h}
            rx={R}
            fill="transparent"
            stroke="rgb(var(--color-accent))"
            strokeWidth={2.5}
            pathLength="100"
            strokeDasharray="30 70"
            className="border-trace"
          />
        )}
        <text
          x={MONITOR.x + MONITOR.w / 2}
          y={MONITOR.y + MONITOR.h / 2 + 4}
          textAnchor="middle"
          className={
            hoveredNode === spec.footer
              ? "fill-accent text-[11px] font-semibold transition-colors duration-500 ease-out"
              : "fill-text text-[11px] transition-colors duration-500 ease-out"
          }
          style={{
            "--build-delay": "1.4s",
            fontFamily: "inherit",
          } as CSSProperties}
        >
          {spec.footer}
        </text>
      </g>
    </svg>
  );
}
