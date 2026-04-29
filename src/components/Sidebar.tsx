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
        "shrink-0 border-r border-border/10",
        "w-[84px] sm:w-[96px] md:w-[220px] lg:w-[240px]",
        visible ? "block" : "hidden",
      ].join(" ")}
      aria-label="Primary"
    >
      <div className="sticky top-0 flex h-screen flex-col gap-8 px-3 py-6 sm:px-4 md:gap-10 md:px-6 md:py-8">
        <a
          href="#home"
          className="inline-flex items-center justify-center gap-2 text-lg font-semibold tracking-tight text-text md:justify-start"
        >
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="hidden md:inline">{brand}</span>
        </a>

        <nav aria-label="Sections">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = activeId === item.id;
              const Icon = getIcon(NAV_ICONS[item.id] ?? "Code2");
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "group flex items-center justify-center gap-3 rounded-md px-2 py-2 text-sm transition-colors md:justify-start md:px-3",
                      isActive
                        ? "bg-accent/10 text-text"
                        : "text-muted hover:bg-surface/60 hover:text-text",
                    ].join(" ")}
                  >
                    <Icon
                      className={[
                        "h-4 w-4",
                        isActive ? "text-accent" : "text-muted",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                    <span className="hidden font-medium md:inline">{item.label}</span>
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
