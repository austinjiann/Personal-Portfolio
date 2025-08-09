import React, { useEffect, useMemo, useState } from 'react';

interface DottedNameBackgroundProps {
  leftText?: string; // default 'AUSTIN'
  rightText?: string; // default 'JIAN'
  // Vertical placement: center Y as percent of viewport height
  centerYPercent?: number; // default 50
  // Horizontal offsets from edges in vw
  leftOffsetVw?: number; // default 6
  rightOffsetVw?: number; // default 6
  // Relative font size as percentage of the smaller viewport dimension
  fontVmin?: number; // default 16
  letterSpacingEm?: number; // default 0.22
  // Dots
  dotSpacing?: number; // px
  dotRadius?: number; // px
  dotOpacity?: number; // 0..1
}

const DottedNameBackground: React.FC<DottedNameBackgroundProps> = ({
  leftText = 'AUSTIN',
  rightText = 'JIAN',
  centerYPercent = 50,
  leftOffsetVw = 6,
  rightOffsetVw = 6,
  fontVmin = 16,
  letterSpacingEm = 0.22,
  dotSpacing = 18,
  dotRadius = 1.4,
  dotOpacity = 0.26,
}) => {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  const { width, height } = size;

  const circles = useMemo(() => {
    if (!width || !height) return [] as JSX.Element[];
    const elems: JSX.Element[] = [];
    const numRows = Math.ceil(height / dotSpacing) + 2;
    const numCols = Math.ceil(width / dotSpacing) + 2;
    const jitter = 1.6; // px for natural feel
    for (let row = 0; row < numRows; row += 1) {
      for (let col = 0; col < numCols; col += 1) {
        const x = col * dotSpacing + (Math.random() * jitter - jitter / 2);
        const y = row * dotSpacing + (Math.random() * jitter - jitter / 2);
        elems.push(
          <circle key={`${row}-${col}`} cx={x} cy={y} r={dotRadius} fill={`rgba(255,255,255,${dotOpacity})`} />
        );
      }
    }
    return elems;
  }, [width, height, dotSpacing, dotRadius, dotOpacity]);

  if (!width || !height) return null;

  const leftX = (leftOffsetVw / 100) * width; // vw relative to viewport width
  const rightX = width - (rightOffsetVw / 100) * width;
  const centerY = (centerYPercent / 100) * height;
  const fontPx = (fontVmin / 100) * Math.min(width, height);
  const lineHeight = fontPx * 1.08;
  const leftLetters = leftText.split('');
  const rightLetters = rightText.split('');
  const leftBlockHeight = leftLetters.length * lineHeight;
  const rightBlockHeight = rightLetters.length * lineHeight;
  const leftStartY = centerY - leftBlockHeight / 2 + lineHeight * 0.8; // baseline adjustment
  const rightStartY = centerY - rightBlockHeight / 2 + lineHeight * 0.8;

  return (
    <svg
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -2, width: '100%', height: '100%' }}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Background fill */}
      <rect x={0} y={0} width={width} height={height} fill="#000000" />

      <defs>
        <clipPath id="left-text-clip">
          <g>
            {leftLetters.map((ch, i) => (
              <text
                key={`l-${i}-${ch}`}
                x={leftX}
                y={leftStartY + i * lineHeight}
                fontFamily="Roboto, system-ui, -apple-system, Segoe UI, sans-serif"
                fontWeight={800}
                fontSize={fontPx}
                letterSpacing={`${letterSpacingEm}em`}
                textAnchor="start"
                dominantBaseline="alphabetic"
              >
                {ch}
              </text>
            ))}
          </g>
        </clipPath>
        <clipPath id="right-text-clip">
          <g>
            {rightLetters.map((ch, i) => (
              <text
                key={`r-${i}-${ch}`}
                x={rightX}
                y={rightStartY + i * lineHeight}
                fontFamily="Roboto, system-ui, -apple-system, Segoe UI, sans-serif"
                fontWeight={800}
                fontSize={fontPx}
                letterSpacing={`${letterSpacingEm}em`}
                textAnchor="end"
                dominantBaseline="alphabetic"
              >
                {ch}
              </text>
            ))}
          </g>
        </clipPath>
      </defs>

      {/* Dots clipped to left word */}
      <g clipPath="url(#left-text-clip)">{circles}</g>
      {/* Dots clipped to right word */}
      <g clipPath="url(#right-text-clip)">{circles}</g>
    </svg>
  );
};

export default DottedNameBackground;


