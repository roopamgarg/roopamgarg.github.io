# Portfolio

A React + TypeScript + Vite portfolio site with Tailwind CSS and an extensible theming system.

## Getting started

Requires Node 20+.

```bash
npm install
npm run dev        # start dev server at http://localhost:5173
npm run build      # type-check + production build
npm run preview    # preview the production build
```

## Editing content

All page content lives in one typed file: [`src/data/portfolio.ts`](src/data/portfolio.ts).
Types are defined in [`src/types/portfolio.ts`](src/types/portfolio.ts).

To add a project, add an entry to `portfolio.projects`. To change the hero copy,
edit `portfolio.hero`. No component changes required.

## Theming

Themes are defined as CSS custom properties in [`src/styles/themes.css`](src/styles/themes.css)
and consumed by Tailwind via semantic color tokens in [`tailwind.config.ts`](tailwind.config.ts)
(`bg-bg`, `bg-surface`, `text-text`, `text-muted`, `border-border`, `bg-accent`, ...).

The active theme is applied via a `data-theme` attribute on `<html>`. The
[`ThemeProvider`](src/theme/ThemeProvider.tsx) exposes a three-state preference:

- `dark`
- `light`
- `system` (follows `prefers-color-scheme`)

The preference is persisted to `localStorage` under `theme-preference`, and an
inline script in [`index.html`](index.html) resolves and applies the theme
before React hydrates to prevent a flash of the wrong theme.

### Adding a new theme

1. Add a block in `src/styles/themes.css`:

   ```css
   [data-theme="midnight"] {
     --color-bg: ...;
     /* ...every semantic token... */
   }
   ```

2. Extend the `ThemeName` union in [`src/types/theme.ts`](src/types/theme.ts).
3. Add an entry to `themes` and `preferences` in [`src/theme/themes.ts`](src/theme/themes.ts).

Components reference semantic tokens only — they never need to change.

## Project structure

```
src/
  App.tsx                 # Page layout (sidebar + stacked sections)
  main.tsx                # React + ThemeProvider root
  index.css               # Tailwind layers, base rules, shared components
  styles/themes.css       # CSS variable tokens per theme
  types/                  # Shared TypeScript types
  data/portfolio.ts       # All page content (typed)
  theme/                  # ThemeProvider, useTheme, theme registry
  lib/icons.ts            # IconName -> lucide-react component map
  hooks/                  # useActiveSection (IntersectionObserver)
  components/             # Sidebar, TopNav, ThemeToggle, SectionLabel
  components/sections/    # Hero, Projects, Experience, About, Contact (+ sub-pieces)
```

## Accessibility

- Skip-to-content link (first focusable element)
- `:focus-visible` ring on every interactive control
- `aria-current="true"` on the active sidebar item
- `aria-label` + hint on the theme toggle that reflects the next state
- `rel="noopener noreferrer"` on every external link
- `prefers-reduced-motion` respected for smooth-scroll and color transitions
- Logical heading order (one `h1` in the hero, `h2` per section)
