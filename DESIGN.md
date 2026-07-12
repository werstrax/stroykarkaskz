---
version: alpha
name: СТРОЙКАРКАС
description: >
  Visual identity for СТРОЙКАРКАС — a Kazakhstan manufacturer of steel-frame
  buildings (warehouses, hangars, workshops, farms, auto-service, retail).
  Premium industrial style: real construction photography, cinematic dark hero,
  teal + gold accents on graphite/white. Never generic, never emoji.

colors:
  # Brand
  primary: "#1B9CAD"        # teal — primary brand, links, active, accents
  primaryDark: "#14808F"    # teal pressed/hover
  primarySoft: "#E7F4F6"    # teal 8% — soft tints, chips, badges bg
  accent: "#C6A24C"         # gold — secondary CTA, highlights, numbers
  accentDark: "#A9843A"     # gold pressed/hover
  whatsapp: "#25D366"       # WhatsApp actions only

  # Surfaces
  surface: "#FFFFFF"        # default page/card background
  surfaceAlt: "#F5F8F9"     # alternating light section background
  surfaceDark: "#2C3A42"    # graphite — stats band, calculator result
  surfaceHero: "#141C21"    # near-black hero/CTA base under photo overlay
  surfaceFooter: "#17232A"  # footer background

  # Text
  textPrimary: "#1B262C"    # ink — headings & body on light
  textSecondary: "#5C6B72"  # muted — supporting copy on light
  textOnDark: "#FFFFFF"     # text on dark/photo surfaces
  textOnDarkMuted: "rgba(255,255,255,0.82)"

  # Lines
  border: "#E4E9EB"         # hairline borders, dividers, input outline

typography:
  display:                  # hero H1
    fontFamily: "Manrope"
    fontSize: 62            # max of clamp(34px … 62px)
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  h2:                       # section titles
    fontFamily: "Manrope"
    fontSize: 42            # max of clamp(27px … 42px)
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  h3:                       # card / feature titles
    fontFamily: "Manrope"
    fontSize: 20
    fontWeight: 800
    lineHeight: 1.2
  lead:                     # hero & section intro paragraph
    fontFamily: "Inter"
    fontSize: 19
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Inter"
    fontSize: 17
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Inter"
    fontSize: 14
    fontWeight: 400
    lineHeight: 1.5
  eyebrow:                  # kickers / labels above titles
    fontFamily: "Manrope"
    fontSize: 13
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.12em"
    # rendered UPPERCASE
  button:
    fontFamily: "Manrope"
    fontSize: 16
    fontWeight: 700
    lineHeight: 1
  stat:                     # big animated numbers
    fontFamily: "Manrope"
    fontSize: 44
    fontWeight: 800
    lineHeight: 1

spacing:
  scale: [4, 8, 12, 16, 22, 24, 32, 44, 64, 96]
  container: 1200          # max content width, px
  sectionY: 96             # vertical section padding, px (68 on mobile)
  gridGap: 22              # default card/grid gap, px

rounded:
  sm: 12
  md: 18
  pill: 999

elevation:
  card: "0 18px 50px -20px rgba(24,52,61,0.28)"
  raised: "0 40px 90px -30px rgba(24,52,61,0.40)"

components:
  buttonPrimary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.textOnDark}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
  buttonGold:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.textOnDark}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
  buttonWhatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.textOnDark}"
    rounded: "{rounded.pill}"
  photoCard:                # service card — full-bleed photo + bottom gradient
    backgroundColor: "{colors.surfaceHero}"
    textColor: "{colors.textOnDark}"
    rounded: "{rounded.md}"
    height: "aspect-ratio 3 / 4"
  leadCard:                 # lead form card
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "32px 30px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.textPrimary}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
  chip:                     # selectable filter / type chip
    backgroundColor: "{colors.surface}"
    textColor: "{colors.textPrimary}"
    rounded: "{rounded.pill}"
    padding: "11px 18px"
  statBand:
    backgroundColor: "{colors.surfaceDark}"
    textColor: "{colors.textOnDark}"
---

# СТРОЙКАРКАС — DESIGN.md

## Overview

СТРОЙКАРКАС is a Kazakhstan company that designs, manufactures (own steel plant)
and installs **metal-frame buildings** turnkey. The site is a Russian-language,
conversion-focused marketing landing. The brand feeling is **premium industrial**:
confident, engineered, trustworthy — the visual equivalent of clean welded steel
against a blue sky.

The look is built on three moves:
1. **Real construction photography** carries every section — steel frames,
   warehouses, workshops, real objects. Photography is the hero, not decoration.
2. A **cinematic dark hero**: a full-bleed steel-frame photo under a graphite
   scrim, white headline, teal accent word.
3. **Teal + gold on graphite/white** — teal is the brand, gold is the premium
   accent (numbers, secondary CTAs), graphite grounds it. White space keeps it
   airy and expensive.

Bilingual note: UI copy is Russian; currency is Kazakhstani tenge (₸), phones use
`+7 (7XX) XXX-XX-XX`. Engineering credibility matters (СНиП / СП РК, guarantees,
fixed price in contract).

## Colors

- **Primary — teal `#1B9CAD`**: the brand. Links, active states, accent underline,
  the accent word in headlines, primary buttons, focus rings. Pair `primaryDark`
  for hover/pressed and `primarySoft` for tinted chip/badge backgrounds.
- **Accent — gold `#C6A24C`**: scarcity color. Big stat numbers, "10 лет"
  guarantee badge, the calculator price, one alternate CTA per view. Never use
  gold for long text — it fails contrast.
- **Graphite `#2C3A42` / hero `#141C21`**: dark grounding surfaces — the stats
  band, the calculator result panel, the hero and CTA photo overlays. White text
  on these.
- **Surfaces**: `#FFFFFF` default, `#F5F8F9` for every alternate section so the
  page breathes; sections never stack same-on-same.
- **Text**: ink `#1B262C` for headings/body on light, muted `#5C6B72` for
  supporting copy, white on dark/photo.
- **WhatsApp `#25D366`** is reserved strictly for WhatsApp actions (it reads as
  "message us", not as a brand color).

Contrast: teal and gold are for large/bold text, icons, and fills only — body
copy stays ink or white.

## Typography

Two families, both with full Cyrillic:
- **Manrope** (700–800) for everything structural — headlines, card titles,
  buttons, eyebrows, stat numbers. It is geometric, engineered, confident.
- **Inter** (400–600) for body, leads, form fields, captions. Neutral and highly
  legible at small sizes.

Scale is fluid: the hero `display` and section `h2` use `clamp()` so they shrink
gracefully on mobile (display 34→62px, h2 27→42px). Headings are tight
(`line-height` ~1.1, `letter-spacing` -0.01em); body is roomy (1.6). Eyebrows /
kickers are 13px Manrope 700, UPPERCASE, `letter-spacing` 0.12em, in teal (or gold
on dark).

## Layout

- Centered content column, `max-width: 1200px`, side padding 24px (18px mobile).
- Vertical rhythm: sections are 96px top/bottom on desktop, 68px on mobile.
- Grids: services 4-up (→3→2→1), features/steps 3-up (→2→1), gap 22–24px.
- Hero and CTA are asymmetric two-column (≈1.15fr text / 0.85fr form) collapsing
  to one column under 900px.
- The "why" section is 5fr photo / 7fr feature grid, photo sticky on scroll.
- Everything is responsive-first with breakpoints at 1080 / 900 / 620px; nothing
  overflows horizontally; tap targets ≥ 44px.

## Elevation & Depth

Depth is soft and expensive, never harsh drop-shadows. Two levels only:
`card` (0 18px 50px -20px rgba(24,52,61,.28)) for cards and the sticky header
glass, and `raised` for floating lead cards and the calculator panel. Dark
surfaces get depth from photo overlays and gradients instead of shadow. The
header starts transparent over the hero and becomes a blurred white glass bar
after 20px of scroll.

## Shapes

Rounded, engineered, calm. Corner scale: `sm` 12px (inputs, small tiles), `md`
18px (cards, panels, images), `pill` 999px (buttons, chips, badges). Photos and
cards clip to `md`. A recurring motif is a short **3px teal underline** that grows
on hover (under card titles, kickers). Icons are thin 2.4–2.5px stroke line icons
(check marks, arrows) — geometric and consistent.

## Components

- **Buttons**: pill-shaped, Manrope 700. `primary` = teal fill / white; `gold` =
  gold fill / white for the alternate CTA; `whatsapp` = green fill / white.
  Hover lifts 3px with a colored soft shadow. Sizes sm / base / lg.
- **Photo service card**: full-bleed photograph, bottom-up dark gradient, white
  title with the teal underline motif; description reveals on hover; image zooms
  1.08 on hover. Aspect 3/4. This is the signature component — it replaced emoji
  tiles.
- **Lead card**: white form card, soft raised shadow, gold "Бесплатный расчёт"
  badge, name + phone (masked +7) + type select + primary button. A dark glass
  variant sits on the CTA photo.
- **Stat band**: graphite full-width strip, gold animated count-up numbers, white
  labels, thin dividers.
- **Portfolio slider**: photo cards in a draggable horizontal track with round
  prev/next controls; category chip + title + meta.
- **Calculator**: white controls panel (type chips, range slider, toggle) beside a
  graphite result panel with the gold price and a CTA.
- **Accordion (FAQ)**: bordered rows, teal +/− icon, one open at a time.
- **Floating WhatsApp** button, pulsing green, bottom-right.

## Do's and Don'ts

**Do**
- Lead with **real construction/steel photography** in the hero, service cards,
  portfolio and CTA.
- Keep the hero cinematic and dark with a legible white headline + one teal accent
  word.
- Use gold sparingly for numbers, the guarantee badge and one accent CTA.
- Alternate white / `#F5F8F9` sections; keep generous whitespace.
- Use line icons (thin stroke) if an icon is truly needed.
- Fix price/term/guarantee claims in copy; keep tenge and +7 phone formats.

**Don't**
- ❌ No emoji as icons or decoration — ever. It reads as cheap/AI-generated.
- ❌ No flat gradient-block or solid-color placeholders standing in for photos.
- ❌ Don't recolor the brand to the competitor's green; teal+gold is the identity.
- ❌ Don't put teal or gold under long body text (contrast).
- ❌ No harsh shadows, rainbow palettes, or more than the two accent colors.
- ❌ Don't center everything into a generic "hero + 4 cards" template — use the
  photo cards, the asymmetric hero, the sticky-photo "why", the slider.

## Agent Prompt Guide

When generating or extending screens for СТРОЙКАРКАС:
- Assume Russian UI copy, Kazakhstan context (₸, +7, СНиП/СП РК), B2B construction
  buyer who wants proof: guarantee, own factory, fixed price, real objects.
- Build every section around a real photograph; if you have no asset, request one
  or leave a clearly-labelled image slot — never fill it with emoji or a gradient.
- Use tokens above verbatim: teal primary, gold accent, graphite dark surfaces,
  Manrope headings / Inter body, pill buttons, 18px card radius, soft two-level
  shadows, the growing teal underline on titles.
- Default section pattern: eyebrow (teal, uppercase) → h2 → one-line lead → content
  grid, on an alternating white/`#F5F8F9` background.
- Primary CTA verbs: «Рассчитать стоимость», «Оставить заявку», «Написать в
  WhatsApp». Lead forms collect name + phone (mask +7) and can hand off to
  WhatsApp.
- Respect `prefers-reduced-motion`; animations are scroll-reveal + subtle parallax,
  never gratuitous.
