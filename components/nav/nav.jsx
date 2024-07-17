import { NavLink } from './nav-link';
import { NavCategory } from './nav-category';
import { DoubleSlash } from '../double-slash';

export const Nav = () => {
  return (
    <div className="stack align-start">
      <NavLink href="/Matt-Gross-Resume-2024.pdf" openInNewTab>
        Résumé
      </NavLink>

      <div>
        <NavCategory>Explorations</NavCategory> <DoubleSlash />{' '}
        <NavLink href="/explorations/01">01</NavLink>
        <NavLink href="/explorations/02">02</NavLink>
        <NavLink href="/explorations/03">03</NavLink>
        <NavLink href="/explorations/04">04</NavLink>
        <NavLink href="/explorations/05">05</NavLink>
      </div>

      <NavLink href="https://www.linkedin.com/in/m-gross/">LinkedIn</NavLink>
      <NavLink href="https://github.com/GrossDesignCo">GitHub</NavLink>
      <NavLink href="https://codepen.io/mattgrosswork">CodePen</NavLink>
      <NavLink href="https://x.com/GrossDesignCo">X</NavLink>
    </div>
  );
};
