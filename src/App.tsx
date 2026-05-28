import { useMemo } from "react";
import { InteractiveGrid } from "@/components/InteractiveGrid";
import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { portfolio } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useSidebarVisible } from "@/hooks/useSidebarVisible";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { NavItem } from "@/types/portfolio";

function byId(nav: NavItem[]): Record<string, NavItem> {
  return Object.fromEntries(nav.map((n) => [n.id, n]));
}

export default function App() {
  useScrollReveal();

  const navIds = useMemo(
    () => portfolio.nav.map((n) => n.id),
    [],
  );
  const activeId = useActiveSection(navIds);
  const navMap = useMemo(() => byId(portfolio.nav), []);
  const { visible: sidebarVisible, toggle: toggleSidebar } =
    useSidebarVisible();

  return (
    <div className="relative min-h-screen text-text">
      <InteractiveGrid />

      <a href="#home" className="skip-link">
        Skip to content
      </a>

      <div className="relative z-10 flex">
        <Sidebar
          brand={portfolio.brand}
          nav={portfolio.nav}
          activeId={activeId}
          visible={sidebarVisible}
        />

        <div className="min-w-0 flex-1">
          <TopNav
            brand={portfolio.brand}
            nav={portfolio.nav}
            sidebarVisible={sidebarVisible}
            onToggleSidebar={toggleSidebar}
          />

          <main>
            <div className="reveal-on-scroll">
              <Hero
                navItem={navMap.home}
                hero={portfolio.hero}
                architecture={portfolio.architecture}
              />
            </div>
            <div className="reveal-on-scroll">
              <Projects
                navItem={navMap.projects}
                projects={portfolio.projects}
              />
            </div>

            <SkillsMarquee />

            <div className="reveal-on-scroll">
              <Experience
                navItem={navMap.experience}
                experience={portfolio.experience}
                techStack={portfolio.techStack}
                codeSnippet={portfolio.codeSnippet}
              />
            </div>
            <div className="reveal-on-scroll">
              <About navItem={navMap.about} about={portfolio.about} />
            </div>
            <div className="reveal-on-scroll">
              <Contact navItem={navMap.contact} contact={portfolio.contact} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

