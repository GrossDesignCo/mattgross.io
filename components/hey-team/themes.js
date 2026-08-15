// Which theme each section uses. Colors themselves live only in
// theme.module.css (one `.themed[data-hey-team-theme]` block per theme) —
// nothing here duplicates a hex value, so there's a single place to tune
// a palette.
export const SECTION_THEME = {
  '': 'light',
  tesla: 'dark',
  zscaler: 'light',
  vision: 'gold',
};

export const themeFor = (dir) => SECTION_THEME[dir] ?? 'light';
