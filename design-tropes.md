# Design Tropes to Avoid

Source: compiled from impeccable.style/slop, the Anthropic frontend cookbook, 925studios, Tech Bytes, Trilogy AI, prg.sh, Porter Intelligent, Kai Ni / Medium, and the Taste Skill review.

## Typography

### Inter (and the rest of the "safe" list)
Using Inter, Roboto, Geist, Plus Jakarta Sans, or Space Grotesk as the only typeface. These dominate the training corpus, so models reach for them by default. Pick something with character, or pair two typefaces with distinct jobs.

### Single font for everything
One typeface across headings, body, and code. Pair a display face with a body face and a mono face for code or labels (three fonts, three jobs).

### Monospace as a "technical" prop
Mono typefaces used outside of code or data, purely to signal developer credibility. Reserve mono for code blocks, file paths, and tabular figures.

### Flat type hierarchy
Heading sizes within 1.1x of each other. Use a 1.25 ratio minimum between steps so the eye can find structure without reading.

### Display type that fails to register as display
Hero set at 2x body, sub-heads at 1.5x. For real display contrast, push hero sizes 3x or more past body so the page has a clear focal point.

### Weak weight contrast
Pairing 400-weight body with 600-weight headings. Use weight extremes (100/200 against 800/900) so weight carries real hierarchy.

### Over-nested heading stacks
Every section opens with an eyebrow label, an H1, a sub-heading, and a lede paragraph. Four text layers stacked where one or two would carry the section. Strip to a single headline plus body.

### All-caps body text
Long passages in uppercase. Reserve all-caps for short labels and chip-style tags.

### Icon tile above heading
A rounded-square pastel tile holding a generic icon, stacked above the title of a feature card. The universal AI feature-card template. Drop the tile, or replace it with something specific to the feature.

### Lucide and the v0 icon defaults
Lucide and Heroicons reached for as the default set for every glyph on the site. Use Phosphor, Radix, or a small hand-drawn SVG set chosen for your content.

### Outline icons as the only style
Outline-stroke icons everywhere because they dominate open-source libraries. Filled, two-tone, or a single illustrated set give the page identifiable character.

### Native emojis as feature icons
Unicode emojis dropped into feature cards, bullet lists, and section markers in place of a real icon set. Renders inconsistently across operating systems and reads as vibe-coded. Use one SVG icon set chosen with the type and palette, or omit icons entirely.

## Color and Contrast

### Purple-to-blue gradients
Indigo / violet / blue gradients on hero backgrounds, CTAs, and orbs. The single most-cited AI tell. Replace with a constrained palette built from one brand color plus neutrals.

### Cyan accents on dark mode
Glowing cyan, teal, or violet on near-black backgrounds, often with `box-shadow` halos. The classic "AI-generated dashboard" look.

### Defaulting to dark mode
Dark mode chosen because it hides indecision about color, not because it serves the content. Pick a light or dark base intentionally.

### Gradient text on headings
Decorative gradient fills on H1s, hero metrics, or section titles. Hurts scannability. Use a single solid color and let typography carry the weight.

### Decorative color names
CSS variables like `--purple-500` or `--accent-blue`. Use semantic names tied to function: `--bg`, `--surface`, `--text`, `--muted`, `--action`, `--danger`, `--success`.

### Defining colors only in HEX or HSL
Working in HEX or HSL on a varied palette makes "the same lightness across hues" impossible to eyeball. Author colors in OKLCH so lightness, chroma, and hue are independent.

### Multiple shades of one hue across components
Three or four slightly different blues across buttons, links, progress bars, and badges, because each component got its own hardcoded HEX value. Define a single accent at the token level and forbid component-level color literals.

### Accents saturated above 80 percent
Hot, fully saturated accent colors that fight the rest of the page. Cap accent saturation below 80 percent.

### Pure black background
`#000000` instead of a tinted near-black such as `#0a0a0c` or `#101014`. Tinted darks feel intentional; pure black feels like a default.

### Gray text on colored background
Low-contrast pairings that fail WCAG AA (4.5:1 for body, 3:1 for large text). Check every pairing.

## Layout and Space

### Identical card grids
Same-sized cards with icon + heading + text, repeated three or six times in a row. Vary sizes or change the layout per section.

### Bento grid as the default landing layout
A 4-by-3 bento grid filling the viewport as the hero, with no real content hierarchy. Use bento only when the content has natural varied-size items.

### Hero metric layout
Big number, small label, three stats in a row, often with a gradient accent. Generic SaaS pattern. Replace with one specific number or remove.

### Everything centered
Center-aligned text and components throughout. Left-align with intentional asymmetry; center only where it earns the eye's attention.

### Nested cards
Cards inside cards inside cards. Creates visual noise and inflates the sense of depth. Flatten to one level.

### Wrapping every block in a card
Bordering or shadowing every section. Cards should mark grouped, parallel items, not every paragraph.

### Maximum-density page composition
All sections turned on, every concept in its own card, claims padded to three sentences when one would do. Cut 30 to 50 percent of generated sections and cards before shipping.

### Monotonous spacing
The same margin between every section. Vary section rhythm (compact intro, generous case study, tight footer) so the page has a tempo.

### Cramped padding
Less than 8px inside containers. Aim for 12 to 16px minimum, more for hero areas.

### Long line lengths
Body text running wider than 80 characters. Cap text columns at 65 to 75ch.

## Components

### Side-tab accent border
A thick colored stripe on one edge of a rounded card, clashing with the corner radius. Singled out as the most recognizable tell of AI-generated UI. Remove it, or commit to a hard-edged design where the stripe belongs.

### 8px / 16px corner-radius monoculture
Every card, button, badge, and modal at the same 8px or 16px radius. Pick a radius scale (e.g. 2 / 6 / 14 / 24) and apply it by role so cards, chips, and buttons feel distinct.

### Glassmorphism overuse
`backdrop-blur` on cards, modals, navbars, and badges. Pick at most one surface for it and keep the rest opaque.

### Generic drop shadows
Default `shadow-lg` or `shadow-xl` Tailwind shadows. Use a custom tighter shadow stack, or skip shadows in favor of borders or color contrast.

### Effect stacking on the same surface
Gradients, heavy shadows, glows, blurs, and motion all applied to the same card or hero in pursuit of a "premium" look. The effects fight rather than reinforce. Pick at most one primary flourish per surface and keep the rest quiet.

### Modal reflex
Reaching for a modal for every secondary action. Use inline disclosure, side panels, or a separate route when the content deserves more than a popover.

### Sparklines as decoration
Tiny line charts that convey no real data. If the data is fake, remove the chart.

### Every button is primary
All buttons styled with the same filled, accented look. Hero sections showing one big primary button with no alternative path fall here too. Build a hierarchy (primary filled, secondary outline or ghost, tertiary text link), and give every hero at least one secondary action.

### Static elements styled like buttons
Status badges, metric tiles, and informational chips given the same heavy borders and padding as actual buttons. Users try to click them. Reserve button-heavy styling for actually-clickable elements; show status with type weight, color, or a lightweight chip instead.

### The unmodified v0 stack
Next.js + Tailwind + shadcn/ui + Framer Motion + Lucide, all on stock tokens. None of these tools are the problem; the visible cluster is. Swap the type scale, palette, radius, and at least one component shape so the surface does not match the v0 default.

## Motion

### Bounce or elastic easing
Spring-style easing on UI transitions, which feels dated. Use exponential easings such as `ease-out-quart`, `quint`, or `expo` for most UI motion.

### Animation without easing
Elements snap into place with no easing curve, or pop in at staggered moments without a coherent timing function. Apply a default easing such as `cubic-bezier(0.22, 1, 0.36, 1)` to all transitions.

### Animating layout properties
Transitioning `width`, `height`, `padding`, or `margin`. Causes jank. Animate `transform` and `opacity` instead.

### Decorative fade-ins on every section
Uniform 300ms fade-up on every block at scroll. Reserve scroll-triggered motion for content that benefits from sequencing.

### Ignoring `prefers-reduced-motion`
No fallback for users who request reduced motion. Wrap non-essential motion in the media query.

## Interaction

### No hover or focus states
Static buttons and cards with no feedback on hover, focus, or active. Define visible focus rings and at least one hover affordance per interactive element. Concrete defaults: `-translate-y-[1px]` on hover and `scale-[0.98]` on active for buttons, a 2px ring offset on `:focus-visible` for keyboard users.

### Glow effects on every interactive element
Hover gradients and box-shadow glows applied to every card, button, and icon on the page, with no hierarchy. Reserve glow or any high-emphasis hover state for primary CTAs only; secondary elements should use a subtle opacity shift or a 1 to 2px translate.

### Missing loading, empty, and error states
Forms and lists that show nothing while loading, nothing when empty, and a red toast on error. Use skeleton placeholders during load, real copy in empty states, and inline error messages directly beneath the field that failed.

## Imagery

### Stock photos of diverse teams in lit offices
Generic team-around-a-laptop shots. Replace with real product screenshots, real workspace photos, or no image at all.

### Floating 3D abstract blobs
Smooth, plastic-feeling abstract renders behind the hero. Remove, or replace with a specific illustration tied to the content.

### AI-generated illustrations
Too smooth, too symmetrical, vector art with melted hands. If real illustration is out of scope, prefer typography-driven layouts to fake art.

## Backgrounds

### Flat white or flat black with no atmosphere
A single solid color across the viewport because no background was actually designed. Layer two or three low-opacity gradients, a faint dot or grid pattern, or a subtle noise texture so the surface has weight.

### Decorative blurred orbs
Pastel circles blurred at 60px or more, drifting behind the hero. Part of the v0 default look. Remove, or replace with content-tied imagery.

### Identical background across every section
Same flat surface from hero to footer. Change the background at section boundaries (cream panel between dark blocks, a hairline rule, a subtle pattern shift) so scroll position is felt.

## Responsive

### Feature amputation on mobile
Hiding navigation items, secondary CTAs, or content entirely on small screens because the layout was never designed mobile-first. Adapt the layout; do not remove the function.

### `h-screen` and `100vh` on iOS Safari
Full-height sections set with `h-screen` or `100vh` get cut off by Safari's URL bar, pushing content below the fold. Use `min-h-[100dvh]` for any full-height block.

## Accessibility and Quality

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

## Portfolio-Specific

### "Hero / About / Projects / Contact" as the skeleton
The default v0 portfolio shape. If every section title on the site also appears on twenty other portfolios, the structure itself is the tell. Pick a layout the work motivates: a paper-style document, a timeline, a single-page CV, an interactive demo first.

### Three.js hero, particle field, custom cursor trail
Decorative WebGL or canvas effects with no link to the actual work. Cliché before AI, now register as both cliché and AI-generated. Cut, unless your work is graphics or shaders, in which case the demo IS the work.

### Skill bar percentages
"JavaScript 92%, Python 87%, React 78%" rendered as bars or radial charts. Self-rated percentages signal nothing and are widely mocked. Replace with project links or remove.

### Identical project cards
Six cards, same image aspect ratio, same icon row, same "View Project" button. Either vary the format per project or commit to a list view with substantive blurbs.

### Device mockups stretched past real viewport dimensions
Phone or laptop mockups in case studies sized to fit the available card slot rather than the actual device. Use real viewport dimensions (390 by 844 for current iOS, 1280 by 800 for a typical laptop) and let the surrounding layout adapt.

---

Any of these in isolation can be fine. The problem is the cluster. When several appear together, the site converges on the same look as thousands of other AI-built sites.
