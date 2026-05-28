import { getIcon } from "@/lib/icons";
import type { IconName, NavItem } from "@/types/portfolio";

interface SidebarProps {
  brand: string;
  nav: NavItem[];
  activeId: string;
  visible: boolean;
}

const NAV_ICONS: Record<string, IconName> = {
  home: "Monitor",
  projects: "Code2",
  experience: "Boxes",
  skills: "Brain",
  about: "BookOpen",
  contact: "Mail",
};

export function Sidebar({ brand, nav, activeId, visible }: SidebarProps) {
  const sidebarItems = nav.filter((item) => item.id !== "skills");

  return (
    <aside
      className={[
        "shrink-0 border-r border-border/5 bg-bg/85 backdrop-blur-lg",
        "w-[84px] sm:w-[96px] md:w-[220px] lg:w-[240px]",
        visible ? "block" : "hidden",
      ].join(" ")}
      aria-label="Primary"
    >
      <div className="sticky top-0 flex h-screen flex-col gap-8 px-3 py-6 sm:px-4 md:gap-10 md:px-6 md:py-8">
        <a
          href="#home"
          className="inline-flex items-center justify-center gap-2 text-lg font-black uppercase tracking-[0.15em] text-text md:justify-start"
        >
          <span className="h-2 w-2 rotate-45 bg-accent" aria-hidden="true" />
          <span className="hidden md:inline">{brand}</span>
        </a>

        <nav aria-label="Sections">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = activeId === item.id;
              const Icon = getIcon(NAV_ICONS[item.id] ?? "Code2");
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "group flex items-center justify-center gap-3 rounded-lg px-2 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 md:justify-start md:px-4 border-l-2",
                      isActive
                        ? "bg-accent/[0.06] text-accent border-accent pl-1.5 md:pl-3.5"
                        : "text-muted hover:bg-surface/40 hover:text-text border-transparent hover:border-accent/30",
                    ].join(" ")}
                  >
                    <Icon
                      className={[
                        "h-4 w-4 transition-transform duration-300 group-hover:scale-110",
                        isActive ? "text-accent" : "text-muted",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                    <span className="hidden md:inline">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
