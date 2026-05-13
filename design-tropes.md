---
name: design-tropes
description: Frontend / web-design patterns that mark a site as AI-generated, with concrete fixes. Drop into a system prompt or keep as repo docs.
last_updated: 2026-05-12
sources:
  - https://impeccable.style/slop/
  - https://www.925studios.co/blog/ai-slop-web-design-guide
  - https://techbytes.app/posts/escape-ai-slop-frontend-design-guide/
  - https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website
  - https://www.porterintelligent.com/blog/building-a-site-that-doesnt-look-ai-generated
  - https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics
  - https://andrew.ooo/posts/taste-skill-anti-slop-ai-frontend-review/
  - https://trilogyai.substack.com/p/fixing-visual-ai-slop
  - https://muz.li/blog/portfolio-mistakes-designers-still-make-in-2026/
  - https://medium.com/@kai.ni/design-observation-why-do-ai-generated-websites-always-favour-blue-purple-gradients-ea91bf038d4c
---

# Design Tropes to Avoid

Patterns that make a website read as AI-generated. Any one of these in isolation can be fine; the problem is the cluster. When several appear together the site converges on the same look as thousands of other AI-built sites.

## Typography

### Inter (and the rest of the "safe" list)
Using Inter, Roboto, Geist, Plus Jakarta Sans, or Space Grotesk as the only typeface. These dominate the training corpus, so models reach for them by default. Pick something with character, or pair two typefaces with distinct jobs. (See Appendix A for a starter shortlist by context.)

### Single font for everything
One typeface across headings, body, and code. Pair a display face with a body face and a mono face for code or labels (three fonts, three jobs).

### Flat type hierarchy
Heading sizes within 1.1x of each other. Use a 1.25 ratio minimum between steps so the eye can find structure without reading.

### Display type that fails to register as display
Hero set at 2x body, sub-heads at 1.5x. For real display contrast, push hero sizes 3x or more past body so the page has a clear focal point.

### Weak weight contrast
Pairing 400-weight body with 600-weight headings. Use weight extremes (100/200 against 800/900) so weight carries real hierarchy.

### Icon tile above heading
A rounded-square pastel tile holding a generic icon, stacked above the title of a feature card. The universal AI feature-card template. Drop the tile, or replace it with something specific to the feature.

### Lucide and the v0 icon defaults
Lucide and Heroicons reached for as the default set for every glyph on the site. Now a named tell on X/Twitter screenshot threads. Use Phosphor, Radix, or a small hand-drawn SVG set chosen for your content. If you keep Lucide, audit so the same library is not visible alongside the rest of the v0 cluster.

### Outline icons as the only style
Outline-stroke icons everywhere because they dominate open-source libraries. Filled, two-tone, or a single illustrated set give the page identifiable character.

### Monospace as a "technical" prop
Mono typefaces used outside of code or data, purely to signal developer credibility. Reserve mono for code blocks, file paths, and tabular figures.

### All-caps body text
Long passages in uppercase. Reserve all-caps for short labels and chip-style tags.

## Color and Contrast

### Purple-to-blue gradients
Indigo / violet / blue gradients on hero backgrounds, CTAs, and orbs. The single most-cited AI tell. Root cause: Tailwind's `bg-indigo-500` demo color became the de-facto "modern" color in the training corpus. Replace with a constrained palette built from one brand color plus neutrals.

### Cyan accents on dark mode
Glowing cyan, teal, or violet on near-black backgrounds, often with `box-shadow` halos. Reads as "AI-generated dashboard."

### Defaulting to dark mode
Dark mode chosen because it hides indecision about color, not because it serves the content. Pick a light or dark base intentionally and justify it.

### Gradient text on headings
Decorative gradient fills on H1s, hero metrics, or section titles. Hurts scannability. Use a single solid color and let typography carry the weight.

### Decorative color names
CSS variables like `--purple-500` or `--accent-blue`. Use semantic names tied to function: `--bg`, `--surface`, `--text`, `--muted`, `--action`, `--danger`, `--success`.

### Defining colors only in HEX or HSL
Working in HEX or HSL on a varied palette makes "the same lightness across hues" impossible to eyeball. Author colors in OKLCH so lightness, chroma, and hue are independent, and contrast does not collapse when you swap accent hue.

### Accents saturated above 80 percent
Hot, fully saturated accent colors that fight the rest of the page. Cap accent saturation below 80 percent so the eye can rest and the accent reads as a brand color, not a button-shop default.

### Pure black background
`#000000` instead of a tinted near-black such as `#0a0a0c` or `#101014`. Tinted darks feel intentional; pure black feels like a default.

### Gray text on colored background
Low-contrast pairings that fail WCAG AA (4.5:1 for body, 3:1 for large text). Check every pairing with a contrast tool.

## Layout and Space

### Identical card grids
Same-sized cards with icon + heading + text, repeated three or six times in a row. Vary sizes (bento-style asymmetry) or change the layout per section.

### Bento grid as the default landing layout
A 4-by-3 bento grid filling the viewport as the hero, with no real content hierarchy. Bento went from trend in 2024 to AI tell in 2026. Use it only when the content has natural varied-size items.

### Hero metric layout
Big number, small label, three stats in a row, often with a gradient accent. Generic SaaS pattern. Replace with one specific number or remove.

### Everything centered
Center-aligned text and components throughout. Left-align with intentional asymmetry; center only where it earns the eye's attention.

### Nested cards
Cards inside cards inside cards. Creates visual noise and inflates the sense of depth. Flatten to one level.

### Wrapping every block in a card
Bordering or shadowing every section. Cards should mark grouped, parallel items, not every paragraph.

### Monotonous spacing
The same margin between every section. Vary section rhythm (compact intro, generous case study, tight footer) so the page has a tempo.

### Cramped padding
Less than 8px inside containers. Aim for 12 to 16px minimum, more for hero areas.

### Long line lengths
Body text running wider than 80 characters. Cap text columns at 65 to 75ch (`max-w-[65ch]` in Tailwind).

## Components

### Side-tab accent border
A thick colored stripe on one edge of a rounded card, clashing with the corner radius. Singled out as the most recognizable tell of AI-generated UI. Remove it, or commit to a hard-edged design where the stripe belongs.

### 8px / 16px corner-radius monoculture
Every card, button, badge, and modal at the same 8px or 16px radius because both Tailwind and most design libraries default there. Pick a radius scale (e.g. 2 / 6 / 14 / 24) and apply it by role so cards, chips, and buttons feel distinct.

### Glassmorphism overuse
`backdrop-blur` on cards, modals, navbars, and badges. Pick at most one surface for it (e.g. a sticky nav over imagery) and keep the rest opaque.

### Generic drop shadows
Default `shadow-lg` or `shadow-xl` Tailwind shadows. Use a custom tighter shadow stack, or skip shadows in favor of borders or color contrast.

### Modal reflex
Reaching for a modal for every secondary action. Use inline disclosure, side panels, or a separate route when the content deserves more than a popover.

### Sparklines as decoration
Tiny line charts that convey no real data. If the data is fake, remove the chart.

### Every button is primary
All buttons styled with the same filled, accented look. Build a hierarchy: primary (filled), secondary (outline or ghost), tertiary (text link).

### The unmodified v0 stack
Next.js + Tailwind + shadcn/ui + Framer Motion + Lucide, all on stock tokens. None of these tools are the problem; the visible cluster is. If the site sits on this stack, swap the type scale, palette, radius, and at least one component shape so the surface does not match the v0 default.

## Motion

### Bounce or elastic easing
Spring-style easing on UI transitions. Reads as dated. Use exponential easings such as `ease-out-quart`, `quint`, or `expo` for most UI motion.

### Animating layout properties
Transitioning `width`, `height`, `padding`, or `margin`. Causes jank. Animate `transform` and `opacity` instead.

### Decorative fade-ins on every section
Uniform 300ms fade-up on every block at scroll. Reserve scroll-triggered motion for content that benefits from sequencing.

### Ignoring `prefers-reduced-motion`
No fallback for users who request reduced motion. Wrap non-essential motion in the media query.

## Interaction

### No hover or focus states
Static buttons and cards with no feedback on hover, focus, or active. Define visible focus rings and at least one hover affordance per interactive element. Concrete defaults: `-translate-y-[1px]` on hover and `scale-[0.98]` on active for buttons, a 2px ring offset on `:focus-visible` for keyboard users.

### Missing loading, empty, and error states
Forms and lists that show nothing while loading, nothing when empty, and a red toast on error. Use skeleton placeholders during load, real copy in empty states ("No projects yet, add one to get started"), and inline error messages directly beneath the field that failed.

### Redundant section intros
A line of text restating the section heading immediately below it. Either change the heading or cut the intro.

### Aspirational, industry-agnostic headlines
"Build the future of work," "Scale without limits," "The best-in-class platform for X." Replace with a specific, concrete sentence that names what you actually do.

### Hedging copy
"May help," "can potentially," "designed to." Commit. If the claim is false, remove it; if true, state it.

## Imagery

### Stock photos of diverse teams in lit offices
Generic team-around-a-laptop shots. Replace with real product screenshots, real workspace photos, or no image at all.

### Floating 3D abstract blobs
Smooth, plastic-feeling abstract renders behind the hero. Remove, or replace with a specific illustration tied to the content.

### AI-generated illustrations
Too smooth, too symmetrical, vector art with melted hands. If real illustration is out of scope, prefer typography-driven layouts to fake art.

## Backgrounds

### Flat white or flat black with no atmosphere
A single solid color across the viewport because no background was actually designed. Layer two or three low-opacity gradients, a faint dot or grid pattern, or a subtle noise texture so the surface has weight. (This is the one place where gradients are useful, in contrast to the "purple-to-blue gradient" rule above.)

### Decorative blurred orbs
Pastel circles blurred at 60px or more, drifting behind the hero. Part of the v0 default look. Remove, or replace with content-tied imagery such as a screenshot, blueprint, or photograph.

### Identical background across every section
Same flat surface from hero to footer. Change the background at section boundaries (cream panel between dark blocks, a hairline rule, a subtle pattern shift) so scroll position is felt.

## Responsive

### Feature amputation on mobile
Hiding navigation items, secondary CTAs, or content entirely on small screens because the layout was never designed mobile-first. Adapt the layout; do not remove the function.

### `h-screen` and `100vh` on iOS Safari
Full-height sections set with `h-screen` or `100vh` get cut off by Safari's URL bar, pushing content below the fold. Use `min-h-[100dvh]` (dynamic viewport units) for any full-height block.

## Accessibility and quality

### Skipped heading levels
H1 jumping to H3. Maintain a clean document outline; let CSS handle visual size.

### Tight line height
`line-height` below 1.3x font size on body text. Use 1.5 to 1.7 for body, 1.1 to 1.25 for display.

### Tiny body text
Body text below 14px. Aim for 16px on desktop; do not go below 14px.

### Wide letter spacing on body
`letter-spacing` above 0.05em on body text. Reserve loose tracking for small all-caps labels.

### Justified text without hyphenation
`text-align: justify` with no hyphenation creates rivers of whitespace. Left-align body text by default.

## Portfolio-specific

These do not show up on a generic SaaS landing but kill developer and researcher portfolios in particular.

### "Hero / About / Projects / Contact" as the skeleton
The default v0 portfolio shape. If every section title on the site also appears on twenty other portfolios, the structure itself is the tell. Pick a layout the work motivates: a paper-style document, a timeline, a single-page CV, an interactive demo first.

### Gallery-over-product
Large hero shots, tidy thumbnails, no explanation of what was done. Reviewers scan in 30 seconds and need context, not screenshots. For each project: problem, your specific role, decisions you owned, constraints, and what changed after launch.

### 40-skill technology lists
"Languages: Python, R, MATLAB, Julia, Java, C++, C, JavaScript, TypeScript, Go, Rust, Scala, ..." Lists like this read as scraped from a course catalog. Keep the visible list to 12 to 15 you would use on day one without a refresher; move the rest to a CV PDF if needed.

### No outcomes or numbers
"Worked on X project" with no after-state. Add one or two concrete results per project: a metric, a deployed link, a paper, a benchmark, an accepted PR, a deployed user count.

### Three.js hero, particle field, custom cursor trail
Decorative WebGL or canvas effects with no link to the actual work. Cliché before AI, now read as both cliché and AI-generated. Cut, unless your work is graphics or shaders, in which case the demo IS the work.

### "Passionate full-stack developer who loves to build" bio opener
The AI-default bio paragraph. Open with a concrete fact: what you currently work on, where, and what kind of problems. The opening sentence should be unrepeatable by a peer with a different background.

### Skill bar percentages
"JavaScript 92%, Python 87%, React 78%" rendered as bars or radial charts. Self-rated percentages signal nothing and are widely mocked. Replace with project links or remove.

### Identical project cards
Six cards, same image aspect ratio, same icon row, same "View Project" button. Either vary the format per project (a card for one, a long-form case study for another, a live embed for a third) or commit to a list view with substantive blurbs.

---

## Process rules

These do not show up as a single visual tell, but they are how sites end up looking AI-generated in the first place.

- Provide explicit anti-constraints when prompting (no Inter, no purple gradients, no three-icon row, no rounded-card-with-stripe, no Lucide as the icon set). Listing what to avoid moves the model off its defaults.
- Reference a specific aesthetic ("1970s ski lodge", "art deco poster", "Swiss editorial", "brutalist") instead of "modern" or "clean."
- Build a design system first (CSS custom properties, type scale, spacing scale, component rules) and audit new pages against it. Defaults reassert themselves on every new page.
- Pull 3 to 5 references from designers you trust. Describe what works about them in your own words and feed that description back to the model.
- Keep a `DESIGN.md` (tokens, scales, allowed and banned classes) and a `PRODUCT.md` (audience, voice, content priorities) in the repo. The Trilogy AI write-up recommends both as versioned, lintable design context.
- Iterate after launch. Most sites that escape the AI look do so through five to ten follow-up commits, not the first generation.

## Appendix A. Distinctive font shortlist by context

From the Anthropic frontend cookbook, as a starting point when the goal is to move off Inter / Roboto / system fonts:

- Code-oriented: JetBrains Mono, Fira Code
- Editorial / academic: Playfair Display, Crimson Pro, Fraunces
- Startup / product: Clash Display, Satoshi, Cabinet Grotesk
- Technical / engineering: IBM Plex Sans / Mono, Source Sans 3
- Distinctive / creative: Bricolage Grotesque, Obviously, Newsreader

Pairing principle: high contrast reads as design. A display face with a monospace, or a serif with a geometric sans, reads cleaner than two near-identical sans-serifs.

## Appendix B. Anthropic frontend_aesthetics prompt block

Drop this into a system prompt or into `CLAUDE.md` to bias the model off the AI-slop look. Source: Anthropic frontend aesthetics cookbook.

```
<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Cliched color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context.
</frontend_aesthetics>
```

## Sources

- impeccable.style/slop, rule-list slop linter, closest equivalent to tropes.fyi for UI: https://impeccable.style/slop/
- 925studios, AI Slop Web Design guide (tells, anti-patterns, fixes): https://www.925studios.co/blog/ai-slop-web-design-guide
- Tech Bytes, Escape AI Slop frontend design guide: https://techbytes.app/posts/escape-ai-slop-frontend-design-guide/
- prg.sh, Why your AI keeps building the same purple gradient website (diagnosis): https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website
- Porter Intelligent, Building a site that doesn't look AI-generated (single-site case study): https://www.porterintelligent.com/blog/building-a-site-that-doesnt-look-ai-generated
- Anthropic, Coding cookbook: prompting for frontend aesthetics (drop-in system prompt block, font shortlist): https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics
- andrew.ooo, Taste Skill review (anti-slop Claude skill, h-screen/100dvh, saturation cap, tactile feedback specifics): https://andrew.ooo/posts/taste-skill-anti-slop-ai-frontend-review/
- Trilogy AI, Fixing Visual AI Slop (DESIGN.md / PRODUCT.md convention, OKLCH): https://trilogyai.substack.com/p/fixing-visual-ai-slop
- Muz.li, Portfolio mistakes designers still make in 2026 (gallery-over-product, no outcomes, no role clarity): https://muz.li/blog/portfolio-mistakes-designers-still-make-in-2026/
- Kai Ni / Medium, Why AI-generated websites favor blue-purple gradients (outline-icon default, 8/16px radius monoculture): https://medium.com/@kai.ni/design-observation-why-do-ai-generated-websites-always-favour-blue-purple-gradients-ea91bf038d4c
