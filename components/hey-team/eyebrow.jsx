import styles from './eyebrow.module.css';

// Persistent, top-left, deliberately outside Deck's transitioning
// .viewport (see the view-transition-name override in eyebrow.module.css)
// — the terminal session living in this bar is its own animation, not the
// slide's crossfade/slide. Purely presentational: Deck owns the
// useTerminalEyebrow call (it needs the same frame timeline to fire the
// content swap and theme wipe at the right instant — see deck.jsx), and
// just hands this component whatever frame comes out.
export const Eyebrow = ({ prompt, command, isTyping, flashSeq = 0 }) => {
  const cursorInPrompt = command.length === 0;
  // Blink only once a sequence has fully settled — freezing solid while
  // isTyping is true keeps the cursor from competing with the text itself
  // (see CLAUDE.md's secondary-action principle).
  const cursorClassName = isTyping ? styles.cursor : `${styles.cursor} ${styles.cursorBlink}`;
  // key={flashSeq} forces a remount each real `execute`, which is what
  // replays the one-shot flash keyframes below — flashSeq starts at 0 so
  // first paint (already covered by .eyebrow's own mount animation)
  // doesn't also flash.
  const accentClassName = flashSeq > 0 ? `${styles.accent} ${styles.accentFlash}` : styles.accent;

  return (
    <div className={styles.slot}>
      <p className={`monospace ${styles.eyebrow}`}>
        <span key={flashSeq} className={accentClassName}>
          {prompt}
          {cursorInPrompt && <span className={cursorClassName} />}
        </span>
        {!cursorInPrompt && (
          <span className={styles.muted}>
            {command}
            <span className={cursorClassName} />
          </span>
        )}
      </p>
    </div>
  );
};
