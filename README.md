# Frontend Mentor - Browser extensions manager UI solution

This is a solution to the [Browser extensions manager UI challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/browser-extension-manager-ui-yNZnOfsMAp).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Features implemented](#features-implemented)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Project structure](#project-structure)
  - [State and theme architecture](#state-and-theme-architecture)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI collaboration](#ai-collaboration)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Available scripts](#available-scripts)
  - [Build and static export](#build-and-static-export)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Toggle extensions between active and inactive states
- Filter active and inactive extensions
- Remove extensions from the list
- Select their color theme
- View an optimal layout across mobile and desktop sizes
- See clear hover/focus states for all interactive elements

### Features implemented

- Fully rebuilt extension manager logic with local component state
- Search extensions by name and description
- Filter by `all`, `active`, and `inactive`
- Toggle each extension's enabled/disabled state
- Remove individual extensions from the current list
- Restore all default extension data with one action
- Persist extension state to `localStorage` (`extensions-manager-state-v2`)
- Custom theme switching implementation (no theme library runtime needed)
- Persist selected theme to `localStorage` (`extensions-manager-theme`)

### Screenshot

Add your screenshot file (for example `./screenshot.jpg`) and update this section:

```md
![Browser extensions manager screenshot](./screenshot.jpg)
```

### Links

- Solution URL: Add your Frontend Mentor solution URL
- Live Site URL: Add your deployed project URL

## My process

### Built with

- Semantic HTML5
- Tailwind CSS v4
- CSS custom properties for tokens (colors, radius, gradients)
- Mobile-first responsive layout
- React 19
- Next.js 15 (App Router)
- TypeScript

### Project structure

```text
.
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   └── Header.tsx
│   └── ui/
│       └── ToggleThemeButton.tsx
├── public/assets/
├── data.json
└── README.md
```

### State and theme architecture

- Main application state lives in `app/page.tsx`
- Extension state is initialized from `data.json`
- All list operations (search/filter/toggle/remove/reset) are handled through React state updates
- Extension state is persisted and restored from `localStorage`
- Theme state is handled by `components/ui/ToggleThemeButton.tsx`
- Theme is applied via `data-theme` on `<html>` and consumed by the custom `dark` variant in `app/globals.css`

### What I learned

- A small, focused state model can replace heavier context setups for single-page workflows
- Persisted UI state (`localStorage`) improves UX for dashboard-like interfaces
- Using a `data-theme` attribute gives predictable control over theme styling with Tailwind custom variants
- Tight component boundaries (`Header`, `ToggleThemeButton`, page-level state) simplify long-term maintenance

### Continued development

- Add unit/component tests for filtering, toggling, and restore actions
- Add keyboard interaction enhancements for toggle controls (`aria-checked`, `role="switch"`)
- Add optional sorting (alphabetical, recently changed)
- Add animations for list updates while keeping performance smooth

### Useful resources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDN - Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### AI collaboration

AI tools were used to speed up implementation and cleanup.

- Refactored old architecture into a cleaner state-driven approach
- Reworked theme logic to a custom localStorage + `data-theme` implementation
- Removed legacy/unreferenced components and context files
- Helped generate and polish technical documentation

## Getting started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Available scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

- `npm run dev` starts the development server (Turbopack)
- `npm run lint` runs ESLint checks
- `npm run build` creates a production build
- `npm run start` starts the production server

### Build and static export

This project uses static export mode in `next.config.ts`:

```ts
output: 'export';
```

After building, the static output is generated in the `out/` directory.

## Author

- Name - Rafi Zaman
- Frontend Mentor - [@rafi983](https://www.frontendmentor.io/profile/rafi983)
- GitHub - [rafi983](https://github.com/rafi983/Browser-extensions-manager)
