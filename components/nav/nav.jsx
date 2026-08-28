import { NavLink } from './nav-link';
import { NavCategory } from './nav-category';
import { DoubleSlash } from '../double-slash';

const getExplorationNumber = (index, maxLength) => {
  return index.toString().padStart(maxLength.toString().length, '0');
};

const getExplorationArray = (count) => {
  return new Array(count)
    .fill(0)
    .map((item, i) => {
      return getExplorationNumber(i + 1, count);
    });
};

export const Nav = () => {
  const explorationCount = 10;
  const exps = getExplorationArray(explorationCount);

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
