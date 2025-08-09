import React from 'react';

interface PenguinDotsBackgroundProps {
  /** Path to a transparent PNG or SVG in /public to use as the penguin mask */
  maskSrc?: string;
  /** Size of the penguin relative to viewport (0..100, in vmin). Default 68 */
  maskSizeVmin?: number;
  /** Dot spacing (px) */
  dotSpacing?: number;
  /** Dot size (px) */
  dotSize?: number;
  /** Dot opacity (0..1) */
  dotOpacity?: number;
}

const PenguinDotsBackground: React.FC<PenguinDotsBackgroundProps> = ({
  maskSrc = '/penguin.png',
  maskSizeVmin = 68,
  dotSpacing = 20,
  dotSize = 2,
  dotOpacity = 0.25,
}) => {
  // Dotted grid background masked to penguin image
  const style: React.CSSProperties = {
    zIndex: -2,
    width: '100%',
    height: '100%',
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    backgroundColor: '#000',
    backgroundImage: `radial-gradient(circle, rgba(255,255,255,${dotOpacity}) ${dotSize}px, transparent ${dotSize}px)`,
    backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
    backgroundPosition: 'center',
    // Mask to penguin
    WebkitMaskImage: `url(${maskSrc})`,
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    WebkitMaskSize: `${maskSizeVmin}vmin`,
    maskImage: `url(${maskSrc})`,
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    maskSize: `${maskSizeVmin}vmin`,
  } as React.CSSProperties;

  return <div style={style} />;
};

export default PenguinDotsBackground;


