# hey-team — outline & talking notes

Working doc for the Zscaler internal-move deck (current role → Design
Engineer). Target ~20 min, audience already works with Matt cross-functionally.
This is the **thesis-first, 16-slide** structure — it supersedes the
15-slide version currently built out in `slides.jsx` (no separate thesis
slide, flat "Principles" instead of "mechanisms"). Treat this file as the
source of truth to reconcile `slides.jsx` against, not the other way round.

---

## Section 00 — Root (`~/portfolio %`)

### 1. Title — 0:30
**Eyebrow:** `~/portfolio % whoami`

No talking points — this is up while people settle in.
Matt Gross / Design
Engineer / Zscaler.

### 2. Who, me? — 1:00
**Eyebrow:** `~/portfolio % cat about.md`

7–8 years as an engineer, always closest to the seam between design and
code. Currently day-to-day lead on one part of Zscaler's Nimbus Design
System team, own the DataViz library, contribute to the team's agentic
dev workflows. This deck is proposing to cross that seam from the other
side — full-time Design Engineer.

### 3. The thesis — 2:30
**Eyebrow:** `~/portfolio % cat thesis.md`

**Delivery note:** don't open with the theory — open with a felt
before/after (a flow that needs a tooltip to explain itself vs. one that
doesn't) and let the gap register before naming the idea. This room
defaults to execution mode without questioning scope — that's a rational
response to an org that's never rewarded the question, not a character
flaw, so don't frame it that way. Show a better outcome, don't scold.

**The line to land, close to verbatim:**

> "An interface is a compressed transmission of one person's
> understanding of a problem. The job isn't to render a screen — it's to
> make sure what you understood survives the trip into someone else's
> head, intact, with as little of their attention spent decoding it as
> possible."

Density here means *signal* density — precision, lossless-ness — not
volume. Density and simplicity are the same move, not opposites.

Close with the portable ritual, delivered as a gift, not a rule: before
opening Figma, write the one sentence describing the understanding this
screen needs to transmit. If you can't write it, you're not ready to
design the screen.

### 4. The mechanisms — 2:00
**Eyebrow:** `~/portfolio % cat principles.md`

| Mechanism | One-liner | Protects signal by... |
|---|---|---|
| **Restraint** | What we choose not to do, not what we do | removing noise before it's added |
| **Subtlety** | Small distinctions, big impact | carrying large meaning in a small signal |
| **Calm is a feature** | Systems that don't need heroics to operate | keeping the channel free of panic |
| **Diligence** | Care for what no one will check | sealing the edges signal quietly leaks from |
| **Taste over test scores** | Metrics refine what exists; they can't originate what doesn't | catches what an A/B test can't verify — whether understanding actually landed |
| **Consistency compounds** | One correct system-level decision saves a hundred downstream ones | a shared vocabulary means less has to be re-encoded every time |

---

## Section 01 — Tesla (`~/portfolio/tesla %`)

### 5. Tesla / TDS marker — 1:00
**Eyebrow:** `cd tesla` (bare landing, no command)
**Tags:** consistency compounds

Scale of the problem, stated plainly: 5.5 years, rose from front-end
contributor to owning the entire Tesla Design System — ~10 repos, ~500
dependent repos, ~150 teams. The job was never "make it pretty," it was
how a thousand-person engineering org makes consistent decisions without
asking me first.

### 6. Craft — 1:30
**Eyebrow:** `cat craft.md`
**Tags:** subtlety, diligence
**[TODO — Matt]:** pick the pattern (Tooltip / Dialog / Data Table / Date
Picker / Forms — whichever has the sharpest trade-off) and fill in:
- The constraint:
- The decision:
- The trade-off — what did you deliberately *not* do, and why:

Lean on an eng-native artifact here (code diff, interaction spec,
diagram), not a static comp — this is the slide doing the most work to
prove the eng-leaning profile is a systems-thinking asset, not a gap.

### 7. Leading through it — 1:00 *(cut candidate — fold into 8)*
**Eyebrow:** `cat leadership.md`

Grew and led a team of 4, mentored roughly 20 contributors building TDS
patterns across the org. Sole full-time engineer on TDS for 6 months at
one point — not an accident, the incremental-overhaul architecture (slide
8) meant nothing had to break for the system to keep moving without him.

### 8. What it was worth — 1:30
**Eyebrow:** `cat impact.md`
**Tags:** restraint, calm is a feature

Typography migration across tesla.com, nav rebuild, the incremental-
overhaul architecture that made both possible without a redesign freeze.
KPI savings in the 10s of millions — demonstrated as interim product
manager, a number Matt tracked himself, not one someone else reported to
him.

---

## Section 02 — Zscaler (`~/portfolio/zscaler %`)

### 9. Zscaler / Nimbus marker — 0:45
**Eyebrow:** `cd zscaler` (bare landing, no command)

Bridge framing: same bridge, other side. Most people Matt would work with
as a Design Engineer are people he already works with every day —
cross-functional trust is already built, this isn't a cold start.

### 10. DataViz library — 1:30
**Eyebrow:** `cat dataviz.md`
**Tags:** calm as a feature, diligence
**[TODO — Matt]:** confirm exact scope (chart types? the whole
visualization layer? specific dashboards?) and who the real users are —
security/IT professionals, sometimes mid-incident. "Calm isn't a metaphor
on this team, it's a requirement" is the framing to build the rest of the
slide around once the specifics land.

### 11. The view from this side — 1:00 *(cut candidate — fold into 10)*
**Eyebrow:** `cat collab.md`
**[TODO — Matt]:** a real, specific moment of day-to-day collaboration
with the design team — pattern reviews, trade-off negotiations, being the
engineer in the room pre-handoff. One concrete anecdote beats a
description of the process.

---

## Section 03 — Vision (`~/portfolio/vision %`)

### 12. Vision marker — 1:00
**Eyebrow:** `cd vision` (bare landing, no command)

Agentic workflows, judgment over prompting harder. **Keep the gap
implicit — never state directly that the design org is AI-enthusiastic
but engineering-light.** That reads as criticizing the room. The skill-
file slide right after this one carries the argument by demonstration
instead.

### 13. A skill file, annotated — 2:00
**Eyebrow:** `cat skill-file.md`
**Tags:** taste over test scores
**[TODO — Matt]:** name the actual skill/workflow and paste the real
excerpt in. The interesting part isn't the syntax — it's the judgment
calls encoded into it: when to stop, what "done" means, what an agent
should never do unsupervised. This is the slide where the thesis stops
being asserted and starts being visibly practiced — worth the extra time
budget.

*(Adjacent, not deck content: if a real flow-gate skill exists by
presentation time — the one that intercepts "make it prettier" requests
and forces what-job/what-goal/minimum-path/duplication questions first —
it's a stronger candidate for this slide than a generic example, since it
directly demonstrates encoded judgment rather than encoded syntax.)*

### 14. What it unlocked — 1:00
**Eyebrow:** `diff before after`
**[TODO — Matt]:** a specific before (the pain point) and after (the
outcome). Land on: the difference wasn't a smarter model, it was
better-encoded judgment.

### 15. The actual pitch (bookend) — 1:30
**Eyebrow:** `cat pitch.md`
**Tags:** all six mechanisms

Restates the thesis, now proven instead of asserted. "Same claim, six
ways" — every slide since slide 4 was the same idea (protect signal
fidelity) applied in a different domain. That's what a design engineer
protects that a visual redesign alone won't: one person's understanding
surviving the trip into everyone else's head, intact.

### 16. Close — 0:45
**Eyebrow:** `exit`

Why this, why now: already on the other side of this bridge, would like
to help build it from here.

---

## Open items before this is presentation-ready

1. Fill in the five `[TODO]` slides above (6, 10, 11, 13, 14) with real
   specifics — these are the only gaps left; everything else in this
   outline is final wording.
2. Reconcile `slides.jsx` against this structure: insert the new thesis
   slide (3), split the old `PrinciplesSlide` into mechanisms-only framing
   (4), rewrite the closing `PitchSlide` as the explicit "same claim, six
   ways" bookend (15). Renumbering shifts every slide after the old
   `PrinciplesSlide` by +1.
3. Final pacing call: all 16 slides (~21:30) vs. cutting 7 and 11 into
   their neighbors (~19:30) to leave margin in a strict 20-min slot.
4. If pixel-matching the Figma title/who-me slides, that file is the
   reference implementation for exact spacing/type values.
