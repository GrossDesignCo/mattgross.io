import NextLink from 'next/link';
import { IconExternal } from './icons/external';

export const Link = (props) => {
  const { href, children } = props;
  const isExternal = href.includes('http');

  const targetProps = href.includes('http')
    ? {
        target: '_blank',
        rel: 'nofollow noopener',
      }
    : {};

  return (
    <NextLink {...props} {...targetProps}>
      {children}
      {isExternal && <IconExternal />}
    </NextLink>
  );
};
