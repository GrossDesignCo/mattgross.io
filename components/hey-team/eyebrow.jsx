import styles from './eyebrow.module.css';

// Persistent, top-left, deliberately outside Deck's transitioning
// .viewport (see the view-transition-name override in eyebrow.module.css)
// — the terminal session living in this bar is its own animation, not the
// slide's crossfade/slide. Purely presentational: Deck owns the
// useTerminalEyebrow call (it needs the same frame timeline to fire the
// content swap and theme wipe at the right instant — see deck.jsx), and
// just hands this component whatever frame comes out.
export const Eyebrow = ({ prompt, command }) => {
  const cursorInPrompt = command.length === 0;

  return (
    <div className={styles.slot}>
      <p className={`monospace ${styles.eyebrow}`}>
        <span className={styles.accent}>
          {prompt}
          {cursorInPrompt && <span className={styles.cursor} />}
        </span>
        {!cursorInPrompt && (
          <span className={styles.muted}>
            {command}
            <span className={styles.cursor} />
          </span>
        )}
      </p>
    </div>
  );
};
