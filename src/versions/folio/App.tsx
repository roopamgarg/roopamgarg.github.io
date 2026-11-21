import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Brain, Download, Github } from "lucide-react";
import { gsap, useGSAP, MQ } from "../shared/motion";
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
  year,
} from "../shared/content";

const SHELL = "mx-auto w-full max-w-[1440px]";
const firstYear = p.experience[p.experience.length - 1].period.split(/\s*-\s*/)[0];

export default function App() {
  useSiteMotion();

  return (
    <main className="paper w-full max-w-full overflow-x-clip bg-[#eeeae2] text-[#141414]">
      <Nav />
      <Hero />
      <Ticker />
      <Manifesto />
      <Now />
      <Work />
      <Experience />
      <Contact />
    </main>
  );
}

/* ------------------------------------------------------------------ Nav */

function Nav() {
  const time = useLocalTime();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#141414]/10 bg-[#eeeae2]/80 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className={`${SHELL} grid grid-cols-2 items-center px-5 py-3.5 md:grid-cols-3 md:px-10`}
      >
        <div className="hidden items-center gap-8 text-[15px] font-medium md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="group relative">
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>
        <a href="#top" className="text-xl font-extrabold tracking-[-0.03em] md:justify-self-center">
          {p.brand}
        </a>
        <div className="flex items-center justify-end gap-6 text-[15px] font-medium">
          <span className="hidden tabular-nums text-[#4a4741] lg:inline">
            {p.contact.location.split(",")[0]} {time}
          </span>
          <a
            href="#contact"
            className="rounded-full bg-[#141414] px-5 py-2.5 text-[#eeeae2] transition-colors duration-300 hover:bg-[#2b3dff] hover:text-white"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ---------------------------------------------------- Hero (editorial split) */

function Hero() {
  const root = useRef<HTMLElement>(null);
  const accentWords = p.hero.titleAccent.split(" ");
  const accentLast = accentWords.pop() ?? "";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(
            ".js-hero-figure",
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" },
            0,
          )
          .from(".js-hero-img", { scale: 1.35, duration: 2.2, clearProps: "transform" }, 0.35)
          .from(".js-hero-word", { yPercent: 110, duration: 1.3, stagger: 0.045 }, 0.2)
          .from(".js-hero-fade", { y: 24, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.7);

        gsap.to(".js-hero-figure", {
          scale: 0.9,
          opacity: 0.2,
          filter: "brightness(0.6)",
          ease: "none",
          scrollTrigger: { trigger: ".js-hero-figure", start: "center 35%", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className="px-5 pb-28 pt-32 md:px-10 md:pb-40 md:pt-44">
      <div className={`${SHELL} grid gap-14 md:grid-cols-12 md:items-end md:gap-6`}>
        <div className="md:col-span-7">
          <p className="js-hero-fade mb-10 flex items-center gap-4 text-[15px] font-medium text-[#4a4741]">
            <span className="h-px w-12 bg-[#141414]" />
            {current.role} at {current.company}
          </p>
          <h1 className="text-[clamp(2.4rem,4.7vw,5.4rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
            <SplitWords text={p.hero.titleLead} wordClassName="js-hero-word" />
            <br className="hidden md:block" />{" "}
            <SplitWords text={accentWords.join(" ")} wordClassName="js-hero-word" />{" "}
            <SplitWords text={accentLast} wordClassName="js-hero-word" className="text-[#2b3dff]" />
          </h1>
          <p className="js-hero-fade mt-10 max-w-lg text-lg leading-relaxed text-[#4a4741] md:text-xl">
            Scalable architecture, clean code and thoughtful design. Right now I&apos;m building
            real-time contact center software at {current.company}.
          </p>
          <div className="js-hero-fade mt-10 flex flex-wrap gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#141414] px-7 py-4 text-base font-bold text-[#eeeae2] transition-colors duration-300 hover:bg-[#2b3dff] hover:text-white"
            >
              {p.hero.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href={p.hero.resumeHref} download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#141414]/25 px-7 py-4 text-base font-bold text-[#141414] transition-colors duration-300 hover:border-[#141414] hover:bg-[#141414] hover:text-[#eeeae2]"
            >
              {p.hero.secondaryCta}
              <Download className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <figure className="group md:col-span-4 md:col-start-9">
          <div className="js-hero-figure overflow-hidden rounded-[6px] will-change-transform">
            <img
              src={picsum("lattice", 900, 1125)}
              alt=""
              className="js-hero-img aspect-[4/5] w-full object-cover contrast-125 grayscale transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <figcaption className="js-hero-fade mt-4 flex justify-between text-sm font-medium text-[#4a4741]">
            <span>{p.contact.location}</span>
            <span>Building since {firstYear}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Stack ticker */

function Ticker() {
  return (
    <section aria-label="Tech stack" className="border-y border-[#141414]/15 py-6 md:py-8">
      <Marquee duration={60}>
        {p.techStack.map((tech) => (
          <span key={tech} className="flex items-center">
            <span className="px-5 text-[clamp(2rem,4.4vw,4.25rem)] font-extrabold uppercase leading-none tracking-[-0.025em] md:px-9">
              {tech}
            </span>
            <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full bg-[#2b3dff] md:h-4 md:w-4" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ------------------------------------------ Manifesto (inline type images) */

function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const scout = p.projects.find((project) => project.image)?.image?.src ?? "";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(".js-pill", {
          width: 0,
          marginLeft: 0,
          marginRight: 0,
          ease: "none",
          stagger: 0.2,
          scrollTrigger: { trigger: root.current, start: "top 75%", end: "center 45%", scrub: true },
        });
        gsap.from(".js-manifesto", {
          y: 50,
          opacity: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const pill = (src: string, extra = "") => (
    <span
      aria-hidden="true"
      className={`js-pill mx-[0.14em] inline-block h-[0.8em] w-[1.9em] rounded-full bg-cover bg-center align-[-0.06em] ${extra}`}
      style={{ backgroundImage: `url(${src})` }}
    />
  );

  return (
    <section id="about" ref={root} className="px-5 py-32 md:px-10 md:py-48">
      <div className={SHELL}>
        <p className="js-manifesto max-w-[80rem] text-[clamp(2rem,4.6vw,4.9rem)] font-bold leading-[1.08] tracking-[-0.035em]">
          A software engineer who likes building {pill(picsum("horizon", 480, 200), "grayscale contrast-125")}{" "}
          reliable systems that solve real {pill(p.about.portrait.src)} problems, and turning ideas into{" "}
          {pill(scout)} products.{" "}
          <span className="text-[#141414]/35">Always learning something new.</span>
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------- Now (bento grid) */

function Now() {
  const root = useRef<HTMLElement>(null);
  const time = useLocalTime();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(".js-cell", {
          y: 60,
          opacity: 0,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        });
        gsap.from(".js-bar", {
          scaleY: 0.08,
          duration: 1.2,
          ease: "expo.out",
          stagger: { each: 0.012, from: "start" },
          scrollTrigger: { trigger: ".js-bars", start: "top 85%" },
        });
        gsap.fromTo(
          ".js-portrait",
          { scale: 0.8 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: ".js-portrait", start: "top bottom", end: "top 40%", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="About" className="px-5 pb-32 md:px-10 md:pb-48">
      {/* 12 columns: 7x2 + 5 + 5 + 4 + 8 = 36 cells = 3 full rows */}
      <div className={`${SHELL} grid grid-flow-dense grid-cols-1 gap-4 md:auto-rows-[minmax(16rem,auto)] md:grid-cols-12`}>
        <article className="js-cell relative flex flex-col overflow-hidden rounded-[1.5rem] bg-[#141414] p-8 text-[#eeeae2] md:col-span-7 md:row-span-2 md:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm font-medium text-[#eeeae2]/60">
            <span className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#2b3dff] shadow-[0_0_0_4px_rgba(43,61,255,0.25)]" />
              Now at {current.company}
            </span>
            <span>{current.period}</span>
          </div>
          <h3 className="mt-8 max-w-2xl text-[clamp(1.9rem,3vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
            Every agent screen, recorded, watched live and understood after the call.
          </h3>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#eeeae2]/60">{current.description}</p>
          <CallTimeline />
        </article>

        <article className="js-cell group relative min-h-[24rem] overflow-hidden rounded-[1.5rem] bg-[#e7c3ad] md:col-span-5 md:min-h-0">
          <div className="js-portrait absolute inset-0 will-change-transform">
            <img
              src={p.about.portrait.src}
              alt={p.about.portrait.alt}
              className="h-full w-full object-cover object-[50%_26%] transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div className="absolute bottom-5 left-5 rounded-full bg-[#eeeae2]/90 px-4 py-2 text-sm font-bold backdrop-blur">
            {p.brand}, {current.role}
          </div>
        </article>

        <article className="js-cell relative flex min-h-[16rem] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-[#2b3dff] p-8 text-white md:col-span-5 md:min-h-0">
          <div className="flex justify-between text-sm font-medium text-white/75">
            <span>Based in {p.contact.location}</span>
            <span>IST</span>
          </div>
          <p className="text-[clamp(4rem,7vw,6.5rem)] font-extrabold leading-none tabular-nums tracking-[-0.05em]">
            {time}
          </p>
        </article>

        <article className="js-cell rounded-[1.5rem] bg-[#dcd6ca] p-8 md:col-span-4 md:p-10">
          <h3 className="text-xl font-extrabold tracking-tight">Shipped across</h3>
          <ul className="mt-6 divide-y divide-[#141414]/12 border-y border-[#141414]/12">
            {focusAreas.map((area) => (
              <li key={area} className="flex items-center justify-between py-3 text-lg font-medium">
                {area}
                <span className="h-1.5 w-1.5 rounded-full bg-[#2b3dff]" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </article>

        <article className="js-cell flex flex-col rounded-[1.5rem] border border-[#141414]/12 bg-[#f6f3ee] p-8 md:col-span-8 md:p-10">
          <h3 className="text-xl font-extrabold tracking-tight">What I bring</h3>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {p.about.traits.map((trait) => {
              const Icon = TRAIT_ICONS[trait.icon] ?? Brain;
              return (
                <li key={trait.title}>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#141414] text-[#eeeae2]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-lg font-bold leading-tight">{trait.title}</p>
                  <p className="mt-2 leading-relaxed text-[#4a4741]">{trait.description}</p>
                </li>
              );
            })}
          </ul>
          <p className="mt-10 text-[clamp(1.5rem,2.3vw,2.25rem)] md:mt-auto md:pt-10 font-extrabold leading-[1.05] tracking-[-0.035em] text-[#141414]/25">
            {p.hero.description}
          </p>
        </article>
      </div>
    </section>
  );
}

/** A call drawn as an audio waveform with the moments the product cares about. */
function CallTimeline() {
  const bars = Array.from({ length: 72 }, (_, i) => 18 + 78 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)));
  const marks = [
    { at: 14, label: "Recording" },
    { at: 46, label: "Supervisor joins" },
    { at: 78, label: "Remote assist" },
  ];

  return (
    <div aria-hidden="true" className="mt-12 md:mt-auto md:pt-12">
      <div className="relative">
        <div className="js-bars flex h-28 items-center gap-[3px]">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`js-bar w-full origin-center rounded-full ${
                (i >= 30 && i <= 40) || (i >= 54 && i <= 60) ? "bg-[#2b3dff]" : "bg-[#eeeae2]/25"
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        {marks.map((mark) => (
          <span key={mark.label} className="absolute -top-3 bottom-0 w-px bg-[#eeeae2]/30" style={{ left: `${mark.at}%` }}>
            <span className="absolute -top-6 left-0 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#eeeae2] px-2.5 py-0.5 text-[11px] font-bold text-[#141414]">
              {mark.label}
            </span>
          </span>
        ))}
      </div>
      <div className="mt-4 flex justify-between text-xs font-medium tabular-nums text-[#eeeae2]/45">
        <span>00:00</span>
        <span>04:12</span>
        <span>08:47</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------- Work (card stacking) */

const THEMES = [
  {
    card: "bg-[#141414] text-[#eeeae2]",
    muted: "text-[#eeeae2]/60",
    solid: "bg-[#eeeae2] text-[#141414]",
    ghost: "border-[#eeeae2]/25 text-[#eeeae2] hover:bg-[#eeeae2] hover:text-[#141414]",
  },
  {
    card: "bg-[#2b3dff] text-white",
    muted: "text-white/75",
    solid: "bg-white text-[#141414]",
    ghost: "border-white/30 text-white hover:bg-white hover:text-[#141414]",
  },
  {
    card: "bg-[#dcd6ca] text-[#141414]",
    muted: "text-[#141414]/65",
    solid: "bg-[#141414] text-[#eeeae2]",
    ghost: "border-[#141414]/25 text-[#141414] hover:bg-[#141414] hover:text-[#eeeae2]",
  },
  {
    card: "bg-[#f8f6f1] text-[#141414] ring-1 ring-inset ring-[#141414]/10",
    muted: "text-[#141414]/65",
    solid: "bg-[#141414] text-[#eeeae2]",
    ghost: "border-[#141414]/25 text-[#141414] hover:bg-[#141414] hover:text-[#eeeae2]",
  },
];

function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const items = gsap.utils.toArray<HTMLElement>(".js-stack-item");
        items.forEach((item, i) => {
          gsap.fromTo(
            item.querySelector(".js-card-media"),
            { scale: 0.8 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: item, start: "top bottom", end: "top 25%", scrub: true },
            },
          );

          const next = items[i + 1];
          if (!next) return;
          const stacked = {
            trigger: next,
            start: "top bottom",
            end: `top top+=${120 + (i + 1) * 20}`,
            scrub: true,
          };
          gsap.to(item.querySelector(".js-card"), { scale: 0.9, ease: "none", scrollTrigger: stacked });
          gsap.to(item.querySelector(".js-card-shade"), { opacity: 0.5, ease: "none", scrollTrigger: stacked });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} className="px-5 py-32 md:px-10 md:py-48">
      <div className={SHELL}>
        <div className="mb-16 flex flex-wrap items-end justify-between gap-10 md:mb-24">
          <h2 className="text-[clamp(3.25rem,8.5vw,9rem)] font-extrabold leading-[0.86] tracking-[-0.055em]">
            Selected
            <br />
            work<span className="text-[#2b3dff]">.</span>
          </h2>
          <div className="max-w-sm">
            <p className="text-lg leading-relaxed text-[#4a4741] md:text-xl">{projectsMeta?.blurb}</p>
            {projectsMeta?.ctaHref && (
              <a
                href={projectsMeta.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-bold underline decoration-[#141414]/25 underline-offset-[6px] transition-colors hover:text-[#2b3dff] hover:decoration-[#2b3dff]"
              >
                {projectsMeta.ctaLabel}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <div>
          {p.projects.map((project, i) => {
            const theme = THEMES[i % THEMES.length];
            return (
              <div
                key={project.name}
                className="js-stack-item sticky mb-[10vh] last:mb-0"
                style={{ top: `calc(5.5rem + ${i * 1.25}rem)` }}
              >
                <article
                  className={`js-card relative origin-top overflow-hidden rounded-[1.75rem] will-change-transform ${theme.card} md:h-[min(76vh,46rem)]`}
                >
                  <div className="js-card-shade pointer-events-none absolute inset-0 z-20 bg-[#141414] opacity-0" />
                  <div className="grid h-full gap-10 p-6 md:grid-cols-12 md:gap-10 md:p-12">
                    <div className="flex flex-col md:col-span-5">
                      <p className={`text-sm font-medium ${theme.muted}`}>{project.stack.join("  /  ")}</p>
                      <h3 className="mt-10 text-[clamp(2.6rem,4.8vw,5rem)] font-extrabold leading-[0.9] tracking-[-0.045em] md:mt-auto">
                        {project.name}
                      </h3>
                      <p className={`mt-5 max-w-sm text-lg leading-relaxed ${theme.muted}`}>{project.description}</p>
                      <div className="mt-8 flex flex-wrap gap-3">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold transition-transform duration-300 hover:scale-[1.04] ${theme.solid}`}
                          >
                            Visit site
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            <span className="sr-only">: {project.name}</span>
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 font-bold transition-colors duration-300 ${theme.ghost}`}
                          >
                            <Github className="h-4 w-4" aria-hidden="true" />
                            Source
                            <span className="sr-only">: {project.name}</span>
                          </a>
                        )}
                      </div>
                    </div>
                    <a
                      href={projectHref(project)}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={-1}
                      aria-hidden="true"
                      className="group self-center md:col-span-7"
                    >
                      <div className="js-card-media overflow-hidden rounded-[1.1rem] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] will-change-transform">
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------ Experience (horizontal accordion) */

function Experience() {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" className="px-5 py-32 md:px-10 md:py-48">
      <div className={SHELL}>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <h2 className="text-[clamp(3rem,7vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
            Experience<span className="text-[#2b3dff]">.</span>
          </h2>
          {experienceMeta?.ctaHref && (
            <a
              href={experienceMeta.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold underline decoration-[#141414]/25 underline-offset-[6px] transition-colors hover:text-[#2b3dff] hover:decoration-[#2b3dff]"
            >
              {experienceMeta.ctaLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="flex flex-col border-t border-[#141414]/15 md:h-[32rem] md:flex-row md:border-b">
          {p.experience.map((job, i) => {
            const isOpen = open === i;
            const startYear = job.period.split(/\s*-\s*/)[0];
            return (
              <article
                key={job.period}
                onMouseEnter={() => setOpen(i)}
                className={`relative overflow-hidden border-b border-[#141414]/15 transition-[flex-grow,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:min-w-0 md:border-b-0 md:border-l md:first:border-l-0 ${
                  isOpen ? "bg-[#f6f3ee] md:flex-[5]" : "hover:bg-[#141414]/[0.03] md:flex-[1]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  aria-expanded={isOpen}
                  className={`absolute inset-0 z-10 hidden flex-col items-center justify-between py-8 transition-opacity duration-500 md:flex ${
                    isOpen ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="rotate-180 text-3xl font-extrabold tracking-[-0.03em] [writing-mode:vertical-rl]">
                    {job.company}
                  </span>
                  <span className="text-sm font-bold text-[#4a4741]">{startYear}</span>
                </button>

                <div
                  className={`flex h-full flex-col justify-between gap-10 px-1 py-8 transition-opacity duration-700 md:w-[min(46rem,60vw)] md:p-12 ${
                    isOpen ? "md:opacity-100 md:delay-200" : "md:opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`h-3 w-3 rounded-full bg-[#2b3dff] transition-transform duration-700 ${isOpen ? "scale-100" : "md:scale-0"}`}
                    />
                    <span className="font-bold">{job.period}</span>
                    <span className="text-[#4a4741]">{job.role}</span>
                  </div>
                  <div>
                    <h3 className="text-[clamp(3rem,6.5vw,6.75rem)] font-extrabold leading-[0.88] tracking-[-0.055em]">
                      {job.company}
                    </h3>
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4a4741]">{job.description}</p>
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
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="contact" ref={root} className="px-5 pb-8 pt-32 md:px-10 md:pt-48">
      <div className={SHELL}>
        <p className="max-w-md text-lg leading-relaxed text-[#4a4741] md:text-xl">{p.contact.description}</p>
        <a href={`mailto:${p.contact.email}`} className="group mt-6 block w-fit">
          <span className="block text-[clamp(4rem,18vw,19rem)] font-extrabold leading-[0.84] tracking-[-0.06em] transition-colors duration-500 group-hover:text-[#2b3dff]">
            <SplitWords text="Let's talk" wordClassName="js-cta-word" />
            <span className="text-[#2b3dff] transition-colors duration-500 group-hover:text-[#141414]">.</span>
          </span>
        </a>
        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href={`mailto:${p.contact.email}`}
            className="group inline-flex items-center gap-3 rounded-full bg-[#141414] px-8 py-5 text-lg font-bold text-[#eeeae2] transition-colors duration-300 hover:bg-[#2b3dff] hover:text-white"
          >
            {p.contact.email}
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={p.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-[#141414]/25 px-8 py-5 text-lg font-bold text-[#141414] transition-colors duration-300 hover:bg-[#141414] hover:text-[#eeeae2]"
          >
            LinkedIn
          </a>
        </div>

        <footer className="mt-32 grid gap-10 border-t border-[#141414]/15 pt-10 text-[15px] md:mt-48 md:grid-cols-4">
          <div>
            <p className="text-[#4a4741]">Elsewhere</p>
            <ul className="mt-3 space-y-1.5 font-bold">
              <li>
                <a href={p.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#2b3dff]">
                  GitHub
                </a>
              </li>
              <li>
                <a href={p.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#2b3dff]">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[#4a4741]">Resume</p>
            <a
              href={p.hero.resumeHref} download
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-bold hover:text-[#2b3dff]"
            >
              Download PDF
            </a>
          </div>
          <div>
            <p className="text-[#4a4741]">Based in</p>
            <p className="mt-3 font-bold">{p.contact.location}</p>
          </div>
          <div className="md:text-right">
            <p className="text-[#4a4741]">
              &copy; {year} {p.brand}
            </p>
            <a href="#top" className="mt-3 inline-block font-bold hover:text-[#2b3dff]">
              Back to top
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
