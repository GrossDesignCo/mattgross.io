import { useLayoutEffect, useRef } from 'react';
import { prepareWithSegments, measureNaturalWidth } from '@chenglou/pretext';

// Width-aware, viewport-relative shrink-to-fit. Size is driven directly
// by the text's *intrinsic* width (its natural, unwrapped width via
// Pretext) relative to the viewport — not by counting wrapped lines after
// the fact — so it scales continuously with how long the string is
// instead of jumping between line-count buckets:
//
//   size = widthScaleMaxVw   when intrinsic width <= widthScaleRangeLow  (% of viewport width)
//   size = widthScaleMinVw   when intrinsic width >= widthScaleRangeHigh
//   size = linear blend of the two in between
//
// ...then floored at minSizePx. maxHeightVh is an *optional* extra
// ceiling (unset by default) rather than an always-on constraint: for
// basically any monitor wider than 1.5:1 (nearly all of them), 15vh comes
// out smaller than even widthScaleMinVw's floor, so treating both as
// always-on collapses the entire width curve to a single flat value —
// pass maxHeightVh explicitly only where an ultra-wide-viewport backstop
// is actually wanted.
//
// Degrades to the CSS clamp() on the element's own class with no JS, no
// Canvas, or no Intl.Segmenter (Pretext's own requirement) — never a hard
// dependency.
export const FitText = ({
  as: Tag = 'div',
  children,
  className = '',
  minSizePx = 12,
  maxHeightVh,
  widthScaleMaxVw = 10,
  widthScaleMinVw = 5,
  widthScaleRangeLow = 45,
  widthScaleRangeHigh = 80,
}) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof children !== 'string') return;
    if (typeof Intl === 'undefined' || !Intl.Segmenter) return;

    let frame = null;

    const recalc = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const computed = window.getComputedStyle(el);
      const fontFamily = computed.fontFamily;
      const fontWeight = computed.fontWeight;

      // Measure the text's natural (unwrapped) width at the un-scaled
      // reference size to see how it compares to the viewport.
      const referenceSizePx = (widthScaleMaxVw / 100) * viewportWidth;
      const prepared = prepareWithSegments(
        children,
        `${fontWeight} ${referenceSizePx}px ${fontFamily}`
      );
      const naturalWidthPx = measureNaturalWidth(prepared);
      const intrinsicWidthPct = (naturalWidthPx / viewportWidth) * 100;

      const t = Math.min(
        1,
        Math.max(
          0,
          (intrinsicWidthPct - widthScaleRangeLow) /
            (widthScaleRangeHigh - widthScaleRangeLow)
        )
      );
      const targetVw = widthScaleMaxVw + t * (widthScaleMinVw - widthScaleMaxVw);
      const targetPx = (targetVw / 100) * viewportWidth;

      let finalPx = Math.max(targetPx, minSizePx);
      if (maxHeightVh != null) {
        finalPx = Math.min(finalPx, (maxHeightVh / 100) * viewportHeight);
      }

      el.style.fontSize = `${finalPx}px`;
    };

    const scheduleRecalc = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(recalc);
    };

    recalc();
    window.addEventListener('resize', scheduleRecalc);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('resize', scheduleRecalc);
    };
  }, [
    children,
    minSizePx,
    maxHeightVh,
    widthScaleMaxVw,
    widthScaleMinVw,
    widthScaleRangeLow,
    widthScaleRangeHigh,
  ]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};
