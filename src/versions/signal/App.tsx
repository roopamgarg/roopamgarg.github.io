import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Brain, Download, Github } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, MQ, prefersReducedMotion } from "../shared/motion";
import { useSiteMotion } from "../shared/useSiteMotion";
import { useLocalTime } from "../shared/useLocalTime";
import { Marquee } from "../shared/Marquee";
import { SplitWords } from "../shared/SplitWords";
import {
  TRAIT_ICONS,
  current,
  experienceMeta,
  focusAreas,
  navLinks,
  p,
  picsum,
  projectHref,
  projectsMeta,
  slug,
  year,
} from "../shared/content";

const SHELL = "mx-auto w-full max-w-[1360px]";

export default function App() {
  useSiteMotion();

  return (
    <main className="grain w-full max-w-full overflow-x-clip bg-[#0a0a0a] text-[#ecebe6]">
      <Nav />
      <Hero />
      <Now />
      <Focus />
      <Work />
      <Experience />
      <Principles />
      <Contact />
    </main>
  );
}

/* ------------------------------------------------------------------ Nav */

function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-[#0a0a0a]/55 p-1.5 pl-5 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      >
        <a href="#top" className="mr-2 flex items-center gap-2.5 text-sm font-semibold tracking-tight">
          <span className="h-2 w-2 rounded-full bg-[#ff5a1f] shadow-[0_0_14px_#ff5a1f]" />
          {p.brand}
        </a>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hidden rounded-full px-4 py-2 text-sm text-white/60 transition-colors duration-300 hover:bg-white/[0.06] hover:text-white md:block"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="ml-1 rounded-full bg-[#ecebe6] px-4 py-2 text-sm font-medium text-[#0a0a0a] transition-transform duration-300 hover:scale-[1.04]"
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
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".js-hero-bg", { scale: 1.3, opacity: 0, duration: 2.6 })
          .from(".js-hero-line", { yPercent: 110, duration: 1.5, stagger: 0.12 }, 0.25)
          .from(".js-hero-fade", { y: 26, opacity: 0, duration: 1.3, stagger: 0.1 }, 0.75);

        gsap.to(".js-hero-bg", {
          yPercent: 16,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".js-hero-content", {
          y: -80,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "75% top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-24 pt-36"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src={picsum("architecture", 1920, 1080)}
          alt=""
          className="js-hero-bg h-full w-full object-cover opacity-75 contrast-125 grayscale"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.55)_0%,rgba(10,10,10,0.86)_55%,#0a0a0a_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
        <div className="absolute left-1/2 top-[58%] h-[38vw] w-[38vw] -translate-x-1/2 rounded-full bg-[#ff5a1f]/10 blur-[120px]" />
      </div>

      <div className="js-hero-content relative mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <p className="js-hero-fade mb-9 font-mono text-[11px] uppercase tracking-[0.28em] text-white/55">
          <span className="hidden sm:inline">{p.brand} &nbsp;/&nbsp; </span>
          {current.role}, {current.company}
        </p>
        <h1 className="w-full max-w-6xl text-[clamp(2.4rem,5.6vw,6rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="js-hero-line block">{p.hero.titleLead}</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="js-hero-line block">
              {p.hero.titleAccent.replace(/\.$/, "")}
              <span className="text-[#ff5a1f]">.</span>
            </span>
          </span>
        </h1>
        <p className="js-hero-fade mt-8 max-w-xl text-base leading-relaxed text-white/75 [text-shadow:0_1px_18px_rgba(0,0,0,0.9)] md:text-lg">
          Scalable architecture, clean code and thoughtful design. Right now I&apos;m building
          real-time contact center software at {current.company}.
        </p>
        <div className="js-hero-fade mt-11 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#work"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#ecebe6] px-7 py-4 text-sm font-semibold text-[#0a0a0a] transition-transform duration-300 hover:scale-[1.03]"
          >
            {p.hero.primaryCta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a
            href={p.hero.resumeHref} download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] px-7 py-4 text-sm font-semibold text-[#ecebe6] backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.12]"
          >
            {p.hero.secondaryCta}
            <Download className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Now (bento grid) */

function Now() {
  const root = useRef<HTMLElement>(null);
  const time = useLocalTime();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(".js-now-word", {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.04,
          scrollTrigger: { trigger: ".js-now-head", start: "top 82%" },
        });
        gsap.from(".js-bento-card", {
          y: 70,
          opacity: 0,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: { trigger: ".js-bento", start: "top 82%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="px-6 py-32 md:px-10 md:py-48">
      <div className={SHELL}>
        <div className="js-now-head mb-16 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
          <h2 className="text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[1] tracking-[-0.045em] md:col-span-7">
            <SplitWords text="Systems first." wordClassName="js-now-word" />
            <br />
            <SplitWords text="Features follow." wordClassName="js-now-word" className="text-white/35" />
          </h2>
          <p className="max-w-md text-base leading-relaxed text-white/60 md:col-span-5 md:justify-self-end md:text-lg">
            {p.about.statement} {p.about.statementMuted}
          </p>
        </div>

        {/* 6 columns: 4x2 + 2 + 2 + 3 + 3 = 18 cells = 3 full rows */}
        <div className="js-bento grid grid-flow-dense grid-cols-1 gap-4 md:auto-rows-[minmax(17rem,auto)] md:grid-cols-6">
          <article className="js-bento-card group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#111111] p-7 md:col-span-4 md:row-span-2 md:p-10">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ff5a1f]/10 blur-[90px] transition-transform duration-700 group-hover:scale-125" />
            <div className="relative flex h-full flex-col">
              <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5a1f] opacity-70 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff5a1f]" />
                </span>
                Now at {current.company}
              </p>
              <h3 className="mt-6 max-w-xl text-[clamp(1.7rem,2.6vw,2.5rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
                Software that sees what contact center agents see.
              </h3>
              <p className="mt-4 max-w-lg leading-relaxed text-white/55">{current.description}</p>
              <MonitorWall />
            </div>
          </article>

          <article className="js-bento-card group relative min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#111111] md:col-span-2 md:min-h-0">
            <img
              src={p.about.portrait.src}
              alt={p.about.portrait.alt}
              className="absolute inset-0 h-full w-full object-cover object-[50%_28%] grayscale-[40%] transition-[transform,filter] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/85 via-transparent to-transparent" />
            <div className="absolute inset-x-6 bottom-5">
              <p className="font-semibold tracking-tight">{p.brand}</p>
              <p className="text-sm text-white/60">{current.role}</p>
            </div>
          </article>

          <article className="js-bento-card relative flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#111111] p-7 md:col-span-2 md:min-h-0">
            <div className="absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-[#ff5a1f]/15 blur-[70px]" />
            <p className="relative text-sm text-white/55">Local time in {p.contact.location.split(",")[0]}</p>
            <p className="relative font-mono text-[clamp(3rem,5vw,4.5rem)] font-medium tabular-nums tracking-[-0.05em]">
              {time}
            </p>
            <p className="relative text-sm text-white/40">IST, UTC+05:30</p>
          </article>

          <article className="js-bento-card rounded-[1.75rem] border border-white/[0.08] bg-[#111111] p-7 md:col-span-3 md:p-9">
            <h3 className="text-lg font-semibold tracking-tight">What I bring</h3>
            <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {p.about.traits.map((trait) => {
                const Icon = TRAIT_ICONS[trait.icon] ?? Brain;
                return (
                  <li key={trait.title}>
                    <Icon className="h-5 w-5 text-[#ff5a1f]" strokeWidth={1.75} aria-hidden="true" />
                    <p className="mt-3 font-medium">{trait.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/50">{trait.description}</p>
                  </li>
                );
              })}
            </ul>
          </article>

          <article className="js-bento-card flex flex-col rounded-[1.75rem] border border-white/[0.08] bg-[#111111] p-7 md:col-span-3 md:p-9">
            <h3 className="text-lg font-semibold tracking-tight">Toolbox</h3>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
              {p.techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/70 transition-colors duration-300 hover:border-[#ff5a1f]/60 hover:text-white"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-[clamp(1.4rem,2vw,1.9rem)] font-medium leading-[1.15] tracking-[-0.03em] text-white/35 md:mt-auto md:pt-10">
              Comfortable across the stack, from the browser down to the cluster.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/** Illustration of a supervisor wall: one agent screen is live at a time. */
function MonitorWall() {
  const [live, setLive] = useState(5);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => setLive((n) => (n + 3) % 8), 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div aria-hidden="true" className="mt-10 md:mt-auto md:pt-10">
      <div className="grid grid-cols-4 gap-2.5">
        {Array.from({ length: 8 }, (_, i) => {
          const isLive = i === live;
          return (
            <div
              key={i}
              className={`relative aspect-[16/10] rounded-lg border p-2 transition-[border-color,background-color,transform] duration-700 ${
                isLive
                  ? "scale-[1.04] border-[#ff5a1f]/70 bg-[#ff5a1f]/[0.08]"
                  : "border-white/[0.07] bg-white/[0.02]"
              }`}
            >
              <div className="flex gap-1">
                <span className="h-1 w-1 rounded-full bg-white/25" />
                <span className="h-1 w-1 rounded-full bg-white/25" />
                <span className="h-1 w-1 rounded-full bg-white/25" />
              </div>
              <div className="mt-2 space-y-1.5">
                <div className="h-1 w-3/4 rounded-full bg-white/15" />
                <div className="h-1 w-1/2 rounded-full bg-white/10" />
                <div className="h-1 w-2/3 rounded-full bg-white/10" />
              </div>
              {isLive && (
                <span className="absolute bottom-1.5 right-1.5 rounded-full bg-[#ff5a1f] px-1.5 py-0.5 font-mono text-[9px] font-semibold leading-none text-[#0a0a0a]">
                  REC
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="relative mt-7 h-px bg-white/10">
        {[12, 29, 47, 64, 83].map((left) => (
          <span
            key={left}
            className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30"
            style={{ left: `${left}%` }}
          />
        ))}
        <span className="playhead absolute top-1/2 h-4 w-px -translate-y-1/2 bg-[#ff5a1f] shadow-[0_0_10px_#ff5a1f]" />
      </div>
      <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
        <span>Call start</span>
        <span className="hidden sm:inline">Screen share</span>
        <span>Wrap-up</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------- Focus marquee */

function Focus() {
  const row = (outline: boolean) =>
    focusAreas.map((area) => (
      <span key={area} className="flex items-center">
        <span
          className={`px-6 text-[clamp(2.75rem,7vw,7rem)] font-semibold leading-none tracking-[-0.045em] md:px-10 ${
            outline ? "text-outline" : "text-[#ecebe6]"
          }`}
        >
          {area}
        </span>
        <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-[#ff5a1f] md:h-9 md:w-9" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 0l2.2 8.6L22.4 5l-5 7 5 7-8.2-3.6L12 24l-2.2-8.6L1.6 19l5-7-5-7 8.2 3.6z"
          />
        </svg>
      </span>
    ));

  return (
    <section aria-label="Areas I work in" className="border-y border-white/[0.08] py-12 md:py-16">
      <Marquee duration={42}>{row(false)}</Marquee>
      <Marquee duration={48} reverse className="mt-5 md:mt-7">
        {row(true)}
      </Marquee>
    </section>
  );
}

/* --------------------------------------------- Work (pinned split + scale) */

function Work() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        const pin = root.current?.querySelector<HTMLElement>(".js-work-pin");

        if (motion && desktop && pin) {
          ScrollTrigger.create({
            trigger: ".js-work-grid",
            start: "top top+=120",
            end: () => `bottom top+=${120 + pin.offsetHeight}`,
            pin,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
        }

        gsap.utils.toArray<HTMLElement>(".js-project").forEach((project, i) => {
          ScrollTrigger.create({
            trigger: project,
            start: "top 60%",
            end: "bottom+=160 60%",
            onToggle: (self) => self.isActive && setActive(i),
          });

          if (!motion) return;
          const media = project.querySelector(".js-media");
          gsap.fromTo(
            media,
            { scale: 0.8 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: project, start: "top bottom", end: "top 35%", scrub: true },
            },
          );
          gsap.to(media, {
            opacity: 0.2,
            filter: "brightness(0.45)",
            ease: "none",
            scrollTrigger: { trigger: project, start: "bottom 65%", end: "bottom 10%", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} className="px-6 py-32 md:px-10 md:py-48">
      <div className={`js-work-grid grid gap-16 md:grid-cols-12 md:gap-10 ${SHELL}`}>
        <div className="md:col-span-5">
          <div className="js-work-pin">
            <h2 className="text-[clamp(2.75rem,5.4vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
              Selected
              <br />
              <span className="text-white/35">work</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-white/55 md:text-lg">
              {projectsMeta?.blurb}
            </p>
            <ol className="mt-12 hidden border-t border-white/10 md:block">
              {p.projects.map((project, i) => (
                <li key={project.name} className="border-b border-white/10">
                  <a
                    href={`#${slug(project.name)}`}
                    className={`flex items-center justify-between py-4 text-lg tracking-tight transition-colors duration-500 ${
                      i === active ? "text-[#ecebe6]" : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`h-px bg-[#ff5a1f] transition-all duration-500 ${i === active ? "w-8" : "w-0"}`}
                      />
                      {project.name}
                    </span>
                    <ArrowUpRight
                      className={`h-4 w-4 transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ol>
            {projectsMeta?.ctaHref && (
              <a
                href={projectsMeta.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-[#ff5a1f]"
              >
                {projectsMeta.ctaLabel}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-28 md:col-span-7 md:gap-40">
          {p.projects.map((project) => (
            <article key={project.name} id={slug(project.name)} className="js-project scroll-mt-28">
              <a
                href={projectHref(project)}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="js-media group block overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#111111] will-change-transform"
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
              </a>
              <div className="mt-8 flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-md">
                  <h3 className="text-3xl font-semibold tracking-[-0.035em] md:text-4xl">{project.name}</h3>
                  <p className="mt-3 leading-relaxed text-white/55">{project.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#ecebe6] px-4 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-transform duration-300 hover:scale-[1.04]"
                    >
                      Visit
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">{project.name}</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} source on GitHub`}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
                {project.stack.map((tech) => (
                  <li key={tech} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/55">
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------ Experience (horizontal accordion) */

function Experience() {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" className="px-6 py-32 md:px-10 md:py-48">
      <div className={SHELL}>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <h2 className="text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[1] tracking-[-0.045em]">
            Where I&apos;ve worked
          </h2>
          {experienceMeta?.ctaHref && (
            <a
              href={experienceMeta.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-[#ff5a1f]"
            >
              {experienceMeta.ctaLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="flex flex-col gap-3 md:h-[34rem] md:flex-row">
          {p.experience.map((job, i) => {
            const isOpen = open === i;
            const startYear = job.period.split(/\s*-\s*/)[0];
            return (
              <article
                key={job.period}
                onMouseEnter={() => setOpen(i)}
                className={`group relative overflow-hidden rounded-[1.75rem] border transition-[flex-grow,background-color,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:min-w-0 ${
                  isOpen
                    ? "border-[#ff5a1f]/30 bg-[#141210] md:flex-[5]"
                    : "border-white/[0.08] bg-[#111111] md:flex-[1]"
                }`}
              >
                <div
                  aria-hidden="true"
                  className={`absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#ff5a1f]/20 blur-[100px] transition-opacity duration-700 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  aria-expanded={isOpen}
                  className={`absolute inset-0 z-10 hidden flex-col items-center justify-between py-8 text-left transition-opacity duration-500 md:flex ${
                    isOpen ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="rotate-180 text-2xl font-semibold tracking-[-0.03em] [writing-mode:vertical-rl]">
                    {job.company}
                  </span>
                  <span className="font-mono text-xs text-white/40">{startYear}</span>
                </button>

                <div
                  className={`relative flex h-full flex-col justify-between p-7 transition-opacity duration-700 md:w-[min(44rem,58vw)] md:p-10 ${
                    isOpen ? "md:opacity-100 md:delay-200" : "md:opacity-0"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="text-outline pointer-events-none absolute -right-2 top-4 hidden text-[9rem] font-semibold leading-none tracking-[-0.06em] md:block"
                  >
                    {startYear}
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#ff5a1f]">{job.period}</p>
                  <div className="mt-10 md:mt-0">
                    <h3 className="text-[clamp(2.25rem,4.4vw,4.25rem)] font-semibold leading-none tracking-[-0.05em]">
                      {job.company}
                    </h3>
                    <p className="mt-4 text-lg text-white/80">{job.role}</p>
                    <p className="mt-4 max-w-lg leading-relaxed text-white/55">{job.description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------- Principles (carousel) */

function Principles() {
  const root = useRef<HTMLElement>(null);
  const traits = p.about.traits;
  const [index, setIndex] = useState(0);
  const trait = traits[index];
  const go = (step: number) => setIndex((i) => (i + step + traits.length) % traits.length);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(".js-quote-word", {
          yPercent: 105,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.018,
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [index], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label="How I work"
      className="px-6 py-32 md:px-10 md:py-48"
    >
      <div className={`grid gap-14 md:grid-cols-12 ${SHELL}`}>
        <div className="md:col-span-4">
          <h2 className="text-[clamp(2.4rem,4.4vw,4.25rem)] font-semibold leading-none tracking-[-0.045em]">
            How I work
          </h2>
          <div className="mt-10 flex items-center">
            <img
              src={p.about.portrait.src}
              alt=""
              className="relative z-10 h-16 w-16 rounded-full border-2 border-[#0a0a0a] object-cover"
            />
            {traits.map((t, i) => {
              const Icon = TRAIT_ICONS[t.icon] ?? Brain;
              const isActive = i === index;
              return (
                <button
                  key={t.title}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${t.title}`}
                  aria-pressed={isActive}
                  className={`-ml-3 grid h-16 w-16 place-items-center rounded-full border-2 border-[#0a0a0a] transition-[transform,background-color,color] duration-500 ${
                    isActive
                      ? "relative z-20 scale-110 bg-[#ff5a1f] text-[#0a0a0a]"
                      : "bg-[#1a1a1a] text-white/55 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-8">
          <blockquote key={index} aria-live="polite">
            <p className="text-[clamp(1.8rem,3.4vw,3.25rem)] font-medium leading-[1.12] tracking-[-0.035em]">
              <span className="text-[#ff5a1f]">&ldquo;</span>
              <SplitWords text={trait.description} wordClassName="js-quote-word" />
              <span className="text-[#ff5a1f]">&rdquo;</span>
            </p>
            <footer className="mt-10 flex items-center gap-4 text-base">
              <span className="h-px w-10 bg-[#ff5a1f]" />
              <span className="font-semibold">{trait.title}</span>
              <span className="text-white/40">{p.brand}</span>
            </footer>
          </blockquote>
          <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-6">
            <span className="font-mono text-sm tabular-nums text-white/45">
              {String(index + 1).padStart(2, "0")} / {String(traits.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous principle"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/15 transition-colors duration-300 hover:bg-[#ecebe6] hover:text-[#0a0a0a]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next principle"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/15 transition-colors duration-300 hover:bg-[#ecebe6] hover:text-[#0a0a0a]"
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

/* -------------------------------------------------------------- Contact */

function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(".js-cta-line", {
          yPercent: 110,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
        gsap.from(".js-cta-glow", {
          scale: 0.4,
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
    <section id="contact" ref={root} className="relative overflow-hidden px-6 pb-10 pt-32 md:px-10 md:pt-48">
      <div
        aria-hidden="true"
        className="js-cta-glow absolute -bottom-[35vw] left-1/2 h-[70vw] w-[70vw] -translate-x-1/2 rounded-full bg-[#ff5a1f]/25 blur-[160px]"
      />
      <div className={`relative ${SHELL}`}>
        <p className="mb-10 max-w-md text-lg text-white/60">{p.contact.description}</p>
        <h2 className="text-[clamp(3rem,9vw,9.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="js-cta-line block">Let&apos;s build</span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="js-cta-line block text-white/35">something reliable.</span>
          </span>
        </h2>
        <div className="mt-14 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${p.contact.email}`}
            className="group inline-flex items-center gap-3 rounded-full bg-[#ff5a1f] px-8 py-5 text-base font-semibold text-[#0a0a0a] transition-transform duration-300 hover:scale-[1.03] md:text-lg"
          >
            {p.contact.email}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a
            href={p.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-8 py-5 text-base font-semibold text-[#ecebe6] backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.1] md:text-lg"
          >
            Connect on LinkedIn
          </a>
        </div>

        <footer className="mt-32 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-white/45 md:mt-48 md:flex-row md:items-center md:justify-between">
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
      </div>
    </section>
  );
}
