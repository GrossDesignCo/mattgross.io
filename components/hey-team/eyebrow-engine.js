// Pure terminal-eyebrow logic — no React, no timers. Given where the
// eyebrow *was* and where it needs to go, `buildFrames` compiles the whole
// transition into an ordered list of {prompt, command, dir, delay, execute}
// snapshots up front. The runner (use-terminal-eyebrow.js) just plays them
// back on a timeout chain; it doesn't know or care what a "backspace" or a
// "cd" is.
//
// That split is deliberate: tuning speed, adding a pause, or inserting a
// flourish (an `ls` before the cat, say) is a change to the frame list
// only — one function, no React, easy to eyeball or log
// (`buildFrames(a, b)`) without touching a component. And because frames
// are just data, `useTerminalEyebrow` never needs to distinguish "am I
// mid-backspace or mid-type" — it's always just "show this frame, wait
// this long, show the next one."
//
// Two things drive a transition:
//   - dir change ("~/portfolio" -> "~/portfolio/tesla"): backspace
//     whatever command is showing, type `cd <path>`, pause (as if about to
//     hit enter), then "execute" — an instant frame, flagged `execute:
//     true`, that swaps the prompt and clears the command, exactly like a
//     shell redrawing after cd. Deck listens for that flag to fire the
//     content swap and theme wipe at exactly the right instant.
//   - command change within the same dir: backspace the old command, type
//     the new one. The prompt never touches the ground.
// A landing slide with no command (a section's entry slide) just leaves
// the prompt bare after the cd executes — nothing to type.
//
// Every frame also carries `dir` — whatever the prompt currently
// represents at that point in the sequence. That's what makes
// mid-sequence redirects work: if the target changes again before a
// sequence finishes, the *next* buildFrames call is handed the last frame
// actually rendered (see use-terminal-eyebrow.js) rather than the
// destination that was abandoned, so a new cd continues smoothly from
// wherever the old one got interrupted instead of jumping.

// Tuned so a typical `cd ~/portfolio/<section>` sequence — backspace +
// type + pause — lands close to 1s end to end.
export const TYPE_MS = 20;
export const BACKSPACE_MS = 14;
export const PAUSE_BEFORE_EXEC_MS = 380;

const dirPath = (dir) => (dir ? `~/portfolio/${dir}` : '~/portfolio');
export const promptFor = (dir) => `${dirPath(dir)} %`;
const commandFor = (target) => target?.command ?? '';

// First paint: nothing to leave, so no cd dance — boot the prompt and
// command in together as one continuous type, like a freshly opened
// terminal session that's already `cd`'d into place.
function bootFrames(next) {
  const prompt = promptFor(next.dir);
  const command = commandFor(next);
  const full = command ? `${prompt} ${command}` : prompt;
  const splitAt = prompt.length;

  const frames = [];
  for (let i = 1; i <= full.length; i += 1) {
    const typedPrompt = full.slice(0, Math.min(i, splitAt));
    const typedCommand = i > splitAt ? full.slice(splitAt + 1, i) : '';
    frames.push({ prompt: typedPrompt, command: typedCommand, dir: next.dir, delay: TYPE_MS });
  }
  if (frames.length === 0) frames.push({ prompt, command: '', dir: next.dir, delay: 0 });
  return frames;
}

function transitionFrames(prev, next) {
  const frames = [];
  let prompt = promptFor(prev.dir);
  let dir = prev.dir;
  let command = commandFor(prev);

  while (command.length > 0) {
    command = command.slice(0, -1);
    frames.push({ prompt, command, dir, delay: BACKSPACE_MS });
  }

  if (next.dir !== prev.dir) {
    const cdCommand = `cd ${dirPath(next.dir)}`;
    for (let i = 1; i <= cdCommand.length; i += 1) {
      frames.push({ prompt, command: cdCommand.slice(0, i), dir, delay: TYPE_MS });
    }
    frames.push({ prompt, command: cdCommand, dir, delay: PAUSE_BEFORE_EXEC_MS });

    // "Execute" — the prompt swaps and the command clears in the same
    // instant, the way a shell redraws its prompt after a cd resolves.
    // This is the frame Deck hooks into to fire the content swap + wipe.
    prompt = promptFor(next.dir);
    dir = next.dir;
    command = '';
    frames.push({ prompt, command, dir, delay: TYPE_MS, execute: true });
  }

  const nextCommand = commandFor(next);
  for (let i = 1; i <= nextCommand.length; i += 1) {
    frames.push({ prompt, command: nextCommand.slice(0, i), dir, delay: TYPE_MS });
  }

  if (frames.length === 0) frames.push({ prompt, command, dir, delay: 0 });
  return frames;
}

export function buildFrames(prev, next) {
  return prev ? transitionFrames(prev, next) : bootFrames(next);
}
