import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface WordPosition {
  top: number;
  left: number;
  size: string;
  word: string;
}

interface AnimatedTextCollageProps {
  onAnimationComplete?: () => void;
  onWordsFadeStart?: () => void;
  keepHeroVisible?: boolean;
  /** Enable restricting word placement to an organic shape */
  useShapeMask?: boolean;
  /** Optional custom SVG path (viewBox 0 0 100 100) to define the shape */
  shapePath?: string;
  /** Arrange words in a circular ring around the hero */
  useRingMask?: boolean;
  /** Inner radius of the ring in percentage units (0-100) */
  ringInnerRadiusPct?: number;
  /** Outer radius of the ring in percentage units (0-100) */
  ringOuterRadiusPct?: number;
  /** Center X of the ring in percentage units (0-100) */
  ringCenterXPct?: number;
  /** Center Y of the ring in percentage units (0-100) */
  ringCenterYPct?: number;
}

const BASE_WORD_LIST = [
  'lifemaxxing', 'experiencemaxxing', 'twitter shitposting', 'linkedin warrior', 'waterloo cs',
  'toronto', 'waterloo', 'builder', '2x hackathon winner', 'swe @cyc',
  'swe @go place', 'building playbookz', '181 cm', 'student',
  '17 yrs old', 'building in public','155 lbs', 'chinese',
  'canadian', 'prev top 1% valorant', 'top 1% hypixel bedwars', '2000+ hours roblox'
];

// Create expanded word list with duplicates (max 2x per word, up to 50 total)
// Add some extra words to reach 50 without exceeding 2x per word
const EXTRA_WORDS = [
  'code monkey', 'designing', 'creating', 'hackathon hopping'
];

const EXPANDED_BASE = [...BASE_WORD_LIST, ...EXTRA_WORDS]; // 30 words total

const WORD_LIST = [
  ...EXPANDED_BASE, // Original 30 words
  ...EXPANDED_BASE.slice(0, 20)  // Add 20 duplicates for 50 total
];

const uiFont = {
  fontFamily: 'Roboto, sans-serif',
};

const DEFAULT_BLOB_PATH =
  // Organic blob path in a 100x100 coordinate system (roughly centered)
  'M60,5 Q85,10 90,35 Q95,60 75,75 Q60,90 40,95 Q20,90 10,70 Q5,50 15,30 Q25,10 45,8 Z';

const AnimatedTextCollage: React.FC<AnimatedTextCollageProps> = ({ 
  onAnimationComplete,
  onWordsFadeStart,
  keepHeroVisible = false,
  useShapeMask = false,
  shapePath,
  useRingMask = true,
  ringInnerRadiusPct = 15,
  ringOuterRadiusPct = 43,
  ringCenterXPct = 50,
  ringCenterYPct = 50
}) => {
  const [showWords, setShowWords] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [fadeOutWords, setFadeOutWords] = useState(false);
  const [fadeOutHero, setFadeOutHero] = useState(false);
  const [fadeOutBackground, setFadeOutBackground] = useState(false);
  const [wordPositions, setWordPositions] = useState<WordPosition[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Prepare a point-in-shape checker using an offscreen canvas and Path2D
  const isPointInsideShape = useMemo(() => {
    if (!useShapeMask) return undefined as undefined | ((xPct: number, yPct: number) => boolean);

    try {
      const pathData = shapePath && shapePath.trim().length > 0 ? shapePath : DEFAULT_BLOB_PATH;
      const canvas = document.createElement('canvas');
      // Use high resolution for accurate point checks
      canvas.width = 1000;
      canvas.height = 1000;
      const ctx = canvas.getContext('2d');
      if (!ctx) return undefined;

      ctx.save();
      // Scale to 0..100 space → 0..1000 canvas pixels
      ctx.scale(canvas.width / 100, canvas.height / 100);
      const path = new Path2D(pathData);
      ctx.restore();

      return (xPct: number, yPct: number) => {
        // Convert to canvas pixels (but ctx.isPointInPath will apply current transform)
        // We need to reapply the scale for the hit test
        if (!ctx) return true;
        ctx.save();
        ctx.scale(canvas.width / 100, canvas.height / 100);
        const inside = ctx.isPointInPath(path, xPct, yPct);
        ctx.restore();
        return inside;
      };
    } catch {
      return undefined;
    }
  }, [useShapeMask, shapePath]);

  // Create word cloud size hierarchy based on word length (longer words = smaller size)
  const getWordSize = useCallback((word: string): string => {
    const wordLength = word.length;
    
    // Size based on word length - shorter words get bigger sizes
    if (wordLength <= 4) {
      // Very short words (2x, 17, etc.) get largest sizes
      const sizes = ['text-7xl', 'text-8xl', 'text-9xl'];
      return sizes[Math.floor(Math.random() * sizes.length)];
    } else if (wordLength <= 8) {
      // Short words (toronto, builder, etc.) get large sizes
      const sizes = ['text-5xl', 'text-6xl', 'text-7xl'];
      return sizes[Math.floor(Math.random() * sizes.length)];
    } else if (wordLength <= 12) {
      // Medium words (waterloo cs, student, etc.) get medium sizes
      const sizes = ['text-3xl', 'text-4xl', 'text-5xl'];
      return sizes[Math.floor(Math.random() * sizes.length)];
    } else if (wordLength <= 16) {
      // Long words (build in public, etc.) get smaller sizes
      const sizes = ['text-2xl', 'text-3xl'];
      return sizes[Math.floor(Math.random() * sizes.length)];
    } else {
      // Very long words (experiencemaxxing, lifemaxxing, etc.) get smallest sizes
      const sizes = ['text-xl', 'text-2xl'];
      return sizes[Math.floor(Math.random() * sizes.length)];
    }
  }, []);

  // Map Tailwind-like size classes to approximate collision radius in percentage units
  const getRadiusForSize = useCallback((sizeClass: string): number => {
    if (sizeClass.includes('9xl')) return 7.5;
    if (sizeClass.includes('8xl')) return 6.5;
    if (sizeClass.includes('7xl')) return 5.8;
    if (sizeClass.includes('6xl')) return 5.0;
    if (sizeClass.includes('5xl')) return 4.2;
    if (sizeClass.includes('4xl')) return 3.6;
    if (sizeClass.includes('3xl')) return 3.0;
    if (sizeClass.includes('2xl')) return 2.6;
    if (sizeClass.includes('xl')) return 2.3;
    return 2.0;
  }, []);

  // Calculate word positions using organic radial distribution with optional ring/shape masks
  const calculateWordPositions = useCallback(() => {
    const placeWords = (maskEnabled: boolean) => {
      const positions: WordPosition[] = new Array(WORD_LIST.length);
      const placedPositions: { x: number; y: number; radius: number; word: string }[] = [];

      // Choose center: if ring mode, center on hero; else use slight left shift for organic feel
      const centerX = useRingMask ? ringCenterXPct : 45;
      const centerY = useRingMask ? ringCenterYPct : 50;
      const minMargin = 5; // 5% margin from edges (more coverage)
      const maxMargin = 95; // 95% maximum position

      // Hero exclusion zone (for non-ring layouts). If ring is on, inner radius handles this.
      const heroBuffer = useRingMask ? 0 : 10;

      // Define radial rings for size-based placement (expanded for more coverage)
      const rings = [
        { minRadius: 12, maxRadius: 22, name: 'inner' }, // Large words close to center
        { minRadius: 18, maxRadius: 32, name: 'middle' }, // Medium words
        { minRadius: 25, maxRadius: 42, name: 'outer' } // Small words at edges (expanded)
      ];

      // Collision check using per-word radius plus a small gap
      const hasCollision = (x: number, y: number, radius: number): boolean => {
        return placedPositions.some(pos => {
          const distance = Math.hypot(x - pos.x, y - pos.y);
          return distance < pos.radius + radius + 0.6;
        });
      };

      // Track duplicate placement to avoid placing them too close together
      const duplicateTracker = new Map<string, { x: number; y: number }>();

      // Shuffle words for random placement order
      const shuffledIndices = [...Array(WORD_LIST.length)].map((_, i) => i).sort(() => Math.random() - 0.5);

      shuffledIndices.forEach((wordIndex) => {
        const word = WORD_LIST[wordIndex];
        const size = getWordSize(word);
        const isDuplicate = wordIndex >= EXPANDED_BASE.length;
        const originalWord = isDuplicate ? EXPANDED_BASE[wordIndex - EXPANDED_BASE.length] : word;

        // Determine ring based on text size (larger text goes closer to center)
        let targetRing;
        if (size.includes('8xl') || size.includes('9xl')) {
          targetRing = rings[0]; // Large words in inner ring
        } else if (size.includes('5xl') || size.includes('6xl')) {
          targetRing = rings[1]; // Medium-large words in middle ring
        } else if (size.includes('3xl') || size.includes('4xl')) {
          targetRing = rings[Math.random() > 0.5 ? 1 : 2]; // Medium words in middle or outer
        } else {
          targetRing = rings[2]; // Small words in outer ring
        }

        let placed = false;
        let attempts = 0;
        const maxAttempts = maskEnabled ? 250 : 120;

        while (!placed && attempts < maxAttempts) {
          // Generate random angle and distance
          const angle = Math.random() * 2 * Math.PI;
          const radius = targetRing.minRadius + Math.random() * (targetRing.maxRadius - targetRing.minRadius);

          // Convert polar to cartesian coordinates
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          // Approximate text radius for edge padding/collision
          const radiusPct = getRadiusForSize(size);

          // Ring constraint: only place within annulus around hero
          if (useRingMask) {
            const dist = Math.hypot(x - ringCenterXPct, y - ringCenterYPct);
            if (dist < ringInnerRadiusPct || dist > ringOuterRadiusPct) {
              attempts++;
              continue;
            }
          }

          // Respect shape mask if enabled
          if (maskEnabled && isPointInsideShape && !isPointInsideShape(x, y)) {
            attempts++;
            continue;
          }

          // Check bounds with size-aware padding so text stays fully visible
          const xMin = minMargin + radiusPct;
          const xMax = maxMargin - radiusPct;
          const yMin = minMargin + radiusPct;
          const yMax = maxMargin - radiusPct;
          if (x < xMin || x > xMax || y < yMin || y > yMax) {
            attempts++;
            continue;
          }

          // Check hero area collision
          const heroDistance = Math.hypot(x - centerX, y - centerY);
          if (heroDistance < heroBuffer) {
            attempts++;
            continue;
          }

          // Check collision with other words (size-aware)
          if (hasCollision(x, y, radiusPct)) {
            attempts++;
            continue;
          }

          // For duplicates, check distance from original (avoid clustering duplicates)
          if (isDuplicate) {
            const originalPos = duplicateTracker.get(originalWord);
            if (originalPos) {
              const duplicateDistance = Math.hypot(x - originalPos.x, y - originalPos.y);
              if (duplicateDistance < 15) {
                attempts++;
                continue;
              }
            }
          }

          // Place the word
          positions[wordIndex] = {
            top: y,
            left: x,
            size,
            word
          };

          placedPositions.push({ x, y, radius: radiusPct, word });

          // Track original word position for duplicate avoidance
          if (!isDuplicate) {
            duplicateTracker.set(originalWord, { x, y });
          }

          placed = true;
        }

        // Fallback: try deterministic positions that also fit the shape
        if (!placed) {
          const fallbackPositions = [
            { x: 20, y: 20 }, { x: 80, y: 20 }, { x: 20, y: 80 }, { x: 80, y: 80 },
            { x: 25, y: 35 }, { x: 75, y: 35 }, { x: 25, y: 65 }, { x: 75, y: 65 },
            { x: 40, y: 25 }, { x: 60, y: 25 }, { x: 40, y: 75 }, { x: 60, y: 75 }
          ];
          const fallback = fallbackPositions[wordIndex % fallbackPositions.length];
          const radiusPct = getRadiusForSize(size);
          const fitsRing = !useRingMask || (
            Math.hypot(fallback.x - ringCenterXPct, fallback.y - ringCenterYPct) >= ringInnerRadiusPct &&
            Math.hypot(fallback.x - ringCenterXPct, fallback.y - ringCenterYPct) <= ringOuterRadiusPct
          );
          const fitsShape = !maskEnabled || !isPointInsideShape || isPointInsideShape(fallback.x, fallback.y);
          const xMin = minMargin + radiusPct;
          const xMax = maxMargin - radiusPct;
          const yMin = minMargin + radiusPct;
          const yMax = maxMargin - radiusPct;
          const fitsBounds = fallback.x >= xMin && fallback.x <= xMax && fallback.y >= yMin && fallback.y <= yMax;
          if (fitsRing && fitsShape && fitsBounds && !hasCollision(fallback.x, fallback.y, radiusPct)) {
            positions[wordIndex] = {
              top: fallback.y,
              left: fallback.x,
              size,
              word
            };
            placedPositions.push({ x: fallback.x, y: fallback.y, radius: radiusPct, word });
          }
        }
      });

      return { positions, placedCount: placedPositions.length };
    };

    // Try with shape mask first if enabled, else without mask. Ring mask is always applied if enabled.
    const firstPass = placeWords(!!useShapeMask);
    if (useShapeMask && firstPass.placedCount < Math.min(12, Math.floor(WORD_LIST.length * 0.25))) {
      const secondPass = placeWords(false);
      setWordPositions(secondPass.positions);
    } else {
      setWordPositions(firstPass.positions);
    }
  }, [getWordSize, getRadiusForSize, isPointInsideShape, useShapeMask, useRingMask, ringCenterXPct, ringCenterYPct, ringInnerRadiusPct, ringOuterRadiusPct]);

  // Calculate positions on mount
  useEffect(() => {
    calculateWordPositions();
  }, [calculateWordPositions]);

  // Animation timing effect
  useEffect(() => {
    if (wordPositions.length === 0) return;
    
    // Small delay to ensure clean initial render
    const startTimer = setTimeout(() => {
      setShowWords(true);
    }, 100);
    
    // Show hero text after 2 seconds
    const heroTimer = setTimeout(() => {
      setShowHero(true);
    }, 2100);

    // At 5 seconds (2s fade-in + 3s display), start fade sequence
    const fadeTimer = setTimeout(() => {
      if (onWordsFadeStart) {
        onWordsFadeStart();
      }
      
      setFadeOutWords(true);
      
      // Only fade out hero if keepHeroVisible is false
      if (!keepHeroVisible) {
        setTimeout(() => {
          setFadeOutHero(true);
        }, 300);
      }
      
      setTimeout(() => {
        setFadeOutBackground(true);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 600);
    }, 5100); // 2100ms (hero appears) + 3000ms (display time)

    return () => {
      clearTimeout(startTimer);
      clearTimeout(heroTimer);
      clearTimeout(fadeTimer);
    };
  }, [wordPositions.length, onAnimationComplete, onWordsFadeStart, keepHeroVisible]);

  return (
    <>
      {/* Background layer that fades out */}
      <div 
        className={`fixed inset-0 z-20 transition-opacity duration-1000 ${
          fadeOutBackground ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ 
          backgroundColor: 'transparent'
        }}
      />
      
      {/* Container for words */}
      <div ref={containerRef} className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
        {WORD_LIST.map((word, index) => {
          const position = wordPositions[index];
          const delay = (index * 2000 / WORD_LIST.length) / 1000;
          
          if (!position) return null;
          
          return (
            <div
              key={index}
              className={`absolute text-white font-light transition-opacity duration-500 ease-out whitespace-nowrap ${position.size} ${
                showWords && !fadeOutWords ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                top: `${position.top}%`,
                left: `${position.left}%`,
                transitionDelay: fadeOutWords ? '0s' : `${delay}s`,
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                willChange: 'opacity',
                transform: 'translate(-50%, -50%) translateZ(0)'
              }}
            >
              {word}
            </div>
          );
        })}
      </div>

      {/* Hero text - completely isolated, never affects layout */}
      <div 
        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none px-4 py-8"
        style={{ isolation: 'isolate' }}
      >
        <h1 
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white text-center transition-opacity duration-700 ${
            showHero && !fadeOutHero ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            ...uiFont,
            willChange: 'opacity',
            contain: 'layout style paint',
            fontWeight: 'bold',
            letterSpacing: '0.1em',
            textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 0 2px rgba(0,0,0,1)',
            WebkitTextStroke: '1px rgba(0,0,0,0.5)'
          }}
        >
          AUSTIN JIAN
        </h1>
      </div>
    </>
  );
};

export default AnimatedTextCollage;
