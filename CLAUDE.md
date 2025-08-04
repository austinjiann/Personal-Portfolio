# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev         # Start development server (Vite)
npm run build       # Type check and build for production
npm run lint        # Run ESLint on TypeScript files
npm run preview     # Preview production build locally
```

## Project Architecture

This is a React TypeScript personal portfolio site built with Vite and styled with Tailwind CSS. The main feature is a seamless animated transition from a word collage intro screen to the main homepage.

### Core Component Flow & State Management

**App.tsx** - Root component managing the transition sequence:
- Controls `showHomepage` state triggered by `onWordsFadeStart` from AnimatedTextCollage
- Renders both AnimatedTextCollage and Homepage components simultaneously during transition
- AnimatedTextCollage has `keepHeroVisible={true}` to persist hero text during homepage fade-in
- Homepage receives `showHeroText={false}` to avoid duplicate hero rendering

**AnimatedTextCollage.tsx** - Complex word placement and animation system:
- Generates 50 words from `WORD_LIST` (22 base + 4 extra + 24 duplicates) with collision detection
- Uses radial distribution algorithm with size-based ring placement (larger text closer to center)
- Implements sophisticated collision avoidance between random words and centered hero text
- Animation phases: word fade-in (staggered over 2s) → hero appears (2.1s) → words fade out (5.1s)
- Hero text persists when `keepHeroVisible=true`, only words and background fade out
- Calls `onWordsFadeStart` when words begin fading to trigger homepage transition

**Homepage.tsx** - Main portfolio interface with conditional hero rendering:
- Accepts `showHeroText` prop to control hero text display (false when collage hero persists)
- Features animated navigation pill that slides between nav items
- Displays live Toronto time and staggered fade-in animations
- Uses spacer div to maintain layout when hero text is rendered externally

### Critical Implementation Details

**Seamless Transition System**: The hero text "AUSTIN JIAN" never moves during the transition. The AnimatedTextCollage version remains visible and positioned while Homepage content fades in around it. This creates the illusion of a single persistent hero element.

**Word Placement Algorithm**: AnimatedTextCollage:84-216
- Uses polar coordinates with radial rings for organic distribution
- Implements collision detection with 6% buffer zones between words
- Separates duplicates by minimum 15% distance to avoid clustering
- Falls back to edge positions if placement fails after 100 attempts

**Z-Index Layering Strategy**:
- Hero text: z-50 (always on top during transition)
- Collage container: z-30  
- Homepage: z-20 (behind collage during transition)
- Background: z-20 (fades out independently)

**Animation Timeline**:
- 0-2.1s: Random words fade in with staggered delays
- 2.1s: "AUSTIN JIAN" hero text appears
- 5.1s: Words fade out, `onWordsFadeStart` triggers homepage fade-in
- 5.7s: Background fades out, `onAnimationComplete` fires

### Key Configuration Points

**Word Content**: Edit `BASE_WORD_LIST` and `EXTRA_WORDS` in AnimatedTextCollage.tsx:16-28
**Timing Adjustments**: Modify timeout values in AnimatedTextCollage.tsx:227-258
**Navigation Links**: Update `navLinks` array in Homepage.tsx:26-31
**Responsive Breakpoints**: Both components use consistent text sizing classes for hero text