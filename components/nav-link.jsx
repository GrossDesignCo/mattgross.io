import Link from 'next/link';
import styles from './nav-link.module.css';
import { IconExternal } from './icons/external';

export const NavLink = (props) => {
  const { href, children } = props;
  const isExternal = href.includes('http');

  const externalProps = href.includes('http')
    ? {
        target: '_blank',
        rel: 'nofollow noopener',
      }
    : {};

  return (
    <Link className={styles['nav-link']} {...props} {...externalProps}>
      {children}
      {isExternal && <IconExternal />}
    </Link>
  );
};
