import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { IconExternal } from './icons/external';

export const Link = (props) => {
  const { href, children, openInNewTab } = props;
  const router = useRouter();

  // Automatically add "open in a new tab" behaivor for external links
  const isExternal = openInNewTab ?? href.includes('http');
  const targetProps = isExternal
    ? {
        target: '_blank',
        rel: 'nofollow noopener',
      }
    : {};

  // Support View Transitions API
  // https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
  const handleClick = (e) => {
    if (document.startViewTransition) {
      // external links should use the default "open in new tab" behavior
      if (isExternal) return;

      e.preventDefault();

      document.startViewTransition(() => {
        router.push(href);
      });
    }
  };

  return (
    <NextLink
      {...props}
      {...targetProps}
      onClick={(e) => {
        if (props.handleClick) props.handleClick(e);
        handleClick(e);
      }}
    >
      {children}
      {isExternal && <IconExternal />}
    </NextLink>
  );
};
