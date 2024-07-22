import { NavLink } from './nav-link';
import { NavCategory } from './nav-category';
import { DoubleSlash } from '../double-slash';

export const Nav = () => {
  const exps = new Array(6).fill(0).map((item, i) => `0${i + 1}`);

  return (
    <div className="stack align-start">
      <NavLink href="/Matt-Gross-Resume-2024.pdf" openInNewTab>
        Résumé
      </NavLink>

      <div className="row">
        <NavCategory>Explorations</NavCategory> <DoubleSlash />{' '}
        <div>
          {exps.map((number) => (
            <NavLink key={number} href={`/explorations/${number}`}>
              {number}
            </NavLink>
          ))}
        </div>
      </div>

      <NavLink href="https://www.linkedin.com/in/m-gross/">LinkedIn</NavLink>
      <NavLink href="https://github.com/GrossDesignCo">GitHub</NavLink>
      <NavLink href="https://codepen.io/mattgrosswork">CodePen</NavLink>
      <NavLink href="https://x.com/GrossDesignCo">X</NavLink>
    </div>
  );
};
