---
name: Papelera Editorial Commerce
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#554147'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#887177'
  outline-variant: '#dbbfc6'
  surface-tint: '#a63164'
  primary: '#620034'
  on-primary: '#ffffff'
  primary-container: '#85144b'
  on-primary-container: '#ff91b8'
  inverse-primary: '#ffb0ca'
  secondary: '#3f6565'
  on-secondary: '#ffffff'
  secondary-container: '#bfe7e7'
  on-secondary-container: '#436969'
  tertiary: '#4f2200'
  on-tertiary: '#ffffff'
  tertiary-container: '#713400'
  on-tertiary-container: '#f69e64'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9e3'
  primary-fixed-dim: '#ffb0ca'
  on-primary-fixed: '#3e001f'
  on-primary-fixed-variant: '#87164c'
  secondary-fixed: '#c2eaea'
  secondary-fixed-dim: '#a6cecd'
  on-secondary-fixed: '#002020'
  on-secondary-fixed-variant: '#264d4d'
  tertiary-fixed: '#ffdbc8'
  tertiary-fixed-dim: '#ffb689'
  on-tertiary-fixed: '#311300'
  on-tertiary-fixed-variant: '#733501'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 26px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Newsreader
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-eyebrow:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  data-tabular:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 3rem
  margin-sm: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system serves an established Argentine paper distributor and wholesale institution founded in 1980. The brand persona bridges artisanal stationery heritage with dependable industrial wholesale logistics. It speaks both to corporate procurement officers purchasing high-volume print runs and graphic designers sourcing tactile specialty stocks.

The visual mood evokes an architectural studio combined with a classical paper mill: tactile, grounded, meticulously proportioned, and quiet. It combines warm, pulpy parchment textures with razor-sharp editorial typography and precise tabular data. 

The design aesthetic blends **Editorial Minimalism** with **Warm Tactile B2B**. Layouts feature disciplined geometric alignment, subtle stone outlines, and generous cream-colored breathing space rather than stark corporate white. The atmosphere honors craft while providing frictionless catalog exploration and fast reordering.

## Colors

The palette draws directly from classic printing inks, natural wood pulp, and heritage trade paper:

- **Primary (`#85144b`):** Deep magenta/burgundy derived from the brand's identity mark. Used for critical primary actions, focused highlights, brand monogram badges, and high-impact interactions.
- **Secondary (`#1d4444`):** Rich forest/deep petrol slate. Used for high-trust authority sections (such as warehouse logistics, corporate hero banners, and verified wholesale tiers) as well as positive stock signals.
- **Tertiary (`#b56934`):** Warm craft amber/kraft tone. Serves for promotional banners ("Oferta", "Más pedido"), paper sample highlights, and warm contextual badges.
- **Neutral (`#4a4a4a`):** Warm graphite slate. Replaces harsh blacks to deliver soft, legible reading contrast against off-white backgrounds.

### Surface System
- **Canvas Base:** `#fbf9f5` (warm paper off-white)
- **Surface Card:** `#ffffff` (crisp white for distinct product swatches and content containers)
- **Surface Subtle / Muted:** `#f5f2eb` (uncoated paper cream)
- **Border / Divider:** `#e5e0d8` (sand stone hairline borders)

## Typography

The pairing reflects a bookmaking tradition juxtaposed with clean digital commerce:

- **Headlines (Newsreader):** Brings editorial gravitas and timeless literary authority. It conveys tradition, provenance, and the sensory quality of printed paper. It is set with tight letter-spacing and fluid leading.
- **Body, Specs & Labels (Plus Jakarta Sans):** Highly legible geometric sans with generous x-height. Handles technical data (grammages `gr/m²`, sheet dimensions `70x100 cm`, pack counts) with absolute clarity. Tabular numbers ensure currency values and measurement columns align without visual drift.
- **Eyebrows & Metadata:** Set in uppercase, tracking `+0.08em`, in bold sans-serif to create an index-tab hierarchy reminiscent of vintage stock sample catalogs.

## Layout & Spacing

The layout employs a structured 12-column fixed grid (maximum container width `1280px`) on desktop and tablet, collapsing to a 4-column flow on mobile. 

- **Desktop (>= 1024px):** 12 columns with `1.5rem` gutters and minimum `3rem` side page margins. Product catalog adopts a balanced 3-column or 4-column card grid with an integrated 3-column sticky filter sidebar.
- **Tablet (768px - 1023px):** 8 columns with `1rem` gutters and `2rem` margins. Sidebars collapse into slide-out drawer drawers.
- **Mobile (< 768px):** 4 columns with `1rem` gutters and `1.25rem` screen padding. Category index chips switch to horizontal smooth-scrolling tracks.

Vertical rhythm adheres strictly to an 8px modular baseline. Section paddings are generous (`space-xl` to double `space-xl`) to preserve the tranquil, unhurried feel of high-end editorial paper archives.

## Elevation & Depth

Visual depth is built on physical paper metaphors and thin structural outlines rather than artificial volumetric drop shadows:

- **Card Level 0 (Flat):** Outlined with `1px solid #e5e0d8` against the `#fbf9f5` canvas. Zero elevation.
- **Card Level 1 (Resting Paper):** Crisp `#ffffff` container bounded by a hairline border (`#e5e0d8`) coupled with an ultra-diffused, paper-weighted shadow: `0 2px 8px -2px rgba(74, 74, 74, 0.05), 0 1px 3px 0 rgba(74, 74, 74, 0.03)`.
- **Card Level 2 (Hover & Active):** Lifted paper sheet state: `0 12px 24px -6px rgba(74, 74, 74, 0.08), 0 4px 8px -2px rgba(74, 74, 74, 0.04)`. The border subtly warms to `#d5cec3`.
- **Floating Overlays & Drawers:** Deep muted tinting: `0 20px 35px -10px rgba(29, 68, 68, 0.15)`.
- **Image Mockups:** Product samples display subtle asymmetrical drop shadows simulating real 80g to 300g cardstock sheets resting angled on a cutting mat.

## Shapes

The shape system adopts a **Soft (`1`)** geometry. 

Because paper sheets, reams, guillotine cutters, and cardstock are fundamentally rectangular and crisp, roundedness is restrained to maintain structural integrity and a clean architectural feel:
- **Base Components (Inputs, Buttons, Cards, Table Rows):** `0.25rem` (4px). Clean and tactile without sharp digital corners.
- **Large Panels (Banners, Modals, Promotional Frames):** `0.5rem` (8px).
- **Pills / Badges:** Status chips and promotional tags ("MÁS PEDIDO", "OFERTA", stock indicators) retain squared edges with a minimal 2px radius (`0.125rem`) to mimic physically stamped index tags.

## Components

### Buttons
- **Primary:** Solid Deep Magenta (`#85144b`) background, pure white text, 4px border-radius, font size `13px` semi-bold. Subtle warm hover transition (`#70103f`).
- **Secondary / Ghost:** Off-white background with `1px solid #e5e0d8` border and graphite text (`#4a4a4a`). On hover, background shifts to `#f5f2eb` with border `#c8c1b5`.
- **Tertiary Link:** Serif or sans text with underline offset and right chevron (`→`), no background container.

### Product Cards
- **Structure:** Crisp white surface (`#ffffff`) framed with `1px solid #e5e0d8`.
- **Media Header:** Natural warm cream frame (`#f5f2eb`) displaying the rendered sheet/ream paper sample with angled sheet shadow and a floating quick-add circular or square `+` trigger (`#ffffff` with hairline border).
- **Metadata Section:** Uppercase category eyebrow (`#85144b` or `#b56934`), Newsreader headline title, and a clean tabular row for specifications (e.g., `80 gr · 65 × 95 cm · 100 hojas`).
- **Footer:** Prominent pricing in bold sans-serif alongside a compact "Agregar" button and a green dot stock indicator (`● 22 disponibles`).

### Category Cards
- Compact horizontal or stacked blocks with subtle beige borders, numerical indexes (`01`, `02`), Newsreader category names, secondary utility descriptions, and trailing micro-arrows.

### Chips & Badges
- **Status Badges:** Small rectangular index flags positioned top-left of cards. "OFERTA" and "MÁS PEDIDO" use deep kraft amber (`#b56934`) with inverted white text.
- **Stock Pills:** Soft green tint (`#eaf3ed`) with deep forest green text (`#1d4444`) and a mini dot indicator.

### Input Fields & Selects
- Framed in `#e5e0d8` against `#ffffff` surfaces. Subtle inner padding (`0.625rem 1rem`). Focus states shift border to `#85144b` with a delicate 1px focus ring. Placeholder text rendered in muted graphite (`#8c877e`).

### Data Tables (Wholesale Grammages & Formats)
- Strict tabular layout for wholesale tiering. Thin divider lines (`#e5e0d8`), subtle zebra-striping on alternate rows using `#fbf9f5`, right-aligned monetary values, and monospace alignment for dimensions.