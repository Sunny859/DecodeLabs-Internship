/**
 * THE RESPONSIVE ARCHITECTURE: STUDIO SYSTEM LOGIC
 * Strict Vanilla JS: State Management, Typology Filtering, and Blueprint Telemetry
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
     01. Accessible Mobile Navigation Controller
     ------------------------------------------------------------------------ */
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-nav');

  if (navToggle && primaryNav) {
    const toggleNavigation = (forceState = null) => {
      const isExpanded = forceState !== null 
        ? forceState 
        : navToggle.getAttribute('aria-expanded') === 'true';

      const nextState = !isExpanded;
      navToggle.setAttribute('aria-expanded', String(nextState));
      primaryNav.classList.toggle('is-open', nextState);

      if (window.innerWidth < 1024) {
        document.body.style.overflow = nextState ? 'hidden' : '';
      }
    };

    navToggle.addEventListener('click', () => toggleNavigation());

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        toggleNavigation(false);
        navToggle.focus();
      }
    });

    primaryNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          toggleNavigation(false);
        }
      });
    });

    let resizeScheduled = false;
    window.addEventListener('resize', () => {
      if (!resizeScheduled) {
        resizeScheduled = true;
        requestAnimationFrame(() => {
          if (window.innerWidth >= 1024 && navToggle.getAttribute('aria-expanded') === 'true') {
            navToggle.setAttribute('aria-expanded', 'false');
            primaryNav.classList.remove('is-open');
            document.body.style.overflow = '';
          }
          resizeScheduled = false;
        });
      }
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     02. Architectural Typology Filter Toolbar
     ------------------------------------------------------------------------ */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const monographCards = document.querySelectorAll('.monograph-card');

  if (filterButtons.length && monographCards.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');

        filterButtons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        monographCards.forEach(card => {
          const typology = card.getAttribute('data-typology');
          if (filterValue === 'all' || typology === filterValue) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
     03. Interactive Blueprint Dossier Inspector (All 6 Projects)
     ------------------------------------------------------------------------ */
  const architecturalDossiers = {
    '01': {
      image: 'images/project-01-rammed-earth.jpeg',
      code: 'ARC-2024-01 / SCHEMATIC SECTION',
      scale: 'SCALE 1:50 · METRIC',
      title: 'Pavilion of Earth & Light',
      abstract: 'Passive solar orientation angled along a 15° south-southeast axis to intercept early morning winter insolation. The 600mm stabilized rammed earth envelope counters high-altitude sub-zero freezing gradients through a 14.2-hour thermal flywheel lag.',
      grid: '6.0m × 6.0m Modules',
      uValue: '0.18 W/m²·K',
      joinery: 'Mortise & Tenon / Dry Earth Anchors',
      lifeSpan: '120+ Years Design Life',
      diagram: `+------------------[ NORTH WINDBREAK BUFFER ]-------------------+
|  [EARTH WALL 600mm]                    [STRUCTURAL SPUR]      |
|  +---------------------------------------------------------+  |
|  | SERVICE SPINE : GEOTHERMAL DUCTING                      |  |
|  +---------------------------------------------------------+  |
|                                                               |
|    COURTYARD APERTURE : CENTRAL HEARTH & OCULUS               |
|    =============================================              |
|                                                               |
|  +---------------------------------------------------------+  |
|  | OCCUPIABLE SANCTUARY / SUN-TEMPERED TIMBER DECK         |  |
|  +---------------------------------------------------------+  |
|  [LOW-E DOUBLE GLAZED FACADE : 15° S-SE ORIENTATION]          |
+======================[ SOLAR THRESHOLD ]======================+`
    },
    '02': {
      image: 'images/project-02-concrete-atrium.jpeg',
      code: 'ARC-2024-02 / TRANSVERSE SECTION',
      scale: 'SCALE 1:100 · METRIC',
      title: 'The Monolithic Atrium',
      abstract: 'A cast-in-place board-marked low-carbon geopolymer concrete reading wing. A central zenith light funnel casts indirect daylight across 5 stepped reading terraces, avoiding direct glare on archival materials.',
      grid: '9.0m Cast Radial Bays',
      uValue: '0.22 W/m²·K',
      joinery: 'Monolithic Poured Joints',
      lifeSpan: '200+ Years Design Life',
      diagram: `                      [ZENITH SKYLIGHT OCULUS]
                             /        \\
                            /          \\
         +-----------------+            +-----------------+
         | LEVEL 04 READ   |            | LEVEL 04 ARCHIVE|
         +------+----------+            +----------+------+
                |                                  |
         +------+----------+            +----------+------+
         | LEVEL 03 TERRACE|            | LEVEL 03 STACKS |
         +------+----------+            +----------+------+
                |                                  |
+---------------+----------------------------------+---------------+
| STEPPED CENTRAL ATRIUM BASIN & PUBLIC REFLECTING POOL            |
+==================================================================+`
    },
    '03': {
      image: 'images/project-03-kinetic-cantilever.jpeg',
      code: 'ARC-2025-03 / FACADE AXONOMETRIC',
      scale: 'SCALE 1:25 · DETAIL',
      title: 'The Kinetic Solar Cantilever',
      abstract: 'Post-tensioned high-tensile steel cantilever extending 18.4 meters over the public esplanade. Integrated automated bronze louvers adjust aperture porosity in sync with real-time solar tracking.',
      grid: '18.4m Structural Span',
      uValue: '0.28 W/m²·K',
      joinery: 'High-Tensile Pin Joints',
      lifeSpan: '75 Years (Serviced)',
      diagram: `+-[ PRIMARY MAST CORE ]
|   \\
|    \\---[ POST-TENSIONED TIE-ROD CABLES ]------------------+
|                                                          \\
|  +=========================================================+
|  | LEVEL 02: CANTILEVERED EXHIBITION DECK                  |
|  +---------------------------------------------------------+
|  [DYNAMIC PERFORATED BRONZE LOUVERS : 82% SOLAR CUTOFF]
|
+---[ GROUND FULCRUM PIER ]----------------------------------+`
    },
    '04': {
      image: 'images/project-04-timber-habitat.jpeg',
      code: 'ARC-2025-04 / STRUCTURAL ISOMETRIC',
      scale: 'SCALE 1:50 · PREFAB',
      title: 'Cross-Laminated Urban Habitat',
      abstract: 'Eight-story urban housing block engineered exclusively with 5-ply European spruce CLT floor slabs and bearing walls. Prefabricated off-site with zero-tolerance dovetail connections for rapid demountability.',
      grid: '4.8m Modular Unit Bays',
      uValue: '0.14 W/m²·K',
      joinery: 'Reversible Steel Dowels',
      lifeSpan: '100+ Years Circular',
      diagram: `+--[ ROOF GARDEN BIO-LAYER ]--------------------------------+
|  [CLT ROOF SLAB 240mm]                                     |
|  +--[UNIT 8A]--+--[ACOUSTIC VOID]--+--[UNIT 8B]--+          |
|  | 5-PLY CLT   |                   | 5-PLY CLT   |          |
|  +--[CLT SLAB 180mm]---------------+-------------+          |
|  | LEVEL 06 MODULAR RESIDENTIAL CASSETTES        |          |
|  +-----------------------------------------------+          |
|  | REVERSIBLE DRY-JOINT INTERFACE                |          |
+==+===============================================+==========+`
    },
    '05': {
      image: 'images/project-05-wind-catcher.jpeg',
      code: 'ARC-2025-05 / AERODYNAMIC FLUID PLOT',
      scale: 'SCALE 1:75 · AIRFLOW',
      title: 'Courtyard Wind-Catcher Sanctuary',
      abstract: 'Aerodynamically profiled wind scoops draw cool marine breezes from 14m above ground level, routing them through sunken subterranean shaded water channels to establish natural evaporative comfort.',
      grid: '12.0m Quad Courtyards',
      uValue: '0.24 W/m²·K',
      joinery: 'Compressed Lime Block',
      lifeSpan: '150+ Years Passive',
      diagram: `                [HIGH-LEVEL WIND CAPTURE SCOOP]
                                |
                                v [COOL MARINE BREEZE]
            +-------------------+-------------------+
            | TOWER INLET SHAFT                     |
            +-------------------+-------------------+
                                |
                                v
+-------------------------------+-------------------------------+
| ARCADE SHADE ZONE : EVAPORATIVE SUBTERRANEAN BASIN            |
|       <- <- <- AIR VELOCITY 1.2 m/s <- <- <-                  |
+===============================================================+`
    },
    '06': {
      image: 'images/project-06-geothermal-cloister.jpeg',
      code: 'ARC-2026-06 / SUBTERRANEAN SECTION',
      scale: 'SCALE 1:50 · TERRAIN',
      title: 'Subterranean Geothermal Cloister',
      abstract: 'Built into volcanic basalt formations with 1.8 meters of active soil cover. Ground-source thermal equilibrium locks internal temperatures at a steady 19–22°C year-round against severe sub-arctic Hokkaido blizzards.',
      grid: 'Radial Berm Contours',
      uValue: '0.11 W/m²·K (Bermed)',
      joinery: 'Charred Yakisugi & Pin',
      lifeSpan: '150+ Years',
      diagram: `~~~~~~~[ NATIVE VEGETATED SOIL BERM (1.8m DEPTH) ]~~~~~~~~~
       \\                                                   /
        \\   +---------------------------------------+     /
[BASALT] \\  | GEOTHERMAL SLAB CORE (11°C EQUILIBRIUM)|    / [BASALT]
FORMATION \\ | +-----------------------------------+ |   / FORMATION
           \\| | INTERNAL CLOISTER & HEARTH        | |  /
            \\ +-----------------------------------+ | /
             +======================================+/`
    }
  };

  const bpImage = document.getElementById('bp-display-image');
  const bpCode = document.getElementById('bp-display-code');
  const bpScale = document.getElementById('bp-display-scale');
  const bpTitle = document.getElementById('bp-display-title');
  const bpAbstract = document.getElementById('bp-display-abstract');
  const bpDiagram = document.getElementById('bp-display-diagram');
  const bpGrid = document.getElementById('bp-metric-grid');
  const bpU = document.getElementById('bp-metric-u');
  const bpJoin = document.getElementById('bp-metric-join');
  const bpLife = document.getElementById('bp-metric-life');
  const dossierBtns = document.querySelectorAll('.dossier-btn');

  const updateBlueprintView = (id) => {
    const data = architecturalDossiers[id];
    if (!data) return;

    if (bpImage && data.image) {
      bpImage.src = data.image;
      bpImage.alt = data.title;
    }
    if (bpCode) bpCode.textContent = data.code;
    if (bpScale) bpScale.textContent = data.scale;
    if (bpTitle) bpTitle.textContent = data.title;
    if (bpAbstract) bpAbstract.textContent = data.abstract;
    if (bpDiagram) bpDiagram.textContent = data.diagram;
    if (bpGrid) bpGrid.textContent = data.grid;
    if (bpU) bpU.textContent = data.uValue;
    if (bpJoin) bpJoin.textContent = data.joinery;
    if (bpLife) bpLife.textContent = data.lifeSpan;

    dossierBtns.forEach(btn => {
      btn.classList.toggle('is-selected', btn.getAttribute('data-load') === id);
    });
  };

  dossierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateBlueprintView(btn.getAttribute('data-load'));
    });
  });

  const monographGrid = document.getElementById('monograph-grid');
  if (monographGrid) {
    monographGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.inspect-btn');
      if (!btn) return;
      updateBlueprintView(btn.getAttribute('data-project'));
      const inspectorSection = document.getElementById('inspector');
      if (inspectorSection) {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        inspectorSection.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
      }
    });
  }
});