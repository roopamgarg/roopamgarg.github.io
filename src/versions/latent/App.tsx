import { useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, Download, Github } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { gsap, ScrollTrigger, useGSAP, MQ, prefersReducedMotion } from "../shared/motion";
import { useSiteMotion } from "../shared/useSiteMotion";
import { trackCtaClick, trackProjectClick, trackResumeDownload } from "@/lib/analytics";
import { useSectionView } from "@/hooks/useSectionView";
import { SplitWords } from "../shared/SplitWords";
import { current, experienceMeta, p, projectHref, projectsMeta, year } from "../shared/content";
import { CLUSTERS, itemFor, neighboursOf, type ClusterId } from "./space";
import { LatentScene, type CameraRig } from "./LatentScene";

const PAD = "px-5 md:px-10";
const SHELL = "mx-auto w-full max-w-[1360px]";
const GLASS = "border border-white/10 bg-[#0a0c14]/70 backdrop-blur-xl";

/* Camera keyframes. The wide shots look slightly left of the field so the map sits beside the copy. */
const WIDE_DESKTOP: CameraRig = { px: -6, py: 1, pz: 19, tx: -6, ty: -2.2, tz: 0 };
const WIDE_MOBILE: CameraRig = { px: 0, py: 0, pz: 27, tx: 0, ty: -3, tz: 0 };
const OVERVIEW: CameraRig = { px: 2.5, py: 3, pz: 21, tx: 0, ty: -0.5, tz: 0 };
const CORE: CameraRig = { px: 0, py: 0.4, pz: 11, tx: 0, ty: 0.4, tz: 0 };

/** Frame a cluster so it sits on the side opposite its text panel (or above it on phones). */
function camFor(id: ClusterId, panelLeft: boolean, desktop: boolean): CameraRig {
  const [x, y, z] = CLUSTERS[id].center;
  if (!desktop) return { px: x, py: y - 1.4, pz: z + 9.5, tx: x, ty: y - 2.6, tz: z };
  const s = panelLeft ? -1 : 1;
  return { px: x + s * 1.4, py: y + 0.9, pz: z + 7.5, tx: x + s * 2.7, ty: y - 0.2, tz: z };
}

const scout = p.projects.find((project) => project.name === "Scout My Home");
const anvesha = p.projects.find((project) => project.name === "Anvesha");
const dpp = p.projects.find((project) => project.name === "DPP Protocol");
const webcam = p.projects.find((project) => project.name === "Webcam Tracker");
const lowerFirst = (s = "") => s.charAt(0).toLowerCase() + s.slice(1);

interface Stop {
  id: ClusterId;
  title: string;
  body: string;
  projects?: Array<Project | undefined>;
}

const STOPS: Stop[] = [
  {
    id: "retrieval",
    title: "Grounding answers in the right context.",
    body: "RAG pipelines on vector databases: chunking and embedding data, indexing it, and pulling back the context a model needs to answer well.",
  },
  {
    id: "agents",
    title: "Agents with real tools and clear rules.",
    body: `Agent frameworks and MCP servers that give models tools to act with and rules to stay within. In ${scout?.name}, an agent reads RERA floor plans to check each flat, add vastu markings and build a 3D model. In ${anvesha?.name}, the characters you question are AI agents that reveal clues by set rules and hold back what they aren't meant to say.`,
    projects: [scout, anvesha],
  },
  {
    id: "evals",
    title: "Measuring what the system actually does.",
    body: `Evals to check model behaviour before it ships, and observability once it runs. At ${current.company} I build software that records and analyses what contact center agents do on screen during calls.`,
  },
  {
    id: "realtime",
    title: "Built to work in real time.",
    body: `Live screen monitoring and remote control for contact center agents at ${current.company}. And ${webcam?.name}: ${lowerFirst(webcam?.description)}`,
    projects: [webcam],
  },
  {
    id: "payments",
    title: "Where agents meet money.",
    body: `Payment flows at Juspay, built to raise transaction success. ${dpp?.name}, which sits between agents and payments on this map, ${lowerFirst(dpp?.description)}`,
    projects: [dpp],
  },
];

export default function App() {
  useSiteMotion();
  useSectionView("top");
  useSectionView("map", 0.1);
  useSectionView("work", 0.1);
  useSectionView("experience", 0.3);
  useSectionView("contact", 0.3);
  const main = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const labels = useRef<HTMLDivElement>(null);
  const [noGL, setNoGL] = useState(false);

  useGSAP(
    () => {
      if (!canvas.current || !labels.current) return;
      const desktopAtStart = window.matchMedia(MQ.desktop).matches;
      let scene: LatentScene;
      try {
        scene = new LatentScene(canvas.current, labels.current, {
          reduced: prefersReducedMotion(),
          mobile: !desktopAtStart,
          start: desktopAtStart ? WIDE_DESKTOP : WIDE_MOBILE,
        });
      } catch {
        setNoGL(true);
        return;
      }

      // Highlighting a cluster is not motion, so it also runs for reduced-motion visitors.
      STOPS.forEach((stop) => {
        ScrollTrigger.create({
          trigger: `#stop-${stop.id}`,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) scene.setFocus(stop.id);
            else if (scene.focused === stop.id) scene.setFocus(null);
          },
        });
      });

      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;
        const wide = desktop ? WIDE_DESKTOP : WIDE_MOBILE;

        gsap.fromTo(scene.state, { intro: 1 }, { intro: 0, duration: 3.2, ease: "expo.out", delay: 0.15 });

        const flight = gsap.timeline({
          scrollTrigger: { trigger: "#map", start: "top bottom", end: "bottom bottom", scrub: 1.2 },
        });
        let prev = wide;
        STOPS.forEach((stop, i) => {
          const next = camFor(stop.id, i % 2 === 0, desktop);
          flight.fromTo(
            scene.cam,
            { ...prev },
            { ...next, duration: 0.75, ease: "power2.inOut", immediateRender: false },
            i,
          );
          prev = next;
        });
        flight.to({}, { duration: 0.25 }, STOPS.length - 0.25);

        gsap.fromTo(scene.state, { labels: 1 }, {
          labels: 0,
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: "#work", start: "top 90%", end: "top 45%", scrub: true },
        });
        gsap.fromTo(scene.cam, { ...prev }, {
          ...OVERVIEW,
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: "#work", start: "top bottom", end: "top 25%", scrub: 1.2 },
        });
        gsap.fromTo(scene.cam, { ...OVERVIEW }, {
          ...CORE,
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: "#contact", start: "top bottom", end: "top top", scrub: 1.2 },
        });
        gsap.fromTo(scene.state, { collapse: 0 }, {
          collapse: 1,
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: "#contact", start: "top 85%", end: "top 5%", scrub: 1.2 },
        });
      });

      return () => {
        mm.revert();
        scene.dispose();
      };
    },
    { scope: main },
  );

  return (
    <main ref={main} className="grain relative w-full max-w-full overflow-x-clip text-[#e9ebf2]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_60%_40%,#0d1022_0%,#05060a_65%)]"
      >
        {!noGL && <canvas ref={canvas} className="block h-full w-full" />}
      </div>
      <div ref={labels} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" />

      <Nav />
      <Hero />
      <MapSection />
      <Work />
      <Trajectory />
      <Contact />
    </main>
  );
}

/* ------------------------------------------------------------------ Nav */

function Nav() {
  const links = [
    { href: "#map", label: "Map" },
    { href: "#work", label: "Work" },
    { href: "#experience", label: "Experience" },
  ];

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 pt-4 md:px-8 md:pt-6">
      <a href="#top" className={`pointer-events-auto flex items-center gap-3 rounded-full py-2 pl-3 pr-5 ${GLASS}`}>
        <span aria-hidden="true" className="relative h-5 w-5">
          <span className="absolute left-0 top-1 h-1.5 w-1.5 rounded-full" style={{ background: CLUSTERS.retrieval.color }} />
          <span className="absolute right-0.5 top-0 h-2 w-2 rounded-full" style={{ background: CLUSTERS.agents.color }} />
          <span className="absolute bottom-0 left-1.5 h-1.5 w-1.5 rounded-full" style={{ background: CLUSTERS.evals.color }} />
        </span>
        <span className="text-sm font-bold tracking-tight">{p.brand}</span>
      </a>
      <nav aria-label="Primary" className={`pointer-events-auto flex items-center gap-1 rounded-full p-1.5 ${GLASS}`}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-white/65 transition-colors duration-300 hover:bg-white/[0.08] hover:text-white md:block"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact" onClick={() => trackCtaClick("lets_talk", "nav")}
          className="rounded-full bg-[#e9ebf2] px-4 py-2 text-sm font-bold text-[#05060a] transition-transform duration-300 hover:scale-[1.04]"
        >
          Let&apos;s talk
        </a>
      </nav>
    </header>
  );
}

/* ----------------------------------------------------------------- Hero */

function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" }, delay: 0.6 })
          .from(".js-hero-word", { yPercent: 110, duration: 1.4, stagger: 0.05 })
          .from(".js-hero-fade", { y: 22, opacity: 0, duration: 1.2, stagger: 0.08 }, 0.5);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className={`relative z-10 flex min-h-[100svh] flex-col justify-end pb-14 pt-32 md:pb-16 ${PAD}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_8%_100%,rgba(5,6,10,0.94)_0%,rgba(5,6,10,0.6)_38%,transparent_68%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-[#05060a] via-[#05060a]/85 to-transparent md:hidden"
      />
      <div className={`relative ${SHELL}`}>
        <p className="js-hero-fade mb-8 font-mono text-xs uppercase tracking-[0.2em] text-white/55">
          <span className="hidden sm:inline">{p.brand} / </span>
          {current.role}, {current.company}
        </p>
        <h1 className="max-w-[72rem] text-[clamp(2.4rem,5.8vw,6.5rem)] font-black leading-[0.95] tracking-[-0.05em]">
          <SplitWords text="It worked in the demo." wordClassName="js-hero-word" className="text-white/40" />
          <br />
          <SplitWords text="I make it work in production." wordClassName="js-hero-word" />
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="js-hero-fade max-w-md text-lg leading-relaxed text-white/65 md:max-w-[32rem]">
            The systems that keep your model reliable with real users: retrieval, vector search, agents,
            MCP tools and evals.
          </p>
          <div className="js-hero-fade flex flex-wrap gap-3">
            <a
              href="#map" onClick={() => trackCtaClick("fly_through_map", "hero")}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#e9ebf2] px-7 py-4 text-sm font-bold text-[#05060a] transition-transform duration-300 hover:scale-[1.03]"
            >
              Fly through the map
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href={p.hero.resumeHref} download onClick={() => trackResumeDownload("hero")}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-sm font-bold text-[#e9ebf2] transition-colors duration-300 hover:bg-white/10 ${GLASS}`}
            >
              {p.hero.secondaryCta}
              <Download className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------- Map (camera flight) */

function MapSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>(".js-stop-card").forEach((card) => {
          gsap.from(card, {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="map" ref={root} aria-label="A map of my work" className="relative z-10">
      {STOPS.map((stop, i) => (
        <StopPanel key={stop.id} stop={stop} left={i % 2 === 0} />
      ))}
      <p className={`pb-20 text-center font-mono text-[11px] tracking-[0.1em] text-white/35 ${PAD}`}>
        Points are grouped by theme to map my work. They are not computed by a model.
      </p>
    </section>
  );
}

function StopPanel({ stop, left }: { stop: Stop; left: boolean }) {
  const cluster = CLUSTERS[stop.id];
  const neighbours = neighboursOf(stop.id, 8);
  const projects = (stop.projects ?? []).filter((project): project is Project => Boolean(project?.image));

  return (
    <div
      id={`stop-${stop.id}`}
      className={`flex min-h-[100svh] items-end py-24 md:items-center ${PAD} ${left ? "md:justify-start" : "md:justify-end"}`}
    >
      <article className={`js-stop-card w-full max-w-[28rem] rounded-[1.75rem] p-7 md:p-9 ${GLASS}`}>
        <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: cluster.color }}>
          <span className="h-2 w-2 rounded-full" style={{ background: cluster.color, boxShadow: `0 0 12px ${cluster.color}` }} />
          {cluster.name}
        </p>
        <h2 className="mt-5 text-[clamp(1.9rem,2.8vw,2.6rem)] font-bold leading-[1.04] tracking-[-0.035em]">{stop.title}</h2>
        <p className="mt-4 leading-relaxed text-white/65">{stop.body}</p>

        {projects.length > 0 && (
          <div className="mt-6 grid gap-2">
            {projects.map((project) => (
              <a
                key={project.name}
                href={projectHref(project)} onClick={() => trackProjectClick(project.name, project.live ? "live" : "github")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 pr-4 transition-colors duration-300 hover:bg-white/[0.07]"
              >
                <span className="block h-14 w-24 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={project.image!.src}
                    alt=""
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold">{project.name}</span>
                  <span className="block truncate text-sm text-white/50">
                    {project.live ? new URL(project.live).hostname : "GitHub"}
                  </span>
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/70" aria-hidden="true" />
              </a>
            ))}
          </div>
        )}

        <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">Nearest neighbours</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {neighbours.map((item) => (
            <li
              key={item.id}
              className="rounded-full border px-3 py-1 text-sm text-white/80"
              style={{ borderColor: `${cluster.color}55`, background: `${cluster.color}12` }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

/* ---------------------------------------------- Work (stacking cards) */

/** A dark card lit by the colours of the clusters the project sits in on the map. */
function cardGlow(project: Project) {
  const weights = Object.entries(itemFor("project", project.name)?.weights ?? { products: 1 }) as Array<[ClusterId, number]>;
  const [first, second = first] = weights.sort((a, b) => b[1] - a[1]).map(([id]) => CLUSTERS[id].color);
  return {
    accent: first,
    background: [
      `radial-gradient(55% 75% at 88% 12%, ${first}52, transparent 72%)`,
      `radial-gradient(45% 65% at 55% 105%, ${second}3a, transparent 70%)`,
      "#0b0d17",
    ].join(", "),
  };
}

function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(".js-work-word", {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
        const items = gsap.utils.toArray<HTMLElement>(".js-stack-item");
        items.forEach((item, i) => {
          gsap.fromTo(
            item.querySelector(".js-card-media"),
            { scale: 0.8 },
            { scale: 1, ease: "none", scrollTrigger: { trigger: item, start: "top bottom", end: "top 25%", scrub: true } },
          );

          const next = items[i + 1];
          if (!next) return;
          const stacked = { trigger: next, start: "top bottom", end: `top top+=${120 + (i + 1) * 20}`, scrub: true };
          gsap.to(item.querySelector(".js-card"), { scale: 0.9, ease: "none", scrollTrigger: stacked });
          gsap.to(item.querySelector(".js-card-shade"), { opacity: 0.6, ease: "none", scrollTrigger: stacked });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} className={`relative z-10 bg-[#05060a]/85 py-32 md:py-48 ${PAD}`}>
      <div aria-hidden="true" className="absolute inset-x-0 -top-48 h-48 bg-gradient-to-b from-transparent to-[#05060a]/85" />
      <div className={SHELL}>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
          <h2 className="text-[clamp(2.75rem,6vw,6rem)] font-black leading-[0.95] tracking-[-0.05em]">
            <SplitWords text="Selected work" wordClassName="js-work-word" />
          </h2>
          <div className="max-w-sm">
            <p className="text-lg leading-relaxed text-white/60">{projectsMeta?.blurb}</p>
            {projectsMeta?.ctaHref && (
              <a
                href={projectsMeta.ctaHref} onClick={() => trackCtaClick("all_projects", "work")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white/80 transition-colors hover:text-[#7dd3fc]"
              >
                {projectsMeta.ctaLabel}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <div>
          {p.projects.map((project, i) => (
            <div
              key={project.name}
              className="js-stack-item sticky mb-[10vh] last:mb-0"
              style={{ top: `calc(5.5rem + ${i * 1.25}rem)` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const clusters = itemFor("project", project.name)?.clusters ?? [];
  const glow = cardGlow(project);

  return (
    <article
      className="js-card relative origin-top overflow-hidden rounded-[1.75rem] ring-1 ring-inset ring-white/10 will-change-transform md:h-[min(76vh,46rem)]"
      style={{ background: glow.background }}
    >
      <div className="js-card-shade pointer-events-none absolute inset-0 z-20 bg-[#05060a] opacity-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${glow.accent}, transparent)` }}
      />
      <div className="grid h-full gap-10 p-6 md:grid-cols-12 md:gap-10 md:p-12">
        <div className="flex flex-col md:col-span-5">
          <ul className="flex flex-wrap gap-2" aria-label="Where it sits on the map">
            {clusters.map((id) => (
              <li
                key={id}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-[#05060a]/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/75"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: CLUSTERS[id].color }} />
                {CLUSTERS[id].name}
              </li>
            ))}
          </ul>
          <h3 className="mt-10 text-[clamp(2.6rem,4.8vw,5rem)] font-black leading-[0.9] tracking-[-0.05em] md:mt-auto">
            {project.name}
          </h3>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-white/65">{project.description}</p>
          <p className="mt-5 font-mono text-xs tracking-[0.06em] text-white/45">{project.stack.join("  /  ")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.live && (
              <a
                href={project.live} onClick={() => trackProjectClick(project.name, "live")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#e9ebf2] px-6 py-3 text-sm font-bold text-[#05060a] transition-transform duration-300 hover:scale-[1.04]"
              >
                Visit site
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">: {project.name}</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github} onClick={() => trackProjectClick(project.name, "github")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-[#e9ebf2] transition-colors duration-300 hover:bg-[#e9ebf2] hover:text-[#05060a]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                Source
                <span className="sr-only">: {project.name}</span>
              </a>
            )}
          </div>
        </div>
        <a
          href={projectHref(project)} onClick={() => trackProjectClick(project.name, project.live ? "live" : "github")}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          className="group self-center md:col-span-7"
        >
          <div
            className="js-card-media overflow-hidden rounded-[1.1rem] ring-1 ring-white/10 will-change-transform"
            style={{ boxShadow: `0 40px 90px -40px ${glow.accent}80` }}
          >
            {project.image && (
              <img
                src={project.image.src}
                alt=""
                loading="lazy"
                width={1200}
                height={750}
                className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
            )}
          </div>
        </a>
      </div>
    </article>
  );
}

/* ------------------------------------------------ Trajectory (timeline) */

function Trajectory() {
  const root = useRef<HTMLElement>(null);
  const jobs = [...p.experience].reverse();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          ".js-traj-line",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".js-traj", start: "top 75%", end: "bottom 60%", scrub: true } },
        );
        gsap.fromTo(
          ".js-traj-line-v",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".js-traj", start: "top 75%", end: "bottom 60%", scrub: true } },
        );
        gsap.from(".js-traj-node", {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".js-traj", start: "top 75%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="experience" ref={root} className={`relative z-10 bg-[#05060a]/85 py-32 md:py-48 ${PAD}`}>
      <div className={SHELL}>
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-24">
          <h2 className="text-[clamp(2.75rem,6vw,6rem)] font-black leading-[0.95] tracking-[-0.05em]">Trajectory</h2>
          <div className="max-w-sm">
            <p className="text-lg leading-relaxed text-white/60">{experienceMeta?.blurb}</p>
            {experienceMeta?.ctaHref && (
              <a
                href={experienceMeta.ctaHref} onClick={() => trackCtaClick("full_timeline", "experience")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white/80 transition-colors hover:text-[#7dd3fc]"
              >
                {experienceMeta.ctaLabel}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <div className="js-traj relative">
          <div aria-hidden="true" className="absolute inset-x-0 top-[7px] hidden h-px bg-white/10 md:block">
            <div className="js-traj-line h-full origin-left bg-gradient-to-r from-[#fb7185] via-[#f0abfc] to-[#34d399]" />
          </div>
          <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10 md:hidden">
            <div className="js-traj-line-v h-full w-full origin-top bg-gradient-to-b from-[#fb7185] via-[#f0abfc] to-[#34d399]" />
          </div>
          <ol
            className="grid gap-14 md:grid-cols-[repeat(var(--jobs),minmax(0,1fr))] md:gap-8"
            style={{ "--jobs": jobs.length } as CSSProperties}
          >
            {jobs.map((job) => {
              const cluster = itemFor("role", job.company)?.clusters[0] ?? "products";
              const color = CLUSTERS[cluster].color;
              return (
                <li key={job.period} className="js-traj-node relative pl-10 md:pl-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 block h-[15px] w-[15px] rounded-full border-2 border-[#05060a] md:relative"
                    style={{ background: color, boxShadow: `0 0 18px ${color}` }}
                  />
                  <p className="font-mono text-xs text-white/50 md:mt-8">{job.period}</p>
                  <h3 className="mt-3 text-3xl font-black tracking-[-0.035em]">{job.company}</h3>
                  <p className="mt-1 font-medium text-white/80">{job.role}</p>
                  <p className="mt-4 leading-relaxed text-white/55">{job.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Contact */

function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(".js-cta-word", {
          yPercent: 110,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".js-cta-head", start: "top 85%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="contact" ref={root} className={`relative z-10 flex min-h-[100svh] flex-col justify-end pb-8 pt-[50vh] ${PAD}`}>
      <div className={`${SHELL} text-center`}>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
          {p.hero.titleLead} {p.hero.titleAccent}
        </p>
        <h2 className="js-cta-head mx-auto mt-6 max-w-[80rem] text-[clamp(2.4rem,4.6vw,5.25rem)] font-black leading-[0.98] tracking-[-0.045em]">
          <SplitWords text="Got a model?" wordClassName="js-cta-word" className="text-white/40" />
          <br />
          <SplitWords text="Let's build the system around it." wordClassName="js-cta-word" />
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${p.contact.email}`} onClick={() => trackCtaClick("email", "contact")}
            className="group inline-flex items-center gap-3 rounded-full bg-[#e9ebf2] px-8 py-5 text-base font-bold text-[#05060a] transition-transform duration-300 hover:scale-[1.03] md:text-lg"
          >
            {p.contact.email}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
          </a>
          <a
            href={p.contact.linkedin} onClick={() => trackCtaClick("linkedin", "contact")}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 rounded-full px-8 py-5 text-base font-bold text-[#e9ebf2] transition-colors duration-300 hover:bg-white/10 md:text-lg ${GLASS}`}
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>

      <footer className={`${SHELL} mt-24 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-white/45 md:mt-32 md:flex-row md:items-center md:justify-between`}>
        <p>
          &copy; {year} {p.brand}. {p.contact.location}.
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3">
          <a href={p.contact.github} onClick={() => trackCtaClick("github", "footer")} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
            GitHub
          </a>
          <a href={p.contact.linkedin} onClick={() => trackCtaClick("linkedin", "footer")} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
            LinkedIn
          </a>
          <a href={p.hero.resumeHref} download onClick={() => trackResumeDownload("footer")} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
            Resume
          </a>
          <a href="#top" className="transition-colors hover:text-white">
            Back to top
          </a>
        </nav>
      </footer>
    </section>
  );
}
