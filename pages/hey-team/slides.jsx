import { Slide } from '../../components/hey-team/slide';
import { SlideTitle, SlideBody } from '../../components/hey-team/typography';
import { Prose } from '../../components/hey-team/prose';
import { StatLine } from '../../components/hey-team/stat-line';
import { PrincipleTags } from '../../components/hey-team/principle-tags';
import { ConfigBlock } from '../../components/hey-team/config-block';
import { Todo } from '../../components/hey-team/todo';
import styles from './slides.module.css';

// Content draft per slide-content-draft.md. Eyebrow commands not spelled
// out explicitly there (5, 6, 7, 9, 10, 12, 13, 14, 15) extend the same
// `cat <file>.md` convention established on slides 2-3 — swap the
// filenames for whatever you'd actually want typed if these aren't right.

const TitleSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Matt Gross</SlideTitle>
      <SlideBody>Design Engineer — Zscaler</SlideBody>
    </div>
  </Slide>
);

const WhoMeSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Who, me?</SlideTitle>
      <Prose>
        <p>7–8 years as an engineer. Always closest to the seam between design and code.</p>
        <p>
          Currently: day-to-day lead on Zscaler&rsquo;s Nimbus Design System. Proposing to
          cross the bridge from the other side.
        </p>
      </Prose>
    </div>
  </Slide>
);

const PrinciplesSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Principles</SlideTitle>
      <ConfigBlock
        rows={[
          ['restraint', "it's what we choose not to do"],
          ['subtlety', 'small distinctions, big impact'],
          ['calm', "systems that don't require heroics"],
          ['diligence', 'care for what no one checks'],
          ['taste', '> test scores'],
          ['consistency', 'compounds'],
        ]}
      />
    </div>
  </Slide>
);

const TeslaMarkerSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Tesla — Design System</SlideTitle>
      <StatLine items={['10 repos', '~500 dependent repos', '~150 teams', '3 frameworks']} />
      <Prose>
        <p>
          The job was never &ldquo;make it pretty.&rdquo; It was: how does a
          thousand-person engineering org make consistent decisions without asking me
          first.
        </p>
      </Prose>
      <PrincipleTags tags={['consistency compounds']} />
    </div>
  </Slide>
);

const CraftSlide = () => (
  <Slide>
    <div className="stack align-start">
      <Todo>
        Pick one pattern — Tooltip / Dialog / Data Table / Date Picker / Forms —
        whichever has the sharpest trade-off story.
      </Todo>
      <Todo>{`The constraint: ?\nThe decision: ?\nThe trade-off: what did you deliberately NOT do, and why?`}</Todo>
      <PrincipleTags tags={['subtlety', 'diligence']} />
    </div>
  </Slide>
);

const LeadingSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Leading through it</SlideTitle>
      <StatLine items={['team of 4', '~20 contributors mentored', '6 months sole ownership']} />
      <Prose>
        <p>
          Grew and led a team of 4. Mentored roughly 20 contributors building TDS
          patterns across the org. For six months, sole full-time engineer keeping the
          system alive — not by accident: the incremental-overhaul architecture meant
          nothing had to break for the system to keep moving without me.
        </p>
      </Prose>
    </div>
  </Slide>
);

const WorthSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>What it was worth</SlideTitle>
      <Prose>
        <p>
          Overhauled tesla.com&rsquo;s typography company-wide — Gotham to Univers —
          live, without a redesign freeze.
        </p>
        <p>
          Rebuilt the Global Navigation from scratch: one pattern, ~40 locales, millions
          of sessions a month.
        </p>
        <p>
          Designed the incremental-overhaul architecture specifically so breaking
          changes wouldn&rsquo;t become someone else&rsquo;s emergency.
        </p>
      </Prose>
      <p className={`monospace ${styles.calloutStat}`}>
        Demonstrated via KPIs — savings in the 10s of millions — as interim product
        manager, not as a number someone else tracked for me.
      </p>
      <PrincipleTags tags={['restraint', 'calm is a feature']} />
    </div>
  </Slide>
);

const ZscalerMarkerSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Zscaler — Nimbus Design System</SlideTitle>
      <Prose>
        <p>
          Same bridge. Other side. Most of the people I&rsquo;d work with as a Design
          Engineer are people I already work with every day.
        </p>
      </Prose>
    </div>
  </Slide>
);

const DataVizSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>DataViz library</SlideTitle>
      <Prose>
        <p>
          Own the build-out of Nimbus&rsquo;s DataViz library — the charts, tables, and
          visual language security and IT professionals rely on to make decisions,
          sometimes mid-incident. Calm isn&rsquo;t a metaphor on this team. It&rsquo;s a
          requirement.
        </p>
      </Prose>
      <Todo>
        Confirm exact scope — chart types, the whole visualization layer, specific
        dashboards? Who are the actual users, and what are they doing when they use it?
      </Todo>
      <PrincipleTags tags={['calm is a feature', 'diligence']} />
    </div>
  </Slide>
);

const BridgeSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>The view from this side</SlideTitle>
      <Todo>
        What does day-to-day collaboration with the design team actually look like?
        Pattern reviews, trade-off negotiations, being the engineer in the room
        pre-handoff — a real, specific moment if you have one.
      </Todo>
    </div>
  </Slide>
);

const VisionMarkerSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Where this is headed</SlideTitle>
      <Prose>
        <p>
          The next chapter: making agentic workflows actually work — not by prompting
          harder, but by encoding the judgment calls so the agent doesn&rsquo;t have to
          guess.
        </p>
      </Prose>
    </div>
  </Slide>
);

const SkillFileSlide = () => (
  <Slide>
    <div className="stack align-start">
      <Todo>Name the actual skill/workflow to show here.</Todo>
      <Prose>
        <p>
          The interesting part isn&rsquo;t the syntax. It&rsquo;s the judgment calls
          baked into it — when to stop, what &ldquo;done&rdquo; means, what an agent
          should never do unsupervised.
        </p>
      </Prose>
      <Todo>Paste in the real skill file or workflow excerpt.</Todo>
      <PrincipleTags tags={['taste over test scores']} />
    </div>
  </Slide>
);

const UnlockedSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>What it unlocked</SlideTitle>
      <Todo>{`Before: specific pain point?\nAfter: specific outcome?`}</Todo>
      <Prose>
        <p>The difference wasn&rsquo;t a smarter model. It was better-encoded judgment.</p>
      </Prose>
    </div>
  </Slide>
);

const PitchSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>The actual pitch</SlideTitle>
      <Prose>
        <p>
          A design engineer who already knows this design system, this org, and how to
          make an agent behave like a careful senior engineer instead of an eager junior
          one.
        </p>
        <p>Six principles. Not decoration — the operating system.</p>
      </Prose>
      <PrincipleTags
        tags={[
          'restraint',
          'subtlety',
          'calm is a feature',
          'diligence',
          'taste over test scores',
          'consistency compounds',
        ]}
      />
    </div>
  </Slide>
);

const CloseSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Why this, why now</SlideTitle>
      <Prose>
        <p>
          I&rsquo;m already on the other side of this bridge. I&rsquo;d like to help
          build it from here.
        </p>
      </Prose>
    </div>
  </Slide>
);

// Slides are grouped into sections — '' is the portfolio root, everything
// else is a subdirectory. Crossing a section boundary is what drives the
// eyebrow's cd choreography (see eyebrow-engine.js); a slide with
// command: null is a section's bare landing slide (e.g. `~/portfolio/tesla
// %` with nothing typed after it — the old "01 / 03" marker's job, now
// carried by the directory itself).
const section = (dir, entries) =>
  entries.map(([Component, command]) => ({ Component, eyebrow: { dir, command } }));

export const slides = [
  ...section('', [
    [TitleSlide, 'whoami'],
    [WhoMeSlide, 'cat about.md'],
    [PrinciplesSlide, 'cat principles.md'],
  ]),
  ...section('tesla', [
    [TeslaMarkerSlide, null],
    [CraftSlide, 'cat craft.md'],
    [LeadingSlide, 'cat leadership.md'],
    [WorthSlide, 'cat impact.md'],
  ]),
  ...section('zscaler', [
    [ZscalerMarkerSlide, null],
    [DataVizSlide, 'cat dataviz.md'],
    [BridgeSlide, 'cat collab.md'],
  ]),
  ...section('vision', [
    [VisionMarkerSlide, null],
    [SkillFileSlide, 'cat skill-file.md'],
    [UnlockedSlide, 'diff before after'],
    [PitchSlide, 'cat pitch.md'],
    [CloseSlide, 'exit'],
  ]),
];
