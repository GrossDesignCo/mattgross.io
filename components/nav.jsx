import { NavLink } from './nav-link';

export const Nav = () => {
  return (
    <div className="stack align-start">
      {/* TODO: Break this into a sub-section once more explorations exist */}
      <NavLink href="/explorations/01">Explorations / 01</NavLink>
      <NavLink href="https://www.linkedin.com/in/m-gross/">LinkedIn</NavLink>
      <NavLink href="https://github.com/GrossDesignCo">GitHub</NavLink>
      <NavLink href="https://codepen.io/mattgrosswork">CodePen</NavLink>
      <NavLink href="https://x.com/GrossDesignCo">X</NavLink>
    </div>
  );
};
