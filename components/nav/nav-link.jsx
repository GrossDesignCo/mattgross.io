import { Link } from '../link';
import styles from './nav-link.module.css';

export const NavLink = ({ children, className, ...rest }) => {
  return (
    <Link className={`${className} ${styles['nav-link']}`} {...rest}>
      {children}
    </Link>
  );
};
