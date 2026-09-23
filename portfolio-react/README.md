# Harsh Tanwar — Portfolio (React + Three.js + GSAP + Framer Motion)

A fully scrollable, single-page portfolio built with:

- **React 18** + **Vite**
- **@react-three/fiber** + **@react-three/drei** — a persistent, draggable/auto-rotating 3D background (distorted icosahedron, wireframe ring, floating satellite, starfield) that sits behind every section
- **GSAP + ScrollTrigger** — scroll-linked reveal animations per section
- **Framer Motion** — hero entrance stagger, button hover/tap, project card hover physics

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Structure

```
src/
  App.jsx              // composes everything
  index.css             // design tokens + all styling
  components/
    Cursor.jsx           // custom cursor
    Scene3D.jsx           // fixed Three.js background (drag to rotate)
    Nav.jsx
    Hero.jsx
    About.jsx
    Work.jsx              // project cards — live demo + GitHub links
    Skills.jsx
    Contact.jsx
    Footer.jsx
```

## Things to personalize before deploying

- **`Work.jsx`** — the `github` links currently point to your GitHub profile
  (`github.com/Harsh-9818`) for all three projects, since no individual repo
  names were provided. Swap in each project's actual repo URL if you have one.
- **Resume link** — currently redirects to your LinkedIn (as requested). Swap
  in a hosted PDF link once you have one.
- **Colors** — `--accent` (#FF3D57) and `--accent2` (#00C2A8) in `index.css`.
- **3D scene** — tweak `Scene3D.jsx` (colors, shapes, `autoRotateSpeed`,
  `distort`) to taste.

## Deploying

This is a static Vite build — deploys cleanly to Vercel, Netlify, or GitHub
Pages. For Vercel: `vercel` in the project root, or connect the repo in the
Vercel dashboard (framework preset: Vite).
