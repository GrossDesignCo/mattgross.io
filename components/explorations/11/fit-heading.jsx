import { useLayoutEffect, useRef } from 'react';
import { prepareWithSegments, measureNaturalWidth } from '@chenglou/pretext';

const REFERENCE_SIZE_PX = 100;

const getLineCount = (heading) => heading.innerText.split('\n').length;

const getMeasureLines = (heading) =>
  heading.innerText.split('\n').filter((line) => line.length > 0);

const needsNormalize = (heading) => {
  for (const child of heading.childNodes) {
    if (child.nodeType === Node.ELEMENT_NODE && child.nodeName !== 'BR') {
      return true;
    }
  }

  return false;
};

// Flatten block/inline wrappers from browser editing into text nodes + <br>.
const normalizeHeading = (heading) => {
  if (!needsNormalize(heading)) return;

  const selection = window.getSelection();
  const hadSelection =
    selection?.rangeCount &&
    heading.contains(selection.getRangeAt(0).commonAncestorContainer);

  const lines = heading.innerText.split('\n');

  heading.replaceChildren();

  for (let i = 0; i < lines.length; i++) {
    if (i > 0) {
      heading.appendChild(document.createElement('br'));
    }

    if (lines[i]) {
      heading.appendChild(document.createTextNode(lines[i]));
    }
  }

  if (hadSelection) {
    const range = document.createRange();
    range.selectNodeContents(heading);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

const measureLongestLineWidth = (lines, fontDescriptor) => {
  let longest = 0;

  for (const line of lines) {
    const prepared = prepareWithSegments(line, fontDescriptor);
    longest = Math.max(longest, measureNaturalWidth(prepared));
  }

  return longest;
};

// Container-relative shrink-to-fit: font size is driven by the longest line's
// intrinsic width so every line shares one size, clamped between 1rem and the
// lesser of 25% container height or whatever fits all lines vertically.
export const FitHeading = ({
  as: Tag = 'h1',
  defaultText = 'Dynamic Heading',
  className = '',
  containerClassName = '',
}) => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const heading = headingRef.current;
    if (!container || !heading) return;

    if (!heading.textContent) {
      heading.textContent = defaultText;
    }

    const recalc = () => {
      normalizeHeading(heading);

      const measureLines = getMeasureLines(heading);
      if (measureLines.length === 0) return;

      const lineCount = getLineCount(heading);

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      if (containerWidth <= 0 || containerHeight <= 0) return;

      const computed = window.getComputedStyle(heading);
      const fontFamily = computed.fontFamily;
      const fontWeight = computed.fontWeight;
      const fontDescriptor = `${fontWeight} ${REFERENCE_SIZE_PX}px ${fontFamily}`;

      const minSizePx = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      const lineHeightRatio =
        parseFloat(computed.lineHeight) / parseFloat(computed.fontSize);
      const maxByHeightCap = containerHeight * 0.25;
      const maxByLineCount = containerHeight / (lineCount * lineHeightRatio);
      const maxSizePx = Math.min(maxByHeightCap, maxByLineCount);

      if (typeof Intl !== 'undefined' && Intl.Segmenter) {
        const naturalWidthPx = measureLongestLineWidth(
          measureLines,
          fontDescriptor
        );
        if (naturalWidthPx <= 0) return;

        const widthFitPx =
          (containerWidth / naturalWidthPx) * REFERENCE_SIZE_PX;
        const fontSizePx = Math.min(
          maxSizePx,
          Math.max(minSizePx, widthFitPx)
        );

        heading.style.fontSize = `${fontSizePx}px`;
      }
    };

    const handleBeforeInput = (event) => {
      if (event.inputType !== 'insertParagraph') return;

      event.preventDefault();
      document.execCommand('insertLineBreak');
      recalc();
    };

    const handlePaste = (event) => {
      event.preventDefault();
      const text = event.clipboardData?.getData('text/plain') ?? '';
      document.execCommand('insertText', false, text);
      recalc();
    };

    const handleInput = () => {
      recalc();
    };

    recalc();

    const resizeObserver = new ResizeObserver(recalc);
    resizeObserver.observe(container);
    heading.addEventListener('beforeinput', handleBeforeInput);
    heading.addEventListener('paste', handlePaste);
    heading.addEventListener('input', handleInput);

    return () => {
      resizeObserver.disconnect();
      heading.removeEventListener('beforeinput', handleBeforeInput);
      heading.removeEventListener('paste', handlePaste);
      heading.removeEventListener('input', handleInput);
    };
  }, [defaultText]);

  return (
    <div ref={containerRef} className={containerClassName}>
      <Tag
        ref={headingRef}
        contentEditable
        suppressContentEditableWarning
        className={className}
      />
    </div>
  );
};
