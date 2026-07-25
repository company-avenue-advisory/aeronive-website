# Aeronive Labs

Marketing site for Aeronive Labs — compliance-native AI for regulated sectors.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · React Three Fiber · Motion · Lenis

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Pages

| Route        | Contents                                                                                     |
| ------------ | -------------------------------------------------------------------------------------------- |
| `/`          | Hero (3D), regime rail, capability bento, metrics, sectors, process, CTA                     |
| `/solutions` | Company Brain, local-first interconnect, data pipelines, governance, topologies, integrations |
| `/sectors`   | Six sector deep-dives, compliance framework matrix, assurance                                 |
| `/contact`   | Briefing request form, FAQ                                                                    |

## Editing content

Nearly all copy lives in [`src/lib/site.ts`](src/lib/site.ts) — nav, capabilities,
sectors, frameworks, metrics, process steps, FAQs. Longer-form page prose sits at
the top of the relevant `page.tsx`.

## Contact form

`POST /api/contact` validates the submission, then forwards it as JSON to
whatever endpoint you set in `CONTACT_WEBHOOK_URL` (Slack, Zapier, a CRM intake,
your own handler):

```bash
# .env.local
CONTACT_WEBHOOK_URL="https://…"
```

**Until that variable is set the form delivers nothing.** It deliberately does
not fake success — the route returns `unconfigured` and the UI shows a fallback
that opens a prefilled email to the address in `site.email`. Submissions are also
logged server-side so nothing is lost during development.

## The 3D layer

Three shader-driven pieces in [`src/components/three/`](src/components/three/):

- `AuroraRift` — the vertical light rift and sweeping bands (fbm noise, additive)
- `Starfield` — 1,600 instanced points with per-point twinkle and pointer parallax
- `NeuralCore` — the Company Brain motif: a Fibonacci-sphere lattice with signal
  pulses travelling along k-nearest-neighbour edges, plus counter-rotating rings

`SceneMount` decides whether any of it runs. The canvas is skipped entirely for
`prefers-reduced-motion` users and on devices without WebGL, paused when scrolled
out of view, and always sits over a CSS gradient fallback so the layout never
looks unfinished. `Scene` shrinks the lattice on narrow viewports.

Two things worth knowing before editing the shaders:

- Colours are hardcoded as sRGB literals. These are raw `ShaderMaterial`s, so
  three's colour management never converts them.
- `active` is a GLSL reserved word and will not compile as a variable name.

## Styling conventions

Design tokens and component primitives live in
[`src/app/globals.css`](src/app/globals.css).

Custom classes (`.card`, `.btn`, `.eyebrow`, …) **must stay inside
`@layer components`**. Unlayered CSS outranks every layered Tailwind utility, so
a bare `.btn { display: inline-flex }` silently defeats `hidden`, `sm:inline-flex`
and friends.

## Before launch

- [ ] Replace the metrics in `site.ts` (`0 bytes`, `100%`, `6 wks`, `24/7`) with
      figures you can substantiate — they are currently positioning placeholders.
- [ ] Set `site.url` and `site.email` to the real domain and inbox.
- [ ] Set `CONTACT_WEBHOOK_URL` in the deployment environment.
- [ ] Add an Open Graph image (`src/app/opengraph-image.png`) — the metadata
      references one but no asset ships yet.
- [ ] Have counsel review the compliance claims on `/sectors`.
