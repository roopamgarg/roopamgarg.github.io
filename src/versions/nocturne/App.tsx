import { Fragment, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Brain, Download, Github } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { gsap, useGSAP, MQ } from "../shared/motion";
import { useSiteMotion } from "../shared/useSiteMotion";
import { useLocalTime } from "../shared/useLocalTime";
import { SplitWords } from "../shared/SplitWords";
import {
  TRAIT_ICONS,
  current,
  experienceMeta,
  monogram,
  navLinks,
  p,
  picsum,
  projectHref,
  projectsMeta,
  year,
} from "../shared/content";

const PAD = "px-5 md:px-[7vw]";
const GLASS = "border border-white/10 bg-white/[0.04] backdrop-blur-xl";

export default function App() {
  useSiteMotion();

  return (
    <main className="grain relative w-full max-w-full overflow-x-clip text-[#f3f0ff]">
      <Aurora />
      <Nav />
      <Hero />
      <Work />
      <Manifesto />
      <Experience />
      <Principles />
      <Contact />
    </main>
  );
}

/* --------------------------------------------------- Ambient background */

function Aurora() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const drift = { ease: "sine.inOut", yoyo: true, repeat: -1 };
        gsap.to(".js-blob-a", { xPercent: 22, yPercent: 14, duration: 16, ...drift });
        gsap.to(".js-blob-b", { xPercent: -18, yPercent: -12, duration: 19, ...drift });
        gsap.to(".js-blob-c", { xPercent: 12, yPercent: -20, duration: 23, ...drift });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="js-blob-a absolute -left-[12vw] -top-[18vw] h-[58vw] w-[58vw] rounded-full bg-[#5b3bff]/30 blur-[140px]" />
      <div className="js-blob-b absolute -right-[14vw] top-[18vh] h-[46vw] w-[46vw] rounded-full bg-[#ff8f6b]/[0.18] blur-[150px]" />
      <div className="js-blob-c absolute -bottom-[22vw] left-[22vw] h-[52vw] w-[52vw] rounded-full bg-[#2a5bff]/20 blur-[160px]" />
    </div>
  );
}

/* ------------------------------------------------------------------ Nav */

function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-5 z-50 flex items-center justify-between px-4 md:px-8">
      <a href="#top" className={`pointer-events-auto flex items-center gap-3 rounded-full p-1.5 pr-5 ${GLASS}`}>
        <img src={p.about.portrait.src} alt="" className="h-9 w-9 rounded-full object-cover" />
        <span className="text-sm font-medium tracking-tight">{p.brand}</span>
      </a>
      <nav aria-label="Primary" className={`pointer-events-auto flex items-center gap-1 rounded-full p-1.5 ${GLASS}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hidden rounded-full px-4 py-2 text-sm text-white/65 transition-colors duration-300 hover:bg-white/[0.08] hover:text-white md:block"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="rounded-full bg-[#f3f0ff] px-4 py-2 text-sm font-medium text-[#08070d] transition-transform duration-300 hover:scale-[1.04]"
        >
          Let&apos;s talk
        </a>
      </nav>
    </header>
  );
}

/* ---------------------------------------------- Hero (artistic asymmetry) */

function Hero() {
  const root = useRef<HTMLElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const time = useLocalTime();
  const accentWords = p.hero.titleAccent.split(" ");
  const accentLast = accentWords.pop() ?? "";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".js-float", { scale: 0.8, rotate: 5, y: 90, opacity: 0, duration: 2.2 }, 0)
          .from(".js-hero-word", { yPercent: 110, duration: 1.4, stagger: 0.05 }, 0.2)
          .from(".js-hero-fade", { y: 24, opacity: 0, duration: 1.2, stagger: 0.08 }, 0.75)
          .from(".js-float-small", { scale: 0.4, opacity: 0, duration: 1.6 }, 0.9);

        const scrolled = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".js-float-wrap", { yPercent: -16, ease: "none", scrollTrigger: scrolled });
        gsap.to(".js-float-small-wrap", { yPercent: -90, ease: "none", scrollTrigger: scrolled });

        if (!desktop || !tilt.current) return;
        const xTo = gsap.quickTo(tilt.current, "x", { duration: 1.4, ease: "power3" });
        const yTo = gsap.quickTo(tilt.current, "y", { duration: 1.4, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          xTo((e.clientX / window.innerWidth - 0.5) * 28);
          yTo((e.clientY / window.innerHeight - 0.5) * 28);
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      className={`relative z-10 pb-24 pt-36 md:min-h-[100svh] md:pb-40 md:pt-[24vh] ${PAD}`}
    >
      <div className="relative z-20 max-w-[68rem]">
        <p className="js-hero-fade mb-8 flex items-center gap-3 text-sm text-white/60">
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#ffc2a3] to-[#a99bff]" />
          {p.brand}, {current.role} at {current.company}
        </p>
        <h1 className="text-[clamp(2.6rem,5.4vw,6rem)] font-light leading-[1.02] tracking-[-0.045em] [text-shadow:0_2px_30px_rgba(8,7,13,0.6)]">
          <SplitWords text={p.hero.titleLead} wordClassName="js-hero-word" />
          <br className="hidden md:block" />{" "}
          <SplitWords text={accentWords.join(" ")} wordClassName="js-hero-word" />{" "}
          <SplitWords text={accentLast} wordClassName="js-hero-word" className="text-aurora font-medium" />
        </h1>
        <p className="js-hero-fade mt-8 max-w-md text-lg leading-relaxed text-white/60">
          Scalable architecture, clean code and thoughtful design. Right now I&apos;m building
          real-time contact center software at {current.company}.
        </p>
        <div className="js-hero-fade mt-10 flex flex-wrap gap-3">
          <a
            href="#work"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#f3f0ff] px-7 py-4 text-sm font-semibold text-[#08070d] transition-transform duration-300 hover:scale-[1.03]"
          >
            {p.hero.primaryCta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a
            href={p.hero.resumeHref} download
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-sm font-semibold text-[#f3f0ff] transition-colors duration-300 hover:bg-white/10 ${GLASS}`}
          >
            {p.hero.secondaryCta}
            <Download className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="js-float-wrap relative z-10 ml-auto mt-16 w-[82%] md:absolute md:bottom-0 md:right-[4vw] md:mt-0 md:w-[37vw]">
        <div ref={tilt}>
          <figure className="js-float group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_50px_140px_-40px_rgba(91,59,255,0.7)]">
            <img
              src={picsum("facade", 900, 1125)}
              alt=""
              className="h-full w-full object-cover saturate-[1.15] transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#5b3bff]/45 via-transparent to-[#ff8f6b]/30 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08070d]/80 via-transparent to-[#08070d]/30" />
            <figcaption className="absolute inset-x-6 bottom-6 flex justify-between text-sm text-white/80">
              <span>{p.contact.location}</span>
              <span className="tabular-nums">{time} IST</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="js-float-small-wrap absolute bottom-[34vh] right-[calc(4vw+32vw)] z-20 hidden md:block">
        <div className="js-float-small h-[8.5vw] w-[8.5vw] overflow-hidden rounded-full border-[6px] border-[#08070d] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <img src={p.about.portrait.src} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------- Work (bento of projects) */

/* 6 columns: 4x2 + 2x2 + 3 + 3 = 18 cells = 3 full rows */
const SPANS = ["md:col-span-4 md:row-span-2", "md:col-span-2 md:row-span-2", "md:col-span-3", "md:col-span-3"];

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
          scrollTrigger: { trigger: root.current, start: "top 78%" },
        });
        gsap.utils.toArray<HTMLElement>(".js-tile").forEach((tile) => {
          gsap.fromTo(
            tile,
            { scale: 0.8 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: tile, start: "top bottom", end: "top 50%", scrub: true },
            },
          );
          gsap.to(tile.querySelector(".js-tile-inner"), {
            opacity: 0.2,
            filter: "brightness(0.5)",
            ease: "none",
            scrollTrigger: { trigger: tile, start: "bottom 30%", end: "bottom top", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} className={`relative z-10 py-32 md:pb-16 md:pt-48 ${PAD}`}>
      <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
        <h2 className="text-[clamp(2.6rem,5.4vw,5.5rem)] font-light leading-[1] tracking-[-0.045em]">
          <SplitWords text="Things I've" wordClassName="js-work-word" />{" "}
          <SplitWords text="built" wordClassName="js-work-word" className="text-aurora font-medium" />
        </h2>
        <div className="max-w-sm">
          <p className="text-lg leading-relaxed text-white/60">{projectsMeta?.blurb}</p>
          {projectsMeta?.ctaHref && (
            <a
              href={projectsMeta.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-[#f0b6ff]"
            >
              {projectsMeta.ctaLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-flow-dense grid-cols-1 gap-4 md:auto-rows-[19rem] md:grid-cols-6">
        {p.projects.map((project, i) => (
          <ProjectTile
            key={project.name}
            project={project}
            span={SPANS[i % SPANS.length]}
            compact={!SPANS[i % SPANS.length].includes("row-span-2")}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectTile({ project, span, compact }: { project: Project; span: string; compact: boolean }) {
  return (
    <article className={`js-tile group relative min-h-[26rem] will-change-transform md:min-h-0 ${span}`}>
      <div className={`js-tile-inner relative h-full overflow-hidden rounded-[2rem] ${GLASS}`}>
        {project.image && (
          <img
            src={project.image.src}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            compact
              ? "from-[#08070d] via-[#08070d]/85 to-[#08070d]/20 md:bg-gradient-to-r md:via-[#08070d]/90 md:to-[#08070d]/25"
              : "from-[#08070d] via-[#08070d]/75 to-[#08070d]/0 md:via-[#08070d]/55"
          }`}
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-8">
          <div className={`min-w-0 ${compact ? "md:max-w-[58%]" : ""}`}>
            <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">
              <a
                href={projectHref(project)}
                target="_blank"
                rel="noopener noreferrer"
                className="after:absolute after:inset-0 after:content-['']"
              >
                {project.name}
              </a>
            </h3>
            <p className="mt-2 line-clamp-2 max-w-md leading-relaxed text-white/65">{project.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-white/75 backdrop-blur-md">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <span
            aria-hidden="true"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f3f0ff] text-[#08070d] transition-transform duration-500 group-hover:rotate-45"
          >
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} source on GitHub`}
            className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-[#08070d]/50 text-white/80 backdrop-blur-md transition-colors hover:bg-[#08070d]/80 hover:text-white"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

/* -------------------------------- Manifesto (scrubbing reveal + inline images) */

function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const scout = p.projects.find((project) => project.image)?.image?.src ?? "";
  const imageBefore: Record<string, string> = {
    reliable: picsum("desk", 480, 220),
    "products,": scout,
    learning: picsum("monolith", 480, 220),
  };
  const glowWords = new Set(["reliable", "systems"]);
  const words = `${p.about.statement} ${p.about.statementMuted}`.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;
        const scrollTrigger = desktop
          ? { trigger: root.current, start: "center center", end: "+=110%", scrub: true, pin: true }
          : { trigger: ".js-scrub-text", start: "top 80%", end: "bottom 45%", scrub: true };
        gsap
          .timeline({ scrollTrigger })
          .fromTo(".js-scrub", { opacity: 0.1 }, { opacity: 1, ease: "none", stagger: 0.1 }, 0)
          .fromTo(".js-scrub-img", { scale: 0.3 }, { scale: 1, ease: "back.out(2)", stagger: 0.9 }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className={`relative z-10 py-32 md:flex md:min-h-[100svh] md:items-center md:py-0 ${PAD}`}>
      <p className="js-scrub-text max-w-[76rem] text-[clamp(1.9rem,4.1vw,4.1rem)] font-light leading-[1.18] tracking-[-0.03em]">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            {imageBefore[word] && (
              <>
                <span
                  aria-hidden="true"
                  className="js-scrub js-scrub-img mx-[0.08em] inline-block h-[0.82em] w-[1.9em] rounded-full bg-cover bg-center align-[-0.08em] shadow-[0_10px_30px_-10px_rgba(91,59,255,0.8)]"
                  style={{ backgroundImage: `url(${imageBefore[word]})` }}
                />{" "}
              </>
            )}
            <span className={`js-scrub ${glowWords.has(word) ? "text-aurora font-normal" : ""}`}>{word}</span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </p>
    </section>
  );
}

/* ----------------------------------------------- Experience (carousel) */

const DISCS = [
  "bg-gradient-to-br from-[#ffd2bb] to-[#ff8f6b]",
  "bg-gradient-to-br from-[#e4d9ff] to-[#a99bff]",
  "bg-gradient-to-br from-[#bcd2ff] to-[#5b8bff]",
  "bg-gradient-to-br from-[#ffd9f1] to-[#f0a6dc]",
];

function Experience() {
  const root = useRef<HTMLElement>(null);
  const jobs = p.experience;
  const [index, setIndex] = useState(0);
  const job = jobs[index];
  const go = (step: number) => setIndex((i) => (i + step + jobs.length) % jobs.length);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(".js-job", { y: 28, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.07 });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [index], revertOnUpdate: true },
  );

  return (
    <section
      id="experience"
      ref={root}
      aria-roledescription="carousel"
      aria-label="Experience"
      className={`relative z-10 py-32 md:py-48 ${PAD}`}
    >
      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <h2 className="text-[clamp(2.6rem,4.6vw,4.75rem)] font-light leading-[1] tracking-[-0.045em]">
            Where I&apos;ve <span className="text-aurora font-medium">worked</span>
          </h2>
          <p className="mt-6 max-w-xs text-lg leading-relaxed text-white/55">{experienceMeta?.blurb}</p>
          <div className="mt-12 flex items-center pl-1">
            {jobs.map((j, i) => {
              const isActive = i === index;
              return (
                <button
                  key={j.period}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${j.company}`}
                  aria-pressed={isActive}
                  className={`-ml-4 grid h-16 w-16 place-items-center rounded-full border-[3px] border-[#08070d] text-sm font-semibold text-[#08070d] transition-[transform,opacity] duration-500 first:ml-0 ${DISCS[i % DISCS.length]} ${
                    isActive ? "relative z-10 scale-[1.18]" : "opacity-55 hover:opacity-100"
                  }`}
                >
                  {monogram(j.company)}
                </button>
              );
            })}
          </div>
          {experienceMeta?.ctaHref && (
            <a
              href={experienceMeta.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-[#f0b6ff]"
            >
              {experienceMeta.ctaLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="md:col-span-8">
          <figure key={index} aria-live="polite" className={`rounded-[2rem] p-8 md:p-14 ${GLASS}`}>
            <p className="js-job text-sm text-white/50">{job.period}</p>
            <p className="js-job mt-8 text-[clamp(1.6rem,2.9vw,2.75rem)] font-light leading-[1.22] tracking-[-0.03em]">
              {job.description}
            </p>
            <figcaption className="js-job mt-12 flex items-center gap-4">
              <span
                className={`grid h-12 w-12 place-items-center rounded-full text-sm font-semibold text-[#08070d] ${DISCS[index % DISCS.length]}`}
              >
                {monogram(job.company)}
              </span>
              <span>
                <span className="block font-medium">{job.role}</span>
                <span className="block text-white/55">{job.company}</span>
              </span>
            </figcaption>
          </figure>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {jobs.map((j, i) => (
                <button
                  key={j.period}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to ${j.company}`}
                  className={`h-1 rounded-full transition-all duration-500 ${i === index ? "w-12 bg-[#f3f0ff]" : "w-6 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous role"
                className={`grid h-12 w-12 place-items-center rounded-full transition-colors duration-300 hover:bg-white/15 ${GLASS}`}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next role"
                className={`grid h-12 w-12 place-items-center rounded-full transition-colors duration-300 hover:bg-white/15 ${GLASS}`}
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------- Principles (horizontal accordion) */

const PRINCIPLE_SEEDS = ["keyboard", "terminal", "pattern", "atlas"];

function Principles() {
  const [open, setOpen] = useState(0);

  return (
    <section aria-label="How I work" className={`relative z-10 py-32 md:py-48 ${PAD}`}>
      <h2 className="mb-14 text-[clamp(2.6rem,4.6vw,4.75rem)] font-light leading-[1] tracking-[-0.045em] md:mb-20">
        How I <span className="text-aurora font-medium">work</span>
      </h2>
      <div className="flex flex-col gap-3 md:h-[32rem] md:flex-row">
        {p.about.traits.map((trait, i) => {
          const isOpen = open === i;
          const Icon = TRAIT_ICONS[trait.icon] ?? Brain;
          return (
            <article
              key={trait.title}
              onMouseEnter={() => setOpen(i)}
              className={`group relative min-h-[18rem] overflow-hidden rounded-[2rem] border border-white/10 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:min-h-0 md:min-w-0 ${
                isOpen ? "md:flex-[4]" : "md:flex-[1]"
              }`}
            >
              <img
                src={picsum(PRINCIPLE_SEEDS[i % PRINCIPLE_SEEDS.length], 1000, 1100)}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#3a1f9e]/60 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08070d] via-[#08070d]/40 to-[#08070d]/10" />

              <button
                type="button"
                onClick={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                aria-expanded={isOpen}
                className={`absolute inset-0 z-10 hidden flex-col items-center justify-between py-8 transition-opacity duration-500 md:flex ${
                  isOpen ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
              >
                <Icon className="h-6 w-6 text-white/80" strokeWidth={1.5} aria-hidden="true" />
                <span className="rotate-180 text-2xl font-light tracking-[-0.02em] [writing-mode:vertical-rl]">
                  {trait.title}
                </span>
              </button>

              <div
                className={`relative flex h-full flex-col justify-end p-7 transition-opacity duration-700 md:w-[min(40rem,52vw)] md:p-10 ${
                  isOpen ? "md:opacity-100 md:delay-200" : "md:opacity-0"
                }`}
              >
                <span className={`grid h-12 w-12 place-items-center rounded-full ${GLASS}`}>
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-[clamp(2rem,3.4vw,3.25rem)] font-light leading-none tracking-[-0.04em]">
                  {trait.title}
                </h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">{trait.description}</p>
              </div>
            </article>
          );
        })}
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
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
        gsap.from(".js-cta-orb", {
          scale: 0.3,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="contact" ref={root} className={`relative z-10 overflow-hidden pb-8 pt-32 md:pt-48 ${PAD}`}>
      <div
        aria-hidden="true"
        className="js-cta-orb absolute left-1/2 top-[38%] h-[46vw] w-[46vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_120deg,#5b3bff,#ff8f6b,#f0b6ff,#5b3bff)] opacity-40 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl text-center">
        <p className="text-lg text-white/60">{p.contact.description}</p>
        <h2 className="mt-8 text-[clamp(3rem,8vw,8.5rem)] font-light leading-[0.98] tracking-[-0.05em]">
          <SplitWords text="Let's build" wordClassName="js-cta-word" />{" "}
          <SplitWords text="something" wordClassName="js-cta-word" className="text-aurora font-medium" />
          <br />
          <SplitWords text="together." wordClassName="js-cta-word" />
        </h2>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${p.contact.email}`}
            className="group inline-flex items-center gap-3 rounded-full bg-[#f3f0ff] px-8 py-5 text-base font-semibold text-[#08070d] transition-transform duration-300 hover:scale-[1.03] md:text-lg"
          >
            {p.contact.email}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
          </a>
          <a
            href={p.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 rounded-full px-8 py-5 text-base font-semibold text-[#f3f0ff] transition-colors duration-300 hover:bg-white/10 md:text-lg ${GLASS}`}
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>

      <footer className="relative mt-32 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-white/50 md:mt-48 md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {year} {p.brand}. {p.contact.location}.
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3">
          <a href={p.contact.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
            GitHub
          </a>
          <a href={p.contact.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
            LinkedIn
          </a>
          <a href={p.hero.resumeHref} download target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
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
