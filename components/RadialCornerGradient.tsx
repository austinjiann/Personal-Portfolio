import React from 'react';

interface RadialCornerGradientProps {
  centerXPercent?: number; // 50 = center of screen horizontally
  centerYPercent?: number; // 50 = center vertically
  // Preferred: radius relative to larger viewport dimension (spreads further)
  radiusVmax?: number;     // default 120
  // Back-compat: if provided, used when radiusVmax is undefined
  radiusVmin?: number;
  innerColor?: string;     // color at center
  outerColor?: string;     // color at corners
}

const RadialCornerGradient: React.FC<RadialCornerGradientProps> = ({
  centerXPercent = 50,
  centerYPercent = 50,
  radiusVmax = 70,
  radiusVmin,
  innerColor = '#101010',
  outerColor = '#000000',
}) => {
  const radiusCss = radiusVmax !== undefined ? `${radiusVmax}vmax` : `${radiusVmin ?? 48}vmin`;
  const style: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: -2,
    pointerEvents: 'none',
    // Combine a strong central radial with symmetric side darkening so both left and right go black→gray
    backgroundImage: [
      // Side falloff (left and right both darker toward edges)
      'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 15%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.85) 100%)',
      // Central radial emphasis
      `radial-gradient(circle ${radiusCss} at ${centerXPercent}% ${centerYPercent}%, ${innerColor} 0%, #141414 16%, #0a0a0a 40%, ${outerColor} 100%)`
    ].join(', '),
  };
  return <div style={style} />;
};

export default RadialCornerGradient;


