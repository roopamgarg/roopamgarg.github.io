# Portfolio

A single-page portfolio site built with **React 18 + TypeScript + Vite + Tailwind CSS**.

The page is entirely static, but the code is structured so that content, theming, and interactive behavior are cleanly separated and easy to extend.

Key features:

- Dark, light, and "follow system" themes, swapped via a `data-theme` attribute with zero FOUC
- All page content lives in one typed data file — edit text, projects, or tech stack without touching a component
- Animated architecture diagram with flowing accent-colored packets along every connector
- Cursor-following radial glow overlaid on a subtle grid, visible behind every section
- Collapsible sidebar with a persisted preference (`localStorage`), closed by default
- Full keyboard/focus accessibility, skip-to-content link, `prefers-reduced-motion` support, SEO meta tags

---

## Table of contents

1. [Requirements](#requirements)
2. [Getting started](#getting-started)
3. [Available scripts](#available-scripts)
4. [Folder structure](#folder-structure)
5. [Design decisions](#design-decisions)
6. [Editing content](#editing-content)
7. [Theming](#theming)
8. [Accessibility](#accessibility)
9. [Deployment](#deployment)

---

## Requirements

- **Node.js ≥ 20** (Vite 5 requires Node 18+; this repo is tested on 20.18.2 and pins it via [`.nvmrc`](.nvmrc))
- **npm ≥ 10** (ships with Node 20)

If you use [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm use         # reads .nvmrc and switches to Node 20.18.2
```

> A local [`.npmrc`](.npmrc) points the project at the public npm registry so the install doesn't pick up any private corporate registry your global config might have.

## Getting started

```bash
git clone <repo-url>
cd portfolio
nvm use           # optional, ensures Node 20
npm install
npm run dev
```

Then open [http://localhost:5173/](http://localhost:5173/).

## Available scripts

| Command           | What it does                                                     |
| ----------------- | ---------------------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server on `:5173` with HMR                    |
| `npm run build`   | Run `tsc -b` for type-checking, then produce a production bundle |
| `npm run preview` | Serve the built `dist/` locally to sanity-check the prod build   |
| `npm run lint`    | `tsc --noEmit` — alias for fast type-check-only                  |

The production build reports its own size summary; the current bundle is around **175 kB JS / 18 kB CSS** (≈ **55 kB / 4 kB** gzipped).

---

## Folder structure

```
portfolio/
├── index.html                 # Entry HTML + inline theme-resolution script (FOUC prevention) + SEO meta
├── vite.config.ts             # Vite + React plugin + @/ → src/ alias
├── tailwind.config.ts         # Semantic color tokens driven by CSS variables
├── postcss.config.js
├── tsconfig.json              # References tsconfig.app.json + tsconfig.node.json
├── tsconfig.app.json          # App code (strict mode, @/ alias)
├── tsconfig.node.json         # Vite config type-checking
├── .nvmrc                     # Node 20.18.2
├── .npmrc                     # Public npm registry
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx               # React entry: mounts <App/> inside <ThemeProvider/>
    ├── App.tsx                # Page shell: InteractiveGrid + Sidebar + TopNav + stacked sections
    ├── index.css              # Tailwind layers, base rules, .card / .flow-line / .flow-overlay
    │
    ├── types/
    │   ├── portfolio.ts       # Portfolio schema (Portfolio, Project, ExperienceItem, IconName, …)
    │   └── theme.ts           # ThemeName / ThemePreference unions + metadata interfaces
    │
    ├── data/
    │   └── portfolio.ts       # Single source of truth for ALL page content (typed as Portfolio)
    │
    ├── styles/
    │   └── themes.css         # [data-theme="dark"] / [data-theme="light"] CSS variable tokens
    │
    ├── theme/
    │   ├── themes.ts          # Registry: themes + preferences, isThemeName / isThemePreference guards
    │   ├── ThemeProvider.tsx  # Context + three-state preference (dark | light | system), localStorage + matchMedia
    │   └── useTheme.ts        # Consumer hook
    │
    ├── lib/
    │   └── icons.ts           # Record<IconName, LucideIcon> — typed icon resolver
    │
    ├── hooks/
    │   ├── useActiveSection.ts   # IntersectionObserver-driven active nav highlight
    │   └── useSidebarVisible.ts  # Sidebar open/closed state, persisted to localStorage
    │
    └── components/
        ├── Sidebar.tsx        # Left numbered nav rail (desktop only)
        ├── TopNav.tsx         # Sticky header: sidebar toggle, brand, section links, theme toggle
        ├── ThemeToggle.tsx    # Cycles dark → light → system
        ├── SidebarToggle.tsx  # Show/hide left rail (desktop only, aria-pressed)
        ├── SectionLabel.tsx   # Vertical "02 / Projects / …" label column shown beside each section
        ├── InteractiveGrid.tsx # Fixed-background grid + cursor-following radial glow
        └── sections/
            ├── Hero.tsx
            ├── ArchitectureDiagram.tsx   # SVG with animated flowing packets along every connector
            ├── Projects.tsx
            ├── ProjectCard.tsx
            ├── Experience.tsx
            ├── Timeline.tsx
            ├── TechStack.tsx
            ├── CodeWindow.tsx            # Lightweight hand-rolled syntax highlighting
            ├── About.tsx
            ├── TerminalWindow.tsx
            ├── TraitCard.tsx
            ├── Contact.tsx
            └── WorldMap.tsx              # Inline SVG dot-matrix map, no external data
```

---

## Design decisions

### Data-driven content

Every piece of user-facing text and every project / experience / trait / tech-stack entry lives in **one typed file**: [`src/data/portfolio.ts`](src/data/portfolio.ts).

The schema is defined in [`src/types/portfolio.ts`](src/types/portfolio.ts) (`Portfolio`, `Project`, `ExperienceItem`, `Trait`, `HeroSpec`, `ArchitectureSpec`, `ContactSpec`, `IconName`, …).

Every section component takes its slice of the content as strictly-typed props — no untyped `any` anywhere.

This means:

- Adding a project is one entry in an array; no JSX or layout change
- Renaming a section label in one place flows through the sidebar, top nav, and section heading
- Icons are referenced by a typed `IconName` string union and resolved through a `Record<IconName, LucideIcon>` in [`src/lib/icons.ts`](src/lib/icons.ts), so typos fail at compile time

### Theming via CSS variables + `data-theme`

Rather than using Tailwind's `dark:` class variant (which only handles two states well), the app uses semantic color tokens stored as CSS custom properties and switched with a `data-theme` attribute on `<html>`:

- Dark and light theme blocks live in [`src/styles/themes.css`](src/styles/themes.css) using the `--color-*: R G B;` channel form so Tailwind opacity modifiers (`bg-surface/60`) still work
- Tailwind maps those variables to semantic color names (`bg`, `surface`, `surface-2`, `border`, `ring`, `text`, `muted`, `accent`, `accent-fg`, `success`, `danger`) in [`tailwind.config.ts`](tailwind.config.ts) via `rgb(var(--color-*) / <alpha-value>)`
- Components only ever use these semantic classes (`bg-bg`, `text-muted`, `border-border/10`, …) — they never reference raw hex or `emerald-400`
- `ThemeProvider` models three states: `dark | light | system`. When the preference is `system`, a `matchMedia('(prefers-color-scheme: dark)')` subscription re-resolves the theme on OS-level changes. When the user picks a specific theme, the subscription is dropped to avoid ignoring their choice.
- An inline script in [`index.html`](index.html) resolves and applies the theme **before React hydrates** to prevent a flash of the wrong theme, using the same logic as the runtime provider.

**Adding a new theme is three edits, zero component changes:**

1. Add `[data-theme="midnight"] { --color-bg: ...; }` (all semantic tokens) to `themes.css`
2. Extend the `ThemeName` union in [`src/types/theme.ts`](src/types/theme.ts)
3. Add an entry to `themes` and `preferences` in [`src/theme/themes.ts`](src/theme/themes.ts)

The `ThemeToggle` auto-picks up the new preference in its cycle.

### Interactive background

[`InteractiveGrid.tsx`](src/components/InteractiveGrid.tsx) is a single `fixed inset-0 pointer-events-none` layer rendered once at the root. It composes:

- A grid drawn with two linear-gradient patterns at 48px spacing, alpha-masked with a radial `mask-image` so the pattern fades at the viewport edges
- A radial accent glow whose center is driven by two CSS custom properties (`--grid-mx`, `--grid-my`) updated on `pointermove`, throttled to one update per animation frame

Because it's fixed, the same background is visible behind every section as you scroll, which is a lot cheaper than painting it per-section and also keeps the animation in one place.

### Animated architecture diagram

[`ArchitectureDiagram.tsx`](src/components/sections/ArchitectureDiagram.tsx) is a full SVG (not HTML + overlay) so node positions and connector paths share a single coordinate system and align precisely. Each connector is two stacked paths:

- A dim static line (`.flow-line`)
- An accent-colored overlay with `stroke-dasharray: 3 57` and a CSS `stroke-dashoffset` keyframe animation (`.flow-overlay` in [`src/index.css`](src/index.css))

The short dash + large gap reads as a single bright packet flowing along the connector; longer paths naturally carry multiple packets. Each path gets a staggered `animation-delay` so the system doesn't pulse in lockstep. When `prefers-reduced-motion: reduce` is set, the animation is disabled and the overlay becomes a dim static line.

### Component decomposition

Each section is a self-contained component that takes its typed slice of the portfolio data. Shared sub-pieces (`SectionLabel`, `CodeWindow`, `TerminalWindow`, `TraitCard`, `ProjectCard`, `Timeline`, `TechStack`) are split out so the section files stay at the "layout" level and don't mix in rendering details.

### Hooks live where they're consumed

- [`useActiveSection`](src/hooks/useActiveSection.ts) — one-time `IntersectionObserver`, used by the sidebar
- [`useSidebarVisible`](src/hooks/useSidebarVisible.ts) — trivial boolean state with `localStorage` persistence, used by `App.tsx`
- [`useTheme`](src/theme/useTheme.ts) — context consumer for `ThemeProvider`

Nothing that isn't actually shared lives at the app level.

### What's intentionally not here

- **No router.** The site is one page; navigation is anchor links + smooth-scroll + `scroll-margin-top`.
- **No state library.** The only shared state is the theme (React context) and the sidebar toggle (lifted in `App.tsx`).
- **No icon sprite / no Prism.** One tiny handwritten tokenizer in `CodeWindow.tsx` handles the single code snippet; `lucide-react` is tree-shaken so only the ~15 icons used ship.
- **No map library.** The "world map" is an inline SVG dot matrix derived from a small ellipse mask — no data files, no dependency.
- **No tests, no CI.** Out of scope for a personal portfolio.

---

## Editing content

Everything a visitor reads is in [`src/data/portfolio.ts`](src/data/portfolio.ts).

Common edits:

- **Hero copy** — `portfolio.hero`
- **Projects** — append an object to `portfolio.projects`; the icon must be an existing `IconName`, add it to the union + the map if you need a new one
- **Experience timeline** — append to `portfolio.experience`
- **Tech stack pills** — strings in `portfolio.techStack`
- **Code snippet in the experience section** — `portfolio.codeSnippet` (any string; the `CodeWindow` tokenizer handles basic JS/TS)
- **About / traits** — `portfolio.about.whoami` (terminal lines) and `portfolio.about.traits`
- **Contact** — email, LinkedIn, status, location in `portfolio.contact`

## Theming

See [Design decisions → Theming](#theming-via-css-variables--data-theme) above.

Quick tour for adding a new named theme:

```css
/* src/styles/themes.css */
[data-theme="midnight"] {
  --color-bg: 5 7 15;
  --color-surface: 12 16 28;
  --color-surface-2: 18 23 38;
  --color-border: 180 200 255;
  --color-ring: 140 170 255;
  --color-text: 220 225 240;
  --color-text-muted: 130 140 165;
  --color-accent: 140 170 255;
  --color-accent-fg: 5 7 15;
  --color-success: 34 197 94;
  --color-danger: 239 68 68;
}
```

```ts
// src/types/theme.ts
export type ThemeName = "dark" | "light" | "midnight";
```

```ts
// src/theme/themes.ts
export const themes: Record<ThemeName, ThemeMeta> = {
  dark: { name: "dark", label: "Dark", icon: "Moon" },
  light: { name: "light", label: "Light", icon: "Sun" },
  midnight: { name: "midnight", label: "Midnight", icon: "Moon" },
};
```

That's it — every component will inherit the new palette.

## Accessibility

- **Skip link** as the first focusable element (`.skip-link` in `index.css`)
- **`:focus-visible` ring** using the theme's `--color-ring` token; offset by the background color so it's visible on both light and dark
- **`aria-current="true"`** on the active sidebar item
- **`aria-label` + `aria-pressed`** on the theme toggle and sidebar toggle, with labels that reflect the next state
- **`aria-hidden="true"`** on decorative icons and the interactive background
- **`rel="noopener noreferrer"`** on every `target="_blank"` link
- **`prefers-reduced-motion: reduce`** respected for smooth scroll, theme transitions, and the diagram's flow animation
- **Logical heading order**: one `h1` in the hero, `h2` per section
- **`scroll-margin-top`** on every `section[id]` so hash-linked anchors aren't hidden under the sticky nav

## Deployment

The output of `npm run build` is a static bundle in `dist/`. Deploy it to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3 + CloudFront, …). Because there's no router, you don't need any SPA fallback configuration.

```bash
npm run build
npm run preview     # sanity check locally
```

For platforms that expect a Node version, target **Node 20+**.
