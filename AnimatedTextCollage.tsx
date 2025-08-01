import React, { useState, useEffect, useRef, useCallback } from 'react';

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
}

const BASE_WORD_LIST = [
  'lifemaxxing', 'experiencemaxxing', 'twitter shitposting', 'linkedin warrior', 'waterloo cs',
  'toronto', 'waterloo', 'builder', '2x hackathon winner', 'swe @cyc',
  'swe @go place', 'founder', '181 cm', 'student',
  '17 yrs old', 'build in public', 'lil delusional', '155 lbs', 'chinese',
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

const AnimatedTextCollage: React.FC<AnimatedTextCollageProps> = ({ 
  onAnimationComplete,
  onWordsFadeStart,
  keepHeroVisible = false
}) => {
  const [showWords, setShowWords] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [fadeOutWords, setFadeOutWords] = useState(false);
  const [fadeOutHero, setFadeOutHero] = useState(false);
  const [fadeOutBackground, setFadeOutBackground] = useState(false);
  const [wordPositions, setWordPositions] = useState<WordPosition[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Calculate word positions using organic radial distribution like reference collage
  const calculateWordPositions = useCallback(() => {
    const positions: WordPosition[] = new Array(WORD_LIST.length);
    const placedPositions: { x: number; y: number; word: string }[] = [];
    
    // Screen center shifted left and safe margins (5% from edges for more coverage)
    const centerX = 45; // 45% of screen width (shifted left)
    const centerY = 50; // 50% of screen height  
    const minMargin = 5; // 5% margin from edges (more coverage)
    const maxMargin = 95; // 95% maximum position
    
    // Hero exclusion zone (avoid overlapping with AUSTIN JIAN)
    const heroBuffer = 10; // Distance to keep from hero text (reduced for denser packing)
    
    // Define radial rings for size-based placement (expanded for more coverage)
    const rings = [
      { minRadius: 12, maxRadius: 22, name: 'inner' },   // Large words close to center
      { minRadius: 18, maxRadius: 32, name: 'middle' },  // Medium words  
      { minRadius: 25, maxRadius: 42, name: 'outer' }    // Small words at edges (expanded)
    ];
    
    // Simple collision check with smaller buffer for denser packing
    const hasCollision = (x: number, y: number, buffer = 6): boolean => {
      return placedPositions.some(pos => {
        const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
        return distance < buffer;
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
      
      while (!placed && attempts < 100) {
        // Generate random angle and distance
        const angle = Math.random() * 2 * Math.PI;
        const radius = targetRing.minRadius + Math.random() * (targetRing.maxRadius - targetRing.minRadius);
        
        // Convert polar to cartesian coordinates
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        // Check bounds (stay within 10% margins)
        if (x < minMargin || x > maxMargin || y < minMargin || y > maxMargin) {
          attempts++;
          continue;
        }
        
        // Check hero area collision
        const heroDistance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        if (heroDistance < heroBuffer) {
          attempts++;
          continue;
        }
        
        // Check collision with other words
        if (hasCollision(x, y)) {
          attempts++;
          continue;
        }
        
        // For duplicates, check distance from original (avoid clustering duplicates)
        if (isDuplicate) {
          const originalPos = duplicateTracker.get(originalWord);
          if (originalPos) {
            const duplicateDistance = Math.sqrt(Math.pow(x - originalPos.x, 2) + Math.pow(y - originalPos.y, 2));
            if (duplicateDistance < 15) { // Keep duplicates at least 15% apart
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
        
        placedPositions.push({ x, y, word });
        
        // Track original word position for duplicate avoidance
        if (!isDuplicate) {
          duplicateTracker.set(originalWord, { x, y });
        }
        
        placed = true;
      }
      
      // Fallback: place in safe edge position
      if (!placed) {
        const fallbackPositions = [
          { x: 15, y: 15 }, { x: 85, y: 15 }, { x: 15, y: 85 }, { x: 85, y: 85 },
          { x: 15, y: 30 }, { x: 85, y: 30 }, { x: 15, y: 70 }, { x: 85, y: 70 },
          { x: 30, y: 15 }, { x: 70, y: 15 }, { x: 30, y: 85 }, { x: 70, y: 85 }
        ];
        const fallback = fallbackPositions[wordIndex % fallbackPositions.length];
        
        positions[wordIndex] = {
          top: fallback.y,
          left: fallback.x,
          size,
          word
        };
      }
    });
    
    setWordPositions(positions);
  }, [getWordSize]);

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
          backgroundColor: '#1B1B1B',
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
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
                transform: 'translateZ(0)'
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
