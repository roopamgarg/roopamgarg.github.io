import { useMemo } from "react";
import { InteractiveGrid } from "@/components/InteractiveGrid";
import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { portfolio } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useSidebarVisible } from "@/hooks/useSidebarVisible";
import type { NavItem } from "@/types/portfolio";

function byId(nav: NavItem[]): Record<string, NavItem> {
  return Object.fromEntries(nav.map((n) => [n.id, n]));
}

export default function App() {
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
        {sidebarVisible && (
          <Sidebar
            brand={portfolio.brand}
            nav={portfolio.nav}
            activeId={activeId}
          />
        )}

        <div className="min-w-0 flex-1">
          <TopNav
            brand={portfolio.brand}
            nav={portfolio.nav}
            sidebarVisible={sidebarVisible}
            onToggleSidebar={toggleSidebar}
          />

          <main>
            <Hero
              navItem={navMap.home}
              hero={portfolio.hero}
              architecture={portfolio.architecture}
            />
            <Projects
              navItem={navMap.projects}
              projects={portfolio.projects}
            />
            <Experience
              navItem={navMap.experience}
              experience={portfolio.experience}
              techStack={portfolio.techStack}
              codeSnippet={portfolio.codeSnippet}
            />
            <About navItem={navMap.about} about={portfolio.about} />
            <Contact navItem={navMap.contact} contact={portfolio.contact} />
          </main>
        </div>
      </div>
    </div>
  );
}
