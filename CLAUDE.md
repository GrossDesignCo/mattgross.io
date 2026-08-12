@AGENTS.md

## Motion & design principles

Distilled from emilkowal.ski (Emil Kowalski). Applies to any animation or
transition work in this repo, not just one page.

- **Reuse the site's easing token.** `--bezier: cubic-bezier(1, 0, 0.1, 0.9)`
  in `styles/vars.css` is the established motion signature — reach for it
  before writing a new curve. Plain `ease` / `ease-in-out` are rarely enough
  on their own.
- **Direction by intent.** Entering/exiting elements → `ease-out` (starts
  fast, reads as responsive); never `ease-in` for UI, it starts slow.
  Movement already on screen (dragging, repositioning) → `ease-in-out`.
- **Duration scales with frequency, not with how it looks in isolation.**
  An animation is judged by the hundredth time, not the first. Micro
  interactions: 100–150ms. One-off content transitions: under ~300–400ms.
  Anything triggered by rapid repeated input (keyboard nav, scroll) stays on
  the fast end or it reads as sluggish.
- **Scale entrances from ~0.9, never from 0.** Starting at 0 reads as
  unnatural; 0.9+ mimics how physical things move and lands as gentle
  rather than jarring.
- **Every animation needs a purpose test**: feedback, explanation, or
  spatial continuity (this moved from A to B). Not decoration — if it fails
  the test, cut it.
- **Directional transitions carry meaning.** A forward action and its
  reverse should animate as mirror opposites (e.g. "next" moves content one
  way, "back" moves it the other) — this is what makes spatial continuity a
  real signal instead of an assertion.
- **`prefers-reduced-motion` is not optional** on any new transition.
- **Friction is a feature.** A disciplined shared layout (this site's
  `.frame` / `.stack` / `.row` utilities in `styles/general.css`) beats
  bespoke per-page CSS — the constraint is what keeps things looking
  designed rather than assembled.

### Classical animation principles, adapted for UX

Disney's 12 principles of animation, filtered to the ones that add
something beyond the rules above (timing and slow-in/slow-out are already
covered by the duration and easing rules) and translated to interface
work.

- **Anticipation.** A big or unexpected change reads better with a tiny
  pre-motion cue instead of jumping straight into the transition — a
  button micro-depresses before its action fires, a card compresses
  slightly before it expands. Keep the cue under ~60–80ms or it reads as
  lag rather than texture.
- **Staging.** Animate one thing at a time. If several elements would move
  simultaneously, the eye can't track any of them — stagger reveals by
  ~20–40ms so attention is directed, not scattered.
- **Follow-through & overlapping action.** Nothing starts or stops in
  lockstep. A moving element's dependents (shadow, label, trailing icon)
  should lag slightly and settle just after the primary motion, not on the
  same frame — this is what separates "animated" from "physical."
- **Arcs.** Physical things move in curves, not straight diagonal lines.
  Anything repositioning across two axes (drag-and-drop, list reordering)
  should follow a slight arc rather than a linear interpolation.
- **Secondary action.** A supporting animation can reinforce the primary
  one without competing for attention — e.g. a subtle shadow lift while a
  card scales up. It should never be the first thing the eye lands on.
- **Exaggeration, used sparingly.** A touch of overshoot (spring a few
  percent past the resting value before settling) reads as confident
  feedback on toggles or drag-release. Reserve for deliberate, infrequent
  interactions — on high-frequency UI it reads as noise, not confidence.
- **Squash & stretch → press feedback.** The one principle with a direct
  UI translation: a button or control compressing slightly on press
  (scale ~0.96–0.98) and springing back on release conveys physicality and
  responsiveness better than a flat color change alone.
