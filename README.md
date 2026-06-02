# Prakhar Shukla — Portfolio

A futuristic, AI-augmented developer portfolio built with **Angular 21**, **Three.js**, **GSAP**, and **Tailwind CSS v4**.

🔵 Aurora-blue neon theme · animated 3D particle backdrop · scroll-reveal motion · fully responsive.

## ✨ Features

- **Three.js** animated starfield + floating neon wireframe solids with mouse/scroll parallax
- **GSAP ScrollTrigger** reveal animations on every section
- **Tailwind v4** design tokens — entire theme is token-driven
- Zoneless Angular with signals & standalone components
- Glassmorphism, glowing gradients, typewriter hero
- Sections: Hero · About · Skills (incl. AI: Claude / GPT / Antigravity) · Experience · Projects · Achievements · Contact

## 🛠️ Tech Stack

| Layer | Tech |
| --- | --- |
| Framework | Angular 21 (standalone, signals, zoneless) |
| Styling | Tailwind CSS v4 |
| 3D / WebGL | Three.js |
| Animation | GSAP + ScrollTrigger |
| Language | TypeScript |

## 🚀 Getting Started

```bash
npm install
npm start          # dev server → http://localhost:4200
npm run build      # production build → dist/myportfolio/browser
```

## ✏️ Editing Content

All content lives in a single file — names, skills, experience, projects:

```
src/app/data/portfolio.data.ts
```

## 📦 Deployment

Deployed on **Vercel**. Output directory: `dist/myportfolio/browser` (see `vercel.json`).

---

Built with ⚡ Angular, Three.js & GSAP — and a little help from AI.
