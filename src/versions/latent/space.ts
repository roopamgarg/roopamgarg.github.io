import { p } from "../shared/content";

/*
 * The "embedding space" for the Latent version. Positions are hand-placed by
 * theme: every item gets weights over a few theme clusters and sits at the
 * weighted centre of those clusters, plus a little seeded jitter. Items that
 * belong to two themes (Scout My Home, Anvesha, DPP, Five9) land between them.
 */

export type ClusterId =
  | "retrieval"
  | "agents"
  | "evals"
  | "realtime"
  | "payments"
  | "products"
  | "foundations";

type Vec3 = [number, number, number];

/** `label` is how far above the centre the cluster name sits (negative = below, null = unlabelled). */
export const CLUSTERS: Record<
  ClusterId,
  { name: string; color: string; center: Vec3; spread: number; label?: number | null }
> = {
  retrieval: { name: "Retrieval & memory", color: "#7dd3fc", center: [-6, 2.6, -1], spread: 1.25 },
  agents: { name: "Agents & tools", color: "#a78bfa", center: [-2.2, -2.8, 2.6], spread: 1.2 },
  evals: { name: "Evals & observability", color: "#34d399", center: [4.4, 3.0, 0.6], spread: 1.2 },
  realtime: { name: "Real-time systems", color: "#fbbf24", center: [5.6, -2.4, -2.4], spread: 1.3 },
  payments: { name: "Payments", color: "#fb7185", center: [1.4, -6.0, -0.4], spread: 1.1 },
  products: { name: "Product engineering", color: "#f0abfc", center: [0.6, 3.6, -5.5], spread: 1.3, label: -2.1 },
  foundations: { name: "Foundations", color: "#94a3b8", center: [0, 0.8, -4], spread: 2.4, label: null },
};

export const CLUSTER_ORDER = Object.keys(CLUSTERS) as ClusterId[];
export const clusterIndex = (id: ClusterId) => CLUSTER_ORDER.indexOf(id);

type Weights = Partial<Record<ClusterId, number>>;
export type ItemKind = "project" | "role" | "ai" | "tech";

export interface SpaceItem {
  id: string;
  label: string;
  kind: ItemKind;
  weights: Weights;
  /** Clusters this item belongs to strongly enough to light up with, strongest first. */
  clusters: ClusterId[];
  position: Vec3;
}

export const AI_STACK = ["RAG", "Vector databases", "Agent frameworks", "MCP", "Evals"];

const PROJECT_WEIGHTS: Record<string, Weights> = {
  "Scout My Home": { agents: 0.5, products: 0.3, retrieval: 0.2 },
  Anvesha: { products: 0.6, agents: 0.4 },
  "Webcam Tracker": { realtime: 0.6, products: 0.4 },
  "DPP Protocol": { agents: 0.55, payments: 0.45 },
};

const ROLE_WEIGHTS: Record<string, Weights> = {
  Five9: { evals: 0.5, realtime: 0.5 },
  "Observe.AI": { products: 0.65, realtime: 0.35 },
  Juspay: { payments: 0.8, products: 0.2 },
};

const AI_WEIGHTS: Record<string, Weights> = {
  RAG: { retrieval: 1 },
  "Vector databases": { retrieval: 0.85, foundations: 0.15 },
  "Agent frameworks": { agents: 1 },
  MCP: { agents: 0.85, foundations: 0.15 },
  Evals: { evals: 1 },
};

const TECH_WEIGHTS: Record<string, Weights> = {
  Python: { retrieval: 0.45, foundations: 0.55 },
  PostgreSQL: { retrieval: 0.4, foundations: 0.6 },
  Redis: { realtime: 0.5, retrieval: 0.3, foundations: 0.2 },
  Kafka: { realtime: 0.8, foundations: 0.2 },
  "Node.js": { foundations: 0.6, realtime: 0.4 },
  Kubernetes: { foundations: 0.7, realtime: 0.3 },
  Nginx: { foundations: 0.7, realtime: 0.3 },
  TypeScript: { foundations: 0.6, products: 0.4 },
  JavaScript: { products: 0.5, foundations: 0.5 },
  React: { products: 1 },
  "Next.js": { products: 1 },
  Rust: { realtime: 0.6, products: 0.4 },
  Tauri: { products: 0.6, realtime: 0.4 },
};

/** Project stack entries that are data sources rather than technology. */
const NOT_TECH = new Set(["OpenStreetMap", "RERA data", ...AI_STACK]);

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function gaussian(rand: () => number) {
  const u = 1 - rand();
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function place(id: string, weights: Weights): Vec3 {
  const rand = mulberry32(hash(id));
  const entries = Object.entries(weights) as Array<[ClusterId, number]>;
  const total = entries.reduce((sum, [, w]) => sum + w, 0);
  const pos: Vec3 = [0, 0, 0];
  for (const [cluster, w] of entries) {
    const c = CLUSTERS[cluster].center;
    pos[0] += (c[0] * w) / total;
    pos[1] += (c[1] * w) / total;
    pos[2] += (c[2] * w) / total;
  }
  const jitter = entries.length > 1 ? 0.35 : 0.75;
  return [pos[0] + gaussian(rand) * jitter, pos[1] + gaussian(rand) * jitter, pos[2] + gaussian(rand) * jitter];
}

function make(label: string, kind: ItemKind, weights: Weights): SpaceItem {
  const clusters = (Object.entries(weights) as Array<[ClusterId, number]>)
    .filter(([, w]) => w >= 0.35)
    .sort((a, b) => b[1] - a[1])
    .map(([c]) => c);
  return { id: `${kind}:${label}`, label, kind, weights, clusters, position: place(`${kind}:${label}`, weights) };
}

const techNames = Array.from(
  new Set([...p.techStack, ...p.projects.flatMap((project) => project.stack)]),
).filter((name) => !NOT_TECH.has(name));

export const ITEMS: SpaceItem[] = [
  ...p.projects.map((project) => make(project.name, "project", PROJECT_WEIGHTS[project.name] ?? { products: 1 })),
  ...p.experience.map((job) => make(job.company, "role", ROLE_WEIGHTS[job.company] ?? { products: 1 })),
  ...AI_STACK.map((name) => make(name, "ai", AI_WEIGHTS[name])),
  ...techNames.map((name) => make(name, "tech", TECH_WEIGHTS[name] ?? { foundations: 1 })),
];

export const itemFor = (kind: ItemKind, label: string) =>
  ITEMS.find((item) => item.kind === kind && item.label === label);

/** Items that light up with a cluster, strongest membership first. */
export const neighboursOf = (cluster: ClusterId, limit = 8) =>
  ITEMS.filter((item) => (item.weights[cluster] ?? 0) >= 0.35)
    .sort((a, b) => (b.weights[cluster] ?? 0) - (a.weights[cluster] ?? 0))
    .slice(0, limit);
