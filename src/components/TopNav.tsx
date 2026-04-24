import { ThemeToggle } from "./ThemeToggle";
import type { NavItem } from "@/types/portfolio";

interface TopNavProps {
  brand: string;
  nav: NavItem[];
}

const DESKTOP_LINKS = ["about", "projects", "experience", "contact"] as const;

export function TopNav({ brand, nav }: TopNavProps) {
  const desktopItems = DESKTOP_LINKS.map(
    (id) => nav.find((n) => n.id === id)!,
  ).filter(Boolean);

  return (
    <header className="sticky top-0 z-30 border-b border-border/10 bg-bg/70 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
        <a
          href="#home"
          className="flex items-center gap-2 text-sm font-semibold md:hidden"
        >
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          {brand}
        </a>

        <div className="hidden md:block" aria-hidden="true" />

        <nav aria-label="Top">
          <ul className="flex items-center gap-1 text-sm">
            {desktopItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="rounded-md px-3 py-1.5 text-muted transition-colors hover:text-text"
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
    </header>
  );
}
