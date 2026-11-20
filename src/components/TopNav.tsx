import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ICON_STROKE } from "@/lib/icons";
import type { NavItem } from "@/types/portfolio";

interface TopNavProps {
  brand: string;
  nav: NavItem[];
  activeId: string;
}

const LINK_IDS = ["about", "projects", "experience", "contact"] as const;

export function TopNav({ brand, nav, activeId }: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = LINK_IDS.map((id) => nav.find((n) => n.id === id)).filter(
    (n): n is NavItem => Boolean(n),
  );

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-border/[0.07] bg-bg/80 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <a
          href="#home"
          className="text-[15px] font-semibold tracking-tight text-text"
        >
          {brand}
        </a>

        <nav aria-label="Primary" className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active ? "true" : undefined}
                    className={[
                      "rounded-full px-3.5 py-2 text-sm transition-colors duration-200",
                      active
                        ? "bg-surface-2 text-text"
                        : "text-muted hover:text-text",
                    ].join(" ")}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="ml-2 flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/10 text-muted transition-colors hover:text-text md:hidden"
            >
              {menuOpen ? (
                <X className="h-4 w-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-40 border-b border-border/[0.07] bg-bg md:hidden"
        >
          <ul className="container-page flex flex-col py-3">
            {links.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-lg font-medium text-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        className="scroll-progress absolute inset-x-0 bottom-0 h-px bg-accent"
        aria-hidden="true"
      />
    </header>
  );
}
