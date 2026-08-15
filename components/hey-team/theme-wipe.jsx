import styles from './deck.module.css';
import themeStyles from './theme.module.css';

// Purely presentational — renders whatever phase useThemeWipe (deck.jsx)
// is currently in. Carries its own data-hey-team-theme (the *incoming*
// theme) rather than inheriting the deck's, so it can resolve --bg on its
// own regardless of what the deck itself is still showing mid-sweep.
//
// Also sets --hey-team-wipe-direction itself, from its own `direction`
// prop, rather than reading the .viewport crossfade's shared
// --hey-team-slide-direction — that property is mutable global state
// Deck can rewrite mid-sweep (a same-section move firing while a section
// crossing's cover/reveal is still animating), which raced the wipe's own
// direction out from under it. This element is the same DOM node for the
// whole covering→revealing cycle (Deck always renders it, it just returns
// null when idle), so setting it once here holds steady regardless of
// what any other transition does in the meantime.
export const ThemeWipe = ({ wipe, coverMs, revealMs }) => {
  if (!wipe) return null;

  const { theme, phase, direction } = wipe;
  const phaseClass = phase === 'covering' ? styles.themeWipeCover : styles.themeWipeReveal;
  const duration = phase === 'covering' ? coverMs : revealMs;

  return (
    <div
      aria-hidden
      className={`${styles.themeWipe} ${themeStyles.themed} ${phaseClass}`}
      data-hey-team-theme={theme}
      style={{
        background: 'var(--bg)',
        animationDuration: `${duration}ms`,
        '--hey-team-wipe-direction': direction === 'forward' ? 1 : -1,
      }}
    />
  );
};
