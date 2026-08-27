# hey-team — strategy notes

Companion to `slides.md`. That file is *what goes on the slides*; this one is
*why*, and the room it has to survive. Findings from the grilling pass.

---

## 1. Genre: this is not a portfolio

There is no req. The design-engineer role does not exist yet.

So the deck is **not** evaluated as "is Matt good enough" — there's no bar to
clear. It's evaluated as **"should this role exist?"** As of the current draft,
~10 of 16 slides answer the first question and 0 answer the second. That is the
largest structural gap in the deck, bigger than any of the five TODO slides.

**Collapse risk.** An open DS-*designer* req already exists (design-production
focused; Ve steered Matt off it). A manager holding one req, no spare headcount,
and a persuasive pitch takes the path of least resistance: *"great — apply to
the open one."* Then Matt is scored on comps, against people who produce comps
full-time. The deck must make design-engineer and design-system-designer read as
**different problems**, not the same problem at two skill levels. If it doesn't
do that work explicitly, the collapse happens by default.

**The ask.** Name it, plainly, at the end: *"I think there's a role here that
doesn't exist yet. I'd like to help you figure out whether I'm right."* An
invitation to co-author, not a demand. Whoever drafts the role description
defines its shape — and the window before the req opens is the only time that's
available.

---

## 2. Room read

| Who | Read | What the deck owes them |
|---|---|---|
| **Ve** — Nimbus design mgr | Already recruiting, not evaluating. Steered Matt off the production req. | Ammunition + cover, not persuasion. A sentence she can repeat when Matt isn't there. |
| **Jen** — Principal Eng, Nimbus | Direct supervisor 1yr, ex-Tesla, long trust. **Already on board.** | Air cover. An eng principal vouching that *design* needs this is the most credible voice in the room. |
| **Val** — VP Design | The **only** person who can create the role. Mysterious, moment-by-moment, a year into pushing Figma → AI prototyping. Discounts Ve + Jen. | Everything. The current draft makes no attempt to reach him. |
| **Wildcard** — designer/PM | Cross-functional check. Most likely source of the hostile question; may hear "design engineer" as an engineer being handed design authority. | Disarm — see §5, bridge reframe. |

**Two sponsors, one customer.** Ve and Jen would sign today if signing were
theirs to do. It isn't.

**Uncomfortable but load-bearing:** Matt has socially written Val off in the same
motion his sponsors have. That may be accurate and it is still aimed at the
decision-maker. A year in the org with no read on the VP of Design is a solvable
problem — 20 minutes with Val *before* the presentation is worth more than any
slide in the deck. Val also discounts Ve and Jen, so sponsorship transmitted
through them may actively cost Matt. He needs a direct line.

---

## 3. The spine

Six links. Everything in the deck hangs off this chain; anything that doesn't
plug into it is cut.

1. **Zscaler's problem-space is at the frontier of hard.** A million packets a
   second, live incident state, network topology. The difficulty is the *shape*
   of the problem, not its appearance.
2. **Design's job here is transmission.** Get the networking engineer's
   understanding into the analyst's head, intact, with as little of their
   attention spent decoding as possible. (The telephone thesis — origin → edge.)
3. **That transmission cannot be worked out in a static comp.** The thing being
   transmitted only exists in motion, at volume, over time. A comp of a million
   packets is a picture of a hairball. *This is the bottleneck, and it's nobody's
   fault.*
4. **So the thinking-space has to be a running system.** Not a preference —
   forced by the problem. Design's output was always the *thinking*; the comp is
   the residue of it. When the problem stops fitting in a comp, the thinking has
   to move somewhere that holds it.
5. **Which requires a person whose native medium is the running system and whose
   training is design.** That is the role. It does not currently exist, and it is
   not the DS-designer req.
6. **A thinking-space with no constraints produces slop.** The discipline that
   made design systems work — restraint, one correct decision saving a hundred
   downstream — is exactly what turns a prototyping-space into signal instead of
   noise. *This is why the design-system years are load-bearing and not just
   résumé.*

### Two schools, and they map onto the spine

Don't collapse this into "the Tesla decade" — it isn't one, and the real shape is
better than the compressed one:

- **Agency, 7 years (2012–2018)** — design → eng, ~80 client sites, comms in real
  time with tons of stakeholders, plus teaching non-technical people to build.
  Breadth. Many contexts, many audiences, constant translation. **This is where
  link 2 was learned** — transmission, origin → edge.
- **Tesla, 5.5 years (2018–2024)** — one system, ~500 dependent repos, ~150
  teams. Depth. **This is where link 6 was learned** — constraint at scale, and
  what it costs when you get it wrong.

Two complementary trainings, not one long tenure. The biography maps onto the
argument exactly, which is why it doesn't need inflating.

Note what the spine does to the existing slides: Tesla stops being history and
becomes where the constraint discipline was learned (link 6). The agency years
stop being pre-history and become the origin of the thesis (link 2). DataViz
stops being a current-work update and becomes the live instance of links 1–3. The
skill-file slide stops being "look at my tooling" and becomes the worked example
of link 6 — encoded judgment as the constraint on a thinking-space. Every TODO
slide gets a job.

---

## 4. The strategic move

**Val's Figma-scrapping crusade is a bet that only pays off if this role
exists.**

AI prototyping tools emit code-shaped artifacts. Someone has to own the seam
between "a designer generated a working prototype" and "this is in Nimbus and
won't rot." Without that person the bet produces unmaintainable output and fails
publicly with Val's name on it. With that person it's the most interesting thing
happening in design tooling anywhere.

Matt is the insurance policy on his VP's most visible bet. Not flattery —
structurally true. It converts him from *"engineer who wants a design job"* (a
request) into *"the missing piece of the thing you already decided to do"* (a
relief).

**Same role, two motives.** Ve and Jen want someone to keep the AI push from
wrecking the system. Val wants someone to make it succeed. One hire satisfies
both, and Matt never has to say whose side he's on. That is "calm in the storm"
*demonstrated* — worth more than asserting it on a mechanisms table.

### What the sponsors actually object to

Not that the crusade is dumb. That it's **undirected** — "throw AI at all the
things" without first naming the problem statement. So the deck's antidote to the
slop shop is not skepticism, it's **constraint**: restrained, thoughtful work with
AI as an extraordinary tool. That framing is agreeable to all three
simultaneously.

### The threading rule (non-negotiable)

Back the **direction**, never the tool.

- ✅ "Design's output is becoming executable." — Ve and Jen can agree.
- ✅ "The tool is a workspace for thinking about the problem." — redirects the
  crusade without opposing it.
- ❌ "We should scrap Figma." — burns the sponsors, and isn't the point anyway.

Val hears his own idea; the sponsors hear adult supervision.

**Careful with the best line.** *"Mocks get trashed when the app hits prod; the
design-thinking never leaves"* is true and lands — but a designer in the room can
hear *"your deliverables are disposable."* Say it as **the mock is the residue of
the thinking, not the thing itself.** Same claim, honors the craft, no casualties.

---

## 5. Framing rules

**Name a bottleneck, not a deficiency.** Aspiration alone is a motivational
poster — "we could be world-class" invites "yes, we're working on it." A vision
only creates a role when something specific blocks the path and only that role
removes it.

> The reason nobody has cracked security UX isn't talent or effort. It's that the
> hardest problems in this space **don't exist in a comp** — they only appear at
> runtime, at scale, at 2am mid-incident. You can't design them in a picture of
> the system; you have to design them in the system.

Nobody's fault. Unfixable by designer talent or PM pressure. Exactly one
role-shaped answer. **Gets its own slide/sketch** — it's link 3, the hinge of the
whole spine.

**Grammar over content.** State the gap as a law of physics, never in the second
person. *"This is where design systems lose fidelity"* is a gift; *"this is where
you lose fidelity"* is an audit. Same sentence, opposite reception.

**The bridge is now → next, not eng → design.** The current draft's bridge is
team-to-team ("same bridge, other side"). Replace it. A team-to-team bridge means
Matt is crossing into designers' territory — which is exactly the threat the
wildcard designer will feel. A present-to-future bridge takes nobody's job,
because nobody is standing there yet. This single change disarms the hostile
question and sharpens the role-creation argument at the same time. Slide 9 needs
re-cutting.

**Ambition goes at the close, not the open.** "In a few years we could be famous
for this" reads as overreach on slide 3 and as earned conviction on slide 15.
Open with the felt gap; close with the TED talk.

**Multiplier, not solution.** Matt doesn't know their goals — so don't claim to
solve their problem. Claim that whatever they choose next costs less and survives
longer with this role in place. Cheaper to say yes to, and it doesn't require
guessing right.

---

## 6. Biography finding (from the 2024 resume)

The deck opens by calling Matt an engineer. The resume disagrees.

- **2012–2014** — Graphic & Web Designer. Logos, branding, print. *"Learned to
  appreciate bezier curves."*
- **2014–2017** — moved into code, "writing almost nothing but CSS." Eventually
  owned UX + authoring on ~50–80 client sites.
- **2017** — North Coast SBDC instructor: taught web development to artists,
  restaurant owners, craftspeople. *"Translated technical expertise for
  non-industry folks."* The telephone thesis, performed, eight years before it
  was written down.

So: **not an engineer near the design seam — a designer who went to where the
losses happen, learned the machinery, and is proposing the return trip with it.**
Slide 2 currently discards this in its first sentence, and undercounts the career
by ~6 years while doing it. Highest-value single edit available: it makes the
thesis autobiographical instead of theoretical.

---

## 7. Role mechanics

**Full transfer, not embedded.** Embedding was considered and rejected: an
eng-reporting design-engineer gets pulled onto engineering fires the moment they
start, and never gets the space to think.

**But a reporting line doesn't stop interrupts — a charter does.** The design org
is described as hammered daily by PMs with conflicting asks. Trading engineering
interrupt-load for design-production interrupt-load solves nothing; it's the same
failure mode with a different queue. The protection has to be an explicit
statement of *what this role is not responsible for*, negotiated while
co-authoring the role description.

Matt's own principle is the lever: **restraint is what we choose not to do.** A
role definition with no "not" clause is an unrestrained role. Use the thesis to
negotiate the charter.

### Charter seed — categories, not fires

The role owns **categories of problems**, not the problem of the day. Longer-
horizon meta-focus, with occasional deliberate dips into day-to-day fires *only*
where a fire presents a novel or unique problem-set worth generalizing from.

That formulation is doing real work — it's the difference between a design
engineer and a faster designer, and it's also the honest test for whether a given
interrupt belongs to the role. Needs its own question-set before the
role-description conversation: what categories, who arbitrates "novel," what
happens to the queue when Matt says no, and what the role is measured on if not
throughput.

---

## 8. Open holes

**TODO — Matt (top of list, now narrowed):** the centerpiece is almost certainly
the **DataViz stress tests** (§11). What's still missing is not a candidate but an
*outcome* — the single instance where the comp looked right, the live run at 10k+
proved it wrong, and something specific changed as a result. Practice is process;
one instance is proof. Everything on slides 5 and 7 depends on this one story.

- **See whether one example can carry two jobs.** The telephone instance (a place
  where the data model's vocabulary leaked onto the user's screen) and the
  running-system instance above may be the *same story*. If so, that's the single
  most efficient slide in the deck. Don't hunt for two if one does both.
- **"Prototype-space thinking beats Figma-space thinking IF done right"** — the
  IF is carrying the entire claim, and it's the part nobody knows how to do.
  Asserted without an instance, Matt is just the third person in the room with an
  opinion about AI.
- Each of the three surviving principles still needs its **cost story** — a
  moment where following it meant shipping less, shipping slower, or telling
  someone senior no. Restraint's is likely the train story (§9).

---

## 9. Decisions

**Three principles, not six.** Restraint, Taste over test scores, Calm is a
feature. Consistency-compounds is restraint wearing a hat; subtlety and diligence
are craft virtues that advance no argument — demote both to tags on the
case-study slides where they're being demonstrated anyway. Fewer principles, more
value per principle.

**No DS-designer / design-engineer distinction slide.** A slide explaining why
Matt isn't the other req is defensive, and it hands the room the collapse idea in
case they hadn't had it. If the spine works the distinction is total and
self-evident — link 3 describes a job a comp-producing designer structurally
cannot do, and an audience that arrives there itself is worth ten times one that's
told. Handle it in priming instead (§10), and keep one clean sentence ready for a
direct question.

**Sections follow the argument, not the employers.** `cd tesla` is a genre signal
that says *portfolio*; `cd limits` says *proposal*. Section/subsection numbering
and the terminal conceit stay exactly as built — only the section identities
change. Cost is real: eyebrow engine and section markers in `slides.jsx` are built
around the current sections.

**Calm story — the train story (pending).** Recent Zscaler team-lead phase: fell
into anxiety-driven development like everyone, went on vacation, came back and
reworked the team's commitments in a planning session that looked like it had
failed. Committed to two things — shipping excellence, and clarity — and refused
to commit the team to anything not understood. *"We'd been chasing several trains
without knowing which one to run toward."*

Three reasons it's the right story:

1. **He was in the anxiety too.** That admission is what lets him say "calm"
   without implying anyone else is panicking — it is the structural solution to
   the whole no-criticism constraint.
2. **The train metaphor is the design team's exact condition.** Told about an eng
   team, every person in the room maps it onto their own without being asked.
   Matt never says one word about the design org; they say it to themselves.
3. **It doubles as restraint's cost story.** He removed commitments rather than
   adding effort, and said no at team scale.

**Telling conditions.**

- **Name the uncertainty out loud.** Unresolved-and-declared reads as honest;
  unresolved-and-concealed reads as thin, and they will detect it.
- **One unfinished story per deck, maximum.** Two makes a pattern, and the
  pattern reads as someone with theories rather than results. So this story being
  in flight makes it a hard requirement that the §8 centerpiece be resolved.
- **The mechanism is distance, not vacation.** "The break gave me clarity" is
  smaller, more forgettable, and faintly invites "so you needed time off." The
  real mechanism — stepping out of the queue is what made the queue visible — is
  *precisely the argument for the charter*. Categories-not-fires is the same idea
  made permanent. Told this way, the calm slide and the role definition make the
  same argument twice.

**The timeline hazard.** The session's actual landing was a smaller set of
objectives with defined purpose, scope, and impact — but no timelines, and
timelines are what product and company leadership say they care about ("don't
care what you commit to as long as it's delivered on time"). Presented as-is,
this is heresy: Matt would be claiming as a win the exact thing that audience
calls the miss. **Val is leadership.**

The fix is not to sidestep it — it's to take their premise. Clarity is not the
alternative to hitting dates, it is the precondition for hitting them
*repeatably*. The team wasn't trading delivery for understanding; it was removing
the source of unpredictability, i.e. estimates on work whose scope nobody had
defined. Framed that way Matt agrees with leadership and demonstrates he serves
their goal better — unarguable in a way that "dates aren't the point" never is.

Comes with two adjustments:

1. **Strip the process vocabulary.** No "planning session," "prioritized list,"
   "objectives," "commitments." That language summons the exact conversation
   being avoided and invites a PM-shaped response that eats the slide budget.
   Tell it at the level of the trains and the decision.
2. **The line is "a guess with a deadline."** — *"A date on something undefined
   isn't a commitment, it's a guess with a deadline."* General truth, first
   person, never second person.

**Related, and unavoidable:** the only-timelines-matter attitude is the same
pathology as throw-AI-at-everything-without-a-problem-statement in different
clothes, and it is the ambient condition the proposed role exists to fix. The
whole spine argues against it. Engage obliquely, never as a grievance, and expect
it back in Q&A.

---

## 10. Priming conversations

The deck is not the whole play. Several things land better before the room than
in it, and one of them is load-bearing.

| Who | What they need | Ask |
|---|---|---|
| **Val** | A direct read, not one transmitted through people he discounts. He decides in the first 90 seconds of the deck; the priming is what makes those 90 seconds land. | 20 minutes, ahead of time, no deck. Listen more than pitch. This is worth more than any slide. |
| **Ve** | Nothing — she's already recruiting. | Arm her: give her the DS-designer / design-engineer distinction as one sentence she can say out loud in the room. She drew it herself already, and it costs Matt nothing when *she* says it. |
| **Jen** | Already on board. | Agree in advance what she says and when — an engineering principal vouching that *design* needs this role is the most credible voice available, and it's wasted if it's spontaneous. |
| **Wildcard** | Unknown — that's the problem. | Find out who it is before the day. A designer in that seat has a threat response to manage (handled by the now→next bridge, §5); a PM has a different one. |

---

## 11. Working examples

Four proofs, each assigned to one link. The column that matters is the last one —
every one of these has a way of landing wrong.

| Example | Serves | Slide | Fails if… |
|---|---|---|---|
| **The code-review question** — *"What exactly is this function trying to achieve?"* Treated as a goldmine because it surfaces something the author hadn't understood either, and articulating it is what creates the clarity. | Link 2, transmission | 4 (+ callback at 15) | it's told as self-reported praise, or as catching colleagues out |
| **DataViz stress tests** — live browser runs of in-progress designs at 10k+ datapoints, to decide whether the design makes sense at all. A practice Matt pushed the team to adopt. | Links 3 + 4 — **the centerpiece** | 5 + 7 | it reads as QA rather than as a design decision made at runtime |
| **The train story** — see §9. | Calm; also restraint's cost | 11 | the timeline politics aren't reframed; or it's told with process vocabulary |
| **Skill files** (`/close-the-loop`, or the flow-gate skill) — a compressed transmission of one person's understanding, written to survive the trip into another *mind*. | Link 6, constraint on a thinking-space | 12 | it's framed as velocity ("we shipped more") instead of variance reduction |

### Notes on each

**Code review.** Don't claim the equivalence to design crit — point at them as the
source: *"this is the move I've watched designers make in crit, and I've been
making it in code."* Keep the honest register: he asks because *he* can't follow
it, not as a Socratic gotcha. Best artifact is a real PR comment and the thread it
unlocked; Jen can corroborate live.

**Stress tests.** This is link 3 and link 4 *performed*, and it hands slide 5 its
side-by-side for free — the comp at twelve rows next to the live thing at 10k, no
diagram needed. It's also AI-free, which the proof mix requires (see below). And
it supplies the best argument for slides 13–14: **this role already exists, it's
just being done in the margins by whoever notices.** The strongest case for
inventing a role is that its work is already happening, uncredited.

**Skill files.** The real prize here isn't the workflow — it's that a skill file is
the thesis with the roles swapped, human→machine instead of human→human. That
proves the thesis is *general*: not a nice thing to say about UI, but a claim
about how understanding moves between minds. Frame the slide as **"the same
review question, asked when I'm not there"** — a direct continuation of slide 4,
which closes that loop across the deck.

Screening test for which skill to show: does it encode **judgment** (when to stop,
what "done" means, what never happens unsupervised) or **procedure** (steps in an
order)? Judgment is the slide. A room of designers cannot evaluate a script.

### Proof mix — protect it

Slides 7, 11, and 12 are all candidates for AI-flavored evidence. If every
demonstration routes through agentic tooling, the argument narrows from *"Matt has
judgment, and it extends to agents"* to *"Matt is the AI guy."* The second gets a
project; only the first gets a role invented, and only the first survives Ve and
Jen's skepticism intact.

**Guarantee at least one major proof point with zero AI in it.** Currently that's
the train story and the stress tests. If the centerpiece drifts agent-adjacent,
swap something deliberately.
