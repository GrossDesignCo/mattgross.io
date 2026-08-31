import styles from './nav-link-group.module.css';

export const NavLinkGroup = ({ orientation = 'row', children, className }) => {
  return (
    <div
      className={`${styles['link-group']} ${className ?? ''}`.trim()}
      data-orientation={orientation}
    >
      {children}
    </div>
  );
};
