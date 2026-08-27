import { Slide } from './slide';
import { SlideTitle, SlideBody } from './typography';
import { Todo } from './todo';
import styles from './slides.module.css';

// Spine-first deck: root (thesis + hinge + mechanisms) → constraints →
// transmission → vision. Section dirs follow the argument, not employers.
// Delivery notes live in slides-insights.md; TODO slides keep placeholders.

const TitleSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Portfolio</SlideTitle>
      <SlideBody>Design Engineer</SlideBody>
    </div>
  </Slide>
);

const WhoMeSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Who, me?</SlideTitle>
      <div>
        <p>
          Started as a graphic and web designer. Moved into code — CSS first, then
          UX and authoring on dozens of client sites. Taught web development to
          artists and craftspeople who needed the translation, not the jargon.
        </p>
      </div>
      <div>
        <p>
          Spent five and a half years at depth: one design system, ~500 dependent
          repos, ~150 teams — where constraint discipline either compounds or
          breaks.
        </p>
      </div>
      <div>
        <p>
          Now day-to-day lead on Zscaler&rsquo;s Nimbus Design System — own the
          DataViz library, contribute to the team&rsquo;s agentic dev workflows.
          Proposing the return trip: design engineer, with the machinery.
        </p>
      </div>
    </div>
  </Slide>
);

const ThesisSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Thesis</SlideTitle>
      <blockquote className={styles.quote}>
        <p>
          An interface is a compressed transmission of one person&rsquo;s
          understanding of a problem. The job isn&rsquo;t to render a screen
          &mdash; it&rsquo;s to make sure what you understood survives the trip
          into someone else&rsquo;s head, intact, with as little of their
          attention spent decoding it as possible.
        </p>
      </blockquote>
      <div>
        <p>
          Before opening Figma: write the one sentence describing the
          understanding this screen needs to transmit. If you can&rsquo;t write
          it, you&rsquo;re not ready to design the screen.
        </p>
      </div>
    </div>
  </Slide>
);

const HingeSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>The bottleneck</SlideTitle>
      <div>
        <p>
          The hardest problems in this space don&rsquo;t exist in a comp
          &mdash; they only appear at runtime, at scale, at 2am mid-incident.
        </p>
      </div>
      <div>
        <p>
          A comp of a million packets is a picture of a hairball. You can&rsquo;t
          design the system in a picture of the system; you have to design it in
          the system.
        </p>
      </div>
    </div>
  </Slide>
);

const MECHANISMS = [
  [
    'restraint',
    'What we choose not to do',
    'removing noise before it\u2019s added',
  ],
  [
    'taste over test scores',
    'Metrics refine what exists; they can\u2019t originate what doesn\u2019t',
    'catching what an A/B test can\u2019t verify \u2014 whether understanding actually landed',
  ],
  [
    'calm is a feature',
    "Systems that don\u2019t need heroics to operate",
    'keeping the channel free of panic',
  ],
];

const MechanismsSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Mechanisms</SlideTitle>
      {MECHANISMS.map(([tag, oneLiner, protects]) => (
        <div key={tag}>
          <span className="monospace">{tag}</span>: {oneLiner}
          <div className={styles.mechanismProtects}>Protects signal by {protects}</div>
        </div>
      ))}
    </div>
  </Slide>
);

const ConstraintsMarkerSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Constraint at scale</SlideTitle>
      <div>
        <span className="monospace">~10 repos</span>: ~500 dependent repos
      </div>
      <div>
        <span className="monospace">~150 teams</span>: 3 frameworks
      </div>
      <div>
        <p>
          One correct system-level decision saves a hundred downstream ones. The
          job was never &ldquo;make it pretty&rdquo; &mdash; it was how a
          thousand-person engineering org makes consistent decisions without
          asking anyone first.
        </p>
      </div>
      <div>
        <span className="monospace">restraint</span>
      </div>
    </div>
  </Slide>
);

const CraftSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Craft</SlideTitle>
      <Todo>
        Pick one pattern — Tooltip / Dialog / Data Table / Date Picker / Forms —
        whichever has the sharpest trade-off story.
      </Todo>
      <Todo>{`The constraint: ?\nThe decision: ?\nThe trade-off: what did you deliberately NOT do, and why?`}</Todo>
      <div>
        <span className="monospace">restraint</span>
      </div>
    </div>
  </Slide>
);

const ImpactSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>What it was worth</SlideTitle>
      <div>
        <p>
          Typography migration across tesla.com, nav rebuild, incremental-overhaul
          architecture &mdash; all live, without a redesign freeze.
        </p>
      </div>
      <div>
        <span className="monospace">team of 4</span>: ~20 contributors mentored
      </div>
      <div>
        <span className="monospace">6 months sole ownership</span>: the
        architecture meant nothing had to break for the system to keep moving
      </div>
      <p className={`monospace ${styles.calloutStat}`}>
        KPI savings in the 10s of millions &mdash; tracked as interim product
        manager, not reported by someone else.
      </p>
      <div>
        <span className="monospace">restraint</span>
      </div>
      <div>
        <span className="monospace">calm is a feature</span>
      </div>
    </div>
  </Slide>
);

const TransmissionMarkerSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Transmission</SlideTitle>
      <div>
        <p>
          A million packets a second. Live incident state. Network topology that
          only exists in motion. Design&rsquo;s job here is getting one
          person&rsquo;s understanding into another&rsquo;s head &mdash; intact.
        </p>
      </div>
      <div>
        <p>
          Not crossing from engineering into design. Building what&rsquo;s next
          &mdash; a seam nobody&rsquo;s standing in yet.
        </p>
      </div>
    </div>
  </Slide>
);

const LiveTransmissionSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Design in the running system</SlideTitle>
      <div>
        <p>
          Own Nimbus&rsquo;s DataViz library &mdash; charts, tables, and visual
          language security and IT professionals rely on to make decisions,
          sometimes mid-incident. Calm isn&rsquo;t a metaphor here. It&rsquo;s a
          requirement.
        </p>
      </div>
      <div>
        <p>
          Already working across this seam daily with the people who&rsquo;d be
          in the room.
        </p>
      </div>
      <Todo>
        Stress-test centerpiece: comp at twelve rows vs. live run at 10k+.
        Confirm exact scope and the one instance where the comp looked right and
        runtime proved it wrong.
      </Todo>
      <div>
        <span className="monospace">calm is a feature</span>
      </div>
    </div>
  </Slide>
);

const VisionMarkerSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Thinking-space</SlideTitle>
      <div>
        <p>
          When the problem stops fitting in a comp, the thinking has to move
          somewhere that holds it &mdash; a running system, not a static
          artifact.
        </p>
      </div>
      <div>
        <p>
          Agentic workflows: judgment encoded, not prompting harder. The
          discipline that made design systems work is what turns a
          prototyping-space into signal instead of noise.
        </p>
      </div>
    </div>
  </Slide>
);

const SkillFileSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>The same review question, when I&rsquo;m not there</SlideTitle>
      <Todo>Name the actual skill/workflow to show here.</Todo>
      <div>
        <p>
          The interesting part isn&rsquo;t the syntax. It&rsquo;s the judgment
          calls baked into it &mdash; when to stop, what &ldquo;done&rdquo;
          means, what an agent should never do unsupervised.
        </p>
      </div>
      <Todo>Paste in the real skill file or workflow excerpt.</Todo>
      <div>
        <span className="monospace">taste over test scores</span>
      </div>
    </div>
  </Slide>
);

const UnlockedSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>What it unlocked</SlideTitle>
      <Todo>{`Before: specific pain point?\nAfter: specific outcome?`}</Todo>
      <div>
        <p>
          The difference wasn&rsquo;t a smarter model. It was better-encoded
          judgment.
        </p>
      </div>
    </div>
  </Slide>
);

const PitchSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>The actual pitch</SlideTitle>
      <div>
        <p>
          Same claim, three ways. Every slide since the thesis was the same idea
          &mdash; protect signal fidelity &mdash; applied in a different domain.
        </p>
        <p>
          A design engineer protects what a visual redesign alone won&rsquo;t:
          one person&rsquo;s understanding surviving the trip into everyone
          else&rsquo;s head, intact.
        </p>
      </div>
      {MECHANISMS.map(([tag]) => (
        <div key={tag}>
          <span className="monospace">{tag}</span>
        </div>
      ))}
    </div>
  </Slide>
);

const CloseSlide = () => (
  <Slide>
    <div className="stack align-start">
      <SlideTitle>Why this, why now</SlideTitle>
      <div>
        <p>
          Already working at this seam in the margins. I&rsquo;d like to help
          build what&rsquo;s next &mdash; from here.
        </p>
      </div>
    </div>
  </Slide>
);

// Slides are grouped into sections — '' is the portfolio root, everything
// else is a subdirectory. Crossing a section boundary drives the eyebrow's
// cd choreography (see eyebrow-engine.js); command: null is a bare landing
// slide (e.g. `~/portfolio/constraints %` with nothing typed after it).
const section = (dir, entries) =>
  entries.map(([Component, command]) => ({ Component, eyebrow: { dir, command } }));

export const slides = [
  ...section('', [
    [TitleSlide, 'whoami'],
    [WhoMeSlide, 'cat about.md'],
    [ThesisSlide, 'cat thesis.md'],
    [HingeSlide, 'cat bottleneck.md'],
    [MechanismsSlide, 'cat mechanisms.md'],
  ]),
  ...section('constraints', [
    [ConstraintsMarkerSlide, null],
    [CraftSlide, 'cat craft.md'],
    [ImpactSlide, 'cat impact.md'],
  ]),
  ...section('transmission', [
    [TransmissionMarkerSlide, null],
    [LiveTransmissionSlide, 'cat live.md'],
  ]),
  ...section('vision', [
    [VisionMarkerSlide, null],
    [SkillFileSlide, 'cat skill-file.md'],
    [UnlockedSlide, 'diff before after'],
    [PitchSlide, 'cat pitch.md'],
    [CloseSlide, 'exit'],
  ]),
];
