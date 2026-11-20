import { useMemo } from "react";
import { TopNav } from "@/components/TopNav";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { portfolio } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { NavItem } from "@/types/portfolio";

function byId(nav: NavItem[]): Record<string, NavItem> {
  return Object.fromEntries(nav.map((n) => [n.id, n]));
}

export default function App() {
  useScrollReveal();

  const navIds = useMemo(() => portfolio.nav.map((n) => n.id), []);
  const activeId = useActiveSection(navIds);
  const navMap = useMemo(() => byId(portfolio.nav), []);

  return (
    <div className="relative min-h-[100dvh] text-text">
      <a href="#home" className="skip-link">
        Skip to content
      </a>

      <TopNav brand={portfolio.brand} nav={portfolio.nav} activeId={activeId} />

      <main>
        <Hero
          navItem={navMap.home}
          hero={portfolio.hero}
          architecture={portfolio.architecture}
        />
        <div className="reveal-on-scroll">
          <Projects navItem={navMap.projects} projects={portfolio.projects} />
        </div>
        <TechMarquee navItem={navMap.skills} items={portfolio.techStack} />
        <div className="reveal-on-scroll">
          <Experience
            navItem={navMap.experience}
            experience={portfolio.experience}
          />
        </div>
        <div className="reveal-on-scroll">
          <About navItem={navMap.about} about={portfolio.about} />
        </div>
        <Contact
          navItem={navMap.contact}
          contact={portfolio.contact}
          brand={portfolio.brand}
        />
      </main>
    </div>
  );
}
