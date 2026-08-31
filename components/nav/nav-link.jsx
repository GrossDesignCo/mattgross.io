import { Link } from '../link';
import styles from './nav-link.module.css';

export const NavLink = ({ children, className, ...rest }) => {
  return (
    <Link className={`nav-link ${className ?? ''} ${styles['nav-link']}`.trim()} {...rest}>
      {children}
    </Link>
  );
};
