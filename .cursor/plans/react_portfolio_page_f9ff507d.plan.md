---
name: React portfolio page
overview: Build a pixel-close React + TypeScript implementation of the provided dark-themed portfolio design using Vite + Tailwind CSS, with all content extracted into a single typed data config file so sections, projects, experience, and skills are easy to edit.
todos:
  - id: scaffold
    content: "Scaffold Vite React+TypeScript project and install Tailwind + lucide-react; configure tailwind.config.ts (darkMode: 'class', accent color), index.css, and tsconfig path aliases"
    status: completed
  - id: types-data
    content: Define shared types in src/types/portfolio.ts (NavItem, Project, ExperienceItem, Trait, etc.) and create src/data/portfolio.ts with all typed content (brand, nav, hero, architecture, projects, experience, techStack, codeSnippet, about, contact)
    status: completed
  - id: theming
    content: "Build theming system: CSS variable tokens in src/styles/themes.css (dark + light, each with its own border/ring/surface values), Tailwind config consuming vars via rgb(var(--...) / <alpha-value>), ThemeProvider with explicit three-state model (dark | light | system), useTheme hook, data-theme attribute on <html>, localStorage persistence under 'theme-preference', FOUC-prevention inline script in index.html using the same resolution rules"
    status: completed
  - id: layout
    content: Build App.tsx layout grid + Sidebar.tsx (numbered nav with active highlighting via useActiveSection) + TopNav.tsx + ThemeToggle.tsx
    status: completed
  - id: hero
    content: Build Hero.tsx (greeting, large title with green accent word, description, CTA buttons) and ArchitectureDiagram.tsx (grid of boxes + SVG connector overlay)
    status: completed
  - id: projects
    content: Build Projects.tsx grid and ProjectCard.tsx (icon, title, description, tech tag pills, Live / GitHub links)
    status: completed
  - id: experience
    content: Build Experience.tsx with Timeline.tsx (period / role / company / description) + TechStack.tsx pill wrap + CodeWindow.tsx static snippet
    status: completed
  - id: about
    content: Build About.tsx with TerminalWindow.tsx (whoami output) and 4 TraitCard.tsx items (Problem Solver, System Thinker, Lifelong Learner, Impact Driven)
    status: completed
  - id: contact
    content: Build Contact.tsx with email + LinkedIn buttons, WorldMap.tsx dotted SVG, and status/location card
    status: completed
  - id: quality
    content: "Quality bar pass: scroll-margin-top on sections, prefers-reduced-motion guards, focus-visible ring, skip-to-content link, aria-label/aria-pressed on ThemeToggle, aria-current on active nav, rel='noopener noreferrer' on external links, SEO meta tags (title/description/og/twitter/theme-color)"
    status: completed
  - id: polish
    content: Responsive pass (mobile stacking, architecture diagram overflow), verify all three theme states (dark / light / system follow) end-to-end, smooth-scroll anchors, final spacing/typography tweaks to match mockup
    status: completed
isProject: false
---

## Stack & setup

- `Vite` + `React 18` + `TypeScript` (strict mode)
- `Tailwind CSS` for styling, configured with a dark palette + green accent
- `lucide-react` for icons (clean, tree-shakeable, matches the minimal icons in the mockup)
- No router (single-page, scroll-based navigation with anchor links)

Commands to scaffold:

```bash
npm create vite@latest . -- --template react-ts
npm i lucide-react
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`tsconfig.json`: keep default `strict: true`, add a `@/*` path alias to `src/*` so imports stay short (`import { portfolio } from "@/data/portfolio"`).

## File structure

```
portfolio/
  index.html
  tailwind.config.ts
  postcss.config.js
  tsconfig.json
  src/
    main.tsx
    App.tsx
    index.css                # tailwind directives + small base layer
    types/
      portfolio.ts           # shared types: NavItem, Project, ExperienceItem, Trait, IconName, ...
      theme.ts               # ThemeName union + ThemeTokens interface
    data/
      portfolio.ts           # ALL content, typed as Portfolio — single source of truth
    styles/
      themes.css             # CSS custom properties per theme: [data-theme="dark"] { --color-bg: ...; }
    theme/
      ThemeProvider.tsx      # React context: current theme, setTheme, toggle
      useTheme.ts            # consumer hook, typed
      themes.ts              # registry: { dark: { label, icon }, light: { ... } } — add new themes here
    lib/
      icons.ts               # IconName -> lucide component map (typed)
    components/
      Sidebar.tsx            # left rail: logo + numbered section list + current section label
      TopNav.tsx             # top header: About/Projects/Experience/Contact + theme toggle
      ThemeToggle.tsx
      SectionLabel.tsx       # vertical "02 Projects / A selection of..." blocks on the left
      sections/
        Hero.tsx             # "I don't just code features, I build systems." + architecture diagram
        ArchitectureDiagram.tsx
        Projects.tsx
        ProjectCard.tsx
        Experience.tsx
        Timeline.tsx
        TechStack.tsx
        CodeWindow.tsx
        About.tsx
        TerminalWindow.tsx
        TraitCard.tsx
        Contact.tsx
        WorldMap.tsx
    hooks/
      useActiveSection.ts    # IntersectionObserver to highlight current sidebar item
```

## Key design decisions

- **Typed, data-driven content**: `src/types/portfolio.ts` defines the schema, `src/data/portfolio.ts` supplies the values, so every section consumes a strictly-typed slice.

```ts
export type IconName = "Code2" | "Lock" | "CreditCard" | "Folder" | "Mail" | "Linkedin" | "Download" | "ArrowUpRight";

export interface NavItem { id: string; num: string; label: string; blurb?: string }
export interface Project { name: string; icon: IconName; description: string; stack: string[]; live: string; github: string }
export interface ExperienceItem { period: string; role: string; company: string; description: string }
export interface Trait { icon: IconName; title: string; description: string }

export interface Portfolio {
  brand: string;
  nav: NavItem[];
  hero: { greeting: string; titleLead: string; titleAccent: string; description: string; primaryCta: string; secondaryCta: string };
  architecture: { clients: string[]; gateway: string; services: string[]; stores: string[]; footer: string };
  projects: Project[];
  experience: ExperienceItem[];
  techStack: string[];
  codeSnippet: string;
  about: { whoami: string[]; traits: Trait[] };
  contact: { email: string; linkedin: string; status: string; location: { label: string; flag: string } };
}

export const portfolio: Portfolio = { /* ... */ };
```

Every section imports from `@/data/portfolio` and receives typed props — no `any`.

- **Layout**: CSS grid on the root — left sidebar rail (fixed width ~220px) + main content column. Uses `sticky` for the sidebar logo/nav on desktop; collapses to a simple top nav on mobile (`md:` breakpoint).

### Theming system (designed to be extensible)

Goal: adding a new theme (`"midnight"`, `"solarized"`, `"high-contrast"`, etc.) later requires **one CSS block + one registry entry** — no component changes, no re-styling.

**1. Single source of truth = CSS variables as RGB channel triplets** in [`src/styles/themes.css`](src/styles/themes.css). The channel form (not `#hex`) is what lets Tailwind apply opacity modifiers like `bg-surface/50`.

```css
:root, [data-theme="dark"] {
  --color-bg: 10 14 26;
  --color-surface: 17 22 38;
  --color-surface-2: 22 29 49;
  --color-border: 255 255 255;      /* light border on dark, used with low alpha */
  --color-ring: 52 211 153;
  --color-text: 230 235 245;
  --color-text-muted: 148 160 184;
  --color-accent: 52 211 153;
  --color-accent-fg: 5 15 10;
  --color-success: 34 197 94;
  --color-danger: 239 68 68;
}
[data-theme="light"] {
  --color-bg: 255 255 255;
  --color-surface: 248 250 252;
  --color-surface-2: 241 245 249;
  --color-border: 15 23 42;         /* dark border on light — NOT the same triplet as dark */
  --color-ring: 22 163 74;
  --color-text: 15 23 42;
  --color-text-muted: 71 85 105;
  --color-accent: 22 163 74;
  --color-accent-fg: 255 255 255;
  --color-success: 22 163 74;
  --color-danger: 220 38 38;
}
```

Important: every semantic token (including `border`, `ring`, focus/hover surfaces) gets a *real* per-theme value — light theme does not just reuse dark's border triplet with different alpha, or borders would visually disappear.

**2. Tailwind consumes the tokens** in [`tailwind.config.ts`](tailwind.config.ts). Components only ever use semantic classes (`bg-bg`, `bg-surface`, `text-text`, `text-muted`, `border-border`, `bg-accent`, `text-accent`) — never raw hex, never `emerald-400`.

```ts
colors: {
  bg:         "rgb(var(--color-bg) / <alpha-value>)",
  surface:    "rgb(var(--color-surface) / <alpha-value>)",
  "surface-2":"rgb(var(--color-surface-2) / <alpha-value>)",
  border:     "rgb(var(--color-border) / <alpha-value>)",
  text:       "rgb(var(--color-text) / <alpha-value>)",
  muted:      "rgb(var(--color-text-muted) / <alpha-value>)",
  accent:     { DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
                fg: "rgb(var(--color-accent-fg) / <alpha-value>)" },
  success:    "rgb(var(--color-success) / <alpha-value>)",
  danger:     "rgb(var(--color-danger) / <alpha-value>)",
}
```

**3. Theme switching via `data-theme` attribute**, not a `dark` class — this generalizes cleanly to N themes.

```ts
// src/types/theme.ts
export type ThemeName = "dark" | "light";   // add more here later
export interface ThemeMeta { name: ThemeName; label: string; icon: IconName }

// src/theme/themes.ts — the only registry
export const themes: Record<ThemeName, ThemeMeta> = {
  dark:  { name: "dark",  label: "Dark",  icon: "Moon" },
  light: { name: "light", label: "Light", icon: "Sun"  },
};
export const DEFAULT_THEME: ThemeName = "dark";

// src/theme/ThemeProvider.tsx — React context, writes document.documentElement.dataset.theme + localStorage
// src/theme/useTheme.ts         — consumer hook: { theme, setTheme, toggle, themes }
```

**4. Explicit three-state preference model** (avoids the usual `matchMedia` bugs):

- `userPreference: ThemeName | "system"` — persisted in `localStorage` under `"theme-preference"`
- `resolvedTheme: ThemeName` — what's actually applied to `<html data-theme>`
- When `userPreference === "system"`, subscribe to `matchMedia('(prefers-color-scheme: dark)')` and re-resolve on change. When the user picks a specific theme, unsubscribe.
- `ThemeToggle` cycles `dark → light → system → dark`. The inline FOUC-prevention script (below) uses the same resolution rules.

**5. No FOUC**: a tiny inline script in [`index.html`](index.html) runs before React hydration so the correct theme is painted immediately:

```html
<script>
  (function () {
    var p = localStorage.getItem("theme-preference");        // "dark" | "light" | "system" | null
    var resolved;
    if (p === "dark" || p === "light") resolved = p;
    else resolved = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = resolved;
  })();
</script>
```

**6. Smooth transitions**: `transition-colors duration-200` on the root; suppressed during the first paint via a `theme-ready` class flip to avoid transition-flash on load.

**7. Adding a new theme later = three edits, zero component changes**:

- add `[data-theme="midnight"] { --color-bg: ...; ... }` in `themes.css`
- add `midnight: { name: "midnight", label: "Midnight", icon: "..." }` to `themes.ts`
- extend the `ThemeName` union in `types/theme.ts`

The `ThemeToggle` auto-renders all entries from the registry (cycles or dropdown), so it picks up the new option for free.

- **Architecture diagram** ([`ArchitectureDiagram.tsx`](src/components/sections/ArchitectureDiagram.tsx)): pure HTML/CSS boxes in a CSS grid + one absolutely-positioned SVG overlay drawing the connector lines between columns. No external graphing lib — keeps bundle small and editable.
- **World map** ([`WorldMap.tsx`](src/components/sections/WorldMap.tsx)): inline SVG generated from a simple dot grid mask so it matches the stylized dotted look without pulling in `react-simple-maps` or similar.
- **Code window**: static pre/code with hand-applied spans for keyword/function/variable colors — no `prismjs` dependency; the snippet is short enough that manual tokens stay clean.
- **Icons**: `lucide-react` referenced by a typed `IconName` union in data; resolved through [`src/lib/icons.ts`](src/lib/icons.ts) — a `Record<IconName, LucideIcon>` so unknown icon names become a TypeScript error at compile time.

## Component responsibilities (high level)

- [`App.tsx`](src/App.tsx): owns layout grid, renders `Sidebar`, `TopNav`, and the stacked sections. Uses `useTheme` at the root.
- [`Sidebar.tsx`](src/components/Sidebar.tsx): brand + numbered nav list; highlights active item using `useActiveSection`.
- Each section in `components/sections/` is self-contained, receives its strictly-typed slice of data via props from `App.tsx`, and uses an `id` matching the nav for smooth anchor scrolling.
- Shared look: cards use `rounded-2xl border border-border/10 bg-surface p-6` (all semantic tokens), promoted to a small `@layer components` class `card` in `index.css` to avoid repetition.

## Responsiveness

- `< md`: sidebar becomes a hamburger-less top nav only; sections stack single-column; architecture diagram scrolls horizontally.
- `md+`: two-column layout as in the mockup.
- Projects grid: 1 / 2 / 4 columns at `sm` / `md` / `xl`.

## Quality bar (a11y, SEO, UX polish)

These are treated as first-class work, not afterthoughts:

- **Anchors**: `scroll-margin-top` on every section so hash-linked sections aren't hidden under sticky nav; smooth-scroll via `html { scroll-behavior: smooth }` wrapped in `@media (prefers-reduced-motion: no-preference)`.
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` disables scroll smoothing and color-transitions.
- **Keyboard / focus**: global `:focus-visible` ring using `--color-ring`; skip-to-content link as the first focusable element; logical heading order (one `h1` in hero, `h2` per section).
- **ARIA**: `ThemeToggle` has `aria-label` reflecting the next state and `aria-pressed` where applicable; sidebar active item gets `aria-current="true"`; decorative icons get `aria-hidden="true"`.
- **External links**: every `target="_blank"` paired with `rel="noopener noreferrer"`.
- **SEO / meta**: `<title>`, `meta description`, `og:title/description/image`, `twitter:card` set in `index.html` from a small constants block; theme-color meta tag synced with the resolved theme.
- **Fonts**: `font-display: swap`; preconnect to the font host if a custom font is used.
- **Hosting note**: documented as an SPA with a single `index.html` fallback (no routes, so no extra config).

## Out of scope (unless you ask)

- No backend, no contact form submission wiring (button is a `mailto:` link).
- No tests, no CI config.
- No real resume PDF — the "Download resume" button links to `#` until a file is provided.