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

This is a React TypeScript personal portfolio site built with Vite, styled with Tailwind CSS, and using React Router for navigation. The centerpiece is an animated text collage intro that plays on every home page visit, followed by a clean multi-page navigation experience with animated transitions.

### Core Application Flow & State Management

**App.tsx** - Root component managing animation states and routing:
- Controls animation sequence with three main states: `showCollage`, `showHomepage`, `animationComplete`
- Renders AnimatedTextCollage whenever route is `/` (no refresh detection)
- Uses Layout component wrapper that conditionally shows Footer based on route and animation state  
- Routes: `/` (Home), `/about` (About), `/projects` (Projects), `/blog` (Blog)
- Animation plays in foreground while Homepage renders in background for smooth transitions

**Animation State Logic**:
- **Home route navigation**: Animation always plays when navigating to `/` → Footer hidden during animation → Footer fades in after completion
- **Other pages**: No animation → Immediate content display with Footer visible

### Key Components

**AnimatedTextCollage.tsx** - Complex word placement and animation system:
- Generates 50 words from `WORD_LIST` with sophisticated collision detection using radial distribution
- Uses size-based ring placement algorithm with three rings (inner, middle, outer)
- Animation timeline: words fade-in (2s) → hero appears (2.1s) → words fade-out (5.1s) → background fades (5.7s)
- Calls `onWordsFadeStart` to trigger Layout transition, `onAnimationComplete` when finished
- `keepHeroVisible={true}` preserves hero text during transition to Home component

**Home.tsx** - Landing page with repositioning hero text:
- Accepts `animationComplete` prop to coordinate with App state
- Hero text automatically repositions from center to top after mount (with timing based on animation state)
- Uses `heroMoved` state with responsive text sizing and smooth transitions
- Utilizes ContentContainer wrapper for consistent layout

**About.tsx** - Personal information page with structured layout:
- Large hero name display using responsive text sizing (5xl to 9xl)
- Three main sections: "Currently", "Previously", "What I'm up to outside of work"
- Color-coded bullet points (blue, green, purple) for visual organization
- Includes University of Waterloo logo integration with external link
- Template placeholders for personal content customization
- Uses ContentContainer for consistent width matching

**Projects.tsx, Blog.tsx** - Content pages that can be developed with personal information

**Footer.tsx** - Navigation component with animated pill indicator and social links:
- Contains `navLinks` array defining routes and labels (home, about, projects, blog)
- Implements sliding pill animation that follows active navigation item using DOM measurements
- Includes social media icons (X/Twitter, LinkedIn, GitHub, Email) positioned left of center
- Conditionally rendered based on route and animation state via Layout component

### Critical Implementation Details

**Animation Trigger Logic**: App.tsx:40-51
- Simple route-based trigger: animation plays whenever `location.pathname === '/'`
- Sets `showCollage`, `showHomepage`, and `animationComplete` states
- No refresh detection - animation occurs on every home route navigation

**Footer Visibility System**: App.tsx:16
- Layout component conditionally shows Footer based on route and animation state
- Formula: `showFooter = location.pathname !== '/' || (location.pathname === '/' && animationComplete)`
- Footer includes `showAnimation` prop for fade-in transitions

**Hero Text Positioning**: Home.tsx:12-20
- Uses `heroMoved` state with useEffect to trigger repositioning
- Timing: 300ms delay if animation complete, 100ms for direct navigation
- Responsive sizing and smooth transitions between center and top positions

**Navigation State Management**: Footer.tsx:34-68
- Active index automatically updates based on `location.pathname`
- Animated pill positioning calculated via DOM measurements and CSS transforms
- Pill styling includes extra padding and positioning adjustments for visual appeal

### Key Configuration Points

**Animation Content**: Edit `BASE_WORD_LIST` and `EXTRA_WORDS` in AnimatedTextCollage.tsx:16-28  
**Animation Timing**: Modify timeout values in AnimatedTextCollage.tsx:227-258  
**Navigation Routes**: Update `navLinks` array in Footer.tsx:8-13  
**Social Links**: Update URLs in Footer.tsx:89-126 (X/Twitter, LinkedIn, GitHub, Email)  
**Hero Text**: Modify content in AnimatedTextCollage.tsx:329 and Home.tsx:42

### Architecture Notes

**State Flow**: App manages global animation state → Layout controls Footer visibility → Home handles hero positioning  
**Routing Strategy**: React Router with conditional rendering - animation always plays on home route  
**Animation Philosophy**: Visual showcase on every home navigation, creating consistent brand experience  
**Responsive Design**: Consistent breakpoints across components using Tailwind responsive classes  
**Performance**: Optimized animations with `willChange`, `transform`, and proper z-index layering  
**File Organization**: Components in `/components`, pages in `/pages`, main app files in root

### Layout Components

**ContentContainer.tsx** - Responsive width container component:
- Matches approximate width of "AUSTIN JIAN" text at different breakpoints
- Responsive max-width scaling: 260px (base) → 320px (sm) → 420px (md) → 520px (lg) → 620px (xl)
- Auto-centered with horizontal margins and responsive padding (px-2 to px-6)
- Used in About.tsx and other content pages for consistent text width alignment
- Accepts optional className prop for additional styling customization