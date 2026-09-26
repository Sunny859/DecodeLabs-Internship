# The Responsive Architecture | Spatial Systems & Tectonics

An architectural monograph and digital catalogue exploring spatial systems, passive bioclimatic envelopes, and structural tectonics. Built strictly under a **mobile-first architectural paradigm**, the project treats the web as an intrinsic, high-performance information system without external dependencies, compilers, or third-party frameworks.

---

## Architectural Philosophy & Core Pillars

1. **Semantic Infrastructure (HTML5)**: Strict landmark trees (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`) ensuring complete screen-reader accessibility (WCAG 2.1 AAA) and search engine discoverability.
2. **Intrinsic Spatial Layout (CSS3)**:
   - **CSS Grid** for macro 2D floor plans.
   - **Flexbox** for linear micro-components.
   - **Container Queries (`@container`)** enabling sub-components to react directly to parent constraints rather than global screen dimensions.
   - **Fluid Typography**: Scaling via deterministic CSS `clamp()` functions to eliminate layout shifts (CLS).
3. **Behavioral Logic (Vanilla JavaScript)**: Clean state management handling accessible navigation drawers, typology filtering, and real-time blueprint dossier switching.

---

## Built Works & Monographs Included

The catalogue features six documented architectural case studies:

- **ARC-2024-01 | Pavilion of Earth & Light** (_Ladakh, Himalayan Foothills_): Stabilized rammed earth (600mm) and timber diagrid roof structure with high thermal inertia.
- **ARC-2024-02 | The Monolithic Atrium** (_Aarhus, Denmark_): Board-marked low-carbon geopolymer concrete library wing with a central zenith skylight funnel.
- **ARC-2025-03 | The Kinetic Solar Cantilever** (_Valencia, Spain_): Balanced post-tensioned steel cantilever with dynamic perforated bronze shading louvers.
- **ARC-2025-04 | Cross-Laminated Urban Habitat** (_Zurich, Switzerland_): Modular 8-story mass-timber housing using reversible dry-joint connectors.
- **ARC-2025-05 | Courtyard Wind-Catcher Sanctuary** (_Sharjah, UAE_): Aerodynamic wind towers (_Barjeel_) combined with subterranean evaporative cooling basins.
- **ARC-2026-06 | Subterranean Geothermal Cloister** (_Hokkaido, Japan_): Hillside-bermed residence featuring ground thermal equilibrium and charred _Yakisugi_ cedar.

---

## Design System & Design Tokens

### Color Palette (WCAG 2.1 AAA Compliant)

- **Mocha Mousse** (`#A47764`): Tectonic earth, timber, and structural accents.
- **Ethereal Blue** (`#5CA6CE`): Interactive controls, links, and zenith sky accents.
- **Moonlit Grey** (`#BFC2C9`): High-contrast editorial body text (> 10:1 contrast ratio against the base).
- **Grounded Base** (`#121110`): Deep roasted charcoal background.
- **Surface Tiers** (`#191816`, `#23211F`, `#332F2C`): Layered structural elevations and gridlines.

### Typography Constraints

- **Headline Font**: _Newsreader_ (Serif for editorial warmth and tectonic weight).
- **Body Font**: _Inter_ (Neutral sans-serif for legibility across viewports).
- **Strict Font Weights**: Exactly 3 weights (`400` Regular, `500` Medium, `700` Bold).

---

## Project Structure

```text
My Project/
├── images/
│   ├── project-01-rammed-earth.jpeg
│   ├── project-02-concrete-atrium.jpeg
│   ├── project-03-kinetic-cantilever.jpeg
│   ├── project-04-timber-habitat.jpeg
│   ├── project-05-wind-catcher.jpeg
│   └── project-06-geothermal-cloister.jpeg
├── index.html       # Semantic markup structure
├── styles.css       # Layouts, design tokens, fluid typography & media queries
├── script.js        # State management & blueprint telemetry
└── README.md        # Project documentation
```

---

## Getting Started

Because this project is built with **zero external libraries or build tools** (no Node.js, React, Tailwind, or bundlers), it runs immediately in any modern web browser.

### Option 1: Direct File Opening
Double-click `index.html` (or right-click &rarr; *Open With* &rarr; Chrome, Edge, Safari, or Firefox).

### Option 2: VS Code Live Server (Recommended)
1. Open the project folder in **Visual Studio Code** (`File` &rarr; `Open Folder...`).
2. Make sure you select the **`My Project`** folder directly so `index.html` and `styles.css` are at the root level.
3. Install the **Live Server** extension (by Ritwick Dey).
4. Right-click `index.html` and choose **Open with Live Server**.
5. The site will run at `http://127.0.0.1:5500`.

### Option 3: Terminal HTTP Server
From inside the project root folder:
```bash
# Python 3
python3 -m http.server 8000

# Node.js (via npx)
npx serve
```


## Mobile Optimization Highlights

* **Single-Column Stacking**: On viewports under 768px, cards expand to full width for comfortable reading and prominent imagery.
* **Touch Targets**: Standard 44px minimum touch targets on all interactive controls.
* **Horizontal Swipe Filters**: Category filter pills swipe horizontally on touchscreens with native momentum scrolling.
* **Hardware Accelerated Compositing**: Sticky navigation uses `transform: translateZ(0)` to prevent mobile GPU repaint stutter during scroll.
* **Safe-Area Insets**: Header respects `env(safe-area-inset-top)` for mobile notches and camera islands.

---

## Deployment

Deployable as static files to any hosting provider:

* **GitHub Pages**: Push files to a repository and enable GitHub Pages under *Settings &rarr; Pages*.
* **Netlify**: Drag and drop the folder into [app.netlify.com/drop](https://app.netlify.com/drop).
* **Vercel / Cloudflare Pages**: Connect the Git repository with default static settings.

---

## License & Colophon

Designed for academic, studio, and open web architectural research. All structural schemas and specifications conform to standard bioclimatic metrics.
