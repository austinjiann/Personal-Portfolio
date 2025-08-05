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

This is a React TypeScript personal portfolio site built with Vite, styled with Tailwind CSS, and using React Router for navigation. The centerpiece is an animated text collage intro that plays on home page refresh, followed by a clean multi-page navigation experience.

### Core Application Flow & State Management

**App.tsx** - Root component managing animation states and routing:
- Detects page refresh vs navigation using `PerformanceNavigationTiming` API and sessionStorage
- Controls animation sequence: `showCollage`, `showHomepage`, `animationComplete` states
- Renders AnimatedTextCollage only on home page refresh/fresh load (`isPageRefresh` && `location.pathname === '/'`)
- Uses Layout component wrapper that conditionally shows Footer based on route and animation state
- Routes: `/` (Home), `/about` (About), `/projects` (Projects), `/blog` (Blog)

**Animation State Logic**:
- **Fresh load/refresh on home**: Animation plays → Footer hidden during animation → Footer fades in after completion
- **Navigation between pages**: No animation → Immediate content display
- **Direct navigation to home**: No animation → Footer appears with delay to maintain UX consistency

### Key Components

**AnimatedTextCollage.tsx** - Complex word placement and animation system:
- Generates 50 words from `WORD_LIST` with sophisticated collision detection
- Uses radial distribution algorithm with size-based ring placement
- Animation timeline: words fade-in (2s) → hero appears (2.1s) → words fade-out (5.1s) → background fades (5.7s)
- Calls `onWordsFadeStart` to trigger Layout transition, `onAnimationComplete` when finished
- `keepHeroVisible={true}` preserves hero text during transition

**Home.tsx** - Minimal landing page with hero text repositioning:
- Accepts `animationComplete` prop to coordinate with App state
- Hero text transitions from center to top position after animation (or immediately on direct navigation)
- Clean design with just "AUSTIN JIAN" text, no additional content

**About.tsx** - Dedicated content page with personal information
**Projects.tsx** & **Blog.tsx** - Placeholder pages for future content

**Footer.tsx** - Navigation component with animated pill indicator:
- Contains `navLinks` array defining routes and labels
- Implements sliding pill animation that follows active navigation item
- Includes social media icons, navigation bar, and live Toronto time display
- Conditionally rendered based on route and animation state via Layout component

### Critical Implementation Details

**Animation Trigger Logic**: App.tsx:34-81
- Uses `window.performance.getEntriesByType('navigation')` to detect refresh vs navigation
- SessionStorage (`hasNavigated`) tracks if user has navigated within session
- Only triggers animation on true refresh/fresh load, never on tab navigation

**Footer Visibility System**: App.tsx:10-35
- Layout component receives `animationComplete` prop from App state
- Footer shows on all pages except home during animation
- Formula: `showFooter = location.pathname !== '/' || (location.pathname === '/' && animationComplete)`
- Includes fade-in transition with `duration-700` and `400ms` delay

**Hero Text Positioning**: Home.tsx:10-19
- Conditional positioning: centered during animation, top-aligned after completion
- Responsive text sizing: larger during animation, smaller when repositioned
- Uses `heroMoved` state to control transition timing

**Navigation State Management**: Footer.tsx:29-37
- Active index automatically updates based on `location.pathname`
- Animated pill positioning calculated via DOM measurements and transforms
- Handles both direct navigation and programmatic route changes

### Key Configuration Points

**Animation Content**: Edit `BASE_WORD_LIST` and `EXTRA_WORDS` in AnimatedTextCollage.tsx:16-28  
**Animation Timing**: Modify timeout values in AnimatedTextCollage.tsx:227-258  
**Navigation Routes**: Update `navLinks` array in Footer.tsx:8-13  
**Social Links**: Update URLs in Footer.tsx social media section  
**Hero Text**: Modify text content in AnimatedTextCollage.tsx:329 and Home.tsx:40

### Architecture Notes

**State Flow**: App manages global animation state → Layout controls Footer visibility → Home handles hero positioning  
**Routing Strategy**: React Router with conditional rendering during animation sequence  
**Animation Philosophy**: Animation only on refresh preserves user expectation while showcasing visual appeal  
**Responsive Design**: Consistent breakpoints across components using Tailwind responsive classes  
**Performance**: Animation sequence completely bypassed on navigation for instant page loads