import { useEffect, useState, type CSSProperties } from "react";
import { SidebarToggle } from "./SidebarToggle";
import { ThemeToggle } from "./ThemeToggle";
import type { NavItem } from "@/types/portfolio";

interface TopNavProps {
  brand: string;
  nav: NavItem[];
  sidebarVisible: boolean;
  onToggleSidebar: () => void;
}

const DESKTOP_LINKS = ["about", "projects", "experience", "contact"] as const;

export function TopNav({
  brand,
  nav,
  sidebarVisible,
  onToggleSidebar,
}: TopNavProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const desktopItems = DESKTOP_LINKS.map(
    (id) => nav.find((n) => n.id === id)!,
  ).filter(Boolean);

  return (
    <header className="sticky top-0 z-30 border-b border-border/5 bg-bg/75 backdrop-blur-lg">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <SidebarToggle visible={sidebarVisible} onToggle={onToggleSidebar} />
          <a
            href="#home"
            className={[
              "flex items-center gap-2 text-sm font-black normal-case lg:uppercase tracking-[0.15em] text-text",
              sidebarVisible ? "md:hidden" : "",
            ].join(" ")}
          >
            <span
              className="h-2 w-2 rotate-45 bg-accent"
              aria-hidden="true"
            />
            {brand}
          </a>
        </div>

        <nav aria-label="Top">
          <ul className="flex items-center gap-2 text-xs font-bold normal-case lg:uppercase tracking-wider">
            {desktopItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="hidden rounded-md px-3 py-2 text-muted transition-colors hover:bg-surface/40 hover:text-accent md:inline-flex"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="ml-2">
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>

      <div className="scroll-progress-container" aria-hidden="true">
        <div
          className="scroll-progress-bar"
          style={{ "--scroll-progress": `${progress}%` } as CSSProperties}
        />
      </div>
    </header>
  );
}
