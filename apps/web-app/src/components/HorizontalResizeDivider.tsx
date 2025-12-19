import { useEffect, useRef } from 'react';

export const DividerStyle: React.CSSProperties = {
  position: 'relative',
  borderRadius: '5px',
  height: '100%',
  width: '3px',
  cursor: 'col-resize',
};

const HorizontalResizeDivider = ({
  left,
  min,
  max,
  onResize,
  windowRef,
}: {
  left: number;
  min?: number;
  max?: number;
  onResize: (currLeft: number) => void;
  windowRef: React.RefObject<HTMLDivElement>;
}) => {
  const currPos = useRef<number | null>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    onResize(left);
  }, [left, onResize]);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (e.target !== dividerRef.current) return;
      if (dividerRef.current)
        dividerRef.current.style.backgroundColor = '#71f163';
      isDragging.current = true;
      currPos.current = e.clientX;

      // Disable iframes during drag
      document
        .querySelectorAll('iframe')
        .forEach((iframe) => (iframe.style.pointerEvents = 'none'));
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      requestAnimationFrame(() => {
        if (
          currPos.current === null ||
          !dividerRef.current ||
          !windowRef.current
        ) {
          return;
        }
        const width = windowRef.current.offsetWidth;
        if (width === 0) return;
        
        const rect = windowRef.current.getBoundingClientRect();

        const cursorX = e.clientX - rect.left; // px inside container
        const percent = (cursorX / rect.width) * 100;

        const newLeft = Math.min(max ?? 100, Math.max(min ?? 0, percent));
        if (
          (min !== undefined && newLeft < min) ||
          (max !== undefined && newLeft > max)
        ) {
          return;
        }
        onResize(newLeft);
      });
    };

    const onMouseUp = () => {
      isDragging.current = false;
      currPos.current = null;

      if (dividerRef.current)
        dividerRef.current.style.backgroundColor = '#0B1020';

      // Re-enable iframes
      document
        .querySelectorAll('iframe')
        .forEach((iframe) => (iframe.style.pointerEvents = 'auto'));
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [left, min, max, onResize, windowRef]);

  return (
    <div
      ref={dividerRef}
      style={{ ...DividerStyle }}
      className="horz-divider"
    />
  );
};

export default HorizontalResizeDivider;
