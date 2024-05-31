import { NavLink } from './nav-link';
import { NavCategory } from './nav-category';

export const Nav = () => {
  return (
    <div className="stack align-start">
      <NavLink href="/Matt-Gross-Resume-2024.pdf">Résumé</NavLink>
      <div>
        <NavCategory>Explorations</NavCategory> /{' '}
        <NavLink href="/explorations/01">01</NavLink>
        <NavLink href="/explorations/02">02</NavLink>
      </div>
      <NavLink href="https://www.linkedin.com/in/m-gross/">LinkedIn</NavLink>
      <NavLink href="https://github.com/GrossDesignCo">GitHub</NavLink>
      <NavLink href="https://codepen.io/mattgrosswork">CodePen</NavLink>
      <NavLink href="https://x.com/GrossDesignCo">X</NavLink>
    </div>
  );
};
