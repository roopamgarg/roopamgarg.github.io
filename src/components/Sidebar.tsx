import type { NavItem } from "@/types/portfolio";

interface SidebarProps {
  brand: string;
  nav: NavItem[];
  activeId: string;
}

export function Sidebar({ brand, nav, activeId }: SidebarProps) {
  return (
    <aside
      className="hidden shrink-0 border-r border-border/10 md:block md:w-[220px] lg:w-[240px]"
      aria-label="Primary"
    >
      <div className="sticky top-0 flex h-screen flex-col gap-10 px-6 py-8">
        <a
          href="#home"
          className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-text"
        >
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          {brand}
        </a>

        <nav aria-label="Sections">
          <ul className="space-y-1">
            {nav.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-accent/10 text-text"
                        : "text-muted hover:bg-surface/60 hover:text-text",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "font-mono text-xs",
                        isActive ? "text-accent" : "text-muted",
                      ].join(" ")}
                    >
                      {item.num}
                    </span>
                    <span className="font-medium">{item.label}</span>
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
